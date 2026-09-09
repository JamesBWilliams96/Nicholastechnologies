import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList, type Step } from "./fixed-price/StepList";
import { ProposalVisual } from "./fixed-price/ProposalVisual";

const steps: readonly Step[] = [
  { index: "01", title: "Scope", text: "What are we actually building?" },
  /* The step this section is about: the price is fixed here. */
  { index: "02", title: "Quote", text: "A clear fixed project price.", highlight: true },
  { index: "03", title: "Build", text: "Design, development and testing." },
  { index: "04", title: "Launch", text: "Deploy and hand over." },
];

/**
 * Fixed-price projects. Copy and the four steps on one side, an
 * illustrative project proposal on the other. Fixed-price is a model,
 * never a number: nothing here shows a price.
 */
export function FixedPrice() {
  return (
    <Section id="fixed-price" tone="light" className="overflow-hidden">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:gap-x-20">
          <SectionHeading
            eyebrow="Fixed-price projects"
            title={
              <>
                Know what you&rsquo;re getting.{" "}
                <span className="block text-muted">Know what it costs.</span>
              </>
            }
            description="Most projects are scoped and quoted at a fixed price before work begins, so you know the deliverables and the cost before development starts."
            className="lg:col-start-1 lg:row-start-1"
          />

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <ProposalVisual />
          </div>

          <StepList steps={steps} className="lg:col-start-1 lg:row-start-2" />
        </div>
      </Container>
    </Section>
  );
}
