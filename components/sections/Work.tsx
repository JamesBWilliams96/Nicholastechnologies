import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, realProjects } from "@/content/projects";
import { ProjectCard } from "./work/ProjectCard";

/**
 * Selected work. The first project takes a full row with its preview
 * beside the copy; the rest share a row. Every entry comes from
 * content/projects.ts — placeholders are labelled as such and never link.
 */
export function Work() {
  const [featured, ...rest] = projects;

  /* The intro stays honest whichever state the portfolio is in. */
  const description =
    realProjects.length > 0
      ? "A few recent projects. Every one of them designed, built and launched by me."
      : "The kinds of projects I take on, shown as sample interfaces. Real projects will take their place here as they go live.";

  return (
    <Section id="work" tone="paper">
      <Container>
        <SectionHeading eyebrow="Selected work" title="Things I've built." description={description} />

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {featured ? (
            <Reveal as="li" variant="scale" className="md:col-span-2">
              <ProjectCard project={featured} index={0} featured />
            </Reveal>
          ) : null}
          {rest.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={80 + i * 80}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
