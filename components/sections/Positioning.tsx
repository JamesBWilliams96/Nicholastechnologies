import { Reveal } from "@/components/ui/Reveal";
import { CodeIcon, MessageIcon, FileTextIcon, LifeBuoyIcon } from "@/components/ui/icons";

const points = [
  { icon: MessageIcon, title: "Direct", text: "You talk to the person building it. No account managers." },
  { icon: FileTextIcon, title: "Fixed-price", text: "Scope, deliverables and cost agreed before work starts." },
  { icon: CodeIcon, title: "Built properly", text: "React, Next.js, Shopify or Webflow, chosen to fit the job." },
  { icon: LifeBuoyIcon, title: "Still here", text: "Hosting, maintenance and support after launch." },
];

/** Quick credibility strip under the hero. */
export function Positioning() {
  return (
    <section aria-labelledby="positioning-heading" className="relative">
      <div className="container-site">
        <div className="border-y border-line py-10 sm:py-12">
          <Reveal>
            <h2 id="positioning-heading" className="text-display-sm max-w-2xl text-balance">
              Small enough to care.{" "}
              <span className="text-muted">Technical enough to build it properly.</span>
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={80 + i * 70} className="flex gap-3.5">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface ring-1 ring-line text-fg">
                  <p.icon className="size-[1.1rem]" />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
