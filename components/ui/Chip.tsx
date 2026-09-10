import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ChipProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "neutral" | "accent" | "ok" | "warn";
  /** Monospace uppercase label style (default) or regular sentence case. */
  mono?: boolean;
};

/** Small label used for tags, statuses and metadata. */
export function Chip({ tone = "neutral", mono = true, className, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ring-inset",
        mono ? "font-mono text-2xs font-medium uppercase tracking-[0.08em]" : "text-xs font-medium",
        tone === "neutral" && "bg-surface-2 text-muted ring-line",
        tone === "accent" && "bg-brand-soft text-accent-700 ring-accent-200 dark:text-accent-300 dark:ring-accent-400/30",
        tone === "ok" && "bg-ok-soft text-ok-ink ring-ok-ring/60",
        tone === "warn" && "bg-warn-soft text-warn-ink ring-warn-ring/60",
        className,
      )}
      {...rest}
    />
  );
}
