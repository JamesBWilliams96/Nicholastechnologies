import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { HeroVisual } from "./hero/HeroVisual";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Backdrop: engineering grid with a soft accent glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-80" />
        <div className="absolute left-[55%] top-[-12%] h-[34rem] w-[52rem] -translate-x-1/2 glow-accent opacity-50 sm:left-[68%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-site grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        <div className="max-w-2xl">
          <Reveal eager>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal eager delay={70}>
            <h1 className="mt-6 text-display-xl">
              {t.titleA} <span className="text-muted">{t.titleB}</span>
            </h1>
          </Reveal>
          <Reveal eager delay={140}>
            <p className="mt-6 max-w-[46ch] text-lead text-muted">{t.lead}</p>
          </Reveal>
          <Reveal eager delay={210}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={localePath(locale, "#contact")} size="lg" arrow>
                {t.primary}
              </Button>
              <Button href={localePath(locale, "#services")} variant="secondary" size="lg">
                {t.secondary}
              </Button>
            </div>
          </Reveal>
          <Reveal eager delay={280}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
              {t.proof.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <CheckIcon className="size-3.5 text-accent-600 dark:text-accent-300" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative xl:-mr-10">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
