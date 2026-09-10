import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CodeIcon, FileTextIcon, LifeBuoyIcon, MessageIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { StudioDiagram } from "./studio/StudioDiagram";

const highlights = [
  {
    icon: MessageIcon,
    index: "01",
    title: "Direct",
    text: "You talk to the person doing the work, not someone relaying it.",
  },
  {
    icon: CodeIcon,
    index: "02",
    title: "Joined-up",
    text: "Designed and built by the same person, so nothing is lost in a handover.",
  },
  {
    icon: FileTextIcon,
    index: "03",
    title: "Straightforward",
    text: "Scope and price agreed up front, in plain English. No surprises.",
  },
  {
    icon: LifeBuoyIcon,
    index: "04",
    title: "Long-term",
    text: "After launch I'm still here for hosting, updates and support.",
  },
];

/** "The one-person advantage" — the model, stated and drawn. Dark tone. */
export function Studio() {
  return (
    <Section id="studio" tone="dark" className="isolate overflow-hidden">
      {/* Backdrop: engineering grid, fading towards the edges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70" />
      </div>

      <Container>
        {/* Statement */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow>The one-person advantage</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 max-w-[19ch] text-display-lg">
                <span className="text-muted">No account managers. No handovers.</span> Just the
                person building it.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:justify-self-end">
            <div className="max-w-[46ch] lg:pb-1.5">
              <p className="text-lead text-muted">
                I keep {site.name} deliberately small. Every conversation, decision and line of
                code goes through me, so questions get straight answers and the project keeps
                moving.
              </p>
              <Button href="/#process" variant="secondary" arrow className="mt-7">
                See how a project runs
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The model, drawn */}
        <Reveal variant="scale" delay={160} className="mt-12 sm:mt-16">
          <StudioDiagram />
        </Reveal>

        {/* Highlights: a compact row per tile on phones, a column from md */}
        <ul className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={240 + i * 80} className="min-w-0">
              <div className="group relative flex h-full items-start gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line transition-[transform,translate,background-color,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-surface-2 hover:ring-line-strong sm:p-6 md:flex-col md:items-stretch md:p-7">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-fg ring-1 ring-line transition-colors duration-300 group-hover:text-accent-300">
                  <h.icon className="size-[1.15rem]" />
                </span>
                <div className="min-w-0 flex-1 pr-6 md:mt-7 md:pr-0">
                  <h3 className="text-base font-semibold tracking-[-0.015em] md:text-lg">{h.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted md:mt-1.5">{h.text}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute right-5 top-5 font-mono text-2xs font-medium tracking-[0.12em] text-subtle tabular-nums sm:right-6 sm:top-6 md:right-7 md:top-7"
                >
                  {h.index}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
