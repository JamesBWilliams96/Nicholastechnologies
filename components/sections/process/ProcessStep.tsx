import type { ComponentType, CSSProperties, SVGProps } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type ProcessStepData = {
  index: string;
  title: string;
  text: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Marks the step as optional: dashed node and a dashed connector into it. */
  optional?: boolean;
};

/* ------------------------------------------------------------------
   Timing. Each node lights STEP_MS after the previous one; the segment
   between them draws in the gap. Five steps take ≈ 2.1s, then a short
   dashed tail runs on past the last node and fades out.
   ------------------------------------------------------------------ */
const STEP_MS = 520;
const SEGMENT_MS = 400;

/* Resting states use `motion-ok:[.js_[data-track]:not([data-inview])_&]:`:
   they apply only while JS runs, motion is allowed and the track hasn't
   scrolled into view. Written out in full so Tailwind's scanner sees them.
   The `--node` (node diameter) and `--gap` (grid column gap) variables are
   set by the track in Process.tsx. */

type SegmentProps = {
  orientation: "horizontal" | "vertical";
  dashed: boolean;
  delay: number;
  /** A short run past the final node that fades out instead of reaching another node. */
  tail?: boolean;
};

/**
 * One connector on the line: a hairline base track plus the accent line
 * that draws over it (a clip-path wipe, so dashes never stretch).
 * Horizontal from `lg`, vertical below. The line runs behind the nodes.
 */
function Segment({ orientation, dashed, delay, tail = false }: SegmentProps) {
  const horizontal = orientation === "horizontal";
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute",
        horizontal
          ? "top-[calc(var(--node)/2-1px)] left-[calc(var(--node)/2)] hidden h-0.5 lg:block"
          : "left-[calc(var(--node)/2-1px)] top-[calc(var(--node)/2)] w-0.5 lg:hidden",
        horizontal &&
          (tail
            ? "right-0 [mask-image:linear-gradient(to_right,black_10%,transparent)]"
            : "right-[calc(var(--gap)*-1)]"),
        !horizontal && (tail ? "h-16 [mask-image:linear-gradient(to_bottom,black_10%,transparent)]" : "bottom-0"),
      )}
    >
      {/* base track */}
      <span
        className={cn(
          "absolute",
          horizontal ? "inset-x-0 top-0 h-px" : "inset-y-0 left-0 w-px",
          !dashed && "bg-line-strong",
          dashed &&
            (horizontal
              ? "bg-[repeating-linear-gradient(90deg,var(--line-strong)_0_5px,transparent_5px_10px)]"
              : "bg-[repeating-linear-gradient(180deg,var(--line-strong)_0_5px,transparent_5px_10px)]"),
        )}
      />
      {/* drawn line */}
      <span
        className={cn(
          "absolute inset-0 transition-[clip-path] ease-linear [clip-path:inset(0)]",
          horizontal
            ? "motion-ok:[.js_[data-track]:not([data-inview])_&]:[clip-path:inset(0_100%_0_0)]"
            : "motion-ok:[.js_[data-track]:not([data-inview])_&]:[clip-path:inset(0_0_100%_0)]",
          !dashed && "bg-accent-500",
          dashed &&
            (horizontal
              ? "bg-[repeating-linear-gradient(90deg,var(--color-accent-500)_0_5px,transparent_5px_10px)]"
              : "bg-[repeating-linear-gradient(180deg,var(--color-accent-500)_0_5px,transparent_5px_10px)]"),
        )}
        style={{ transitionDelay: `${delay}ms`, transitionDuration: `${SEGMENT_MS}ms` }}
      />
    </span>
  );
}

type ProcessStepProps = {
  step: ProcessStepData;
  position: number;
  total: number;
};

/**
 * One step: a node on the line (icon in a circle), the mono index, the
 * title and the copy. Below `lg` the node sits left of the content with a
 * vertical connector; from `lg` each step is a column and the connector
 * runs horizontally through the nodes.
 */
export function ProcessStep({ step, position, total }: ProcessStepProps) {
  const Icon = step.icon;
  const last = position === total - 1;
  const nextIsOptional = position === total - 2;
  const nodeDelay = position * STEP_MS;
  const segmentDelay = nodeDelay + 120;
  const delayStyle: CSSProperties = { transitionDelay: `${nodeDelay}ms` };

  return (
    <Reveal
      as="li"
      delay={position * 80}
      className={cn(
        "relative grid grid-cols-[var(--node)_minmax(0,1fr)] gap-x-5 lg:block",
        !last && "pb-10 lg:pb-0",
      )}
    >
      <Segment orientation="horizontal" dashed={nextIsOptional || last} delay={segmentDelay} tail={last} />
      <Segment orientation="vertical" dashed={nextIsOptional || last} delay={segmentDelay} tail={last} />

      {/* Node. The outer disc carries a halo in the section background, so
          the line stops just short of the circle rather than running into it. */}
      <span aria-hidden className="relative z-10 block size-(--node) rounded-full bg-bg shadow-[0_0_0_4px_var(--bg)]">
        <span
          className={cn(
            "flex size-full items-center justify-center rounded-full border transition-[background-color,color,border-color,scale] duration-500 ease-out-quart",
            "motion-ok:[.js_[data-track]:not([data-inview])_&]:scale-90 motion-ok:[.js_[data-track]:not([data-inview])_&]:border-line-strong motion-ok:[.js_[data-track]:not([data-inview])_&]:bg-surface motion-ok:[.js_[data-track]:not([data-inview])_&]:text-subtle",
            step.optional ? "border-dashed border-fg bg-surface text-fg" : "border-fg bg-fg text-bg",
          )}
          style={delayStyle}
        >
          <Icon className="size-[1.125rem] lg:size-5" />
        </span>
      </span>

      {/* Content */}
      <div className="min-w-0 pt-2 lg:mt-7 lg:pt-0 lg:pr-3">
        <div className="flex items-center gap-x-2.5">
          <span
            aria-hidden
            className="font-mono text-2xs font-medium tabular-nums tracking-[0.1em] text-accent-600 transition-colors duration-500 motion-ok:[.js_[data-track]:not([data-inview])_&]:text-muted"
            style={delayStyle}
          >
            {step.index}
          </span>
          <h3 className="text-[1.0625rem] font-semibold leading-6 tracking-[-0.01em]">{step.title}</h3>
        </div>
        <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted xl:text-[0.9375rem]">{step.text}</p>
      </div>
    </Reveal>
  );
}
