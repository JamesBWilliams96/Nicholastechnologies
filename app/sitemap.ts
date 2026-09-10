import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { localeMeta, locales } from "@/lib/i18n/config";

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].tag] = `${site.url}/${l}${path}`;
  languages["x-default"] = `${site.url}/en${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const paths = ["", ...projects.filter((p) => !p.placeholder && p.caseStudy).map((p) => `/work/${p.slug}`)];
  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: path ? "yearly" : "monthly",
        priority: path ? 0.7 : 1,
        alternates: alternates(path),
      });
    }
  }
  return entries;
}
