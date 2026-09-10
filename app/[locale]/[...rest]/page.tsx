import { notFound } from "next/navigation";

/**
 * Anything under a locale that isn't a real route renders the localised 404.
 *
 * Metadata deliberately throws too: when only the page throws, Next resolves
 * this segment's ordinary metadata (default title, "index, follow") into the
 * flight data the browser hydrates from, and the head flips to that after
 * hydration. Throwing here makes Next resolve not-found.tsx's metadata on
 * both the server and the client, so the 404 keeps its own title and noindex.
 */
export function generateMetadata(): never {
  notFound();
}

export default function CatchAll() {
  notFound();
}
