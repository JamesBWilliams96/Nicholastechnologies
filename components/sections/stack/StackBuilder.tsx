"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { AppWindowIcon, ArrowRightIcon, BagIcon, CodeIcon, GlobeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

/* ------------------------------------------------------------------
   "Build your stack": pick a project type, see which tool(s) I'd reach
   for and why. The diagram is decorative (aria-hidden); the visible
   "Recommended" panel underneath is the accessible output and is an
   aria-live region. The default state renders on the server, so the
   component still says something useful without JavaScript.
   ------------------------------------------------------------------ */

type ToolId = "webflow" | "next" | "shopify" | "react";
type ProjectId = "marketing" | "custom" | "store" | "app";

/* Diagram geometry, in a 400 × 300 viewBox. The four tool nodes sit on an
   orbit (a circle of r=170 squashed to 56.5% height). The same numbers
   drive the SVG lines and, as percentages, the HTML badges on top. */
const W = 400;
const H = 300;
const CX = W / 2;
const CY = H / 2;
const ORBIT_R = 170;
const ORBIT_SQUASH = 0.565;

const tools: readonly { id: ToolId; name: string; x: number; y: number }[] = [
  { id: "webflow", name: "Webflow", x: 70, y: 88 },
  { id: "next", name: "Next.js", x: 330, y: 88 },
  { id: "shopify", name: "Shopify", x: 70, y: 212 },
  { id: "react", name: "React", x: 330, y: 212 },
];

const toolName = (id: ToolId) => tools.find((t) => t.id === id)?.name ?? id;

/* Which tools each project type calls for. Labels and reasons come from the dictionary, in this order. */
const projects: readonly {
  id: ProjectId;
  icon: typeof GlobeIcon;
  tools: readonly ToolId[];
}[] = [
  { id: "marketing", icon: GlobeIcon, tools: ["webflow"] },
  { id: "custom", icon: CodeIcon, tools: ["react", "next"] },
  { id: "store", icon: BagIcon, tools: ["shopify"] },
  { id: "app", icon: AppWindowIcon, tools: ["react", "next"] },
];

type BuilderCopy = Dictionary["stack"]["builder"];

const DEFAULT_PROJECT: ProjectId = "custom";

/** Hovering an option selects it, after a short pause so sweeping the
    cursor across the list doesn't flick through every state. */
const HOVER_INTENT_MS = 120;

/* ---------------------------------- diagram ---------------------------------- */

function Diagram({ selected, yourProject }: { selected: ProjectId; yourProject: string }) {
  const project = projects.find((p) => p.id === selected) ?? projects[1];
  const active = new Set<ToolId>(project.tools);

  return (
    <div
      aria-hidden="true"
      className="@container relative aspect-[5/4] select-none overflow-hidden bg-surface-2/60 sm:aspect-[4/3] lg:aspect-[3/2] lg:flex-auto"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-dots mask-fade-radial opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[64cqw] -translate-x-1/2 -translate-y-1/2 glow-accent opacity-25" />

      {/* lines and orbit */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        fill="none"
      >
        {/* orbit: a dashed circle, squashed into an ellipse, turning slowly */}
        <g transform={`translate(${CX} ${CY}) scale(1 ${ORBIT_SQUASH})`}>
          <g className="animate-orbit motion-safe-only origin-center [animation-duration:72s] [transform-box:fill-box]">
            <circle
              r={ORBIT_R}
              className="stroke-line-strong"
              strokeDasharray="1.5 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* satellite: a zero-length round-capped line stays a perfect dot under the squash */}
            <line
              x1={ORBIT_R}
              y1={0}
              x2={ORBIT_R}
              y2={0}
              strokeWidth={5}
              strokeLinecap="round"
              className="stroke-accent-400"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>

        {/* base connections */}
        {tools.map((t) => (
          <line
            key={t.id}
            x1={CX}
            y1={CY}
            x2={t.x}
            y2={t.y}
            className="stroke-line-strong"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* recommended connections: redrawn (dash animation) whenever the
            selection changes. pathLength normalises every line to 1, so the
            dash maths is independent of the non-uniform scaling above. */}
        {tools
          .filter((t) => active.has(t.id))
          .map((t) => (
            <g
              key={`${selected}-${t.id}`}
              className="animate-dash [animation-duration:0.9s]"
              strokeDasharray={1}
              style={{ "--dash-length": 1 } as CSSProperties}
            >
              <line
                x1={CX}
                y1={CY}
                x2={t.x}
                y2={t.y}
                pathLength={1}
                strokeWidth={7}
                className="stroke-accent-500/15"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={CX}
                y1={CY}
                x2={t.x}
                y2={t.y}
                pathLength={1}
                strokeWidth={1.5}
                strokeLinecap="round"
                className="stroke-accent-500"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
      </svg>

      {/* centre: your project */}
      <div className="absolute left-1/2 top-1/2 size-[max(6.25rem,27cqw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/[0.045]" />
      <div className="absolute left-1/2 top-1/2 flex size-[max(4.75rem,20cqw)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-center text-bg shadow-float">
        <span className="max-w-[80%] text-[max(0.6875rem,2.9cqw)] font-semibold leading-[1.15] tracking-[-0.01em]">
          {yourProject}
        </span>
      </div>

      {/* tool nodes */}
      {tools.map((t) => {
        const on = active.has(t.id);
        return (
          <div
            key={t.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(t.x / W) * 100}%`, top: `${(t.y / H) * 100}%` }}
          >
            <Wordmark
              active={on}
              dim={!on}
              className={cn("text-[max(0.75rem,3cqw)]", on ? "scale-100" : "scale-[0.94]")}
            >
              {t.name}
            </Wordmark>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- builder ---------------------------------- */

export function StackBuilder({
  locale,
  t,
  className,
}: {
  locale: Locale;
  t: BuilderCopy;
  className?: string;
}) {
  const [selected, setSelected] = useState<ProjectId>(DEFAULT_PROJECT);
  const promptId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const select = (id: ProjectId) => {
    window.clearTimeout(hoverTimer.current);
    setSelected(id);
  };

  const onPointerEnter = (e: PointerEvent<HTMLButtonElement>, id: ProjectId) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setSelected(id), HOVER_INTENT_MS);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    const current = buttons.current.findIndex((b) => b === document.activeElement);
    if (current === -1) return;
    e.preventDefault();
    const last = projects.length - 1;
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? last
          : (current + (e.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length;
    select(projects[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-3xl bg-surface ring-1 ring-line shadow-card lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[1fr_auto]",
        className,
      )}
    >
      {/* selector */}
      <div className="p-5 sm:p-8 lg:pb-0 xl:p-10 xl:pb-0">
        <p className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">{t.label}</p>
        <h3 id={promptId} className="mt-2 text-lg font-semibold tracking-[-0.015em]">
          {t.question}
        </h3>

        <div role="group" aria-labelledby={promptId} className="mt-5 flex flex-col gap-1.5" onKeyDown={onKeyDown}>
          {projects.map((p, i) => {
            const on = p.id === selected;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-pressed={on}
                onClick={() => select(p.id)}
                onPointerEnter={(e) => onPointerEnter(e, p.id)}
                onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                className={cn(
                  "group flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-[background-color,color,box-shadow] duration-300 ease-out-quart",
                  on ? "bg-surface-2 text-fg ring-1 ring-inset ring-line" : "text-muted hover:bg-surface-2/60 hover:text-fg",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-[background-color,color,box-shadow] duration-300 ease-out-quart",
                    on
                      ? "bg-accent-500 text-white ring-accent-500 shadow-[0_0_0_3px_var(--brand-soft)]"
                      : "bg-surface text-muted ring-line group-hover:text-fg",
                  )}
                >
                  <p.icon className="size-[1.1rem]" />
                </span>
                <span className="flex-1 text-[0.9375rem] font-medium leading-snug">{t.options[i].label}</span>
                <ArrowRightIcon
                  aria-hidden
                  className={cn(
                    "size-4 shrink-0 text-accent-600 transition-[opacity,translate] duration-300 ease-out-quart dark:text-accent-300",
                    on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* diagram + why */}
      <div className="flex flex-col border-t border-line lg:row-span-2 lg:border-l lg:border-t-0">
        <Diagram selected={selected} yourProject={t.yourProject} />

        <div aria-live="polite" className="grid border-t border-line px-5 py-5 sm:px-8 sm:py-7 xl:px-10">
          {projects.map((p, i) => {
            const on = p.id === selected;
            const copy = t.options[i];
            const extra = "extra" in copy ? copy.extra : undefined;
            return (
              <div
                key={p.id}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,visibility] duration-500 ease-out-quart",
                  on ? "opacity-100" : "invisible opacity-0",
                )}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span className="mr-1 font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
                    {t.recommended}
                  </span>
                  {p.tools.map((id) => (
                    <Wordmark key={id} active className="text-xs">
                      {toolName(id)}
                    </Wordmark>
                  ))}
                  {extra ? <span className="font-mono text-xs text-muted">{extra}</span> : null}
                </div>
                <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-muted">{copy.why}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* footer: last on phones (after the answer), under the selector on desktop */}
      <div className="border-t border-line px-5 py-5 sm:px-8 sm:py-7 lg:border-t-0 lg:pb-8 lg:pt-8 xl:px-10 xl:pb-10">
        <div className="lg:border-t lg:border-line lg:pt-6">
          <p className="max-w-[40ch] text-sm leading-relaxed text-muted">{t.footnote}</p>
          <Button href={localePath(locale, "#contact")} variant="ghost" arrow className="mt-3 text-sm">
            {t.link}
          </Button>
        </div>
      </div>
    </div>
  );
}
