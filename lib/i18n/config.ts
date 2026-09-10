/**
 * Locale configuration. The order of `locales` is the order languages are
 * offered in the switcher: the studio's local markets first, then English.
 */
export const locales = ["sk", "cs", "de", "pl", "hu", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  {
    /** Native name shown in the switcher. */
    name: string;
    /** Short label shown on the switcher button. */
    short: string;
    /** BCP 47 tag for <html lang> and hreflang. */
    tag: string;
    /** Open Graph locale. */
    og: string;
  }
> = {
  sk: { name: "Slovenčina", short: "SK", tag: "sk-SK", og: "sk_SK" },
  cs: { name: "Čeština", short: "CS", tag: "cs-CZ", og: "cs_CZ" },
  de: { name: "Deutsch", short: "DE", tag: "de-DE", og: "de_DE" },
  pl: { name: "Polski", short: "PL", tag: "pl-PL", og: "pl_PL" },
  hu: { name: "Magyar", short: "HU", tag: "hu-HU", og: "hu_HU" },
  en: { name: "English", short: "EN", tag: "en-GB", og: "en_GB" },
};

/** Cookie that remembers an explicit language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** `/sk`, `/sk/work/x`, `/sk#contact` — every internal link goes through here. */
export function localePath(locale: Locale, path = ""): string {
  if (!path || path === "/") return `/${locale}`;
  if (path.startsWith("#")) return `/${locale}${path}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strips a leading locale segment from a pathname. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) return rest.length ? `/${rest.join("/")}` : "/";
  return pathname || "/";
}

/** Picks the best supported locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const weight = q ? Number.parseFloat(q.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), weight: Number.isNaN(weight) ? 0 : weight, index };
    })
    .filter((entry) => entry.tag && entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/** Tiny template helper: fmt("Hello {name}", { name: "Sam" }). */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
