import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FileTextIcon, MessageIcon, SparkIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { CardReveal } from "./contact/CardReveal";
import { ContactForm } from "./contact/ContactForm";

const expectations = [
  {
    icon: MessageIcon,
    title: "A reply from the person who'll build it",
    text: "No account managers, no hand-offs. You hear back from me.",
  },
  {
    icon: FileTextIcon,
    title: "A clear scope and a fixed price",
    text: "You'll know what's being built and what it costs before work starts.",
  },
  {
    icon: SparkIcon,
    title: "Honest advice",
    text: "Even if the answer is “you don't need this yet”.",
  },
] as const;

/**
 * Final call to action and enquiry form. Dark tone, the one section that
 * gets an accent glow — it's the finale before the (dark) footer.
 *
 * Layout: on lg the invitation sits in a sticky left column beside the form.
 * Below lg the left column dissolves (`contents`) so the form can sit
 * directly under the headline and the reassurance list follows it.
 */
export function Contact() {
  return (
    <Section id="contact" tone="dark" className="isolate overflow-clip">
      {/* Backdrop: hairline, engineering grid and a soft accent glow behind the form */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[30rem] w-[48rem] -translate-x-1/2 glow-accent opacity-35 lg:left-auto lg:right-[-14%] lg:top-[-8%] lg:h-[44rem] lg:w-[56rem] lg:translate-x-0 lg:opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container>
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-x-16 xl:gap-x-24">
          {/* Left: the invitation */}
          <div className="contents lg:sticky lg:top-28 lg:block lg:self-start">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow>Start a project</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <h2 id="contact-heading" className="mt-5 max-w-[16ch] text-display-lg">
                  Got something in mind? <span className="text-muted">Let&rsquo;s build it.</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-[46ch] text-lead text-muted">
                  Whether you need a new website, an online store, a custom tool or help with
                  something that already exists, tell me what you&rsquo;re working on.
                </p>
              </Reveal>
            </div>

            <div className="order-2 max-w-xl lg:mt-12">
              <Reveal>
                <p className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted">
                  What to expect
                </p>
              </Reveal>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {expectations.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={80 + i * 70} className="flex gap-4 py-4.5 sm:gap-5">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-fg ring-1 ring-line">
                      <item.icon className="size-[1.05rem]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.9375rem] font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              {site.email ? (
                <Reveal delay={320} className="mt-8">
                  <p className="text-sm text-muted">
                    Prefer email?{" "}
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
                      className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
                    >
                      {site.email}
                    </a>
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>

          {/* Right: the form, in a card over the glow */}
          <CardReveal delay={160} className="order-1 min-w-0">
            <div className="relative rounded-3xl bg-surface p-5 ring-1 ring-line shadow-[0_32px_80px_-32px_rgb(0_0_0/0.7)] xs:p-6 sm:p-8 lg:p-9 xl:p-10">
              {/* Top-edge highlight and a faint inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.035] to-transparent" />
              </div>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </CardReveal>
        </div>
      </Container>
    </Section>
  );
}
