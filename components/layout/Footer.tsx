import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n/types";
import { fmt, localePath, type Locale } from "@/lib/i18n/config";
import { Logo } from "@/components/ui/Logo";
import { LanguageList } from "./LanguageSwitcher";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
  common: Dictionary["common"];
};

export function Footer({ locale, nav, footer, common }: FooterProps) {
  const links = [
    { label: nav.work, href: localePath(locale, "#work") },
    { label: nav.services, href: localePath(locale, "#services") },
    { label: nav.process, href: localePath(locale, "#process") },
    { label: nav.about, href: localePath(locale, "#about") },
    { label: nav.contact, href: localePath(locale, "#contact") },
  ];

  return (
    <footer className="tone-dark bg-bg text-fg">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-t border-line py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo href={localePath(locale)} homeLabel={common.home} />
            <p className="mt-4 text-sm text-muted">{footer.tagline}</p>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                {site.email}
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-muted transition-colors hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageList locale={locale} label={common.language} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{fmt(footer.rights, { site: site.name })}</p>
          <p>{fmt(footer.builtBy, { site: site.name })}</p>
        </div>
      </div>
    </footer>
  );
}
