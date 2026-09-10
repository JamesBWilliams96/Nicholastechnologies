import type { Dictionary } from "@/content/i18n/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./services/ServiceCard";
import { WebsiteMock } from "./services/WebsiteMock";
import { StoreMock } from "./services/StoreMock";
import { DashboardMock } from "./services/DashboardMock";
import { StatusMock } from "./services/StatusMock";

/* The four mocks, in the same order as the dictionary's service items. */
const visuals = [
  { id: "websites", mock: <WebsiteMock /> },
  { id: "shopify", mock: <StoreMock />, mockClassName: "inset-x-[7%] top-[9%]" },
  { id: "custom-software", mock: <DashboardMock />, mockClassName: "inset-x-[7%] top-[10%]" },
  {
    id: "support",
    mock: <StatusMock />,
    mockClassName: "inset-x-[7%] top-[8%] xs:inset-x-[12%] sm:top-[9%]",
  },
];

/** "What I build" — the four things the studio does, each with a live-feeling mock. */
export function Services({ locale, t }: { locale: Locale; t: Dictionary["services"] }) {
  return (
    <Section id="services" tone="light">
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleA} <span className="text-muted">{t.titleB}</span>
            </>
          }
          description={t.description}
        />

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {t.items.map((s, i) => (
            <Reveal as="li" key={visuals[i].id} delay={i * 80} className="min-w-0">
              <ServiceCard
                index={`0${i + 1}`}
                title={s.title}
                description={s.description}
                tags={s.tags}
                mock={visuals[i].mock}
                mockClassName={visuals[i].mockClassName}
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10 sm:mt-12">
          <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[50ch] text-muted">{t.closingText}</p>
            <Button
              href={localePath(locale, "#contact")}
              variant="ghost"
              arrow
              className="shrink-0 self-start text-[0.9375rem] sm:self-auto"
            >
              {t.closingLink}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
