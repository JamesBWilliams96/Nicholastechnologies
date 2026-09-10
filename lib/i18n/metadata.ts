import type { Metadata } from "next";
import { site } from "@/content/site";
import { localeMeta, locales, type Locale } from "./config";

/**
 * Open Graph fields shared by every route in a locale. Next replaces the
 * `openGraph` object per segment rather than merging it, so any page that
 * sets its own `openGraph` (for `url`, `title`, …) must spread this in first
 * or it loses og:type, og:site_name and og:locale.
 *
 * Title and description are deliberately absent: Next fills og:title,
 * og:description and the Twitter equivalents from each route's own
 * `title`/`description`, so a 404 or case study never unfurls with the
 * homepage copy.
 */
export function baseOpenGraph(locale: Locale): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: site.name,
    locale: localeMeta[locale].og,
    alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].og),
  };
}
