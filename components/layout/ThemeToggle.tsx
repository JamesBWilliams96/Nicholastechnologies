"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/* The current theme lives on <html data-theme>. Watching the attribute keeps
   every toggle on the page in sync without any shared state. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
}

export function ThemeToggle({
  labels,
  className,
}: {
  labels: { label: string; light: string; dark: string };
  className?: string;
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={next === "dark" ? labels.dark : labels.light}
      title={labels.label}
      className={cn(
        "group inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg",
        className,
      )}
    >
      <span className="relative block size-[1.05rem]">
        <SunIcon
          className={cn(
            "absolute inset-0 size-full transition-[opacity,rotate,scale] duration-300 ease-out-quart",
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
        />
        <MoonIcon
          className={cn(
            "absolute inset-0 size-full transition-[opacity,rotate,scale] duration-300 ease-out-quart",
            theme === "dark" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
        />
      </span>
    </button>
  );
}
