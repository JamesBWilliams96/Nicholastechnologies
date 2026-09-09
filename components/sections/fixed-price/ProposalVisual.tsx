import { Panel } from "@/components/mockups/frames";
import { ParallaxLayer, ParallaxStage } from "@/components/ui/ParallaxStage";
import { Reveal } from "@/components/ui/Reveal";
import { InViewGroup } from "@/components/ui/InViewGroup";
import { ProposalMock } from "./ProposalMock";
import { ScopeCallMock } from "./ScopeCallMock";

/* ------------------------------------------------------------------
   Composition: the proposal document, with the scope-call notes
   tucked in front of its lower-left corner. The document sits in
   flow (its height follows its width), the notes float over it.
   Everything here is illustrative; the copy beside it carries the
   meaning, so the whole thing is hidden from assistive tech.
   ------------------------------------------------------------------ */

export function ProposalVisual() {
  return (
    <ParallaxStage className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      {/* Backdrop: a soft field of dots so the paper reads as floating.
          Kept inside the gutters; the section clips anything wider. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 bg-dots mask-fade-radial opacity-90 sm:-inset-x-12 sm:-inset-y-16"
      />

      <div aria-hidden="true" className="relative pb-[40%] xs:pb-[32%] sm:pb-[19%] lg:pb-[21%] xl:pb-[17%]">
        <Reveal variant="scale" delay={120} className="relative z-10 w-full sm:ml-auto sm:w-[88%]">
          <ParallaxLayer depth={6}>
            <InViewGroup>
              <ProposalMock />
            </InViewGroup>
          </ParallaxLayer>
        </Reveal>

        <Reveal
          delay={520}
          className="absolute -left-[2%] bottom-0 z-20 w-[60%] xs:w-[52%] sm:w-[42%] lg:-left-[6%]"
        >
          <ParallaxLayer depth={16}>
            <div className="animate-float motion-safe-only">
              <Panel>
                <ScopeCallMock />
              </Panel>
            </div>
          </ParallaxLayer>
        </Reveal>
      </div>
    </ParallaxStage>
  );
}
