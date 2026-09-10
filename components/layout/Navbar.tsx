"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LanguageList, LanguageMenu } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
  /** One-line summary of the services, shown under the mobile menu's CTA. */
  tagline: string;
};

export function Navbar({ locale, nav, common, tagline }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: nav.work, href: localePath(locale, "#work") },
    { label: nav.services, href: localePath(locale, "#services") },
    { label: nav.process, href: localePath(locale, "#process") },
    { label: nav.about, href: localePath(locale, "#about") },
  ];
  const cta = localePath(locale, "#contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Flip the bar to the dark tone while it overlaps a dark section. Re-collect the
     targets on every route change: this component persists across client navigations. */
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main .tone-dark, footer.tone-dark"));
    if (targets.length === 0) return;
    const active = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const observe = () => {
      io?.disconnect();
      active.clear();
      const band = 40;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target);
            else active.delete(entry.target);
          }
          setOverDark(active.size > 0);
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - band)}px 0px`, threshold: 0 },
      );
      targets.forEach((t) => io?.observe(t));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    /* Everything behind the menu is inert, so Tab stays inside the header. */
    const outside = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    outside.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      /* Wrap Tab / Shift+Tab between the first and last controls left in the header. */
      if (e.key !== "Tab") return;
      const header = toggleRef.current?.closest("header");
      if (!header) return;
      const focusable = Array.from(header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.tabIndex >= 0 && el.getClientRects().length > 0,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    firstLinkRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      outside.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50", overDark && "tone-dark")}>
      <a
        href="#main"
        /* #main is inert while the menu is open, so the skip link leaves the tab order too */
        tabIndex={open ? -1 : undefined}
        className="sr-only left-4 top-4 z-[60] rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:absolute"
      >
        {common.skipToContent}
      </a>

      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out-quart",
          scrolled || open
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="container-site flex h-16 items-center justify-between" aria-label="Primary">
          <Logo href={localePath(locale)} homeLabel={common.home} />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-md font-medium text-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageMenu locale={locale} label={common.language} className="hidden md:block" />
            <ThemeToggle labels={common.theme} />
            <div className="ml-1 hidden md:flex">
              <Button href={cta} size="sm" arrow>
                {common.startProject}
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-fg/5 md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? common.closeMenu : common.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-bg transition-[opacity,translate] duration-300 ease-out-quart md:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
        /* inert keeps every link inside out of the tab order and the accessibility tree while closed */
        inert={!open}
      >
        <div className="container-site flex flex-1 flex-col pt-4 pb-8">
          <nav aria-label="Menu">
            <ul className="flex flex-col">
              {links.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-5 text-2xl font-semibold tracking-[-0.02em] text-fg"
                  >
                    {item.label}
                    <span aria-hidden className="font-mono text-xs text-muted">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <p className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
              {common.language}
            </p>
            <LanguageList locale={locale} label={common.language} className="mt-3" />
          </div>

          <div className="mt-auto pt-8">
            <Button href={cta} size="lg" arrow className="w-full" onClick={close}>
              {common.startProject}
            </Button>
            <p className="mt-4 text-center font-mono text-xs text-muted">{tagline}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
