/**
 * Portfolio content.
 *
 * The entries below are fictional sample projects that stand in until real
 * work is published. Replace them one by one with real projects.
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
  /** True for a fictional sample project. Samples never link anywhere and are left out of the sitemap. */
  placeholder: boolean;
  /** Visual style of the placeholder preview. Ignored when `image` is set. */
  preview?: "website" | "store" | "app";
  /**
   * Optional page at /work/<slug>. `challenge` and `solution` are required.
   * `result` is optional: describe what the client can now do (take bookings
   * online, orders without phone calls), never a percentage, revenue or traffic
   * figure — the brief's hard rules (docs/design-system.md §2) forbid case-study
   * results.
   */
  caseStudy?: {
    challenge: string;
    solution: string;
    result?: string;
  };
};

/*
 * Sample projects. The businesses below are fictional stand-ins so the section
 * looks finished before real work is published. They keep `placeholder: true`,
 * which means they never link anywhere, get no case-study page and stay out of
 * the sitemap. Swap each one for a real project as it goes live.
 */
export const projects: Project[] = [
  {
    slug: "marlow-lane-coffee",
    name: "Marlow Lane Coffee",
    summary:
      "A new website for an independent coffee shop: the menu, opening hours and table bookings on one fast page, easy to update from a phone.",
    category: "Website",
    stack: ["Next.js", "React"],
    placeholder: true,
    preview: "website",
  },
  {
    slug: "hollis-and-oak",
    name: "Hollis & Oak",
    summary:
      "A Shopify store for a small homeware brand: a custom theme, collection filtering and a checkout tuned for buying on mobile.",
    category: "Shopify store",
    stack: ["Shopify", "Liquid"],
    placeholder: true,
    preview: "store",
  },
  {
    slug: "fieldbook",
    name: "Fieldbook",
    summary:
      "An internal tool for a trades business: jobs, site surveys, invoices and a weekly overview in one place, replacing a shared spreadsheet.",
    category: "Web application",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    placeholder: true,
    preview: "app",
  },
];

export const realProjects = projects.filter((p) => !p.placeholder);
