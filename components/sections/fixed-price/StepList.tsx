import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export type Step = {
  index: string;
  title: string;
  text: string;
  /** Picks the step out in the accent. Use for one step at most. */
  highlight?: boolean;
};

/**
 * Compact vertical list of steps: a mono number in a badge and a thin rule
 * joining the badges. One step can be highlighted in the accent.
 */
export function StepList({ steps, className }: { steps: readonly Step[]; className?: string }) {
  return (
    <ol className={cn("relative", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <Reveal
            as="li"
            key={step.index}
            delay={200 + i * 70}
            className={cn(
              "relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4",
              !last && "pb-7 after:absolute after:bottom-1.5 after:left-4 after:top-[2.375rem] after:w-px after:bg-line",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "relative z-10 flex size-8 items-center justify-center rounded-full font-mono text-2xs font-medium tabular-nums ring-1",
                step.highlight
                  ? "bg-accent-500 text-white ring-accent-500 shadow-[0_0_0_4px_var(--brand-soft)]"
                  : "bg-surface text-muted ring-line",
              )}
            >
              {step.index}
            </span>
            <div className="pt-[0.3125rem]">
              <h3 className="text-[0.9375rem] font-semibold leading-[1.375rem] tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
