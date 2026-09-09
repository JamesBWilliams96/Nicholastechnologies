import { cn } from "@/lib/utils";
import { Panel } from "@/components/mockups/frames";
import { ParallaxLayer, ParallaxStage } from "@/components/ui/ParallaxStage";
import { Reveal } from "@/components/ui/Reveal";
import { InViewGroup } from "@/components/ui/InViewGroup";
import { StatusMock } from "./StatusMock";
import { TicketMock } from "./TicketMock";

/* ------------------------------------------------------------------
   Composition: the status window in flow (its height follows its
   width), with a resolved support request pinned over its lower-left
   corner. The request card is rem-sized, so the wrapper reserves a
   fixed band below the window and the card overlaps only the window's
   bottom padding, never a row of text. Decorative: all aria-hidden.
   ------------------------------------------------------------------ */

export function SupportVisual() {
  return (
    <ParallaxStage className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      {/* One observer drives the whole story: the window, its bars and activity, then the request. */}
      <InViewGroup className="relative pb-[9.25rem]">
        <div aria-hidden="true">
          <Reveal variant="scale" delay={120} className="relative z-10">
            <ParallaxLayer depth={6}>
              <StatusMock />
            </ParallaxLayer>
          </Reveal>

          <div
            className={cn(
              "absolute -left-[2%] bottom-0 z-20 w-[72%] xs:w-[62%] sm:w-[48%] lg:-left-[9%] lg:w-[52%] xl:w-[46%]",
              "transition-[opacity,transform] duration-[900ms] ease-out-quart will-change-[opacity,transform]",
              "[.js_&]:translate-y-4 [.js_&]:opacity-0 [.js_[data-inview]_&]:translate-y-0 [.js_[data-inview]_&]:opacity-100 [.js_[data-inview]_&]:delay-[520ms]",
            )}
          >
            <ParallaxLayer depth={16}>
              <div className="animate-float motion-safe-only">
                <Panel className="text-paper">
                  <TicketMock />
                </Panel>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </InViewGroup>
    </ParallaxStage>
  );
}
