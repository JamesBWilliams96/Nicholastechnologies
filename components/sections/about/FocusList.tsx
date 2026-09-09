import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type FocusItem = {
  /** Two-digit index shown as mono metadata, e.g. "01". */
  index: string;
  title: string;
  text: string;
};

type FocusListProps = {
  items: readonly FocusItem[];
  /** Mono label announced as the list's name. */
  label: string;
  /** Reveal delay of the first row; rows stagger from here. */
  baseDelay?: number;
  className?: string;
};

/** Rendered once per page, so a fixed id is enough to name the list. */
const labelId = "about-focus-label";

/**
 * What the work is focused on: an editorial table of five rows,
 * number · title · one human line, separated by hairlines. Stacks the
 * line under its title on phones.
 */
export function FocusList({ items, label, baseDelay = 200, className }: FocusListProps) {
  return (
    <div className={className}>
      <Reveal delay={baseDelay - 60}>
        <p
          id={labelId}
          className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted"
        >
          {label}
        </p>
      </Reveal>
      <ol aria-labelledby={labelId} className="mt-4 border-t border-line">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.index}
            delay={baseDelay + i * 70}
            className={cn(
              "grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-b border-line py-4",
              "sm:grid-cols-[2.5rem_12rem_minmax(0,1fr)] sm:gap-x-4 sm:py-[1.125rem]",
            )}
          >
            <span aria-hidden className="font-mono text-xs leading-6 text-muted tabular-nums">
              {item.index}
            </span>
            <h3 className="text-[0.9375rem] font-semibold leading-6 tracking-[-0.01em] text-fg">
              {item.title}
            </h3>
            <p className="col-start-2 mt-1 text-[0.9375rem] leading-6 text-muted sm:col-start-3 sm:mt-0">
              {item.text}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
