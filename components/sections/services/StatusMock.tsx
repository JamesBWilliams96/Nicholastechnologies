import { cn } from "@/lib/utils";
import { Panel } from "@/components/mockups/frames";
import { MockDivider } from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   A system-status panel. A pulsing "operational" dot, uptime bars and
   a reserved activity line that fills in on hover ("Bug fix deployed").
   ------------------------------------------------------------------ */

const checks = [
  { label: "Hosting", status: "Operational" },
  { label: "SSL certificate", status: "Valid" },
  { label: "Backups", status: "Nightly" },
  { label: "Updates", status: "Up to date" },
];

const uptime = Array.from({ length: 30 }, (_, i) => i);

export function StatusMock() {
  return (
    <div className="@container">
      <Panel variant="solid" className="overflow-hidden">
        <div className="p-[4.5cqw]">
          <div className="flex items-center justify-between">
            <span className="text-[3.2cqw] font-semibold leading-none tracking-[-0.02em]">System status</span>
            <span className="font-mono text-[1.9cqw] text-ink-500">yourbusiness.com</span>
          </div>

          <div className="mt-[3.2cqw] flex items-center gap-[2cqw]">
            <span className="size-[2cqw] rounded-full bg-ok animate-pulse-dot motion-safe-only" />
            <span className="text-[2.6cqw] font-medium">All systems operational</span>
          </div>

          <div className="mt-[3cqw] flex h-[3cqw] gap-[0.5cqw]">
            {uptime.map((i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-[0.4cqw] bg-ok",
                  i % 7 === 3 ? "opacity-60" : "opacity-85",
                )}
              />
            ))}
          </div>
          <div className="mt-[1.6cqw] flex justify-between font-mono text-[1.7cqw] text-ink-500">
            <span>Last 30 days</span>
            <span>Last deploy · 2h ago</span>
          </div>

          <MockDivider className="my-[3.2cqw]" />

          <ul className="space-y-[2cqw]">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center justify-between text-[2.1cqw]">
                <span className="font-medium text-ink-800">{c.label}</span>
                <span className="inline-flex w-[21cqw] items-center gap-[1.4cqw] text-ink-500">
                  <span className="size-[1.4cqw] shrink-0 rounded-full bg-ok" />
                  {c.status}
                </span>
              </li>
            ))}
          </ul>

          <MockDivider className="my-[3.2cqw]" />

          <div className="flex items-center justify-between">
            <span className="font-mono text-[1.6cqw] uppercase tracking-[0.12em] text-ink-500">Activity</span>
          </div>
          {/* Reserved height so the reveal never shifts layout */}
          <div className="relative mt-[1.6cqw] h-[6cqw]">
            <div className="absolute inset-0 flex items-center gap-[1.6cqw] rounded-[1.4cqw] px-[2cqw] text-[2cqw] opacity-0 transition-[opacity,transform] duration-500 ease-out-expo translate-y-[0.8cqw] group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 bg-ok-soft/60">
              <span className="size-[1.4cqw] rounded-full bg-ok" />
              <span className="font-medium text-ink-800">Bug fix deployed</span>
              <span className="ml-auto font-mono text-[1.7cqw] text-ink-500">just now</span>
            </div>
            <div className="absolute inset-0 flex items-center gap-[1.6cqw] px-[2cqw] text-[2cqw] text-ink-500 transition-opacity duration-300 group-hover:opacity-0">
              <span className="size-[1.4cqw] rounded-full bg-ink-200" />
              <span>Dependencies updated</span>
              <span className="ml-auto font-mono text-[1.7cqw]">3d ago</span>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
