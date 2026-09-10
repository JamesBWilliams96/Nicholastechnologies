"use client";

import { useLayoutEffect } from "react";
import { JS_CLASS, bootDocument } from "@/lib/theme";

/**
 * Safety net for the inline pre-paint script in the layout <head>. React never
 * executes script tags inside a client-rendered tree (the error shell behind a
 * 404, for instance), so on those renders the `js` flag and the saved theme
 * would otherwise never be applied. Runs before the browser paints the
 * hydrated tree; a no-op when the script already did its job.
 */
export function Boot() {
  useLayoutEffect(() => {
    if (!document.documentElement.classList.contains(JS_CLASS)) bootDocument();
  }, []);
  return null;
}
