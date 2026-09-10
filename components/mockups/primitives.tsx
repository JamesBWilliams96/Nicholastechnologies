import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Tiny building blocks for believable interface mockups.
   All decorative — parents should be aria-hidden.
   ------------------------------------------------------------------ */

/** A text placeholder line. Size it with `width`/`height` (any CSS length). */
export function Skeleton({
  width = "100%",
  height = "0.375rem",
  className,
  tone = "light",
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  width?: string;
  height?: string;
  /** `none` leaves the colour to `className`. */
  tone?: "light" | "dark" | "none";
}) {
  return (
    <div
      className={cn(
        "rounded-full",
        tone === "light" && "bg-ink-100",
        tone === "dark" && "bg-white/12",
        className,
      )}
      style={{ width, height }}
      {...rest}
    />
  );
}

/** A block placeholder for an image. Gradient, never a photo. Size and radius come from `className`. */
export function ImageBlock({
  className,
  variant = "warm",
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { variant?: "warm" | "cool" | "mono" | "accent" }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "warm" && "bg-[linear-gradient(135deg,#efe9df_0%,#dcd3c4_55%,#c8bfae_100%)]",
        variant === "cool" && "bg-[linear-gradient(135deg,#e2ebff_0%,#c9d8ff_50%,#aabcf5_100%)]",
        variant === "mono" && "bg-[linear-gradient(135deg,#e6e8ed_0%,#cdd1da_60%,#b4b9c5_100%)]",
        variant === "accent" && "bg-[linear-gradient(135deg,var(--color-accent-500)_0%,var(--color-accent-400)_55%,var(--color-glow-violet)_100%)]",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_55%)]"
      />
      {children}
    </div>
  );
}

/** Button-looking element inside a mock. Never interactive. Sized in em; use `style` for an exact size. */
export function MockButton({
  tone = "dark",
  className,
  style,
  children,
}: {
  tone?: "dark" | "light" | "accent" | "ghost" | "ghost-dark";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex h-[2.6em] items-center justify-center whitespace-nowrap rounded-full px-[1.2em] font-medium leading-none",
        tone === "dark" && "bg-ink-950 text-white",
        tone === "light" && "bg-white text-ink-950 ring-1 ring-ink-950/10",
        tone === "accent" && "bg-accent-500 text-white",
        tone === "ghost" && "text-ink-950 underline underline-offset-2",
        tone === "ghost-dark" && "bg-white/6 text-ink-300 ring-1 ring-white/10",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill inside a mock. Padded in em; the row (or a `text-*`/`leading-*` in className) sets the type. */
export function MockChip({
  tone = "neutral",
  className,
  children,
}: {
  tone?: "neutral" | "ok" | "warn" | "accent" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-[0.7em] py-[0.3em] font-medium",
        tone === "neutral" && "bg-ink-50 text-ink-500",
        tone === "ok" && "bg-ok-soft text-ok-ink",
        tone === "warn" && "bg-warn-soft text-warn-ink",
        tone === "accent" && "bg-accent-50 text-accent-700",
        tone === "dark" && "bg-ink-950 text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Status pill for dark app windows (ink-900). MockChip is designed for
 * light-on-white interfaces; these tones keep contrast high on dark ground.
 * Sized in em so it follows the text size of its row; the row (or a
 * `text-*`/`leading-*` in className) sets the type.
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
        "inline-flex items-center gap-[0.55em] whitespace-nowrap rounded-full px-[0.8em] py-[0.38em] font-medium ring-1 ring-inset",
        tone === "neutral" && "bg-white/6 text-ink-200 ring-white/12",
        tone === "ok" && "bg-ok/14 text-ok-bright ring-ok/35",
        tone === "warn" && "bg-warn/14 text-warn-bright ring-warn/35",
        tone === "accent" && "bg-accent-500/16 text-accent-300 ring-accent-400/35",
        className,
      )}
    >
      {dot ? <span className="size-[0.5em] rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

/** Abstract avatar (initials on a soft gradient). `size` is any CSS length; the initials scale with it. */
export function MockAvatar({
  initials = "",
  size = "1.5rem",
  className,
  hue = 0,
}: {
  initials?: string;
  size?: string;
  className?: string;
  /** Any number; picks a stable pastel. */
  hue?: number;
}) {
  const palettes = [
    "from-accent-200 to-accent-400 text-accent-800",
    "from-[#fbd5b5] to-[#f3a56b] text-[#7c3e0a]",
    "from-[#c9f0d8] to-[#7cd4a1] text-[#14532d]",
    "from-[#e4d6ff] to-[#b79cff] text-[#3b1d8f]",
    "from-ink-100 to-ink-300 text-ink-700",
  ];
  const p = palettes[Math.abs(hue) % palettes.length];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold",
        p,
        className,
      )}
      style={{ width: size, height: size, fontSize: `calc(${size} * 0.4375)` }}
    >
      {initials}
    </span>
  );
}

/** Animated bar chart (grows in when visible; uses CSS keyframes only). Height and gap come from `className`. */
export function Bars({
  values,
  className,
  barClassName,
  accentIndex,
  animate = true,
}: {
  /** Values 0..1 */
  values: number[];
  className?: string;
  barClassName?: string;
  /** Index of a bar to highlight with the accent colour. */
  accentIndex?: number;
  animate?: boolean;
}) {
  return (
    <div className={cn("flex items-end", className)} aria-hidden>
      {values.map((v, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 origin-bottom rounded-[3px]",
            i === accentIndex ? "bg-accent-500" : "bg-ink-200",
            animate && "animate-grow-bar motion-safe-only",
            barClassName,
          )}
          style={
            {
              height: `${Math.round(v * 100)}%`,
              animationDelay: `${i * 60}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Smooth sparkline path from values 0..1. Height comes from `className`. */
export function Sparkline({
  values,
  className,
  stroke = "currentColor",
}: {
  values: number[];
  className?: string;
  stroke?: string;
}) {
  const w = 100;
  const h = 40;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - v * (h - 4) - 2] as const);
  const d = pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C${cx},${py} ${cx},${y} ${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("w-full", className)} aria-hidden>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={stroke} opacity="0.08" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Simple horizontal rule for mocks. */
export function MockDivider({ className, dark }: { className?: string; dark?: boolean }) {
  return <div className={cn("h-px w-full", dark ? "bg-white/8" : "bg-ink-950/6", className)} />;
}
