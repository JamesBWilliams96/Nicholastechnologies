import { clsx, type ClassValue } from "clsx";

/**
 * Joins class names (clsx). Deliberately not tailwind-merge: a later class
 * never overrides an earlier one, so primitives expose props (`tone`,
 * `height`, `shadow`, `style`) for anything a caller may need to change, and
 * conditional classes are written as either/or ternaries rather than
 * base-then-override. Keeps the client bundle free of the merge tables.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
