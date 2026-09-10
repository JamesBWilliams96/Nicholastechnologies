"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------
   Form controls for the dark contact card. Every control gets a real
   label, optional hint and inline error, wired up with aria-describedby.
   The error colour is deliberately local: the design system has no
   destructive token and this is the only place one is needed.
   ------------------------------------------------------------------ */

const errorText = "text-danger-300";

const control = cn(
  "block w-full rounded-xl bg-surface-2 px-4 text-md ring-1 ring-inset ring-white/35",
  "placeholder:text-muted",
  "transition-[box-shadow,background-color] duration-200 ease-out-quart",
  "hover:ring-white/50",
  "focus:outline-none focus:bg-surface-3 focus:ring-2 focus:ring-accent-400 focus:shadow-[0_0_0_4px_rgb(91_130_255/0.16)]",
  "aria-invalid:ring-danger-400/70 aria-invalid:hover:ring-danger-400 aria-invalid:focus:ring-danger-400 aria-invalid:focus:shadow-[0_0_0_4px_rgb(248_113_113/0.16)]",
  "disabled:opacity-60",
);

type ShellProps = {
  id: string;
  label: ReactNode;
  optional?: boolean;
  /** Text of the "Optional" tag. */
  optionalLabel?: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + hint + error. Children receive the ids through `describedBy()`. */
export function FieldShell({
  id,
  label,
  optional,
  optionalLabel = "Optional",
  hint,
  error,
  className,
  children,
}: ShellProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 text-sm font-medium leading-none text-fg"
      >
        <span>{label}</span>
        {optional ? (
          <span className="font-mono text-2xs font-normal uppercase tracking-[0.14em] text-muted">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      <div className="mt-2.5">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={cn("mt-2 flex items-start gap-1.5 text-xs font-medium leading-relaxed", errorText)}>
          <span aria-hidden className="mt-[0.4em] size-1.5 shrink-0 rounded-full bg-current" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Builds aria-describedby from whichever helper texts exist. */
export function describedBy(id: string, hint: unknown, error: unknown): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type BaseFieldProps = Omit<ShellProps, "children"> & { error?: string };

type TextFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<"input">, "id" | "className" | "aria-describedby" | "aria-invalid">;

export function TextField({ id, label, optional, optionalLabel, hint, error, className, ...input }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} optional={optional} optionalLabel={optionalLabel} hint={hint} error={error} className={className}>
      <input
        id={id}
        className={cn(control, "h-12 text-fg")}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        required={!optional}
        {...input}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className" | "aria-describedby" | "aria-invalid"> & {
    /** Tailwind min-height class, e.g. "min-h-36". */
    minHeightClassName?: string;
  };

export function TextAreaField({
  id,
  label,
  optional,
  optionalLabel,
  hint,
  error,
  className,
  minHeightClassName = "min-h-32",
  ...textarea
}: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} optional={optional} optionalLabel={optionalLabel} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        className={cn(control, "resize-y py-3 leading-relaxed text-fg", minHeightClassName)}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        required={!optional}
        {...textarea}
      />
    </FieldShell>
  );
}

type SelectFieldProps = BaseFieldProps &
  Omit<ComponentPropsWithoutRef<"select">, "id" | "className" | "aria-describedby" | "aria-invalid"> & {
    options: ReadonlyArray<{ value: string; label: string }>;
    placeholder?: string;
  };

export function SelectField({
  id,
  label,
  optional,
  optionalLabel,
  hint,
  error,
  className,
  options,
  placeholder = "Choose one",
  value,
  ...select
}: SelectFieldProps) {
  const empty = value === "" || value === undefined;
  return (
    <FieldShell id={id} label={label} optional={optional} optionalLabel={optionalLabel} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          className={cn(control, "h-12 cursor-pointer appearance-none pr-11", empty ? "text-muted" : "text-fg")}
          aria-describedby={describedBy(id, hint, error)}
          aria-invalid={error ? true : undefined}
          required={!optional}
          value={value}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  );
}
