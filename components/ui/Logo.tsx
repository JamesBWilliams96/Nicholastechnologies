import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" className="fill-fg" />
      <path
        d="M10.5 22V10l11 12V10"
        className="stroke-bg"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-[0.9375rem] font-semibold tracking-[-0.02em] text-fg",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark />
      <span>{site.name}</span>
    </Link>
  );
}
