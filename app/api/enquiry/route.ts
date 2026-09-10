import { site } from "@/content/site";
import { formatEnquiryText, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry — delivers the contact form.
 *
 * Validates with lib/enquiry.ts, drops honeypot submissions silently, applies a
 * light per-IP rate limit, then emails the enquiry through Resend when
 * RESEND_API_KEY and CONTACT_TO_EMAIL are set. Without them the enquiry is
 * logged on the server and the visitor still sees the normal confirmation.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 64 * 1024;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = `${site.name} <onboarding@resend.dev>`;

const GENERIC_ERROR = "Something went wrong and your enquiry wasn’t sent. Please try again.";

/* --------------------------------------------------------------
   Best-effort in-memory rate limiting. Resets whenever the server
   restarts and isn't shared between instances — that's fine for a
   contact form; the goal is to blunt accidental floods, not attacks.

   A hit is recorded per attempt, not per successful delivery: if the
   upstream is failing, counting only successes would let a client
   hammer it without ever tripping the limit.
   -------------------------------------------------------------- */
const hits = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => t > cutoff)) hits.delete(k);
    }
  }
  return false;
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || "unknown";
}

type Payload = { ok: boolean; message?: string; errors?: Record<string, string>
  /** False when delivery isn't configured and the enquiry was only logged. */
  delivered?: boolean;
};

function json(body: Payload, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Reads the request body while counting bytes, so a chunked or missing
 * Content-Length can't sidestep the size cap — `req.json()` would buffer
 * the whole thing before we ever saw how big it was. Returns null once the
 * running total passes `limit` (the stream is cancelled at that point).
 */
async function readBody(req: Request, limit: number): Promise<Uint8Array | null> {
  if (!req.body) return new Uint8Array(0);
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

async function sendViaResend(data: Enquiry, apiKey: string, to: string): Promise<boolean> {
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New enquiry from ${data.name}`,
      text: formatEnquiryText(data),
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    // Log the status and Resend's message only — never the request we sent (it carries the key).
    let detail = "";
    try {
      const body = (await res.json()) as { message?: string };
      detail = typeof body?.message === "string" ? ` — ${body.message}` : "";
    } catch {
      /* body wasn't JSON; the status is enough */
    }
    console.error(`[enquiry] Resend responded ${res.status}${detail}`);
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    const tooLong = () =>
      json({ ok: false, message: "That message is too long to send. Please shorten it." }, 413);

    // Cheap pre-check on the declared length; the streamed read below is what
    // actually enforces the cap, whether or not the header is present.
    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_BODY_BYTES) return tooLong();

    let body: unknown;
    try {
      const raw = await readBody(req, MAX_BODY_BYTES);
      if (raw === null) return tooLong();
      body = JSON.parse(new TextDecoder().decode(raw));
    } catch {
      return json({ ok: false, message: "The enquiry couldn’t be read. Please try again." }, 400);
    }

    const result = validateEnquiry(body);
    if (!result.ok) {
      return json({ ok: false, message: "Please check the highlighted fields.", errors: result.errors }, 400);
    }

    // Honeypot filled: almost certainly a bot. Pretend it worked and move on.
    if (result.spam) return json({ ok: true });

    // Rate-limit before deciding how to deliver, so an unconfigured deployment
    // (which logs the enquiry in full) is capped just like a configured one.
    if (isRateLimited(clientKey(req))) {
      return json(
        { ok: false, message: "That’s a few enquiries in a short time. Please wait a while and try again." },
        429,
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const to = process.env.CONTACT_TO_EMAIL?.trim();
    if (!apiKey || !to) {
      // Delivery isn't configured yet. Record the enquiry in the server logs so
      // nothing is lost, and let the visitor see the normal confirmation.
      console.warn(
        "[enquiry] RESEND_API_KEY / CONTACT_TO_EMAIL are not set — enquiry logged instead of sent:\n" +
          formatEnquiryText(result.data),
      );
      return json({ ok: true, delivered: false });
    }

    const sent = await sendViaResend(result.data, apiKey, to);
    if (!sent) {
      return json({ ok: false, message: "Your enquiry couldn’t be sent right now. Please try again in a moment." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Unexpected error:", err instanceof Error ? err.message : err);
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }
}
