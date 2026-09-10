"use client";

import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import type { Dictionary } from "@/content/i18n/types";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { useInView, usePrefersReducedMotion } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   The model, drawn: a typical agency is a chain of handovers between
   you and your website; Nicholas Technologies is one solid line
   between you and the person building it. Horizontal from `lg`,
   two side-by-side vertical columns below that.
   ------------------------------------------------------------------ */

/* Milestones sit at 12.5 / 37.5 / 62.5 / 87.5% of the line. Delays match
   the moment the drawn line (1.6s, in-out easing) reaches each one. */
const milestoneDelays = [480, 700, 900, 1120] as const;

function RowLabel({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "muted" | "accent";
  children: ReactNode;
}) {
  return (
    <p
      id={id}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-2xs font-medium uppercase tracking-[0.14em] sm:text-xs",
        tone === "accent" ? "text-fg" : "text-muted",
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", tone === "accent" ? "bg-accent-400" : "bg-line-strong")}
      />
      {children}
    </p>
  );
}

/** Dashed connector with an arrowhead. Vertical below `lg`, horizontal from `lg`. */
function Hop() {
  return (
    <span
      aria-hidden
      className="relative min-h-6 w-0 flex-1 border-l border-dashed border-line-strong xs:min-h-7 lg:h-0 lg:min-h-0 lg:w-auto lg:min-w-4 lg:border-l-0 lg:border-t"
    >
      <span className="absolute bottom-0 left-0 size-1.5 -translate-x-1/2 translate-y-px rotate-45 border-b border-r border-line-strong lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:-translate-y-1/2 lg:translate-x-px lg:-rotate-45" />
    </span>
  );
}

function AgencyStep({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted ring-1 ring-inset ring-line sm:text-[0.8125rem] lg:px-3.5 lg:text-sm">
      {children}
    </span>
  );
}

export function StudioDiagram({ t }: { t: Dictionary["studio"]["diagram"] }) {
  const agencyChain = t.chain;
  const milestones = t.stages.map((label, i) => ({ label, delay: milestoneDelays[i] }));
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.25 });
  const reduced = usePrefersReducedMotion();
  const drawn = inView || reduced;
  const agencyId = useId();
  const studioId = useId();

  return (
    <figure
      ref={ref}
      className="relative isolate overflow-hidden rounded-3xl bg-surface p-5 ring-1 ring-line before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-1">
        {/* A typical agency — faded, secondary */}
        <div className="flex flex-col border-r border-line pr-4 sm:pr-8 lg:border-r-0 lg:pr-0">
          <RowLabel id={agencyId} tone="muted">
            {t.agencyLabel}
          </RowLabel>
          <ol
            aria-labelledby={agencyId}
            className="mt-5 flex flex-1 flex-col items-center lg:mt-6 lg:flex-row lg:items-center"
          >
            {agencyChain.map((step, i) => (
              <li
                key={step}
                className={cn("flex flex-col items-center lg:flex-row", i > 0 && "flex-1")}
              >
                {i > 0 ? <Hop /> : null}
                <AgencyStep>{step}</AgencyStep>
              </li>
            ))}
          </ol>
        </div>

        {/* Nicholas Technologies — one solid line */}
        <div
          className="relative flex flex-col pl-4 sm:pl-8 lg:mt-10 lg:border-t lg:border-line lg:pl-0 lg:pt-10"
          style={{ "--p": drawn ? 1 : 0 } as CSSProperties}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-10%] inset-y-[8%] -z-10 glow-accent opacity-40 lg:inset-x-[8%] lg:-inset-y-8"
          />
          <RowLabel id={studioId} tone="accent">
            {site.name}
          </RowLabel>

          <div
            role="group"
            aria-labelledby={studioId}
            className="mt-5 flex flex-1 flex-col items-center lg:mt-6 lg:flex-row lg:items-center"
          >
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-fg px-3.5 py-1.5 text-xs font-semibold text-bg sm:text-[0.8125rem] lg:px-4 lg:py-2 lg:text-sm">
              {t.you}
            </span>

            {/* The line */}
            <div className="relative min-h-[12rem] flex-1 self-stretch lg:h-16 lg:min-h-0 lg:self-center">
              {/* guide */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-1/2 lg:h-px lg:w-auto lg:-translate-y-1/2 lg:translate-x-0"
              />
              {/* drawn accent line: --p goes 0 → 1 when the figure scrolls into view */}
              <span
                aria-hidden
                className="absolute left-1/2 top-0 h-[calc(var(--p)*100%)] w-px -translate-x-1/2 bg-accent-400 shadow-[0_0_14px_1px_rgb(91_130_255/0.55)] transition-[height,width] duration-[1600ms] ease-in-out-soft [:root:not(.js)_&]:[--p:1] lg:left-0 lg:top-1/2 lg:h-px lg:w-[calc(var(--p)*100%)] lg:-translate-y-1/2 lg:translate-x-0"
              >
                {/* a slow light pulse travelling along the line (desktop, motion-safe) */}
                <span className="absolute inset-0 hidden overflow-hidden lg:block">
                  <span className="absolute inset-y-[-1px] left-0 w-full animate-shimmer motion-safe-only bg-[linear-gradient(90deg,transparent_44%,rgb(255_255_255/0.6)_50%,transparent_56%)] [animation-delay:1.6s] [animation-duration:4.8s]" />
                </span>
                <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-300 opacity-(--p) shadow-[0_0_12px_2px_rgb(91_130_255/0.7)] transition-opacity duration-300 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2" />
              </span>

              {/* milestones along the line */}
              <ul
                aria-label={t.stagesLabel}
                className="absolute inset-y-0 left-1/2 flex flex-col justify-around lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-1/2 lg:flex-row lg:justify-around"
              >
                {milestones.map((m) => (
                  <li
                    key={m.label}
                    className="flex -translate-x-1 items-center gap-1.5 xs:gap-2.5 lg:flex-col lg:gap-2 lg:-translate-y-1 lg:translate-x-0"
                    style={{ "--d": drawn ? `${m.delay}ms` : "0ms" } as CSSProperties}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-2 rounded-full ring-1 ring-inset transition-[background-color,box-shadow] duration-500 ease-out-quart [transition-delay:var(--d)]",
                        drawn
                          ? "bg-accent-400 ring-accent-400 shadow-[0_0_10px_rgb(91_130_255/0.7)]"
                          : "bg-bg ring-line-strong",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-2xs font-medium uppercase tracking-[0.06em] xs:tracking-[0.12em] transition-colors duration-500 [transition-delay:var(--d)]",
                        drawn ? "text-fg" : "text-muted",
                      )}
                    >
                      {m.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <span className="flex max-w-[10rem] flex-col items-center gap-2 rounded-2xl bg-surface-2 px-3 py-3 text-center text-xs font-medium text-fg ring-1 ring-inset ring-accent-400/40 sm:text-[0.8125rem] lg:max-w-none lg:flex-row lg:gap-2.5 lg:whitespace-nowrap lg:rounded-full lg:py-1.5 lg:pl-1.5 lg:pr-4 lg:text-left lg:text-sm">
              <LogoMark className="size-6 shrink-0" />
              {t.person}
            </span>
          </div>
        </div>
      </div>

      <figcaption className="mt-8 border-t border-line pt-5 text-sm text-muted">
        {t.captionA} <span className="text-fg">{t.captionB}</span>.
      </figcaption>
    </figure>
  );
}
