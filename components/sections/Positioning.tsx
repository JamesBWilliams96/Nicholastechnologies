import type { Dictionary } from "@/content/i18n/types";
import { Reveal } from "@/components/ui/Reveal";
import { CodeIcon, MessageIcon, FileTextIcon, LifeBuoyIcon } from "@/components/ui/icons";

const icons = [MessageIcon, FileTextIcon, CodeIcon, LifeBuoyIcon];

/** Quick credibility strip under the hero. */
export function Positioning({ t }: { t: Dictionary["positioning"] }) {
  return (
    <section aria-labelledby="positioning-heading" className="relative">
      <div className="container-site">
        <div className="border-y border-line py-10 sm:py-12">
          <Reveal>
            <h2 id="positioning-heading" className="text-display-sm max-w-2xl text-balance">
              {t.titleA} <span className="text-muted">{t.titleB}</span>
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={p.title} delay={80 + i * 70} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface ring-1 ring-line text-fg">
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <div>
                    <h3 className="text-md font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
