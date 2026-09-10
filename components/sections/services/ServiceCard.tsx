import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  /** Two-digit index shown as mono metadata, e.g. "01". */
  index: string;
  title: string;
  description: string;
  /** Short mono tags, rendered as a dotted list. */
  tags: readonly string[];
  /** Decorative interface mock rendered in the stage. Must be aria-hidden. */
  mock: ReactNode;
  /** Position of the mock inside the stage (`inset-x-*`, `top-*`). */
  mockClassName: string;
  className?: string;
};

/**
 * Bento card: a fixed-ratio "stage" holding an illustrative interface,
 * then the service copy. The `group` class lets each mock react to hover.
 */
export function ServiceCard({
  index,
  title,
  description,
  tags,
  mock,
  mockClassName,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line shadow-card transition-[transform,translate,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      {/* Stage */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-paper-2 xs:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid mask-fade-radial opacity-70 [background-size:32px_32px]"
        />
        <div aria-hidden="true" className={cn("absolute", mockClassName)}>
          {mock}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-display-sm">{title}</h3>
          <span aria-hidden className="font-mono text-2xs font-medium tracking-[0.12em] text-muted tabular-nums">
            {index}
          </span>
        </div>
        <p className="mb-6 mt-2 max-w-[44ch] text-md leading-relaxed text-muted">{description}</p>
        {/*
          Dotted tag list. Each item carries its own leading separator, and the
          list is shifted left by exactly one separator (10px + 3px + 10px) inside a
          clipping wrapper, so wrapped lines never start or end with a dangling dot.
        */}
        <div className="mt-auto overflow-hidden border-t border-line pt-4">
          <ul className="-ml-[23px] flex flex-wrap gap-y-1.5 font-mono text-xs text-muted">
            {tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center before:mx-2.5 before:inline-block before:size-[3px] before:rounded-full before:bg-line-strong before:content-['']"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
