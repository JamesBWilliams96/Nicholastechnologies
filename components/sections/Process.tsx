import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FileTextIcon,
  HammerIcon,
  LifeBuoyIcon,
  MessageIcon,
  SendIcon,
} from "@/components/ui/icons";
import { ProcessStep, type ProcessStepData } from "./process/ProcessStep";
import { ProcessTrack } from "./process/ProcessTrack";

const steps: readonly ProcessStepData[] = [
  {
    index: "01",
    title: "Talk",
    text: "Tell me what you’re trying to build, improve or fix.",
    icon: MessageIcon,
  },
  {
    index: "02",
    title: "Scope",
    text: "We work out what you actually need and agree on the scope and price.",
    icon: FileTextIcon,
  },
  {
    index: "03",
    title: "Build",
    text: "I design and develop the website or application.",
    icon: HammerIcon,
  },
  {
    index: "04",
    title: "Launch",
    text: "Everything gets tested, deployed and handed over.",
    icon: SendIcon,
  },
  {
    index: "05",
    title: "Support",
    text: "Optional hosting, maintenance and technical support after launch.",
    icon: LifeBuoyIcon,
    optional: true,
  },
];

/**
 * "How it works" — the five steps of a project, drawn as one line that
 * runs through five nodes. The line draws itself and the nodes light up
 * in sequence when the section scrolls into view; the last step is
 * optional and drawn dashed.
 */
export function Process() {
  return (
    <Section id="process" tone="light">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How it works."
          description="Five steps. No mystery. You’ll always know what’s happening and what comes next."
        />

        {/* `--node` is the node diameter and `--gap` the column gap; the steps
            read both to place the line, so the gap is set once, here. */}
        <ProcessTrack
          aria-label="The five steps of a project"
          className="mt-12 sm:mt-16 [--node:2.5rem] lg:grid lg:grid-cols-5 lg:gap-x-(--gap) lg:[--gap:1.25rem] lg:[--node:3rem] xl:[--gap:2rem]"
        >
          {steps.map((step, i) => (
            <ProcessStep key={step.index} step={step} position={i} total={steps.length} />
          ))}
        </ProcessTrack>

        <Reveal delay={160} className="mt-12 sm:mt-16">
          <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-muted">
              Step one is a conversation. Tell me what you’re working on and we’ll take it from
              there.
            </p>
            <Button href="/#contact" arrow className="shrink-0 self-start sm:self-auto">
              Start a project
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
