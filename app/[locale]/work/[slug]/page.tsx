import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { realProjects } from "@/content/projects";
import { CaseStudy, type CaseStudyProject } from "@/components/sections/work/CaseStudy";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, localeMeta, locales } from "@/lib/i18n/config";
import { languageAlternates } from "../../page";

/* ------------------------------------------------------------------
   Case study page: /[locale]/work/[slug]
   Only real projects with a `caseStudy` get a page. Samples and unknown
   slugs 404.
   ------------------------------------------------------------------ */

type Params = { locale: string; slug: string };

const caseStudies = realProjects.filter((p): p is CaseStudyProject => Boolean(p.caseStudy));

function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => caseStudies.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || !isLocale(locale)) notFound();
  const path = `/work/${project.slug}`;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: localeMeta[locale].og,
      url: `/${locale}${path}`,
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

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || !isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  return <CaseStudy project={project} locale={locale} t={t.caseStudy} work={t.work} />;
}
