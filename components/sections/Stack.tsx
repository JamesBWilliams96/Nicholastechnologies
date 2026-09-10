import { Fragment } from "react";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StackBuilder } from "./stack/StackBuilder";
import { Wordmark } from "./stack/Wordmark";

/* Tool names are product names and stay as they are in every language. */
const toolNames: readonly (readonly string[])[] = [["Webflow"], ["React", "Next.js"], ["Shopify"]];

/**
 * "The right tool for the job". The three tools I reach for, then an
 * interactive stack builder: pick a project type, see which tool fits and why.
 */
export function Stack({ locale, t }: { locale: Locale; t: Dictionary["stack"] }) {
  return (
    <Section id="stack" tone="paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-24">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={
              <>
                {t.titleA} <span className="text-muted">{t.titleB}</span>
              </>
            }
            description={t.description}
          />

          <ul className="border-b border-line">
            {t.tools.map((tool, i) => (
              <Reveal as="li" key={toolNames[i].join("+")} delay={160 + i * 80} className="border-t border-line py-5">
                {/* Whitespace and the "+" are real text, so the heading reads "React + Next.js". */}
                <h3 className="flex flex-wrap items-center gap-1.5">
                  {toolNames[i].map((name, j) => (
                    <Fragment key={name}>
                      {j > 0 ? (
                        <>
                          {" "}
                          <span className="mx-0.5 font-mono text-xs text-muted">+</span>{" "}
                        </>
                      ) : null}
                      <Wordmark className="text-[0.8125rem]">{name}</Wordmark>
                    </Fragment>
                  ))}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">{tool.text}</p>
                {"note" in tool && tool.note ? (
                  <p className="mt-1.5 font-mono text-xs text-muted">{tool.note}</p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal variant="scale" delay={200} className="mt-12 sm:mt-16">
          <StackBuilder locale={locale} t={t.builder} />
        </Reveal>
      </Container>
    </Section>
  );
}
