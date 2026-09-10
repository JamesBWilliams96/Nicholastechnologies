import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, realProjects } from "@/content/projects";
import { ProjectCard } from "./work/ProjectCard";

type WorkProps = { locale: Locale; t: Dictionary["work"]; common: Dictionary["common"] };

/**
 * Selected work. The first project takes a full row with its preview
 * beside the copy; the rest share a row. Every entry comes from
 * content/projects.ts — sample projects never link.
 */
export function Work({ locale, t, common }: WorkProps) {
  const [featured, ...rest] = projects;
  // Title and description must agree: sample projects are never "things I've built".
  const hasRealWork = realProjects.length > 0;
  const heading = hasRealWork
    ? { title: t.titleReal, description: t.descriptionReal }
    : { title: t.titleSamples, description: t.descriptionSamples };

  return (
    <Section id="work" tone="paper">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={heading.title} description={heading.description} />

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {featured ? (
            <Reveal as="li" variant="scale" className="md:col-span-2">
              <ProjectCard project={featured} index={0} featured locale={locale} t={t} common={common} />
            </Reveal>
          ) : null}
          {rest.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={80 + i * 80}>
              <ProjectCard project={project} index={i + 1} locale={locale} t={t} common={common} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
