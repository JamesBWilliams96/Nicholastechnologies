import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-dark bg-bg text-fg">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-t border-line py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted">{site.tagline}</p>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                {site.email}
              </a>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              {site.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed and built by {site.name}.</p>
        </div>
      </div>
    </footer>
  );
}
