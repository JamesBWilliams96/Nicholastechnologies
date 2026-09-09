"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    firstLinkRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[60] rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out-quart",
          scrolled || open
            ? "border-b border-line bg-paper/80 shadow-[0_1px_0_0_rgb(255_255_255/0.4)_inset] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="container-site flex h-16 items-center justify-between" aria-label="Primary">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-muted transition-colors duration-200 hover:bg-ink-950/5 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={site.cta.href} size="sm" arrow className="hidden md:inline-flex">
              {site.cta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-ink-950/5 md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
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
          "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-paper transition-[opacity,transform] duration-300 ease-out-quart md:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="container-site flex flex-1 flex-col pt-4 pb-8">
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between py-5 text-2xl font-semibold tracking-[-0.02em] text-fg"
                >
                  {item.label}
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Button href={site.cta.href} size="lg" arrow className="w-full" onClick={close} tabIndex={open ? 0 : -1}>
              {site.cta.label}
            </Button>
            <p className="mt-4 text-center font-mono text-xs text-subtle">{site.tagline}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
