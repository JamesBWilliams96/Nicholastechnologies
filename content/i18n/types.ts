import type { ProjectCategory } from "@/content/projects";
import type { Timeframe } from "@/lib/enquiry";

type Item = { title: string; text: string };

/**
 * Every piece of visible copy on the site, in one language. `en.ts` is the
 * reference; the other files must have exactly the same shape.
 * Interface mockups keep their own (English) sample text, except the few
 * diagrams that carry a section's message.
 */
export type Dictionary = {
  meta: {
    /** <title> of the homepage. */
    title: string;
    /** Meta description, kept under ~155 characters. */
    description: string;
    /** Longer description for Open Graph and structured data. */
    ogDescription: string;
    /** Alt text of the share image. */
    ogAlt: string;
    /** Subtitle drawn on the share image. */
    ogSubtitle: string;
  };
  common: {
    skipToContent: string;
    startProject: string;
    /** aria-label suffix on the logo link: "{site} — home". */
    home: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    theme: { label: string; light: string; dark: string };
    opensNewTab: string;
  };
  nav: { work: string; services: string; process: string; about: string; contact: string };
  footer: { tagline: string; rights: string; builtBy: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    primary: string;
    secondary: string;
    proof: readonly [string, string, string];
  };
  positioning: {
    titleA: string;
    titleB: string;
    points: readonly [Item, Item, Item, Item];
  };
  services: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    description: string;
    items: readonly [
      { title: string; description: string; tags: readonly string[] },
      { title: string; description: string; tags: readonly string[] },
      { title: string; description: string; tags: readonly string[] },
      { title: string; description: string; tags: readonly string[] },
    ];
    closingText: string;
    closingLink: string;
  };
  work: {
    eyebrow: string;
    /** Heading while only sample projects are shown — must not claim built work. */
    titleSamples: string;
    /** Heading once at least one real project is published. */
    titleReal: string;
    descriptionSamples: string;
    descriptionReal: string;
    liveSite: string;
    caseStudy: string;
    categories: Record<ProjectCategory, string>;
    /** Summaries of the sample projects, keyed by slug. */
    projects: Record<string, { summary: string }>;
  };
  studio: {
    eyebrow: string;
    titleMuted: string;
    titleBright: string;
    body: string;
    cta: string;
    diagram: {
      agencyLabel: string;
      chain: readonly [string, string, string, string, string, string];
      you: string;
      person: string;
      stagesLabel: string;
      stages: readonly [string, string, string, string];
      captionA: string;
      captionB: string;
    };
    highlights: readonly [Item, Item, Item, Item];
  };
  fixedPrice: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    description: string;
    steps: readonly [Item, Item, Item, Item];
    proposal: {
      title: string;
      subtitle: string;
      subtitleSuffix: string;
      items: readonly [
        { label: string; value: string },
        { label: string; value: string },
        { label: string; value: string },
        { label: string; value: string },
      ];
      total: string;
      totalValue: string;
      totalNote: string;
      acceptedBy: string;
      approved: string;
    };
    scopeCall: {
      title: string;
      notes: string;
      items: readonly [string, string, string, string];
      next: string;
    };
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    ariaLabel: string;
    steps: readonly [Item, Item, Item, Item, Item];
    closingText: string;
    closingCta: string;
  };
  stack: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    description: string;
    tools: readonly [{ text: string }, { text: string; note: string }, { text: string }];
    builder: {
      label: string;
      question: string;
      options: readonly [
        { label: string; why: string },
        { label: string; why: string },
        { label: string; why: string },
        { label: string; why: string; extra: string },
      ];
      recommended: string;
      yourProject: string;
      footnote: string;
      link: string;
    };
  };
  about: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    focusLabel: string;
    focus: readonly [Item, Item, Item, Item, Item];
    photo: string;
  };
  support: {
    eyebrow: string;
    title: string;
    description: string;
    included: readonly [string, string, string, string, string, string];
    codaA: string;
    codaB: string;
    cta: string;
    ticket: { label: string; ago: string; title: string; open: string; resolved: string; reply: string };
  };
  contact: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    expectLabel: string;
    expectations: readonly [Item, Item, Item];
    preferEmail: string;
    emailSubject: string;
  };
  form: {
    aboutYou: string;
    theProject: string;
    optional: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    project: string;
    projectPlaceholder: string;
    budget: string;
    budgetPlaceholder: string;
    budgetHint: string;
    timeframe: string;
    timeframePlaceholder: string;
    timeframes: Record<Timeframe, string>;
    extra: string;
    extraPlaceholder: string;
    submit: string;
    submitting: string;
    reassurance: string;
    success: { title: string; lead: string; steps: readonly [string, string, string]; again: string };
    errorGeneric: string;
    errorKept: string;
    errorRetry: string;
    /** "{email}" is replaced with a mailto link. */
    errorEmail: string;
    checkOne: string;
    /** "{count}" is replaced with the number of fields. */
    checkMany: string;
    validation: {
      name: string;
      nameLong: string;
      email: string;
      emailInvalid: string;
      tooLong: string;
      project: string;
      timeframe: string;
    };
  };
  notFound: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lead: string;
    home: string;
    cta: string;
  };
  caseStudy: {
    back: string;
    label: string;
    challenge: string;
    solution: string;
    result: string;
    nextEyebrow: string;
    nextTitle: string;
    nextLead: string;
    cta: string;
    allWork: string;
  };
};
