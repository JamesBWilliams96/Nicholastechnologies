import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";
import { InPageLink } from "./InPageLink";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Appends an animated arrow. Use for the main CTAs. */
  arrow?: boolean | "right" | "up-right";
  className?: string;
  children: ReactNode;
};

type AnchorProps = Common & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type NativeProps = Common & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = AnchorProps | NativeProps;

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-[transform,translate,background-color,color,box-shadow,border-color,opacity] duration-200 ease-out-quart focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-500 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  /* Tone-aware: dark on light sections, light on dark sections. */
  primary:
    "rounded-full bg-fg text-bg shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset,0_8px_20px_-10px_rgb(10_11_15/0.5)] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-current/0 after:transition-colors hover:-translate-y-px hover:after:bg-current/10",
  accent:
    "rounded-full bg-accent-500 text-white shadow-[0_1px_0_0_rgb(255_255_255/0.2)_inset,0_10px_28px_-10px_rgb(47_91_255/0.65)] hover:-translate-y-px hover:bg-accent-600",
  secondary:
    "rounded-full bg-surface text-fg ring-1 ring-line-strong shadow-[0_1px_2px_rgb(10_11_15/0.04)] hover:-translate-y-px hover:bg-surface-2 hover:ring-line-strong",
  inverse:
    "rounded-full bg-white text-ink-950 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.5)] hover:-translate-y-px hover:bg-paper",
  ghost:
    "rounded-md px-0 text-fg underline-offset-4 hover:text-brand hover:underline",
};

/** Matches an internal href that points at a fragment: `#id`, `/en#id`, `/en/work/x#id`. */
const isHashHref = (href: string) => /^\/?[^?:]*#/.test(href);

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-md",
  lg: "h-12 px-6 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", arrow = false, className, children } = props;
  const classes = cn(base, variants[variant], variant === "ghost" ? "h-auto" : sizes[size], className);

  const arrowKind = arrow === true ? "right" : arrow;
  const ArrowIcon = arrowKind === "up-right" ? ArrowUpRightIcon : ArrowRightIcon;
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrowKind ? (
        <ArrowIcon
          className={cn(
            "relative z-10 size-4 shrink-0 transition-transform duration-200 ease-out-quart",
            arrowKind === "right"
              ? "group-hover:translate-x-0.5"
              : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          )}
        />
      ) : null}
    </>
  );

  if (typeof props.href === "string") {
    const { href, variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} rel="noopener noreferrer" {...rest}>
          {content}
        </a>
      );
    }
    /* In-page fragments use a native anchor so the browser hands focus to the target section. */
    if (isHashHref(href)) {
      return (
        <InPageLink href={href} className={classes} {...rest}>
          {content}
        </InPageLink>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
