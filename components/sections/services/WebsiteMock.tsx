import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/mockups/frames";
import { ImageBlock, MockButton, Skeleton } from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   A service-business website (different from the hero's booking site).
   The page is taller than the viewport; on hover it scrolls to the
   second section (exactly one section height). Illustrative only.
   ------------------------------------------------------------------ */

const gallery = ["warm", "mono", "cool"] as const;

export function WebsiteMock() {
  return (
    <BrowserFrame url="yourbusiness.com">
      <div className="relative aspect-[4/3] overflow-hidden bg-white text-ink-950">
        <div className="absolute inset-x-0 top-0 transition-transform duration-[1100ms] ease-out-quart group-hover:-translate-y-[56cqw]">
          {/* Section 1: nav + hero */}
          <div className="h-[56cqw] p-[5cqw]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[1.4cqw]">
                <span className="size-[3.6cqw] rounded-full bg-ink-950" />
                <span className="text-[2.6cqw] font-semibold tracking-tight">Workshop</span>
              </div>
              <div className="flex gap-[3cqw]">
                {[6, 4, 5, 4].map((w, i) => (
                  <Skeleton key={i} width={`${w}cqw`} height="1.2cqw" />
                ))}
              </div>
              <MockButton tone="dark" className="text-[2.1cqw]" style={{ height: "4.7cqw", paddingInline: "2.6cqw" }}>
                Get a quote
              </MockButton>
            </div>

            <div className="mt-[8cqw] grid grid-cols-[1.05fr_0.95fr] items-center gap-[6cqw]">
              <div>
                <span className="font-mono text-[1.9cqw] font-medium uppercase tracking-[0.14em] text-accent-600">
                  Design · Build · Install
                </span>
                <p className="mt-[2.4cqw] text-[6cqw] font-semibold leading-[1.02] tracking-[-0.03em]">
                  Built by hand. Made to last.
                </p>
                <div className="mt-[3cqw] space-y-[1.6cqw]">
                  <Skeleton width="88%" height="1.3cqw" />
                  <Skeleton width="64%" height="1.3cqw" />
                </div>
                <div className="mt-[3.6cqw] flex gap-[1.6cqw] text-[2.1cqw]">
                  <MockButton tone="dark">Book a site visit</MockButton>
                  <MockButton tone="light">See our work</MockButton>
                </div>
              </div>
              <ImageBlock variant="warm" className="aspect-[5/4] rounded-[2.4cqw]">
                <span className="absolute left-[7%] top-[8%] rounded-full bg-white/90 px-[2.2cqw] py-[1.2cqw] font-mono text-[1.7cqw] uppercase tracking-[0.12em] text-ink-700">
                  Made to measure
                </span>
              </ImageBlock>
            </div>
          </div>

          {/* Section 2: recent work + features (revealed on hover). Tall enough to
              fill the viewport once section 1 has scrolled out. */}
          <div className="min-h-[75cqw] bg-ink-50 p-[5cqw]">
            <div className="flex items-end justify-between">
              <p className="text-[3.6cqw] font-semibold leading-none tracking-[-0.02em]">Recent work</p>
              <span className="text-[2cqw] font-medium underline underline-offset-[0.3em]">View all</span>
            </div>
            <div className="mt-[3.2cqw] grid grid-cols-3 gap-[2.4cqw]">
              {gallery.map((v, i) => (
                <div key={v}>
                  <ImageBlock variant={v} className="aspect-[4/3] rounded-[2cqw]" />
                  <Skeleton width={`${70 - i * 10}%`} height="1.3cqw" tone="none" className="mt-[2cqw] bg-ink-200" />
                  <Skeleton width="40%" height="1.1cqw" tone="none" className="mt-[1.2cqw] bg-ink-200/70" />
                </div>
              ))}
            </div>
            <div className="mt-[5cqw] grid grid-cols-3 gap-[2.4cqw]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-[2cqw] bg-white p-[2.6cqw] ring-1 ring-ink-950/6">
                  <span className={cn("block size-[4cqw] rounded-[1.1cqw]", i === 0 ? "bg-ink-950" : "bg-ink-200")} />
                  <Skeleton width="78%" height="1.3cqw" tone="none" className="mt-[2.4cqw] bg-ink-200" />
                  <Skeleton width="52%" height="1.3cqw" className="mt-[1.3cqw]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
