import type { ComponentType } from "react";
import { site } from "@/content/site";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/mockups/frames";
import {
  ImageBlock,
  MockAvatar,
  MockButton,
  MockChip,
  Skeleton,
  Sparkline,
} from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   Generated previews for unfilled portfolio slots. Three distinct
   interfaces — a local-business website, a Shopify-style collection
   page and a dark web app — drawn entirely in HTML/CSS and scaled
   with container-query units so they stay crisp at any frame size.
   Everything here is illustrative sample data, never a real client.
   ------------------------------------------------------------------ */

export type PreviewVariant = NonNullable<Project["preview"]>;

const urls: Record<PreviewVariant, string> = {
  website: "yourbusiness.com",
  store: "yourstore.com",
  app: "app.yourbusiness.com",
};

/** A café-style marketing site with a centred hero and a wide image. */
function WebsiteMock() {
  return (
    <div className="relative aspect-[16/11] overflow-hidden bg-white text-ink-950">
      {/* nav */}
      <div className="flex items-center justify-between px-[4.5cqw] py-[2.4cqw]">
        <div className="flex items-center gap-[1.2cqw]">
          <span className="size-[3.2cqw] rounded-[0.9cqw] bg-ink-950" />
          <Skeleton width="8cqw" className="h-[1.2cqw] bg-ink-950" />
        </div>
        <div className="flex gap-[2.8cqw]">
          {[5, 4, 6, 4].map((w, i) => (
            <Skeleton key={i} width={`${w}cqw`} className="h-[1.1cqw]" />
          ))}
        </div>
        <MockButton tone="dark" className="text-[1.6cqw]">
          Book a table
        </MockButton>
      </div>

      {/* centred hero */}
      <div className="mx-auto mt-[2.6cqw] flex w-[64%] flex-col items-center text-center">
        <span className="font-mono text-[1.5cqw] font-medium uppercase tracking-[0.14em] text-accent-600">
          Open seven days a week
        </span>
        <p className="mt-[1.8cqw] text-[5.4cqw] font-semibold leading-[1.02] tracking-[-0.03em]">
          Good coffee. No fuss.
        </p>
        <div className="mt-[2.4cqw] flex w-full flex-col items-center gap-[1.2cqw]">
          <Skeleton width="76%" className="h-[1.2cqw]" />
          <Skeleton width="48%" className="h-[1.2cqw]" />
        </div>
        <div className="mt-[3cqw] flex gap-[1.4cqw] text-[1.8cqw]">
          <MockButton tone="dark">View the menu</MockButton>
          <MockButton tone="light">Find us</MockButton>
        </div>
      </div>

      {/* wide image with a floating card */}
      <div className="relative mx-[4.5cqw] mt-[4.5cqw]">
        <ImageBlock variant="warm" className="aspect-[2/1] rounded-[2.2cqw]">
          <div className="absolute left-[4%] top-[9%] rounded-[1.4cqw] bg-white/92 px-[2cqw] py-[1.6cqw] shadow-card backdrop-blur">
            <p className="font-mono text-[1.3cqw] uppercase tracking-[0.12em] text-ink-500">
              Today
            </p>
            <p className="mt-[0.5cqw] text-[2cqw] font-semibold">Open until 17:00</p>
          </div>
          <div className="absolute right-[4%] top-[9%] flex gap-[0.8cqw]">
            {["Breakfast", "Lunch", "Cakes"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-[1.4cqw] py-[0.7cqw] text-[1.3cqw] font-medium leading-none",
                  i === 0 ? "bg-ink-950 text-white" : "bg-white/85 text-ink-700",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </ImageBlock>
      </div>
    </div>
  );
}

const products = [
  { name: "Linen apron", price: 28, variant: "warm", badge: "New", tone: "dark" },
  { name: "Stoneware mug", price: 14, variant: "mono" },
  { name: "Oak serving board", price: 36, variant: "cool" },
  { name: "Beeswax candles", price: 12, variant: "mono" },
  { name: "Wool throw", price: 64, variant: "warm", badge: "Low stock", tone: "warn" },
  { name: "Enamel jug", price: 22, variant: "cool" },
] as const;

/** A Shopify-style collection page. */
function StoreMock() {
  return (
    <div className="relative aspect-[16/11] overflow-hidden bg-white text-ink-950">
      <div className="bg-ink-950 py-[1cqw] text-center font-mono text-[1.25cqw] uppercase tracking-[0.14em] text-white/80">
        Free delivery on orders over {site.currency}40
      </div>

      {/* nav */}
      <div className="flex items-center justify-between px-[4.5cqw] py-[2.2cqw]">
        <span className="text-[2.4cqw] font-semibold tracking-tight">Store</span>
        <div className="flex gap-[2.8cqw]">
          {[6, 5, 4, 5].map((w, i) => (
            <Skeleton key={i} width={`${w}cqw`} className="h-[1.1cqw]" />
          ))}
        </div>
        <div className="flex items-center gap-[1.4cqw]">
          <span className="size-[3.2cqw] rounded-full bg-ink-50" />
          <span className="relative size-[3.2cqw] rounded-full bg-ink-50">
            <span className="absolute -right-[0.5cqw] -top-[0.5cqw] flex size-[1.8cqw] items-center justify-center rounded-full bg-accent-500 text-[1.1cqw] font-semibold leading-none text-white">
              2
            </span>
          </span>
        </div>
      </div>

      {/* collection header + filters */}
      <div className="flex items-end justify-between px-[4.5cqw] pt-[0.8cqw]">
        <div>
          <span className="font-mono text-[1.3cqw] uppercase tracking-[0.14em] text-ink-500">
            Collection
          </span>
          <p className="mt-[0.6cqw] text-[4cqw] font-semibold leading-none tracking-[-0.03em]">
            New arrivals
          </p>
        </div>
        <div className="flex gap-[0.8cqw] text-[1.4cqw]">
          <MockChip tone="dark">All</MockChip>
          <MockChip>Kitchen</MockChip>
          <MockChip>Textiles</MockChip>
          <MockChip>Gifts</MockChip>
        </div>
      </div>

      {/* product grid */}
      <div className="mt-[3cqw] grid grid-cols-3 gap-x-[2.4cqw] gap-y-[3cqw] px-[4.5cqw]">
        {products.map((p) => (
          <div key={p.name}>
            <ImageBlock variant={p.variant} className="aspect-[4/5] rounded-[1.6cqw]">
              {"badge" in p ? (
                <MockChip tone={p.tone} className="absolute left-[6%] top-[6%] text-[1.2cqw]">
                  {p.badge}
                </MockChip>
              ) : null}
            </ImageBlock>
            <div className="mt-[1.4cqw] flex items-baseline justify-between gap-[1cqw]">
              <span className="truncate text-[1.75cqw] font-medium">{p.name}</span>
              <span className="font-mono text-[1.55cqw] text-ink-500 tabular-nums">
                {site.currency}
                {p.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const navItems = ["Overview", "Jobs", "Clients", "Invoices", "Settings"];
const kpis = [
  { label: "Open jobs", value: "12", delta: "+3", tone: "accent" },
  { label: "Due this week", value: "5", delta: "On track", tone: "ok" },
  { label: "Paid on time", value: "92%", delta: "+4%", tone: "ok" },
] as const;
const invoices = [
  { width: "46%", status: "Paid", tone: "ok", hue: 0 },
  { width: "58%", status: "Due", tone: "warn", hue: 1 },
  { width: "40%", status: "Paid", tone: "ok", hue: 3 },
  { width: "52%", status: "Draft", tone: "dark", hue: 2 },
] as const;
const jobs = [
  { title: "Site survey", when: "Tue 09:30", status: "Booked", tone: "accent", hue: 1 },
  { title: "Boiler service", when: "Wed 14:00", status: "In progress", tone: "warn", hue: 3 },
  { title: "Annual inspection", when: "Fri 11:00", status: "Booked", tone: "accent", hue: 0 },
] as const;

/** A dark internal tool / client portal dashboard. */
function AppMock() {
  return (
    <div className="relative grid aspect-[16/11] grid-cols-[19%_1fr] overflow-hidden bg-ink-900 text-paper">
      {/* sidebar */}
      <aside className="flex flex-col border-r border-white/8 bg-ink-950/50 p-[2cqw]">
        <div className="flex items-center gap-[1cqw]">
          <span className="size-[2.6cqw] rounded-[0.7cqw] bg-accent-500" />
          <Skeleton tone="dark" width="7cqw" className="h-[1.1cqw] bg-white/40" />
        </div>
        <ul className="mt-[3.2cqw] space-y-[0.6cqw]">
          {navItems.map((label, i) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-[1.1cqw] rounded-[0.9cqw] px-[1.1cqw] py-[0.9cqw] text-[1.45cqw]",
                i === 0 ? "bg-white/8 text-paper" : "text-ink-400",
              )}
            >
              <span
                className={cn(
                  "size-[1.3cqw] rounded-[0.4cqw]",
                  i === 0 ? "bg-accent-400" : "bg-white/15",
                )}
              />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-[1cqw] pt-[2cqw]">
          <MockAvatar hue={4} className="size-[2.6cqw]" />
          <Skeleton tone="dark" width="7cqw" className="h-[1cqw]" />
        </div>
      </aside>

      {/* main */}
      <div className="p-[2.8cqw]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[1.25cqw] uppercase tracking-[0.14em] text-ink-400">
              Overview
            </p>
            <p className="mt-[0.5cqw] text-[2.8cqw] font-semibold leading-none tracking-[-0.02em]">
              This month
            </p>
          </div>
          <div className="flex items-center gap-[1cqw] text-[1.45cqw]">
            <span className="inline-flex h-[2.6em] items-center rounded-full bg-white/6 px-[1.2em] font-medium leading-none text-ink-300 ring-1 ring-white/10">
              Export
            </span>
            <MockButton tone="accent">New job</MockButton>
          </div>
        </div>

        <div className="mt-[2.6cqw] grid grid-cols-3 gap-[1.8cqw]">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-[1.4cqw] bg-white/4 p-[1.8cqw] ring-1 ring-white/8"
            >
              <p className="font-mono text-[1.2cqw] uppercase tracking-[0.12em] text-ink-400">
                {k.label}
              </p>
              <div className="mt-[1cqw] flex items-end justify-between gap-[1cqw]">
                <span className="text-[3.2cqw] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                  {k.value}
                </span>
                <MockChip tone={k.tone} className="text-[1.1cqw]">
                  {k.delta}
                </MockChip>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[1.8cqw] grid grid-cols-[1.3fr_1fr] gap-[1.8cqw]">
          <div className="rounded-[1.4cqw] bg-white/4 p-[1.8cqw] ring-1 ring-white/8">
            <div className="flex items-center justify-between">
              <span className="text-[1.55cqw] font-medium">Jobs completed</span>
              <span className="font-mono text-[1.15cqw] text-ink-400">Last 30 days</span>
            </div>
            <Sparkline
              values={[0.3, 0.42, 0.38, 0.55, 0.5, 0.64, 0.6, 0.74, 0.7, 0.86, 0.8, 0.95]}
              stroke="#5b82ff"
              className="mt-[1.6cqw] h-[11cqw]"
            />
          </div>
          <div className="rounded-[1.4cqw] bg-white/4 p-[1.8cqw] ring-1 ring-white/8">
            <span className="text-[1.55cqw] font-medium">Recent invoices</span>
            <ul className="mt-[1.6cqw] space-y-[1.1cqw]">
              {invoices.map((row, i) => (
                <li key={i} className="flex items-center gap-[1cqw]">
                  <MockAvatar hue={row.hue} className="size-[2.2cqw]" />
                  <Skeleton tone="dark" width={row.width} className="h-[1cqw]" />
                  <MockChip tone={row.tone} className="ml-auto text-[1.05cqw]">
                    {row.status}
                  </MockChip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming jobs — the card edge crops this, like a real screenshot */}
        <div className="mt-[1.8cqw] rounded-[1.4cqw] bg-white/4 ring-1 ring-white/8">
          <div className="flex items-center justify-between px-[1.8cqw] py-[1.4cqw]">
            <span className="text-[1.55cqw] font-medium">Upcoming jobs</span>
            <span className="font-mono text-[1.15cqw] text-ink-400">This week</span>
          </div>
          <ul className="border-t border-white/8">
            {jobs.map((job) => (
              <li
                key={job.title}
                className="grid grid-cols-[1.5fr_1fr_1fr_auto] items-center gap-[1.6cqw] border-b border-white/6 px-[1.8cqw] py-[1.1cqw] text-[1.35cqw] last:border-b-0"
              >
                <span className="truncate font-medium">{job.title}</span>
                <span className="flex items-center gap-[0.8cqw]">
                  <MockAvatar hue={job.hue} className="size-[1.9cqw]" />
                  <Skeleton tone="dark" width="55%" className="h-[0.9cqw]" />
                </span>
                <span className="font-mono text-[1.15cqw] text-ink-400 tabular-nums">{job.when}</span>
                <MockChip tone={job.tone} className="text-[1.05cqw]">
                  {job.status}
                </MockChip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mocks: Record<PreviewVariant, ComponentType> = {
  website: WebsiteMock,
  store: StoreMock,
  app: AppMock,
};

type PlaceholderPreviewProps = {
  variant?: PreviewVariant;
  className?: string;
};

/**
 * A browser window showing a generated interface for a placeholder slot.
 * Decorative: wrap in an element with aria-hidden.
 */
export function PlaceholderPreview({ variant = "website", className }: PlaceholderPreviewProps) {
  const Mock = mocks[variant];
  const dark = variant === "app";
  return (
    <BrowserFrame
      url={urls[variant]}
      chrome={dark ? "dark" : "light"}
      className={cn(dark && "ring-white/15", className)}
    >
      <Mock />
    </BrowserFrame>
  );
}
