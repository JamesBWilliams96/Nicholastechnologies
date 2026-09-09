/**
 * Portfolio content.
 *
 * Every entry below is a clearly labelled placeholder. Replace them with real
 * projects as they become available — nothing on the site is invented.
 *
 * To add a real project:
 *  1. Set `placeholder: false`.
 *  2. Fill in the name, summary, category, stack and (optionally) `href`.
 *  3. Add a screenshot to /public/work/<slug>.png (or .jpg) and set `image`.
 *  4. Optionally add a `caseStudy` — it gets its own page at /work/<slug>.
 */

export type ProjectCategory =
  | "Website"
  | "Landing page"
  | "Shopify store"
  | "Web application"
  | "Client portal"
  | "Internal tool"
  | "Booking system";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  category: ProjectCategory;
  stack: string[];
  /** Public URL of the live project, if any. */
  href?: string;
  /** Screenshot path under /public, e.g. "/work/my-project.png". */
  image?: { src: string; alt: string; width: number; height: number };
  /** True while this entry is an unfilled slot. Placeholders never link anywhere. */
  placeholder: boolean;
  /** Visual style of the placeholder preview. Ignored when `image` is set. */
  preview?: "website" | "store" | "app";
  caseStudy?: {
    challenge: string;
    solution: string;
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "Project name",
    summary:
      "A short description of the project: who it was for, what it needed to do and what was built.",
    category: "Website",
    stack: ["Next.js", "React"],
    placeholder: true,
    preview: "website",
  },
  {
    slug: "project-two",
    name: "Project name",
    summary:
      "A short description of the project: who it was for, what it needed to do and what was built.",
    category: "Shopify store",
    stack: ["Shopify", "Liquid"],
    placeholder: true,
    preview: "store",
  },
  {
    slug: "project-three",
    name: "Project name",
    summary:
      "A short description of the project: who it was for, what it needed to do and what was built.",
    category: "Web application",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    placeholder: true,
    preview: "app",
  },
];

export const realProjects = projects.filter((p) => !p.placeholder);
