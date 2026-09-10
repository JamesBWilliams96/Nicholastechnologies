import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/content/i18n/types";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

/* Next passes the [locale] segment to the not-found module's metadata, so the
   title can be localised here. `noindex` lives here as well; pages that lead
   here throw notFound() from their own generateMetadata so this is what both
   the server HTML and the hydrated client render. */
export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isLocale(locale) ? locale : defaultLocale);
  return { title: t.notFound.metaTitle, robots: { index: false } };
}

/**
 * Localised 404. Not-found pages get no route params and reading request
 * headers would make every locale page dynamic, so the server hands the
 * 404 copy for every language to a small client component that picks the
 * right one from the URL.
 */
export default async function NotFound() {
  const entries = await Promise.all(locales.map(async (l) => [l, (await getDictionary(l)).notFound] as const));
  const copies = Object.fromEntries(entries) as Record<Locale, Dictionary["notFound"]>;
  return <NotFoundContent copies={copies} />;
}
