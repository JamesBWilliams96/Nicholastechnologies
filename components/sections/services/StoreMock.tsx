import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BagIcon, CheckIcon } from "@/components/ui/icons";
import { ImageBlock, MockButton, Skeleton } from "@/components/mockups/primitives";

/* ------------------------------------------------------------------
   A product page. On hover the cart badge ticks up and an
   "Added to cart" toast slides in over the product image — pure CSS
   via group-hover. Everything is sized in container units, so the
   toast scales with the storefront at every breakpoint.
   ------------------------------------------------------------------ */

const swatches = [
  { name: "Sand", className: "bg-[#d8ccb6]" },
  { name: "Slate", className: "bg-ink-500" },
  { name: "Ink", className: "bg-ink-950" },
];
const sizes = ["S", "M", "L", "XL"];

export function StoreMock() {
  return (
    <div className="@container">
      <div className="overflow-hidden rounded-xl bg-white text-ink-950 shadow-float ring-1 ring-ink-950/8">
        {/* store header */}
        <div className="flex items-center justify-between border-b border-ink-950/6 px-[4cqw] py-[2.4cqw]">
          <span className="text-[2.8cqw] font-semibold tracking-tight">Store</span>
          <div className="flex gap-[3cqw]">
            {[5, 4, 6].map((w, i) => (
              <Skeleton key={i} width={`${w}cqw`} className="h-[1.2cqw]" />
            ))}
          </div>
          <span className="relative inline-flex size-[5.2cqw] items-center justify-center rounded-full bg-ink-50 text-ink-700">
            <BagIcon className="size-[2.8cqw]" />
            <span className="absolute -right-[1cqw] -top-[1cqw] flex size-[2.8cqw] items-center justify-center rounded-full bg-accent-500 font-mono text-[1.7cqw] font-semibold leading-none text-white transition-transform duration-300 ease-spring group-hover:scale-125">
              <span className="group-hover:hidden">1</span>
              <span className="hidden group-hover:inline">2</span>
            </span>
          </span>
        </div>

        {/* product */}
        <div className="grid grid-cols-[1.05fr_1fr] gap-[4cqw] p-[4cqw]">
          <div className="grid grid-cols-[7cqw_1fr] gap-[1.6cqw]">
            <div className="flex flex-col gap-[1.6cqw]">
              {(["mono", "warm", "cool"] as const).map((v, i) => (
                <ImageBlock
                  key={v}
                  variant={v}
                  className={cn("aspect-square rounded-[1.2cqw]", i === 0 && "ring-1 ring-ink-950 ring-offset-1")}
                />
              ))}
            </div>
            <ImageBlock variant="mono" className="aspect-[4/5] rounded-[2cqw]">
              <span className="absolute left-[7%] top-[7%] rounded-full bg-white/90 px-[1.8cqw] py-[1cqw] font-mono text-[1.6cqw] uppercase tracking-[0.12em] text-ink-700">
                New in
              </span>
              {/* Added-to-cart toast: slides up over the image on hover */}
              <div className="glass-strong absolute bottom-[6%] left-[6%] flex translate-y-[1.5cqw] items-center gap-[1.4cqw] rounded-full py-[1.1cqw] pl-[1.2cqw] pr-[2.2cqw] text-[2cqw] text-ink-950 opacity-0 shadow-card transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
                <span className="inline-flex size-[3.2cqw] shrink-0 items-center justify-center rounded-full bg-ok text-white">
                  <CheckIcon className="size-[2.1cqw]" strokeWidth={3} />
                </span>
                <span className="whitespace-nowrap font-medium leading-none">Added to cart</span>
              </div>
            </ImageBlock>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[1.7cqw] uppercase tracking-[0.14em] text-ink-500">Outerwear</span>
            <p className="mt-[1.4cqw] text-[4.2cqw] font-semibold leading-[1.05] tracking-[-0.025em]">Linen overshirt</p>
            <p className="mt-[1.6cqw] text-[3cqw] font-medium tabular-nums">{site.currency}64</p>

            <span className="mt-[3.2cqw] text-[1.9cqw] font-medium">
              Colour <span className="text-ink-500">— Sand</span>
            </span>
            <div className="mt-[1.4cqw] flex gap-[1.6cqw]">
              {swatches.map((s, i) => (
                <span
                  key={s.name}
                  className={cn(
                    "size-[3.6cqw] rounded-full ring-1 ring-ink-950/10",
                    s.className,
                    i === 0 && "ring-2 ring-ink-950 ring-offset-2 ring-offset-white",
                  )}
                />
              ))}
            </div>

            <span className="mt-[3.2cqw] text-[1.9cqw] font-medium">
              Size <span className="text-ink-500">— M</span>
            </span>
            <div className="mt-[1.4cqw] flex gap-[1.4cqw]">
              {sizes.map((s) => (
                <span
                  key={s}
                  className={cn(
                    "inline-flex h-[5cqw] min-w-[6cqw] items-center justify-center rounded-[1.2cqw] px-[1.6cqw] text-[1.9cqw] font-medium ring-1",
                    s === "M" ? "bg-ink-950 text-white ring-ink-950" : "ring-ink-200 text-ink-700",
                  )}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-[3.6cqw] text-[2.1cqw]">
              <MockButton tone="dark" className="w-full transition-transform duration-300 ease-out-quart group-hover:scale-[0.98]">
                Add to cart
              </MockButton>
              <p className="mt-[1.8cqw] font-mono text-[1.6cqw] text-ink-500">Dispatched in 2–3 working days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
