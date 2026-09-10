import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/content/i18n/types";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

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
