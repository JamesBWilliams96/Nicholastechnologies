"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/i18n/types";
import { fmt, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import {
  EMPTY_ENQUIRY,
  LIMITS,
  TIMEFRAMES,
  firstErrorField,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { usePrefersReducedMotion } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";
import { SelectField, TextAreaField, TextField } from "./fields";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type ServerPayload = { ok?: boolean; message?: string; errors?: Partial<Record<string, string>> };

type ContactFormProps = {
  locale: Locale;
  t: Dictionary["form"];
  /** mailto: link offered when delivery fails, if an email is configured. */
  mailto: string | null;
};

/** Keep only messages for fields we actually render. */
function pickErrors(errors: Partial<Record<string, string>> | undefined): EnquiryErrors {
  const out: EnquiryErrors = {};
  if (!errors) return out;
  for (const key of Object.keys(EMPTY_ENQUIRY) as (keyof EnquiryInput)[]) {
    if (key === "website") continue;
    const msg = errors[key];
    if (typeof msg === "string" && msg) out[key] = msg;
  }
  return out;
}

export function ContactForm({ locale, t, mailto }: ContactFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const fieldId = useCallback((f: EnquiryField | "website") => `enquiry-${f}-${uid}`, [uid]);

  const [values, setValues] = useState<EnquiryInput>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [liveMessage, setLiveMessage] = useState("");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const submitting = status.kind === "submitting";

  const update = (field: keyof EnquiryInput) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (field !== "website" && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const focusField = useCallback(
    (field: EnquiryField | undefined) => {
      if (!field) return;
      // Wait a frame so the error text exists before assistive tech reads the field.
      requestAnimationFrame(() => document.getElementById(fieldId(field))?.focus());
    },
    [fieldId],
  );

  const showErrors = useCallback(
    (next: EnquiryErrors) => {
      setErrors(next);
      const count = Object.keys(next).length;
      setLiveMessage(count === 1 ? t.checkOne : fmt(t.checkMany, { count }));
      focusField(firstErrorField(next));
    },
    [focusField, t],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const result = validateEnquiry(values, t.validation);
    if (!result.ok) {
      showErrors(result.errors);
      return;
    }

    setErrors({});
    setLiveMessage("");
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const payload = (await res.json().catch(() => null)) as ServerPayload | null;

      if (res.ok && payload?.ok) {
        setStatus({ kind: "success" });
        setLiveMessage("");
        requestAnimationFrame(() => {
          const heading = successHeadingRef.current;
          if (!heading) return;
          heading.focus({ preventScroll: true });
          heading.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
        });
        return;
      }

      if (res.status === 400 && payload?.errors) {
        setStatus({ kind: "idle" });
        /* Re-run local validation so the messages are in the visitor's language. */
        const local = validateEnquiry(values, t.validation);
        showErrors(local.ok ? pickErrors(payload.errors) : local.errors);
        return;
      }

      setStatus({ kind: "error", message: t.errorGeneric });
    } catch {
      setStatus({ kind: "error", message: t.errorGeneric });
    }
  }

  function reset() {
    setValues(EMPTY_ENQUIRY);
    setErrors({});
    setLiveMessage("");
    setStatus({ kind: "idle" });
    requestAnimationFrame(() => document.getElementById(fieldId("name"))?.focus());
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="animate-fade-up motion-safe-only">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-soft text-accent-300 ring-1 ring-inset ring-accent-400/30">
          <CheckIcon className="size-5" strokeWidth={2.25} />
        </span>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-6 text-display-sm focus:outline-none"
        >
          {t.success.title}
        </h3>
        <p className="mt-3 max-w-[40ch] text-base text-muted">{t.success.lead}</p>
        <ol className="mt-7 space-y-3.5 border-t border-line pt-7">
          {t.success.steps.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-sm leading-relaxed">
              <span
                aria-hidden
                className="mt-[0.2em] w-6 shrink-0 font-mono text-2xs font-medium tracking-[0.12em] text-subtle tabular-nums"
              >
                0{i + 1}
              </span>
              <span className="text-muted">{item}</span>
            </li>
          ))}
        </ol>
        <Button
          type="button"
          variant="ghost"
          arrow
          onClick={reset}
          className="mt-8 text-sm"
        >
          {t.success.again}
        </Button>
      </div>
    );
  }

  const isError = status.kind === "error";

  return (
    <form
      noValidate
      aria-labelledby="contact-heading"
      aria-busy={submitting}
      onSubmit={onSubmit}
      className="@container"
    >
      {/* About you */}
      <fieldset className="min-w-0" aria-busy={submitting}>
        <legend className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
          <span className="text-subtle" aria-hidden>01&nbsp;&nbsp;</span>
          {t.aboutYou}
        </legend>
        <div className="mt-5 grid gap-5 @md:grid-cols-2">
          <TextField
            id={fieldId("name")}
            name="name"
            label={t.name}
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder={t.namePlaceholder}
            value={values.name}
            onChange={update("name")}
            error={errors.name}
          />
          <TextField
            id={fieldId("email")}
            name="email"
            label={t.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={LIMITS.email}
            placeholder={t.emailPlaceholder}
            value={values.email}
            onChange={update("email")}
            error={errors.email}
          />
          <TextField
            id={fieldId("company")}
            name="company"
            label={t.company}
            optional
            optionalLabel={t.optional}
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            placeholder={t.companyPlaceholder}
            value={values.company}
            onChange={update("company")}
            error={errors.company}
            className="@md:col-span-2"
          />
        </div>
      </fieldset>

      {/* The project */}
      <div className="mt-9 border-t border-line pt-8">
        <fieldset className="min-w-0" aria-busy={submitting}>
          <legend className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
            <span className="text-subtle" aria-hidden>02&nbsp;&nbsp;</span>
            {t.theProject}
          </legend>
          <div className="mt-5 grid gap-5 @md:grid-cols-2">
            <TextAreaField
              id={fieldId("project")}
              name="project"
              label={t.project}
              minHeightClassName="min-h-36"
              maxLength={LIMITS.project}
              placeholder={t.projectPlaceholder}
              value={values.project}
              onChange={update("project")}
              error={errors.project}
              className="@md:col-span-2"
            />
            <TextField
              id={fieldId("budget")}
              name="budget"
              label={t.budget}
              optional
              optionalLabel={t.optional}
              type="text"
              autoComplete="off"
              maxLength={LIMITS.budget}
              placeholder={t.budgetPlaceholder}
              hint={t.budgetHint}
              value={values.budget}
              onChange={update("budget")}
              error={errors.budget}
            />
            <SelectField
              id={fieldId("timeframe")}
              name="timeframe"
              label={t.timeframe}
              optional
              optionalLabel={t.optional}
              autoComplete="off"
              options={TIMEFRAMES.map((o) => ({ value: o.value, label: t.timeframes[o.value] }))}
              placeholder={t.timeframePlaceholder}
              value={values.timeframe}
              onChange={update("timeframe")}
              error={errors.timeframe}
            />
            <TextAreaField
              id={fieldId("extra")}
              name="extra"
              label={t.extra}
              optional
              optionalLabel={t.optional}
              minHeightClassName="min-h-24"
              maxLength={LIMITS.extra}
              placeholder={t.extraPlaceholder}
              value={values.extra}
              onChange={update("extra")}
              error={errors.extra}
              className="@md:col-span-2"
            />
          </div>
        </fieldset>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      {/* Status: validation summary and delivery errors. Always present so announcements work. */}
      <div aria-live="polite" className={cn(isError && "mt-7")}>
        {isError ? (
          <div className="rounded-xl bg-danger-400/[0.08] px-4 py-3.5 text-sm leading-relaxed ring-1 ring-inset ring-danger-400/30">
            <p className="font-medium text-fg">{status.message}</p>
            <p className="mt-1 text-muted">
              {t.errorKept}{" "}
              {mailto && site.email ? (
                <>
                  {t.errorEmail.split("{email}")[0]}
                  <a
                    href={mailto}
                    className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
                  >
                    {site.email}
                  </a>
                  {t.errorEmail.split("{email}")[1]}
                </>
              ) : (
                t.errorRetry
              )}
            </p>
          </div>
        ) : liveMessage ? (
          <p className="sr-only">{liveMessage}</p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-7 @md:flex-row @md:items-center @md:justify-between @md:gap-8">
        <Button
          type="submit"
          size="lg"
          arrow
          aria-disabled={submitting}
          className="w-full @md:w-auto"
        >
          {submitting ? t.submitting : t.submit}
        </Button>
        <p className="max-w-[30ch] text-xs leading-relaxed text-muted @md:text-right">{t.reassurance}</p>
      </div>
    </form>
  );
}
