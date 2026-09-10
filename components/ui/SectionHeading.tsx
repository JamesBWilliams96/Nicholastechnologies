import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ className, children, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent-500" />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Extra content rendered under the description (e.g. a button). */
  children?: ReactNode;
};

/** Eyebrow + headline + supporting copy, animated in as a group. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "lg",
  as: Tag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={60} className={cn(eyebrow && "mt-5")}>
        <Tag className={cn(size === "lg" ? "text-display-lg" : "text-display-md", "max-w-[18ch]")}>
          {title}
        </Tag>
      </Reveal>
      {description ? (
        <Reveal delay={120}>
          <p className="mt-5 max-w-[46ch] text-lead text-muted">{description}</p>
        </Reveal>
      ) : null}
      {children ? (
        <Reveal delay={180} className="mt-7">
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}
