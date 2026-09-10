/**
 * Colour-scheme handling. The current theme lives on `<html data-theme>`:
 * `data-theme="dark"` for dark, no attribute for light. An explicit choice is
 * remembered in localStorage; otherwise the system preference applies.
 *
 * Two code paths apply the initial theme and must agree:
 *   1. `themeBootScript` — an inline <head> script that runs before first
 *      paint on normal server-rendered loads (no flash of the wrong mode).
 *   2. `bootDocument()` — the same logic in TypeScript, run by <Boot /> at
 *      hydration for renders where the inline script never executed (React
 *      does not run script tags inside client-rendered trees, e.g. the
 *      error shell behind a 404).
 * Keep them in step when changing either.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Flag class on <html> that lets the scroll reveals hide content until JS runs. */
export const JS_CLASS = "js";

/** Saved choice if there is one, otherwise the system preference. */
export function resolveInitialTheme(): Theme {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    /* storage blocked: fall through to the system preference */
  }
  if (saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches)) return "dark";
  return "light";
}

/** Reads the theme currently applied to the document. */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Applies a theme to the document and, by default, remembers it. */
export function applyTheme(theme: Theme, { persist = true } = {}) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  if (!persist) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
}

/** What the inline boot script does, for renders where it did not run. */
export function bootDocument() {
  document.documentElement.classList.add(JS_CLASS);
  applyTheme(resolveInitialTheme(), { persist: false });
}

/**
 * Inline pre-paint script — a plain string mirroring `bootDocument()` above.
 * Kept dependency-free and tiny because it blocks first paint.
 */
export const themeBootScript =
  `document.documentElement.classList.add('${JS_CLASS}');` +
  `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');` +
  `if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.dataset.theme='dark'}}catch(e){}`;
