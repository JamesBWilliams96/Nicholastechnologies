/**
 * Enquiry form contract — shared by the client form and the API route so
 * both sides validate the same way. Pure TypeScript: no React, no Node.
 */

export const TIMEFRAMES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In the next 1–3 months" },
  { value: "later-this-year", label: "Later this year" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type Timeframe = (typeof TIMEFRAMES)[number]["value"];

/** Maximum lengths (characters) per field. Enforced on both sides. */
export const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  project: 4000,
  budget: 160,
  extra: 2000,
} as const;

/** The raw shape the form posts. Every field is a string; blanks are allowed on optional ones. */
export type EnquiryInput = {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
  timeframe: string;
  extra: string;
  /** Honeypot. Real visitors never see it, so it must stay empty. */
  website: string;
};

export type EnquiryField = Exclude<keyof EnquiryInput, "website">;

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** A validated, trimmed enquiry ready to be delivered. */
export type Enquiry = {
  name: string;
  email: string;
  company?: string;
  project: string;
  budget?: string;
  timeframe?: Timeframe;
  extra?: string;
};

export type EnquiryValidation =
  | { ok: true; data: Enquiry; spam: boolean }
  | { ok: false; errors: EnquiryErrors };

export const EMPTY_ENQUIRY: EnquiryInput = {
  name: "",
  email: "",
  company: "",
  project: "",
  budget: "",
  timeframe: "",
  extra: "",
  website: "",
};

export const FIELD_ORDER: readonly EnquiryField[] = [
  "name",
  "email",
  "company",
  "project",
  "budget",
  "timeframe",
  "extra",
];

/**
 * Pragmatic email check: something@something.tld, no whitespace. Deliberately
 * not the full RFC 5322 grammar — a typo here is far more likely than an
 * exotic-but-valid address.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TIMEFRAME_VALUES = new Set<string>(TIMEFRAMES.map((t) => t.value));

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Trim, normalise line endings and strip control characters (keeps newlines and tabs). */
function clean(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[^\S\n]+$/gm, "")
    .trim();
}

/** Coerces anything (a parsed JSON body, form state) into the raw input shape. */
export function toEnquiryInput(value: unknown): EnquiryInput {
  const v = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return {
    name: str(v.name),
    email: str(v.email),
    company: str(v.company),
    project: str(v.project),
    budget: str(v.budget),
    timeframe: str(v.timeframe),
    extra: str(v.extra),
    website: str(v.website),
  };
}

/**
 * Validates an enquiry. Returns either the cleaned data (plus a `spam` flag
 * when the honeypot was filled) or a map of field → message.
 */
export function validateEnquiry(value: unknown): EnquiryValidation {
  const input = toEnquiryInput(value);
  const errors: EnquiryErrors = {};

  const name = clean(input.name).replace(/\s*\n\s*/g, " ");
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  const email = clean(input.email).replace(/\s+/g, "");
  if (!email) errors.email = "Please add an email address so I can reply.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    errors.email = "That email address doesn't look right. Please check it.";

  const company = clean(input.company).replace(/\s*\n\s*/g, " ");
  if (company.length > LIMITS.company)
    errors.company = `Please keep this under ${LIMITS.company} characters.`;

  const project = clean(input.project);
  if (!project) errors.project = "Tell me a little about what you're looking to build.";
  else if (project.length > LIMITS.project)
    errors.project = `Please keep this under ${LIMITS.project.toLocaleString("en-GB")} characters.`;

  const budget = clean(input.budget).replace(/\s*\n\s*/g, " ");
  if (budget.length > LIMITS.budget) errors.budget = `Please keep this under ${LIMITS.budget} characters.`;

  const timeframe = clean(input.timeframe);
  if (timeframe && !TIMEFRAME_VALUES.has(timeframe))
    errors.timeframe = "Please choose one of the options.";

  const extra = clean(input.extra);
  if (extra.length > LIMITS.extra)
    errors.extra = `Please keep this under ${LIMITS.extra.toLocaleString("en-GB")} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    spam: input.website.trim().length > 0,
    data: {
      name,
      email,
      project,
      ...(company ? { company } : {}),
      ...(budget ? { budget } : {}),
      ...(timeframe ? { timeframe: timeframe as Timeframe } : {}),
      ...(extra ? { extra } : {}),
    },
  };
}

export function timeframeLabel(value: Timeframe | undefined): string | undefined {
  return TIMEFRAMES.find((t) => t.value === value)?.label;
}

/** The first field (in form order) that has an error, for focus management. */
export function firstErrorField(errors: EnquiryErrors): EnquiryField | undefined {
  return FIELD_ORDER.find((f) => errors[f]);
}

/** Plain-text email body listing every field. No HTML, nothing clever. */
export function formatEnquiryText(data: Enquiry): string {
  const dash = "—";
  const lines = [
    "New enquiry via the website",
    "",
    `Name:       ${data.name}`,
    `Email:      ${data.email}`,
    `Business:   ${data.company ?? dash}`,
    `Budget:     ${data.budget ?? dash}`,
    `Timeframe:  ${timeframeLabel(data.timeframe) ?? dash}`,
    "",
    "What they're looking to build:",
    data.project,
    "",
    "Anything else:",
    data.extra ?? dash,
    "",
  ];
  return lines.join("\n");
}
