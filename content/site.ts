/**
 * Site-wide facts and copy. Anything a future edit is likely to touch
 * (name, URL, navigation, contact details) lives here.
 */

/** The canonical production origin. Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
export const PRODUCTION_URL = "https://nicholastechnology.dev";

/**
 * Resolves the absolute origin used for canonical URLs, Open Graph, JSON-LD,
 * the sitemap and robots.txt. Tolerates the ways hosting dashboards commonly
 * mangle the variable — unset, empty, missing scheme, trailing slash — and
 * never produces a value that `new URL()` would reject.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      console.warn(
        `[site] Ignoring invalid NEXT_PUBLIC_SITE_URL "${raw}"; falling back to ${PRODUCTION_URL}.`,
      );
    }
  }
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : PRODUCTION_URL;
}

const siteUrl = resolveSiteUrl();

export const site = {
  name: "Nicholas Technologies",
  url: siteUrl,
  tagline: "Websites, web apps & technical support.",
  /** Used for the <title> of the homepage. */
  title: "Nicholas Technologies — Websites, Shopify stores & custom web apps",
  description:
    "Nicholas Technologies is a one-person software studio building high-quality websites, Shopify stores and small custom web apps for local businesses and early-stage startups. Fixed-price projects, direct communication and support after launch.",
  /** Currency symbol shown inside illustrative interface mockups. */
  currency: "£",
  /**
   * Optional public contact email. Set NEXT_PUBLIC_CONTACT_EMAIL to show it
   * in the footer and as a fallback if the enquiry form can't send.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
  ],
  cta: { label: "Start a project", href: "/#contact" },
  footerLinks: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type NavLink = (typeof site.nav)[number];
