"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal for the form card. Same CSS contract as <Reveal>
 * (`data-reveal` + `.is-visible` in globals.css, reduced motion handled
 * there), but it fires as soon as the first pixel of the card enters the
 * viewport. The card is taller than a phone screen, so waiting for a share
 * of its height to be visible would leave a long stretch of nothing.
 */
export function CardReveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0, rootMargin: "0px" });

  return (
    <div
      ref={ref}
      data-reveal="scale"
      className={cn(inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
