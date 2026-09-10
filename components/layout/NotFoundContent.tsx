"use client";

import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/i18n/types";
import { defaultLocale, isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function NotFoundContent({ copies }: { copies: Record<Locale, Dictionary["notFound"]> }) {
  const first = usePathname()?.split("/")[1];
  const locale: Locale = isLocale(first) ? first : defaultLocale;
  const t = copies[locale];

  return (
    <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70" />
      </div>
      <div className="container-site max-w-2xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-6 text-display-lg">{t.title}</h1>
        <p className="mt-5 max-w-[46ch] text-lead text-muted">{t.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={localePath(locale)} size="lg" arrow>
            {t.home}
          </Button>
          <Button href={localePath(locale, "#contact")} variant="secondary" size="lg">
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
