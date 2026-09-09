"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sets --px / --py (−1..1) on the stage as the pointer moves over the
 * nearest <section>. Children use <ParallaxLayer depth> to move by a few
 * pixels. Disabled for touch devices and reduced motion.
 */
export function ParallaxStage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }
    const area = (el.closest("section") ?? el) as HTMLElement;
    let raf = 0;
    let x = 0;
    let y = 0;
    const flush = () => {
      raf = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--px": 0, "--py": 0 } as CSSProperties}>
      {children}
    </div>
  );
}

/** Moves with the pointer. `depth` is the max offset in px. */
export function ParallaxLayer({
  depth = 8,
  className,
  children,
}: {
  depth?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-transform duration-700 ease-out-quart will-change-transform [transform:translate3d(calc(var(--px,0)*var(--depth)),calc(var(--py,0)*var(--depth)),0)]",
        className,
      )}
      style={{ "--depth": `${depth}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
