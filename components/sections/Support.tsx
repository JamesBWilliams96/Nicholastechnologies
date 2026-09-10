import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { SupportVisual } from "./support/SupportVisual";

/**
 * "Launch isn't the finish line" — ongoing hosting, maintenance and
 * support. Dark tone; sits directly before the dark contact section.
 */
export function Support({ locale, t }: { locale: Locale; t: Dictionary["support"] }) {
  return (
    <Section id="support" tone="dark" className="isolate overflow-hidden">
      {/* Backdrop: engineering grid, fading towards the edges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-60" />
      </div>

      <Container>
        <div className="grid items-center gap-y-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="max-w-xl">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

            <Reveal delay={200} className="mt-8 sm:mt-10">
              <ul className="grid grid-cols-1 gap-x-4 gap-y-3.5 text-sm xs:grid-cols-2 sm:gap-x-6 sm:text-[0.9375rem]">
                {t.included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-accent-300 ring-1 ring-inset ring-accent-400/30">
                      <CheckIcon className="size-3" strokeWidth={2.25} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280} className="mt-10 border-t border-line pt-8 sm:mt-12 sm:pt-10">
              <p className="max-w-[22ch] text-display-md">
                <span className="text-muted">{t.codaA}</span> {t.codaB}
              </p>
              <Button href={localePath(locale, "#contact")} variant="ghost" arrow className="mt-6 text-[0.9375rem]">
                {t.cta}
              </Button>
            </Reveal>
          </div>

          <div className="lg:pl-2">
            <SupportVisual ticket={t.ticket} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
