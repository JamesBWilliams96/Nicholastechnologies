import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { AppFrame } from "@/components/mockups/frames";
import {
  ClockIcon,
  CodeIcon,
  GlobeIcon,
  LockIcon,
  RefreshIcon,
  ServerIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import { DarkChip } from "./DarkChip";

/* ------------------------------------------------------------------
   A dark status dashboard for "yourbusiness.com": everything is fine,
   and someone is clearly looking after it. Illustrative only.

   Sized with container-query units so the mock scales with its frame;
   `max()` floors keep the type legible when the frame is narrow.
   Animations are paused until the parent InViewGroup sets data-inview.
   ------------------------------------------------------------------ */

const services = [
  { icon: ServerIcon, label: "Hosting", status: "Online" },
  { icon: LockIcon, label: "SSL certificate", status: "Valid" },
  { icon: RefreshIcon, label: "Backups", status: "Last night" },
  { icon: CodeIcon, label: "Dependencies", status: "Up to date" },
] as const;

const activity = [
  { icon: WrenchIcon, text: "Fixed checkout bug", when: "2h ago" },
  { icon: ClockIcon, text: "Updated opening hours", when: "Yesterday" },
  { icon: GlobeIcon, text: "Renewed domain", when: "Last week" },
] as const;

const UPTIME_DAYS = 60;
/** A couple of amber days so the timeline reads as real, not painted on. */
const degradedDays = new Set([17, 43]);
const uptime = Array.from({ length: UPTIME_DAYS }, (_, i) => i);

/* Type scale inside the frame */
const t = {
  body: "text-[max(2.15cqw,0.6875rem)]",
  title: "text-[max(3.2cqw,1rem)]",
  mono: "text-[max(1.8cqw,0.625rem)]",
  label: "text-[max(1.7cqw,0.625rem)]",
};

const playWhenInView =
  "motion-safe-only [.js_&]:[animation-play-state:paused] [.js_[data-inview]_&]:[animation-play-state:running]";

export function StatusMock() {
  return (
    <AppFrame chrome="dark" className="ring-white/12">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-[3cqw] border-b border-white/8 bg-ink-800 px-[3.6cqw] py-[2.3cqw]">
        <div className="flex min-w-0 items-center gap-[2.4cqw]">
          <div className="flex gap-[1.1cqw]">
            <span className="size-[1.7cqw] min-h-1.5 min-w-1.5 rounded-full bg-white/20" />
            <span className="size-[1.7cqw] min-h-1.5 min-w-1.5 rounded-full bg-white/20" />
            <span className="size-[1.7cqw] min-h-1.5 min-w-1.5 rounded-full bg-white/20" />
          </div>
          <span
            className={cn(
              "inline-flex min-w-0 items-center gap-[1.3cqw] rounded-[1cqw] bg-white/6 px-[1.9cqw] py-[1cqw] font-mono text-ink-200",
              t.mono,
            )}
          >
            <span className="size-[1.3cqw] min-h-1.5 min-w-1.5 shrink-0 rounded-full bg-ok" />
            <span className="truncate">status · yourbusiness.com</span>
          </span>
        </div>
        {/* Signed in: the studio mark, so the window reads as looked after */}
        <span className="inline-flex size-[max(3.6cqw,1.25rem)] shrink-0 items-center justify-center rounded-[max(0.9cqw,0.3rem)] bg-paper text-[max(1.9cqw,0.625rem)] font-semibold leading-none text-ink-950">
          N
        </span>
      </div>

      <div className="px-[4.4cqw] pb-[max(4.4cqw,1.5rem)] pt-[4cqw]">
        {/* Overall status */}
        <div className="flex items-start justify-between gap-[3cqw]">
          <div className="flex items-center gap-[2.2cqw]">
            <span className="relative flex size-[max(2.6cqw,0.75rem)] shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-ok/25" />
              <span className="size-[62%] rounded-full bg-ok animate-pulse-dot motion-safe-only" />
            </span>
            <span className={cn("font-semibold leading-none tracking-[-0.02em] text-paper", t.title)}>
              All systems operational
            </span>
          </div>
          <span className={cn("mt-[0.4cqw] shrink-0 font-mono text-ink-300", t.mono)}>
            Checked · just now
          </span>
        </div>

        {/* Uptime timeline */}
        <p className={cn("mt-[4cqw] font-mono uppercase tracking-[0.12em] text-ink-300", t.label)}>
          Uptime · last 60 days
        </p>
        <div className="mt-[1.8cqw] flex h-[max(3.6cqw,1.125rem)] gap-[0.45cqw]">
          {uptime.map((i) => (
            <span
              key={i}
              className={cn(
                "flex-1 origin-bottom rounded-[0.35cqw] animate-grow-bar",
                degradedDays.has(i) ? "bg-warn" : "bg-ok/85",
                playWhenInView,
              )}
              style={{ animationDelay: `${120 + i * 14}ms` } as CSSProperties}
            />
          ))}
        </div>
        <div className={cn("mt-[1.4cqw] flex justify-between font-mono text-ink-300", t.label)}>
          <span>60 days ago</span>
          <span>Today</span>
        </div>

        {/* Services */}
        <ul className="mt-[3.6cqw] divide-y divide-white/6 border-y border-white/8">
          {services.map((s) => (
            <li key={s.label} className={cn("flex items-center gap-[2.2cqw] py-[2cqw]", t.body)}>
              <span className="inline-flex size-[max(4.4cqw,1.5rem)] shrink-0 items-center justify-center rounded-[1cqw] bg-white/6 text-ink-200 ring-1 ring-white/8">
                <s.icon className="size-[55%]" />
              </span>
              <span className="font-medium text-paper">{s.label}</span>
              <DarkChip tone="ok" dot className={cn("ml-auto", t.label)}>
                {s.status}
              </DarkChip>
            </li>
          ))}
        </ul>

        {/* Recent activity */}
        <div className="mt-[3.4cqw] flex items-center justify-between">
          <span className={cn("font-mono uppercase tracking-[0.12em] text-ink-300", t.label)}>
            Recent activity
          </span>
          <span className={cn("font-mono text-ink-300", t.label)}>View all</span>
        </div>
        <ul className="mt-[1.2cqw]">
          {activity.map((a, i) => (
            <li
              key={a.text}
              className={cn(
                "flex items-center gap-[2.2cqw] py-[1.5cqw] animate-fade-up",
                t.body,
                playWhenInView,
              )}
              style={{ animationDelay: `${700 + i * 160}ms` } as CSSProperties}
            >
              <span className="inline-flex size-[max(4.4cqw,1.5rem)] shrink-0 items-center justify-center rounded-full bg-white/6 text-ink-300 ring-1 ring-white/8">
                <a.icon className="size-[52%]" />
              </span>
              <span className="text-ink-100">{a.text}</span>
              <span className={cn("ml-auto shrink-0 font-mono text-ink-300", t.mono)}>{a.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}
