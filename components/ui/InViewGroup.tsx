"use client";

import { useRef, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/use-in-view";

/**
 * Marks its wrapper with `data-inview` once it scrolls into the viewport so
 * descendants can start a CSS entrance (drawn lines, stamps, bars filling in)
 * using `[.js_[data-inview]_&]:` variants. Under reduced motion the attribute
 * is set straight away, so nothing waits on an animation.
 */
export function InViewGroup({
  className,
  threshold = 0.2,
  children,
}: {
  className?: string;
  /** How much of the element must be visible before it counts as in view. */
  threshold?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold, rootMargin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={className} data-inview={inView || reduced ? "" : undefined}>
      {children}
    </div>
  );
}
