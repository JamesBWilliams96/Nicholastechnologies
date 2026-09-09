import { site } from "@/content/site";
import { formatEnquiryText, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry — delivers the contact form.
 *
 * Validates with lib/enquiry.ts, drops honeypot submissions silently, applies a
 * light per-IP rate limit, then emails the enquiry through Resend when
 * RESEND_API_KEY and CONTACT_TO_EMAIL are set. Without them the enquiry is
 * logged on the server and the client is told the form isn't connected yet.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 64 * 1024;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = `${site.name} <onboarding@resend.dev>`;

const GENERIC_ERROR = "Something went wrong and your enquiry wasn't sent. Please try again.";
const NOT_CONFIGURED = "The enquiry form isn't connected yet.";

/* --------------------------------------------------------------
   Best-effort in-memory rate limiting. Resets whenever the server
   restarts and isn't shared between instances — that's fine for a
   contact form; the goal is to blunt accidental floods, not attacks.
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

type Payload = { ok: boolean; message?: string; errors?: Record<string, string> };

function json(body: Payload, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
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
    const length = Number(req.headers.get("content-length") ?? 0);
    if (length > MAX_BODY_BYTES) {
      return json({ ok: false, message: "That message is too long to send. Please shorten it." }, 413);
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ ok: false, message: "The enquiry couldn't be read. Please try again." }, 400);
    }

    const result = validateEnquiry(body);
    if (!result.ok) {
      return json({ ok: false, message: "Please check the highlighted fields.", errors: result.errors }, 400);
    }

    // Honeypot filled: almost certainly a bot. Pretend it worked and move on.
    if (result.spam) return json({ ok: true });

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const to = process.env.CONTACT_TO_EMAIL?.trim();
    if (!apiKey || !to) {
      console.warn(
        "[enquiry] RESEND_API_KEY / CONTACT_TO_EMAIL are not set — enquiry logged instead of sent:\n" +
          formatEnquiryText(result.data),
      );
      return json({ ok: false, message: NOT_CONFIGURED }, 503);
    }

    if (isRateLimited(clientKey(req))) {
      return json(
        { ok: false, message: "That's a few enquiries in a short time. Please wait a while and try again." },
        429,
      );
    }

    const sent = await sendViaResend(result.data, apiKey, to);
    if (!sent) {
      return json({ ok: false, message: "Your enquiry couldn't be sent right now. Please try again in a moment." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Unexpected error:", err instanceof Error ? err.message : err);
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }
}
