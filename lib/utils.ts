import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Tailwind class merger, taught about the custom type scale and shadows
 * declared in app/globals.css so they merge against the built-ins correctly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xl", "display-lg", "display-md", "display-sm", "lead", "2xs"],
      shadow: ["card", "float", "lift", "glow", "inset-line"],
      ease: ["out-expo", "out-quart", "in-out-soft", "spring"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
