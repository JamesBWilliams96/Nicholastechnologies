import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionFooter } from "@/components/ui/SectionFooter";
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

const icons = [MessageIcon, FileTextIcon, HammerIcon, SendIcon, LifeBuoyIcon];

/**
 * "How it works" — the five steps of a project, drawn as one line that
 * runs through five nodes. The line draws itself and the nodes light up
 * in sequence when the section scrolls into view; the last step is
 * optional and drawn dashed.
 */
export function Process({ locale, t }: { locale: Locale; t: Dictionary["process"] }) {
  const steps: ProcessStepData[] = t.steps.map((s, i) => ({
    index: `0${i + 1}`,
    title: s.title,
    text: s.text,
    icon: icons[i],
    optional: i === t.steps.length - 1,
  }));

  return (
    <Section id="process" tone="light">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {/* `--node` is the node diameter and `--gap` the column gap; the steps
            read both to place the line, so the gap is set once, here. */}
        <ProcessTrack
          aria-label={t.ariaLabel}
          className="mt-12 sm:mt-16 [--node:2.5rem] lg:grid lg:grid-cols-5 lg:gap-x-(--gap) lg:[--gap:1.25rem] lg:[--node:3rem] xl:[--gap:2rem]"
        >
          {steps.map((step, i) => (
            <ProcessStep key={step.index} step={step} position={i} total={steps.length} />
          ))}
        </ProcessTrack>

        <SectionFooter text={t.closingText} delay={160}>
          <Button href={localePath(locale, "#contact")} arrow className="shrink-0 self-start sm:self-auto">
            {t.closingCta}
          </Button>
        </SectionFooter>
      </Container>
    </Section>
  );
}
