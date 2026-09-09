import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BrowserFrame, Panel, PhoneFrame } from "@/components/mockups/frames";
import {
  Bars,
  ImageBlock,
  MockButton,
  MockChip,
  Skeleton,
} from "@/components/mockups/primitives";
import { ParallaxLayer, ParallaxStage } from "@/components/ui/ParallaxStage";
import { Reveal } from "@/components/ui/Reveal";

/* ------------------------------------------------------------------
   Hero composition: a website in a browser, with fragments of other
   software floating around it. Everything is illustrative — no real
   clients, no photos.
   ------------------------------------------------------------------ */

function SiteMock() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-white p-[5%] text-ink-950">
      {/* nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="size-[4cqw] rounded-[1cqw] bg-ink-950" />
          <span className="text-[2.6cqw] font-semibold tracking-tight">Studio</span>
        </div>
        <div className="flex gap-[3cqw]">
          {[5, 4, 6, 4].map((w, i) => (
            <Skeleton key={i} width={`${w}cqw`} className="h-[1.2cqw]" />
          ))}
        </div>
        <span className="rounded-full bg-ink-950 px-[2.6cqw] py-[1.3cqw] text-[2.1cqw] font-medium leading-none text-white">
          Book now
        </span>
      </div>

      {/* hero */}
      <div className="mt-[8%] grid grid-cols-[1.15fr_0.85fr] items-center gap-[6%]">
        <div>
          <span className="font-mono text-[1.9cqw] font-medium uppercase tracking-[0.14em] text-accent-600">
            Now taking bookings
          </span>
          <p className="mt-[2.4cqw] text-[5.4cqw] font-semibold leading-[1.02] tracking-[-0.03em]">
            Bookings without the back‑and‑forth.
          </p>
          <div className="mt-[3cqw] space-y-[1.6cqw]">
            <Skeleton width="92%" className="h-[1.3cqw]" />
            <Skeleton width="70%" className="h-[1.3cqw]" />
          </div>
          <div className="mt-[3.6cqw] flex gap-[1.6cqw] text-[2.1cqw]">
            <MockButton tone="dark">Book a slot</MockButton>
            <MockButton tone="light">See prices</MockButton>
          </div>
        </div>
        <ImageBlock variant="warm" className="aspect-[4/5] rounded-[2.4cqw]">
          <div className="absolute inset-x-[7%] bottom-[7%] rounded-[1.6cqw] bg-white/92 p-[2.2cqw] shadow-card backdrop-blur">
            <p className="font-mono text-[1.7cqw] uppercase tracking-[0.12em] text-ink-500">Next available</p>
            <p className="mt-[0.8cqw] text-[2.5cqw] font-semibold">Today, 14:30</p>
          </div>
        </ImageBlock>
      </div>

      {/* feature row */}
      <div className="mt-[7%] grid grid-cols-3 gap-[2.4cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[2cqw] bg-ink-50 p-[2.6cqw]">
            <span
              className={cn(
                "block size-[4.6cqw] rounded-[1.2cqw]",
                i === 1 ? "bg-accent-500" : "bg-ink-200",
              )}
            />
            <Skeleton width="80%" className="mt-[2.4cqw] h-[1.3cqw] bg-ink-200" />
            <Skeleton width="55%" className="mt-[1.4cqw] h-[1.3cqw]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreMock() {
  return (
    <div className="aspect-[9/19] bg-white p-[6%] pt-[14%] text-ink-950">
      <div className="flex items-center justify-between">
        <span className="text-[6cqw] font-semibold tracking-tight">Store</span>
        <span className="relative size-[9cqw] rounded-full bg-ink-50">
          <span className="absolute -right-[1cqw] -top-[1cqw] flex size-[5cqw] items-center justify-center rounded-full bg-accent-500 text-[3.2cqw] font-semibold leading-none text-white">
            2
          </span>
        </span>
      </div>
      <ImageBlock variant="mono" className="mt-[7%] aspect-square rounded-[4cqw]">
        <span className="absolute left-[6%] top-[6%] rounded-full bg-white/90 px-[3cqw] py-[1.6cqw] font-mono text-[3cqw] uppercase tracking-[0.1em]">
          New
        </span>
      </ImageBlock>
      <p className="mt-[6%] text-[5.2cqw] font-semibold leading-tight tracking-tight">Ceramic pour‑over set</p>
      <div className="mt-[2%] flex items-center justify-between">
        <span className="text-[5cqw] font-medium">{site.currency}48</span>
        <MockChip tone="ok" className="text-[3cqw]">
          In stock
        </MockChip>
      </div>
      <div className="mt-[5%] flex gap-[2.5cqw]">
        {["S", "M", "L"].map((s, i) => (
          <span
            key={s}
            className={cn(
              "flex size-[9cqw] items-center justify-center rounded-full text-[3.4cqw] font-medium ring-1",
              i === 1 ? "bg-ink-950 text-white ring-ink-950" : "ring-ink-200",
            )}
          >
            {s}
          </span>
        ))}
      </div>
      <span className="mt-[6%] flex h-[12cqw] items-center justify-center rounded-full bg-ink-950 text-[4cqw] font-medium text-white">
        Add to cart
      </span>
    </div>
  );
}

const days = ["M", "T", "W", "T", "F", "S", "S"];
const slots = [
  { time: "09:30", label: "Consultation", status: "Confirmed", tone: "ok" as const },
  { time: "11:00", label: "Follow‑up", status: "Pending", tone: "warn" as const },
  { time: "14:30", label: "New booking", status: "Just now", tone: "accent" as const },
];

function BookingMock() {
  return (
    <div className="p-3 sm:p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">Bookings</span>
        <span className="font-mono text-2xs text-ink-500">This week</span>
      </div>
      <div className="mt-2.5 grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => (
          <div key={i}>
            <span className="font-mono text-[0.6rem] text-ink-500">{d}</span>
            <span
              className={cn(
                "mt-0.5 block rounded-md py-1 text-[0.7rem] font-medium tabular-nums",
                i === 2 ? "bg-ink-950 text-white" : "bg-ink-50 text-ink-700",
              )}
            >
              {8 + i}
            </span>
          </div>
        ))}
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {slots.map((s, i) => (
          <li
            key={s.time}
            className={cn(
              "flex items-center gap-2 rounded-md bg-ink-50/80 px-2 py-1.5 text-[0.7rem]",
              i === 2 && "animate-fade-up motion-safe-only ring-1 ring-accent-200",
            )}
            style={{ animationDelay: "1.6s" }}
          >
            <span className="font-mono text-ink-500 tabular-nums">{s.time}</span>
            <span className="font-medium text-ink-800">{s.label}</span>
            <MockChip tone={s.tone} className="ml-auto text-[0.58rem]">
              {s.status}
            </MockChip>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="p-3 sm:p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">Enquiries</span>
        <MockChip tone="ok" className="text-[0.58rem]">
          ▲ 18%
        </MockChip>
      </div>
      <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
        38 <span className="text-xs font-normal text-ink-500">this month</span>
      </p>
      <Bars
        values={[0.35, 0.5, 0.42, 0.6, 0.55, 0.7, 0.62, 0.8, 0.72, 0.9, 0.84, 1]}
        accentIndex={11}
        className="mt-2 h-12"
      />
    </div>
  );
}

function DeployToast() {
  return (
    <div className="glass-strong flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3 text-xs text-ink-950 shadow-card">
      <span className="size-2 rounded-full bg-ok animate-pulse-dot motion-safe-only" />
      <span className="font-medium">Deployed to production</span>
      <span className="font-mono text-2xs text-ink-500">42s</span>
    </div>
  );
}

export function HeroVisual() {
  return (
    <ParallaxStage className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      <div
        className="relative aspect-[1/1.18] xs:aspect-[1/1.08] sm:aspect-[1.2/1] lg:aspect-[1.06/1]"
        aria-hidden="true"
      >
        {/* Main website */}
        <Reveal eager variant="scale" delay={120} className="absolute left-0 top-0 w-full sm:top-[6%] sm:w-[80%]">
          <ParallaxLayer depth={6}>
            <div className="animate-float-slow motion-safe-only">
              <BrowserFrame url="yourbusiness.com">
                <SiteMock />
              </BrowserFrame>
            </div>
          </ParallaxLayer>
        </Reveal>

        {/* Phone: store */}
        <Reveal eager delay={420} className="absolute right-0 top-[14%] hidden w-[26%] sm:block">
          <ParallaxLayer depth={14}>
            <div className="animate-float-delayed motion-safe-only">
              <PhoneFrame>
                <StoreMock />
              </PhoneFrame>
            </div>
          </ParallaxLayer>
        </Reveal>

        {/* Booking panel */}
        <Reveal eager delay={560} className="absolute -left-[2%] bottom-0 w-[58%] xs:w-[52%] sm:bottom-[-3%] sm:w-[42%] lg:-left-[5%]">
          <ParallaxLayer depth={18}>
            <div className="animate-float motion-safe-only">
              <Panel>
                <BookingMock />
              </Panel>
            </div>
          </ParallaxLayer>
        </Reveal>

        {/* Analytics panel */}
        <Reveal eager delay={700} className="absolute -right-[2%] bottom-[5%] w-[46%] xs:w-[42%] sm:right-[4%] sm:bottom-[-2%] sm:w-[34%]">
          <ParallaxLayer depth={12}>
            <div className="animate-float-slow motion-safe-only [animation-delay:-4s]">
              <Panel>
                <AnalyticsMock />
              </Panel>
            </div>
          </ParallaxLayer>
        </Reveal>

        {/* Deploy toast */}
        <Reveal eager delay={900} variant="none" className="absolute right-[2%] -top-5 sm:right-[18%] sm:top-[-1%]">
          <ParallaxLayer depth={22}>
            <div className="animate-float-delayed motion-safe-only [animation-delay:-2s]">
              <DeployToast />
            </div>
          </ParallaxLayer>
        </Reveal>
      </div>
    </ParallaxStage>
  );
}
