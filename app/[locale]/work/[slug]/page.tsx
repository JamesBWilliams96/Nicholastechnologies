import type { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params }: PageProps<"/[locale]/work/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || !isLocale(locale)) notFound();
  const path = `/work/${project.slug}`;

  /* One share image for both Open Graph and Twitter. A case study without a
     screenshot falls back to the locale's share image; Next resolves the
     layout's file-based opengraph-image only at the layout segment, so this
     page must carry the images itself or it unfurls with none. */
  const t = await getDictionary(locale);
  const inherited = (await parent).openGraph?.images ?? [];
  const images = project.image
    ? [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.image.alt }]
    : inherited.length > 0
      ? inherited
      : [{ url: `/${locale}/opengraph-image/share`, width: 1200, height: 630, alt: t.meta.ogAlt }];

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
      images,
    },
    /* Next replaces (not merges) `twitter` per segment, so the card type must be
       repeated, and the images set here so the Twitter card shows the project
       rather than the layout's generic share image. */
    twitter: { card: "summary_large_image", title: project.name, description: project.summary, images },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || !isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  return <CaseStudy project={project} locale={locale} t={t.caseStudy} work={t.work} />;
}
