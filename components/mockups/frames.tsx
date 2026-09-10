import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Frames for illustrative interfaces. Everything inside a frame is
   decorative: wrap the frame in an element with aria-hidden or give
   the frame an accessible label via `label`.
   ------------------------------------------------------------------ */

type BrowserFrameProps = ComponentPropsWithoutRef<"div"> & {
  url?: string;
  /** Chrome tone. The page inside decides its own colours. */
  chrome?: "light" | "dark";
  /** Accessible description of what the mock shows. Omit if a parent is aria-hidden. */
  label?: string;
  /** Decorative content at the right of the title bar (an account mark, say). Sized in rem to match the chrome. */
  trailing?: ReactNode;
  children: ReactNode;
};

/** Browser window with traffic lights and an address pill. */
export function BrowserFrame({
  url = "yourbusiness.com",
  chrome = "light",
  label,
  trailing,
  className,
  children,
  ...rest
}: BrowserFrameProps) {
  const dark = chrome === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl shadow-float ring-1",
        dark ? "bg-ink-900 ring-white/15" : "bg-white ring-ink-950/8",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    >
      <div
        className={cn(
          "flex h-8 items-center gap-2 border-b px-3 sm:h-9",
          dark ? "border-white/8 bg-ink-800" : "border-ink-950/6 bg-ink-50",
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-ink-200")} />
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-ink-200")} />
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-ink-200")} />
        </div>
        <div
          className={cn(
            "mx-auto flex h-5 w-[52%] max-w-56 items-center justify-center gap-1 rounded-md font-mono text-[0.625rem] sm:h-6",
            dark ? "bg-white/6 text-ink-300" : "bg-white text-ink-500 ring-1 ring-ink-950/6",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="5" y="11" width="14" height="10" rx="2.5" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <div className="flex w-10 justify-end" aria-hidden>
          {trailing}
        </div>
      </div>
      <div className="@container relative">{children}</div>
    </div>
  );
}

type PhoneFrameProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  children: ReactNode;
};

/** Slim phone with a dynamic-island style cut-out. */
export function PhoneFrame({ label, className, children, ...rest }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-[2.1rem] bg-ink-950 p-[5px] shadow-float ring-1 ring-black/40",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    >
      <div className="@container relative overflow-hidden rounded-[1.8rem] bg-white">
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-10 h-[5%] w-[34%] -translate-x-1/2 rounded-full bg-ink-950"
        />
        {children}
      </div>
    </div>
  );
}

type PanelProps = ComponentPropsWithoutRef<"div"> & {
  /** Glass floats over other UI; solid sits inside a page. */
  variant?: "glass" | "solid";
  /** Text colour: dark ink for light UI, paper for a dark app window. */
  tone?: "light" | "dark";
  /** Resting shadow. Defaults to float for glass, card for solid. */
  shadow?: "card" | "float";
  label?: string;
};

/** Small floating UI card (calendar, chart, toast...). */
export function Panel({ variant = "glass", tone = "light", shadow, label, className, ...rest }: PanelProps) {
  const lift = shadow ?? (variant === "glass" ? "float" : "card");
  return (
    <div
      className={cn(
        "rounded-xl",
        tone === "dark" ? "text-paper" : "text-ink-950",
        variant === "glass" ? "glass-strong" : "bg-white ring-1 ring-ink-950/8",
        lift === "float" ? "shadow-float" : "shadow-card",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    />
  );
}

/** Generic app window (sidebar + content) for dashboard style mocks. */
export function AppFrame({
  className,
  label,
  chrome = "light",
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { label?: string; chrome?: "light" | "dark"; children: ReactNode }) {
  const dark = chrome === "dark";
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-xl shadow-float ring-1",
        dark ? "bg-ink-900 text-paper ring-white/12" : "bg-white text-ink-950 ring-ink-950/8",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    >
      {children}
    </div>
  );
}
