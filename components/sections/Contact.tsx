import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FileTextIcon, MailIcon, SparkIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { CardReveal } from "./contact/CardReveal";
import { ContactForm } from "./contact/ContactForm";

const icons = [MailIcon, FileTextIcon, SparkIcon];

type ContactProps = { locale: Locale; t: Dictionary["contact"]; form: Dictionary["form"] };

/**
 * Final call to action and enquiry form. Dark tone, the one section that
 * gets an accent glow — it's the finale before the (dark) footer.
 *
 * Layout: three direct grid children in reading order — headline, form,
 * reassurance list — so DOM order matches what is seen at every width.
 * Below lg they simply stack. On lg the form card spans both rows of the
 * right column; the headline takes row 1 on the left and the list sits
 * beneath it in the tall second row, where it can stick while the long
 * form scrolls past.
 */
export function Contact({ locale, t, form }: ContactProps) {
  const mailto = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(t.emailSubject)}`
    : null;

  return (
    <Section id="contact" tone="dark" className="isolate overflow-clip">
      {/* Backdrop: hairline, engineering grid and a soft accent glow behind the form */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[30rem] w-[48rem] -translate-x-1/2 glow-accent opacity-35 lg:left-auto lg:right-[-14%] lg:top-[-8%] lg:h-[44rem] lg:w-[56rem] lg:translate-x-0 lg:opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container>
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 xl:gap-x-24">
          {/* The invitation */}
          <div className="max-w-xl lg:col-start-1 lg:row-start-1">
            <Reveal>
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="contact-heading" className="mt-5 max-w-[16ch] text-display-lg">
                {t.titleA} <span className="text-muted">{t.titleB}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-[46ch] text-lead text-muted">{t.lead}</p>
            </Reveal>
          </div>

          {/* The form, in a card over the glow */}
          <CardReveal delay={160} className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="relative rounded-3xl bg-surface p-5 ring-1 ring-line shadow-[0_32px_80px_-32px_rgb(0_0_0/0.7)] xs:p-6 sm:p-8 lg:p-9 xl:p-10">
              {/* Top-edge highlight and a faint inner sheen */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.035] to-transparent" />
              </div>
              <div className="relative">
                <ContactForm locale={locale} t={form} mailto={mailto} />
              </div>
            </div>
          </CardReveal>

          {/* What to expect: reassurance beneath the headline */}
          <div className="max-w-xl lg:sticky lg:top-28 lg:col-start-1 lg:row-start-2 lg:self-start">
            <Reveal>
              <p className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
                {t.expectLabel}
              </p>
            </Reveal>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {t.expectations.map((item, i) => {
                const Icon = icons[i];
                return (
                  <Reveal as="li" key={item.title} delay={80 + i * 70} className="flex gap-4 py-4.5 sm:gap-5">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-fg ring-1 ring-line">
                      <Icon className="size-[1.05rem]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-md font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            {mailto ? (
              <Reveal delay={320} className="mt-8">
                <p className="text-sm text-muted">
                  {t.preferEmail}{" "}
                  <a
                    href={mailto}
                    className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
                  >
                    {site.email}
                  </a>
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
