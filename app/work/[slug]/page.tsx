import type { Metadata } from "next";
import { site } from "@/content/site";
import { notFound } from "next/navigation";
import { realProjects } from "@/content/projects";
import { CaseStudy, type CaseStudyProject } from "@/components/sections/work/CaseStudy";

/* ------------------------------------------------------------------
   Case study page: /work/[slug]
   Only real projects with a `caseStudy` get a page. Placeholders and
   unknown slugs 404.
   ------------------------------------------------------------------ */

type Params = { slug: string };

const caseStudies = realProjects.filter((p): p is CaseStudyProject => Boolean(p.caseStudy));

function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

export function generateStaticParams(): Params[] {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_GB",
      url: `/work/${project.slug}`,
      title: project.name,
      description: project.summary,
      ...(project.image
        ? {
            images: [
              {
                url: project.image.src,
                width: project.image.width,
                height: project.image.height,
                alt: project.image.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
