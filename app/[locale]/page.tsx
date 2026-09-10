import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, localeMeta, locales } from "@/lib/i18n/config";
import { baseOpenGraph } from "@/lib/i18n/metadata";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Studio } from "@/components/sections/Studio";
import { FixedPrice } from "@/components/sections/FixedPrice";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Support } from "@/components/sections/Support";
import { Contact } from "@/components/sections/Contact";

/** hreflang alternates: every language plus x-default pointing at English. */
export function languageAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].tag] = `/${l}${path}`;
  languages["x-default"] = `/en${path}`;
  return languages;
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    /* The homepage carries a longer share description than its meta description. */
    openGraph: {
      ...baseOpenGraph(locale),
      url: `/${locale}`,
      title: t.meta.title,
      description: t.meta.ogDescription,
    },
    /* Next replaces (not merges) `twitter` per segment, so the card type must be repeated. */
    twitter: { card: "summary_large_image", description: t.meta.description },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} t={t.hero} />
      <Positioning t={t.positioning} />
      <Services locale={locale} t={t.services} />
      <Work locale={locale} t={t.work} common={t.common} />
      <Studio locale={locale} t={t.studio} />
      <FixedPrice t={t.fixedPrice} />
      <Process locale={locale} t={t.process} />
      <Stack locale={locale} t={t.stack} />
      <About t={t.about} />
      <Support t={t.support} />
      <Contact locale={locale} t={t.contact} form={t.form} />
    </>
  );
}
