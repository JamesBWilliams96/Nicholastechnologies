import type { Dictionary } from "@/content/i18n/types";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { playWhenInView } from "@/components/ui/in-view";
import { DarkChip } from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   A support request that has just been resolved, with a one-line
   reply from the person who built the site. Sits in a glass Panel
   over the status window. Sized in rem: it is a small card.
   ------------------------------------------------------------------ */

export function TicketMock({ t }: { t: Dictionary["support"]["ticket"] }) {
  return (
    <div className="p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-ink-300">
          {t.label}
        </span>
        <span className="font-mono text-[0.625rem] text-ink-300 tabular-nums">{t.ago}</span>
      </div>

      <p className="mt-2 text-[0.8125rem] font-semibold leading-snug tracking-[-0.01em] text-paper sm:text-sm">
        {t.title}
      </p>

      {/* Open → Resolved */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[0.625rem]">
        <DarkChip
          tone="neutral"
          className={cn(
            "leading-none transition-opacity duration-500 ease-out-quart",
            "[.js_[data-inview]_&]:opacity-50 [.js_[data-inview]_&]:delay-[1100ms]",
          )}
        >
          {t.open}
        </DarkChip>
        <ArrowRightIcon className="size-3 shrink-0 text-ink-300" />
        <span
          className={cn("inline-flex animate-fade-up", playWhenInView)}
          style={{ animationDelay: "1100ms" }}
        >
          <DarkChip tone="ok" className="leading-none">
            <CheckIcon className="-ml-0.5 size-[1.1em]" />
            {t.resolved}
          </DarkChip>
        </span>
      </div>

      <div className="my-3 h-px bg-white/8" />

      {/* Reply from the person who built it */}
      <div
        className={cn("flex items-start gap-2.5 animate-fade-up", playWhenInView)}
        style={{ animationDelay: "1500ms" }}
      >
        <span className="mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-[0.45rem] bg-paper text-[0.7rem] font-semibold text-ink-950">
          N
        </span>
        <p className="text-xs leading-relaxed text-ink-100">
          {t.reply}
        </p>
      </div>
    </div>
  );
}
