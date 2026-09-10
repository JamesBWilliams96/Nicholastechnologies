import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type WordmarkProps = ComponentPropsWithoutRef<"span"> & {
  /** Recommended: accent ring and dot. */
  active?: boolean;
  /** Not recommended right now: faded back. */
  dim?: boolean;
};

/**
 * A tool name drawn as a refined mono badge. Text only, never a trademarked
 * logo. Everything is sized in `em`, so `text-*` on the badge scales the whole
 * thing (rem in copy, container-query units inside the diagram).
 */
export function Wordmark({ active = false, dim = false, className, children, ...rest }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.55em] whitespace-nowrap rounded-full bg-surface px-[0.95em] py-[0.55em] font-mono font-semibold tracking-[-0.01em] ring-1 ring-inset transition-[color,opacity,box-shadow,scale] duration-500 ease-out-quart",
        active ? "ring-accent-500 shadow-[0_0_0_4px_var(--brand-soft)]" : "ring-line-strong",
        dim ? "text-muted opacity-55" : "text-fg",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className={cn(
          "size-[0.42em] shrink-0 rounded-full transition-colors duration-500",
          active ? "bg-accent-500" : "bg-line-strong",
        )}
      />
      {children}
    </span>
  );
}
