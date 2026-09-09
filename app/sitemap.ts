import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
  for (const project of projects) {
    if (project.placeholder || !project.caseStudy) continue;
    entries.push({
      url: `${site.url}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    });
  }
  return entries;
}
