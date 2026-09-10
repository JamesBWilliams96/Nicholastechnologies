/**
 * Classes for a CSS animation that waits for the nearest InViewGroup: paused
 * while JS is running, played once the group sets `data-inview`, and skipped
 * entirely under reduced motion.
 *
 * Lives in its own server-safe module rather than InViewGroup.tsx: that file
 * is "use client", so a string exported from it reaches a Server Component
 * as a client reference, not a string, and `cn()` silently drops it.
 */
export const playWhenInView =
  "motion-safe-only [.js_&]:[animation-play-state:paused] [.js_[data-inview]_&]:[animation-play-state:running]";
