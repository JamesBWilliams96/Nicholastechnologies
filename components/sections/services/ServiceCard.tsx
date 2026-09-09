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
  /** Extra classes for the mock wrapper (position inside the stage). */
  mockClassName?: string;
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
        <div aria-hidden="true" className={cn("absolute inset-x-[8%] top-[10%]", mockClassName)}>
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
        <p className="mb-6 mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">{description}</p>
        <ul className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-line pt-4 font-mono text-xs text-muted">
          {tags.map((tag, i) => (
            <li key={tag} className="inline-flex items-center gap-2.5">
              <span>{tag}</span>
              {i < tags.length - 1 ? (
                <span aria-hidden className="size-[3px] rounded-full bg-line-strong" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
