import Link from "next/link";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectPreview } from "./ProjectPreview";
import { StackTags } from "./StackTags";

/** A real project that has a written-up case study. */
export type CaseStudyProject = Project & { caseStudy: NonNullable<Project["caseStudy"]> };

/**
 * Case-study page body: header with the big preview, three editorial
 * blocks on a paper band, and a dark closing CTA. Pure presentation —
 * the route decides which project to render (and 404s otherwise).
 */
export function CaseStudy({ project }: { project: CaseStudyProject }) {
  const story = [
    { n: "01", title: "The challenge", body: project.caseStudy.challenge },
    { n: "02", title: "The solution", body: project.caseStudy.solution },
    { n: "03", title: "The result", body: project.caseStudy.result },
  ];

  return (
    <>
      {/* Header: back link, title, summary, stack and the big preview */}
      <Section flush className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[60%] bg-grid mask-fade-b opacity-60" />
        </div>
        <Container>
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-fg"
            >
              <ArrowRightIcon className="size-3.5 rotate-180 transition-transform duration-200 ease-out-quart group-hover:-translate-x-0.5" />
              All work
            </Link>
          </Reveal>

          <SectionHeading
            as="h1"
            className="mt-8 sm:mt-10"
            eyebrow={project.category}
            title={project.name}
            description={project.summary}
          >
            <StackTags stack={project.stack} />
          </SectionHeading>

          <Reveal variant="scale" delay={240} className="mt-12 sm:mt-16">
            <div
              aria-hidden={project.image ? undefined : true}
              className="relative overflow-hidden rounded-2xl bg-surface-2 p-4 ring-1 ring-line sm:p-8 lg:p-12"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
              <ProjectPreview
                project={project}
                priority
                sizes="(min-width: 1200px) 1100px, 100vw"
                className="relative"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Story */}
      <Section tone="paper" aria-label="Case study">
        <Container>
          <div className="divide-y divide-line">
            {story.map((block, i) => (
              <Reveal
                key={block.n}
                delay={i * 80}
                className="grid gap-4 py-10 first:pt-0 last:pb-0 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted tabular-nums">{block.n}</span>
                  <h2 className="text-display-sm">{block.title}</h2>
                </div>
                <p className="max-w-[60ch] text-lead text-muted">{block.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[24rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 glow-accent opacity-40" />
        </div>
        <Container className="relative">
          <SectionHeading
            align="center"
            size="md"
            eyebrow="Next"
            title="Have something similar in mind?"
            description="Tell me what needs building. I'll work out the simplest way to build it."
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/#contact" size="lg" arrow>
                Start a project
              </Button>
              <Button href="/#work" variant="secondary" size="lg">
                All work
              </Button>
            </div>
          </SectionHeading>
        </Container>
      </Section>
    </>
  );
}
