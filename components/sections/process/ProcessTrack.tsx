"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useInView } from "@/lib/use-in-view";

/**
 * The ordered list that holds the five steps. Once it scrolls into view it
 * gains `data-inview`, and the steps inside draw their connecting line and
 * light their nodes in sequence. Their resting states are written as
 * `motion-ok:[.js_[data-track]:not([data-inview])_&]:` variants, so the
 * finished state is the default without JavaScript and, under reduced
 * motion, the only state — no sequencing runs at all.
 */
export function ProcessTrack(props: Omit<ComponentPropsWithoutRef<"ol">, "ref">) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

  return <ol ref={ref} data-track="" data-inview={inView ? "" : undefined} {...props} />;
}
