import type { Dictionary } from "@/content/i18n/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList, type Step } from "./fixed-price/StepList";
import { ProposalVisual } from "./fixed-price/ProposalVisual";

/**
 * Fixed-price projects. Copy and the four steps on one side, an
 * illustrative project proposal on the other. Fixed-price is a model,
 * never a number: nothing here shows a price.
 */
export function FixedPrice({ t }: { t: Dictionary["fixedPrice"] }) {
  const steps: Step[] = t.steps.map((s, i) => ({
    index: `0${i + 1}`,
    title: s.title,
    text: s.text,
    /* The step this section is about: the price is fixed here. */
    highlight: i === 1,
  }));

  return (
    <Section id="fixed-price" tone="paper" className="overflow-hidden">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:gap-x-20">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={
              <>
                {t.titleA}{" "}
                <span className="block text-muted">{t.titleB}</span>
              </>
            }
            description={t.description}
            className="lg:col-start-1 lg:row-start-1"
          />

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <ProposalVisual proposal={t.proposal} scopeCall={t.scopeCall} />
          </div>

          <StepList steps={steps} className="lg:col-start-1 lg:row-start-2" />
        </div>
      </Container>
    </Section>
  );
}
