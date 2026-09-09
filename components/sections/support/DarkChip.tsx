import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Status pill for the dark app window. The shared MockChip is designed for
 * light-on-white interfaces; these tones keep contrast high on ink-900.
 * Sized in em so it follows the text size of its row.
 */
export function DarkChip({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: "neutral" | "ok" | "warn" | "accent";
  /** Leading status dot in the chip's own colour. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.55em] whitespace-nowrap rounded-full px-[0.8em] py-[0.38em] text-[1em] font-medium leading-none ring-1 ring-inset",
        tone === "neutral" && "bg-white/6 text-ink-200 ring-white/12",
        tone === "ok" && "bg-ok/14 text-[#4ade80] ring-ok/35",
        tone === "warn" && "bg-warn/14 text-[#fbbf24] ring-warn/35",
        tone === "accent" && "bg-accent-500/16 text-accent-300 ring-accent-400/35",
        className,
      )}
    >
      {dot ? <span className="size-[0.5em] rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
