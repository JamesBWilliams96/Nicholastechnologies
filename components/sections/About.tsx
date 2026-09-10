import type { Dictionary } from "@/content/i18n/types";
import { fmt } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { FocusList, type FocusItem } from "./about/FocusList";
import { PhotoFrame, type FounderPhoto } from "./about/PhotoFrame";

/**
 * Founder photo.
 *
 * To add one, put the file under /public (e.g. /public/about/founder.jpg)
 * and replace `null` with its details:
 *
 *   const founderPhoto: FounderPhoto | null = {
 *     src: "/about/founder.jpg",
 *     alt: "The founder of Nicholas Technologies",
 *     width: 1200,
 *     height: 1500,
 *   };
 *
 * The frame is a 4:5 portrait on phones and large screens and a wide
 * banner on tablets, so a portrait of around 1200×1500px with the subject
 * in the upper half crops well everywhere. While it's `null` the section
 * shows a designed placeholder slot — never a stock image or a silhouette.
 */
const founderPhoto: FounderPhoto | null = null;

/* The two rows share one grid so the photo sits under the headline and
   the focus list under the intro, with both left edges aligned. */
const columns = "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-16 xl:gap-x-24";

/**
 * "About" — who is behind the studio, kept human and short. The headline
 * and intro up top, then the photo slot beside the five things the work
 * is focused on.
 */
export function About({ t }: { t: Dictionary["about"] }) {
  const focus: FocusItem[] = t.focus.map((f, i) => ({ index: `0${i + 1}`, title: f.title, text: f.text }));

  return (
    <Section id="about" tone="light" aria-labelledby="about-heading">
      <Container>
        {/* Headline row */}
        <div className={`grid gap-y-5 lg:items-end ${columns}`}>
          <div>
            <Reveal>
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="about-heading" className="mt-5 max-w-[22ch] text-display-lg">
                <span className="text-muted">{t.titleA}</span> {t.titleB}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-[46ch] text-lead text-muted lg:pb-1.5">{fmt(t.lead, { site: site.name })}</p>
          </Reveal>
        </div>

        {/* Photo + focus row */}
        <div className={`mt-12 grid gap-y-10 sm:mt-16 sm:gap-y-12 ${columns}`}>
          <Reveal variant="scale" delay={160} className="lg:self-start">
            <PhotoFrame photo={founderPhoto} label={t.photo} />
          </Reveal>

          <div className="flex flex-col">
            <FocusList items={focus} label={t.focusLabel} baseDelay={220} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
