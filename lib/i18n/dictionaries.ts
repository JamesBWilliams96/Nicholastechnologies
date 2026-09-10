import "server-only";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "./config";

/* Loaded on demand so each locale's copy is only read on the server when needed. */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/i18n/en").then((m) => m.en),
  sk: () => import("@/content/i18n/sk").then((m) => m.sk),
  cs: () => import("@/content/i18n/cs").then((m) => m.cs),
  de: () => import("@/content/i18n/de").then((m) => m.de),
  pl: () => import("@/content/i18n/pl").then((m) => m.pl),
  hu: () => import("@/content/i18n/hu").then((m) => m.hu),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
