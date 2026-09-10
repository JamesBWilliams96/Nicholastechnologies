"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, localeMeta, localePath, locales, stripLocale, type Locale } from "@/lib/i18n/config";
import { CheckIcon, ChevronDownIcon, LanguageIcon } from "@/components/ui/icons";

function remember(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* cookies blocked: the proxy falls back to the browser language */
  }
}

type Props = {
  locale: Locale;
  /** Accessible name of the control, in the current language. */
  label: string;
  className?: string;
};

/** Compact dropdown for the navbar: current language, then a list of all of them. */
export function LanguageMenu({ locale, label, className }: Props) {
  const pathname = usePathname();
  const rest = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${localeMeta[locale].name}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs font-medium tracking-[0.08em] text-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
      >
        <LanguageIcon className="size-[1.05rem]" />
        {localeMeta[locale].short}
        <ChevronDownIcon
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={label}
        hidden={!open}
        className="glass-strong absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-44 rounded-xl p-1.5 shadow-float"
      >
        {locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l} role="none">
              <Link
                role="menuitem"
                href={localePath(l, rest)}
                hrefLang={localeMeta[l].tag}
                lang={localeMeta[l].tag}
                aria-current={current ? "true" : undefined}
                onClick={() => {
                  remember(l);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                  current ? "bg-fg/5 font-medium text-fg" : "text-muted hover:bg-fg/5 hover:text-fg",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-6 font-mono text-2xs tracking-[0.08em] text-muted">
                    {localeMeta[l].short}
                  </span>
                  {localeMeta[l].name}
                </span>
                {current ? <CheckIcon className="size-4 text-accent-500" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Inline list of languages, for the mobile menu and the footer. */
export function LanguageList({ locale, label, className }: Props) {
  const pathname = usePathname();
  const rest = stripLocale(pathname);
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap gap-2">
        {locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={localePath(l, rest)}
                hrefLang={localeMeta[l].tag}
                lang={localeMeta[l].tag}
                aria-current={current ? "true" : undefined}
                onClick={() => remember(l)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm ring-1 ring-inset transition-colors duration-200",
                  current
                    ? "bg-fg text-bg ring-fg"
                    : "bg-surface text-muted ring-line hover:text-fg hover:ring-line-strong",
                )}
              >
                <span className="font-mono text-2xs tracking-[0.08em]">{localeMeta[l].short}</span>
                {localeMeta[l].name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
