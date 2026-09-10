import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/i18n/types";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/mockups/frames";
import { CheckIcon } from "@/components/ui/icons";
import { playWhenInView } from "@/components/ui/in-view";
import { LogoMark } from "@/components/ui/Logo";

/* ------------------------------------------------------------------
   A project proposal, drawn as a document. Line items, a total row
   that carries no number, a signature that draws itself and an
   "Approved" stamp that lands once the document has scrolled into
   view (see InViewGroup). Sized with container-query units so it
   scales with its column; `max()` keeps the type legible when the
   column is narrow.
   ------------------------------------------------------------------ */

type ProposalCopy = Dictionary["fixedPrice"]["proposal"];

/* Stroke length of the signature path (measured), for the draw-on animation. */
const SIGNATURE_LENGTH = 172;

function Signature() {
  return (
    <svg
      viewBox="0 0 110 30"
      className="h-auto w-full overflow-visible text-ink-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M4 21c6-14 12-16 14-9s-1 15-4 14 3-16 12-13 4 12 10 8 7-13 14-8-2 13 4 11 10-14 16-9-3 12 4 9 10-6 26-7"
        className={cn("animate-dash [animation-delay:300ms]", playWhenInView)}
        style={
          {
            strokeDasharray: SIGNATURE_LENGTH,
            "--dash-length": SIGNATURE_LENGTH,
          } as CSSProperties
        }
      />
    </svg>
  );
}

/* Presses in after the signature has been drawn. */
function ApprovedStamp({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "absolute right-[5cqw] top-[5cqw] z-10 inline-flex items-center gap-[1.4cqw] rounded-[1.6cqw] border-2 border-accent-500 bg-accent-50/80 px-[2.6cqw] py-[1.6cqw] font-mono text-[max(0.625rem,2.3cqw)] font-semibold uppercase leading-none tracking-[0.2em] text-accent-600 -rotate-6",
        /* inner hairline, like a rubber stamp's double rule */
        "before:pointer-events-none before:absolute before:inset-[0.6cqw] before:rounded-[1cqw] before:border before:border-accent-500/50",
        /* lands once the document is in view; hidden only when JS is running */
        "transition-[opacity,scale,rotate] duration-500 ease-out-expo",
        "[.js_&]:scale-[1.45] [.js_&]:opacity-0 [.js_&]:-rotate-12",
        "[.js_[data-inview]_&]:scale-100 [.js_[data-inview]_&]:opacity-100 [.js_[data-inview]_&]:-rotate-6 [.js_[data-inview]_&]:delay-[1400ms]",
      )}
    >
      <CheckIcon className="size-[max(0.75rem,2.8cqw)]" strokeWidth={2.5} />
      {label}
    </span>
  );
}

export function ProposalMock({ t }: { t: ProposalCopy }) {
  return (
    <div className="@container">
      <Panel variant="solid" shadow="float" className="relative">
        <ApprovedStamp label={t.approved} />

        <div className="p-[6cqw]">
          {/* Header */}
          <div className="flex items-center gap-[2.6cqw] pr-[30cqw]">
            <LogoMark className="size-[max(1.5rem,6.2cqw)] shrink-0" />
            <div className="min-w-0">
              <p className="text-[max(0.9375rem,3.7cqw)] font-semibold leading-none tracking-[-0.02em]">
                {t.title}
              </p>
              <p className="mt-[1.4cqw] truncate font-mono text-[max(0.625rem,1.95cqw)] text-ink-500">
                {t.subtitle}
                {/* the stamp keeps its rem floor in a narrow document, so
                    the suffix only appears once the document is wide enough */}
                <span className="hidden @sm:inline"> · {t.subtitleSuffix}</span>
              </p>
            </div>
          </div>

          {/* Line items */}
          <ul className="mt-[5.5cqw] border-t border-ink-950/8">
            {t.items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-[2.6cqw] border-b border-ink-950/6 py-[3cqw]"
              >
                <span className="flex size-[max(1rem,4.2cqw)] shrink-0 items-center justify-center rounded-full bg-ink-950 text-white">
                  <CheckIcon className="size-[62%]" strokeWidth={2.25} />
                </span>
                <span className="w-[23cqw] shrink-0 text-[max(0.75rem,2.5cqw)] font-medium text-ink-900">
                  {item.label}
                </span>
                <span aria-hidden className="h-px min-w-[2cqw] flex-1 border-t border-dotted border-ink-300/80" />
                <span className="max-w-[56%] text-right text-[max(0.75rem,2.4cqw)] leading-snug text-ink-600">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Total — the whole point: no number, an agreement */}
          <div className="mt-[3.5cqw] flex items-center justify-between gap-[3cqw] rounded-[2cqw] bg-ink-50 px-[3.5cqw] py-[3cqw]">
            <span className="text-[max(0.8125rem,2.7cqw)] font-semibold">{t.total}</span>
            <span className="text-right text-[max(0.75rem,2.45cqw)] leading-snug">
              <span className="font-semibold text-ink-950">{t.totalValue}</span>
              <span className="text-ink-500"> · {t.totalNote}</span>
            </span>
          </div>

          {/* Footer — the signature sits right; the lower-left is left clear
              so the scope-call notes can overlap the corner without hiding text */}
          <div className="mt-[4.5cqw] flex justify-end">
            <div className="w-[34%]">
              <Signature />
              <p className="mt-[0.8cqw] border-t border-ink-950/15 pt-[1.2cqw] font-mono text-[max(0.5625rem,1.7cqw)] uppercase tracking-[0.14em] text-ink-500">
                {t.acceptedBy}
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
