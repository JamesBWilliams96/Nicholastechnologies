import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { SupportVisual } from "./support/SupportVisual";

const included = [
  "Hosting",
  "Updates",
  "Maintenance",
  "Bug fixes",
  "Technical support",
  "Small improvements",
] as const;

/**
 * "Launch isn't the finish line" — ongoing hosting, maintenance and
 * support. Dark tone; sits directly before the dark contact section, so
 * it gets a hairline at the top and no glow of its own.
 */
export function Support() {
  return (
    <Section id="support" tone="dark" className="isolate overflow-hidden">
      {/* Backdrop: hairline and a faint dot field, fading towards the edges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <div className="absolute inset-0 bg-dots mask-fade-radial opacity-50" />
      </div>

      <Container>
        <div className="grid items-center gap-y-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Still need help after launch?"
              title="Launch isn’t the finish line."
              description="Once your website is live, you don’t have to work out what happens next. I can keep it hosted, maintained and supported."
            />

            <Reveal delay={200} className="mt-8 sm:mt-10">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm sm:gap-x-6 sm:text-[0.9375rem]">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-accent-300 ring-1 ring-inset ring-accent-400/30">
                      <CheckIcon className="size-3" strokeWidth={2.25} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280} className="mt-10 border-t border-line pt-8 sm:mt-12 sm:pt-10">
              <p className="max-w-[22ch] text-display-md">
                <span className="text-muted">The person who built it</span>{" "}
                <span className="whitespace-nowrap">is still here.</span>
              </p>
              <Button
                href="/#contact"
                variant="ghost"
                arrow
                className="mt-6 text-[0.9375rem]"
              >
                Get in touch
              </Button>
            </Reveal>
          </div>

          <div className="lg:pl-2">
            <SupportVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
