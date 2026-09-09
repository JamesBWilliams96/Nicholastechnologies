import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { AppFrame } from "@/components/mockups/frames";
import { Bars, MockAvatar, MockButton, MockChip, Skeleton } from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   A small bookings dashboard. On hover the table rows light up in
   sequence — a staggered transition-delay, no JS.
   ------------------------------------------------------------------ */

const kpis = [
  { label: "Bookings this week", value: "24" },
  { label: "New clients", value: "6" },
  { label: "Open slots", value: "9" },
];

const rows = [
  { time: "09:00", service: "Consultation", initial: "J", hue: 0, status: "Confirmed", tone: "ok" as const },
  { time: "10:30", service: "Site visit", initial: "M", hue: 1, status: "Pending", tone: "warn" as const },
  { time: "13:00", service: "Follow-up", initial: "S", hue: 2, status: "Confirmed", tone: "ok" as const },
  { time: "15:30", service: "Installation", initial: "A", hue: 3, status: "Requested", tone: "neutral" as const },
  { time: "17:00", service: "Repair", initial: "R", hue: 4, status: "Confirmed", tone: "ok" as const },
];

export function DashboardMock() {
  return (
    <AppFrame>
      <div className="grid aspect-[16/10] grid-cols-[11cqw_1fr] overflow-hidden">
        {/* sidebar */}
        <div className="flex flex-col items-center gap-[2.4cqw] border-r border-ink-950/6 bg-ink-50 py-[3cqw]">
          <span className="size-[4cqw] rounded-[1.1cqw] bg-ink-950" />
          <div className="mt-[1cqw] flex flex-col gap-[1.8cqw]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={cn(
                  "size-[3.6cqw] rounded-[1cqw]",
                  i === 1 ? "bg-white ring-1 ring-ink-950/10" : "bg-ink-200/70",
                )}
              />
            ))}
          </div>
        </div>

        {/* main */}
        <div className="p-[3.2cqw]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[1.6cqw]">
              <span className="text-[3cqw] font-semibold leading-none tracking-[-0.02em]">Bookings</span>
              <MockChip tone="neutral" className="text-[1.6cqw]">
                This week
              </MockChip>
            </div>
            <div className="flex items-center gap-[1.6cqw] text-[1.8cqw]">
              <Skeleton width="10cqw" className="h-[1.2cqw]" />
              <MockButton tone="dark" className="h-[4.4cqw] px-[2.2cqw]">
                New booking
              </MockButton>
            </div>
          </div>

          {/* KPI tiles */}
          <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-[1.6cqw] p-[2.2cqw] ring-1 ring-ink-950/6">
                <p className="font-mono text-[1.5cqw] uppercase tracking-[0.1em] text-ink-500">{k.label}</p>
                <p className="mt-[1cqw] text-[4cqw] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                  {k.value}
                </p>
              </div>
            ))}
          </div>

          {/* table + chart */}
          <div className="mt-[2.4cqw] grid grid-cols-[1.55fr_1fr] gap-[2cqw]">
            <div className="overflow-hidden rounded-[1.6cqw] ring-1 ring-ink-950/6">
              <div className="grid grid-cols-[7cqw_1fr_1fr_auto] items-center gap-[1.6cqw] border-b border-ink-950/6 bg-ink-50 px-[2.2cqw] py-[1.4cqw] font-mono text-[1.4cqw] uppercase tracking-[0.1em] text-ink-500">
                <span>Time</span>
                <span>Service</span>
                <span>Client</span>
                <span className="w-[10cqw]">Status</span>
              </div>
              <ul>
                {rows.map((r, i) => (
                  <li
                    key={r.time}
                    style={{ "--d": `${i * 110}ms` } as CSSProperties}
                    className="relative isolate grid grid-cols-[7cqw_1fr_1fr_auto] items-center gap-[1.6cqw] border-b border-ink-950/5 px-[2.2cqw] py-[1.7cqw] text-[1.8cqw] transition-colors duration-300 ease-out-quart last:border-b-0 motion-ok:group-hover:bg-accent-50 motion-ok:group-hover:[transition-delay:var(--d)] before:absolute before:inset-0 before:-z-10 before:bg-white before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] motion-ok:group-hover:before:opacity-100 motion-ok:group-hover:before:[transition-delay:calc(var(--d)+520ms)]"
                  >
                    <span className="font-mono text-ink-500 tabular-nums">{r.time}</span>
                    <span className="truncate font-medium text-ink-800">{r.service}</span>
                    <span className="flex items-center gap-[1.2cqw]">
                      <MockAvatar initials={r.initial} hue={r.hue} className="size-[3.2cqw] text-[1.4cqw]" />
                      <Skeleton width="60%" className="h-[1.1cqw]" />
                    </span>
                    {r.tone === "warn" ? (
                      <span className="relative w-[10cqw] text-[1.4cqw]">
                        <MockChip tone="warn" className="w-full justify-center transition-opacity duration-300 group-hover:opacity-0 group-hover:delay-[420ms]">
                          {r.status}
                        </MockChip>
                        <MockChip tone="ok" className="absolute inset-0 w-full justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-[420ms]">
                          Confirmed
                        </MockChip>
                      </span>
                    ) : (
                      <MockChip tone={r.tone} className="w-[10cqw] justify-center text-[1.4cqw]">
                        {r.status}
                      </MockChip>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.6cqw] p-[2.2cqw] ring-1 ring-ink-950/6">
              <div className="flex items-center justify-between">
                <span className="text-[1.9cqw] font-semibold">Bookings by day</span>
                <span className="font-mono text-[1.4cqw] text-ink-500">7d</span>
              </div>
              <Bars
                values={[0.45, 0.7, 0.55, 0.85, 0.6, 1, 0.35]}
                accentIndex={5}
                className="mt-[2.4cqw] h-[16cqw] gap-[1cqw]"
              />
              <div className="mt-[1.2cqw] flex justify-between font-mono text-[1.3cqw] text-ink-500">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="flex-1 text-center">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
