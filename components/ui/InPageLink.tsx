"use client";

import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

type InPageLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/**
 * A native anchor for links to a fragment on the same site.
 *
 * Next's `<Link>` handles `/#id` client-side: it scrolls, but never moves the
 * sequential-focus starting point, so the next Tab jumps back to the link.
 * Native fragment navigation does both. When the target lives on the page we
 * are already on, the href is reduced to a bare `#id` so the browser stays in
 * the same document even when the URL carries a query string (UTM links).
 * Elsewhere (the 404 page, `/work/[slug]`) the full path is kept and the
 * browser lands on the section after a normal load.
 */
export function InPageLink({ href, ...rest }: InPageLinkProps) {
  const pathname = usePathname();
  const hashAt = href.indexOf("#");
  const path = href.slice(0, hashAt);
  const hash = href.slice(hashAt);
  const samePage = !path || (pathname !== null && trimSlash(path) === trimSlash(pathname));
  return <a href={samePage ? hash : href} {...rest} />;
}
