"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "li"
  | "ul"
  | "ol"
  | "span"
  | "p"
  | "figure"
  | "header"
  | "footer";

export type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  /** Delay in ms before the element animates in. */
  delay?: number;
  /** Direction/style of the reveal. */
  variant?: "up" | "scale" | "left" | "none";
  /** Animate every time the element enters the viewport. */
  repeat?: boolean;
  /**
   * Play the entrance immediately with CSS keyframes instead of waiting for
   * hydration + IntersectionObserver. Use for above-the-fold content so the
   * largest contentful paint isn't delayed by JavaScript.
   */
  eager?: boolean;
  children?: ReactNode;
};

/**
 * Fades and lifts children into view when they scroll into the viewport.
 * Pure CSS transitions driven by a single IntersectionObserver per element;
 * respects prefers-reduced-motion (see globals.css).
 */
export function Reveal({
  as = "div",
  delay = 0,
  variant = "up",
  repeat = false,
  eager = false,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (eager || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            if (!repeat) io.disconnect();
          } else if (repeat) {
            el.classList.remove("is-visible");
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeat, eager]);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-eager={eager ? "" : undefined}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
