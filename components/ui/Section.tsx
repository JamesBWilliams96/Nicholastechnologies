import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type Tone = "light" | "dark" | "paper";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  /** Removes the default vertical padding. */
  flush?: boolean;
};

/**
 * Page section with consistent vertical rhythm and a tone.
 * `tone="dark"` flips every tone-aware colour utility inside it.
 */
export function Section({ tone = "light", flush = false, className, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        "relative scroll-mt-16",
        tone === "dark" && "tone-dark bg-bg text-fg",
        tone === "paper" && "bg-paper-2",
        !flush && "py-20 sm:py-24 lg:py-32",
        className,
      )}
      {...rest}
    />
  );
}
