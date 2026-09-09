import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StackBuilder } from "./stack/StackBuilder";
import { Wordmark } from "./stack/Wordmark";

const tools = [
  {
    id: "webflow",
    names: ["Webflow"],
    text: "Great for straightforward marketing sites that clients want to edit themselves.",
  },
  {
    id: "react-next",
    names: ["React", "Next.js"],
    text: "Great for custom websites, advanced interactions and web applications.",
    note: "For web apps the stack also includes TypeScript and a database.",
  },
  {
    id: "shopify",
    names: ["Shopify"],
    text: "Great for businesses that need a reliable ecommerce platform.",
  },
];

/**
 * "The right tool for the job". The three tools I reach for, then an
 * interactive stack builder: pick a project type, see which tool fits and why.
 */
export function Stack() {
  return (
    <Section id="stack" tone="paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-24">
          <SectionHeading
            eyebrow="Technology"
            title={
              <>
                The right tool <span className="text-muted">for the job.</span>
              </>
            }
            description="I don't force every project into one technology. Technology should serve the business, not the other way around."
          />

          <ul className="border-b border-line">
            {tools.map((t, i) => (
              <Reveal as="li" key={t.id} delay={160 + i * 80} className="border-t border-line py-5">
                {/* Whitespace and the "+" are real text, so the heading reads "React + Next.js". */}
                <h3 className="flex flex-wrap items-center gap-1.5">
                  {t.names.map((name, j) => (
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
                <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">{t.text}</p>
                {t.note ? <p className="mt-1.5 font-mono text-xs text-muted">{t.note}</p> : null}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal variant="scale" delay={200} className="mt-12 sm:mt-16">
          <StackBuilder />
        </Reveal>
      </Container>
    </Section>
  );
}
