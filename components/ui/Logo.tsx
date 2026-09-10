import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The mark: a small browser window with a cobalt cursor line inside it —
 * the same object the site's interface mockups are built from. Fills follow
 * the tone tokens, so it flips correctly on dark sections. Size it with
 * `className` (`size-*`).
 */
export function LogoMark({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="28" height="26" rx="8" className="fill-fg" />
      <path d="M2 11.25h28" className="stroke-bg" strokeWidth="2" />
      <circle cx="8" cy="7.1" r="1.7" className="fill-bg" />
      <rect x="8" y="16" width="10" height="3.6" rx="1.8" className={cn("fill-accent-500", animate && "logo-cursor")} />
      <rect x="8" y="22.2" width="16" height="3" rx="1.5" className="fill-bg opacity-35" />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
  homeLabel = "home",
}: {
  className?: string;
  href?: string;
  homeLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md text-md font-semibold tracking-[-0.02em] text-fg",
        className,
      )}
      aria-label={`${site.name} — ${homeLabel}`}
    >
      <LogoMark className="size-7" animate />
      <span>{site.name}</span>
    </Link>
  );
}
