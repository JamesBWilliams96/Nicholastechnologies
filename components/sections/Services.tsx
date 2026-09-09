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

const services = [
  {
    id: "websites",
    index: "01",
    title: "Websites",
    description: "Custom websites and landing pages designed around your business.",
    tags: ["React / Next.js", "Webflow", "Landing pages", "Redesigns"],
    mock: <WebsiteMock />,
  },
  {
    id: "shopify",
    index: "02",
    title: "Shopify",
    description: "Professional ecommerce stores and custom Shopify improvements.",
    tags: ["Store setup", "Theme customisation", "Integrations", "Improvements"],
    mock: <StoreMock />,
    mockClassName: "inset-x-[7%] top-[9%]",
  },
  {
    id: "custom-software",
    index: "03",
    title: "Custom software",
    description: "Small web applications built around the way your business actually works.",
    tags: ["Booking systems", "Client portals", "Dashboards", "Internal tools"],
    mock: <DashboardMock />,
    mockClassName: "inset-x-[7%] top-[10%]",
  },
  {
    id: "support",
    index: "04",
    title: "Ongoing support",
    description:
      "Hosting, maintenance and technical support after launch, from the person who built it.",
    tags: ["Hosting", "Updates", "Maintenance", "Technical support"],
    mock: <StatusMock />,
    mockClassName: "inset-x-[7%] top-[8%] xs:inset-x-[12%] sm:top-[9%]",
  },
];

/** "What I build" — the four things the studio does, each with a live-feeling mock. */
export function Services() {
  return (
    <Section id="services" tone="light">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I build, <span className="text-muted">and how I keep it running.</span>
            </>
          }
          description="Websites, online stores, small custom apps and the support to look after them once they're live. Every project is scoped and priced before it starts."
        />

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 80} className="min-w-0">
              <ServiceCard
                index={s.index}
                title={s.title}
                description={s.description}
                tags={s.tags}
                mock={s.mock}
                mockClassName={s.mockClassName}
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10 sm:mt-12">
          <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[50ch] text-muted">
              Not sure which one you need? Tell me what you&rsquo;re trying to do and I&rsquo;ll suggest
              the simplest route.
            </p>
            <Button href="/#contact" variant="ghost" arrow className="shrink-0 text-[0.9375rem]">
              Tell me what you need
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
