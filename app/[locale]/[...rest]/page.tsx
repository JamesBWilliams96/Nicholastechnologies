import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { robots: { index: false } };

/** Anything under a locale that isn't a real route renders the localised 404. */
export default function CatchAll() {
  notFound();
}
