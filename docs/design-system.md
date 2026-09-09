# Nicholas Technologies — design system & build brief

This document is the single source of truth for how the site looks, sounds and is built.
Every section must feel like it belongs to the same site. When in doubt, mirror
`components/sections/Hero.tsx` and `components/sections/hero/HeroVisual.tsx`.

## 1. Brand in one paragraph

Nicholas Technologies is a one-person software studio building websites, Shopify stores and
small custom web apps for local businesses and early-stage startups. The site should read as
*"a very good developer with excellent design taste"*: modern, intelligent, confident,
approachable, calm, slightly playful, premium. Not a corporate consultancy, not a random
freelancer, not an art-school agency. Creative balance: 40% premium SaaS/startup polish,
25% boutique software studio, 15% product/UI showcase, 10% developer personality, 10% Nicholas
Technologies personality.

The one-person model is the differentiator and is framed as an advantage:
**Small enough to care. Technical enough to build it properly.** Clients get direct
communication, one point of contact, fixed-price projects and support after launch from the
person who built it. Never make "one person" sound limited.

## 2. Hard rules (non-negotiable)

- **No invented social proof.** No client names, company names, testimonials, logos, revenue or
  conversion figures, traffic numbers, awards, years of experience, "trusted by" claims, or case
  study results. Portfolio slots are clearly labelled placeholders (`content/projects.ts`).
- **No location.** Don't mention a city, country or time zone. No addresses.
- **No fake pricing.** Never show a project price. Fixed-price is a *model*, not a number.
- **No photos / stock imagery.** Interfaces are drawn with HTML/CSS. Image areas are gradient
  blocks (`ImageBlock`). The About section has a clearly labelled photo *slot*, not a portrait.
- **Illustrative UI only.** Numbers inside mockups (e.g. "38 enquiries") are obviously sample
  data inside an interface, never presented as results. Keep them modest and generic.
- Copy is written in first person singular ("I build", "tell me") — the studio *is* one person.
  Use "Nicholas Technologies" for the business, never a personal first name.
- British spelling (customisation, colour, optimise).
- Respect `prefers-reduced-motion` (handled globally for `data-reveal` and keyframes; any JS
  animation must check `usePrefersReducedMotion()` / `matchMedia`).

## 3. Tokens (`app/globals.css`)

### Colour
| Token | Use |
| --- | --- |
| `paper` `#f7f7f5` | page background (light) |
| `paper-2` `#efefec`, `paper-3` | alternate light section backgrounds, subtle fills |
| `ink-950` … `ink-50` | charcoal scale. `ink-950` is the dark section background. |
| `accent-500` `#2f5bff` (+ `accent-50…800`) | **the** accent (cobalt). Buttons, highlights, active states, small dots. Use sparingly: one or two accent moments per section. |
| `glow-violet` | only inside the accent glow gradient. Never for UI. |
| `ok` / `ok-soft`, `warn` / `warn-soft` | status colours inside mock interfaces only |
| `danger-300/400/500`, `danger-soft` | form validation errors only |

**Tone-aware tokens** (flip automatically inside `.tone-dark`): `bg-bg`, `text-fg`,
`text-muted`, `text-subtle`, `bg-surface`, `bg-surface-2`, `bg-surface-3`, `border-line`,
`border-line-strong`, `ring-line`, `text-brand`, `bg-brand-soft`, `text-on-brand`.
**Always prefer tone-aware tokens** for section chrome so the same component works on light and
dark. Use raw `ink-*`/`white` only inside mock interfaces (which are always light-on-white or a
deliberate dark app window).

### Type
Font: Geist Sans (`font-sans`, default) and Geist Mono (`font-mono`, for eyebrows, labels,
numbers, metadata, code-like details). Scale (all responsive `clamp`s):

| Class | Use |
| --- | --- |
| `text-display-xl` | hero H1 only |
| `text-display-lg` | section H2 (default in `SectionHeading`) |
| `text-display-md` | big statements, sub-sections, card titles on feature cards |
| `text-display-sm` | card titles |
| `text-lead` | section intro paragraphs (`text-muted`) |
| `text-base` / `text-sm` | body / dense body |
| `text-xs` / `text-2xs` (mono) | labels, chips, metadata |

Headline conventions: sentence case, short, confident, full stop at the end. A two-tone
headline (`<span className="text-muted">`) is allowed once per section at most.
Eyebrows: mono, uppercase, tracked (`Eyebrow` component).

### Space, radius, shadow, motion
- Section padding comes from `<Section>` (`py-20 sm:py-24 lg:py-32`). Don't add your own.
- Between heading and content: `mt-12 sm:mt-16`. Card padding: `p-6 sm:p-8`. Grid gaps: `gap-4 sm:gap-6`.
- Radii: cards `rounded-2xl` (24px) or `rounded-3xl` for hero-scale cards; inner UI `rounded-xl`/`rounded-lg`; pills `rounded-full`.
- Borders: `ring-1 ring-line` (or `border border-line`). Fine, never heavy. Rings and shadows compose (`ring-1 ring-line shadow-card`).
- Shadows: `shadow-card` (resting card), `shadow-float` (floating UI/mockups), `shadow-lift` (hover), `shadow-glow` (rare accent).
- Easings: `ease-out-quart` (default UI), `ease-out-expo` (entrances), `ease-spring` (small playful nudges).
- Durations: 200ms hover, 500–900ms entrances.
- Keyframe utilities: `animate-float`, `animate-float-slow`, `animate-float-delayed`, `animate-pulse-dot`,
  `animate-grow-bar` (origin-bottom), `animate-fade-up`, `animate-dash` (SVG stroke, set `--dash-length`),
  `animate-shimmer`, `animate-orbit`, `animate-marquee`. Add `motion-safe-only` to any element with a looping animation.
- Backgrounds: `bg-grid` (48px engineering grid using the tone line colour), `bg-dots`, masks `mask-fade-b`, `mask-fade-radial`, `mask-fade-x`, `glow-accent` (blurred radial accent glow, use at `opacity-40…60`), `glass` / `glass-strong`.
- Variants: `hocus:` (hover or focus-visible), `motion-ok:` (only when motion is allowed).
- Breakpoints: Tailwind defaults plus `xs` (26rem). Design mobile deliberately: stack cleanly, keep mockups interesting, keep CTAs obvious.

## 4. Primitives (import paths and props)

```tsx
import { Section } from "@/components/ui/Section";            // <Section id="services" tone="light|dark|paper" flush?>
import { Container } from "@/components/ui/Container";        // centered 1200px column with gutters (or use className "container-site")
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
//   <SectionHeading eyebrow="What I build" title={<>...</>} description="..." align="left|center" size="lg|md" as="h2">{optional extra}</SectionHeading>
import { Button } from "@/components/ui/Button";              // variant primary|accent|secondary|ghost|inverse, size sm|md|lg, arrow, href
import { Reveal } from "@/components/ui/Reveal";              // <Reveal delay={ms} variant="up|scale|left|none" as="div|li|...">  scroll-in animation
import { Chip } from "@/components/ui/Chip";                  // tone neutral|accent|ok|warn, mono (default true)
import { Logo, LogoMark } from "@/components/ui/Logo";
import { ParallaxStage, ParallaxLayer } from "@/components/ui/ParallaxStage"; // pointer parallax (desktop only)
import * as Icons from "@/components/ui/icons";               // ArrowRightIcon, CheckIcon, GlobeIcon, BagIcon, AppWindowIcon, LifeBuoyIcon, CalendarIcon, ChartIcon, UsersIcon, ShieldIcon, ServerIcon, ZapIcon, CodeIcon, MailIcon, ClockIcon, WrenchIcon, LockIcon, RefreshIcon, MessageIcon, FileTextIcon, SendIcon, HammerIcon, SparkIcon
import { useInView, usePrefersReducedMotion } from "@/lib/use-in-view";
import { InViewGroup } from "@/components/ui/InViewGroup";     // sets data-inview on scroll; children animate via [.js_[data-inview]_&]: variants
import { cn } from "@/lib/utils";
import { site } from "@/content/site";                        // name, url, tagline, currency, nav, cta, email
import { projects, type Project } from "@/content/projects";
```

Mockup building blocks (`@/components/mockups/frames`, `@/components/mockups/primitives`):
`BrowserFrame` (url, chrome light|dark), `PhoneFrame`, `Panel` (variant glass|solid), `AppFrame`,
`Skeleton` (width, tone), `ImageBlock` (variant warm|cool|mono|accent), `MockButton`, `MockChip`,
`MockAvatar`, `Bars` (animated bar chart), `Sparkline`, `MockDivider`.

Frames set `@container`, so inside a frame size things with **container query units**
(`text-[3cqw]`, `p-[4cqw]`, `size-[5cqw]`) and the mock scales with its frame. Wrap decorative
mockups in `aria-hidden="true"`; if a mock carries meaning, give the frame a `label`.

## 5. Section anatomy

```tsx
<Section id="services" tone="light">
  <Container>
    <SectionHeading eyebrow="What I build" title="…" description="…" />
    <div className="mt-12 sm:mt-16">…content, each card wrapped in <Reveal delay={i * 80}>…</div>
  </Container>
</Section>
```

- Every section is a server component unless it needs state; put interactive bits in a small
  `"use client"` child component.
- One `h2` per section; card titles are `h3`. Never skip heading levels.
- Reveal cards with staggered delays (60–100ms apart). Don't animate paragraphs individually.
- Hover on cards: `transition-[transform,translate,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-lift` (Tailwind v4's `-translate-y-*` sets the `translate` property, so it must be in the transition list), and let the mockup inside respond (`group` / `group-hover:`).
- Keep each section visually distinct in *composition*, identical in *system*.

## 6. Copy voice

Short sentences. Plain English. Confident, specific, human. No buzzwords, no "innovative
solutions", no "leverage". Prefer *"You tell me what needs building. I work out the simplest way
to build it."* Use the brief's microcopy: "What I build", "How it works", "Start a project",
"Send enquiry →", "Still need help after launch?". Avoid exclamation marks.

## 7. Page order

Nav → Hero → Positioning strip → What I build (`#services`) → Selected work (`#work`) →
One-person advantage (dark) → Fixed-price projects → How it works (`#process`) →
The right tool for the job → Launch isn't the finish line (dark) → Final CTA + form (`#contact`, dark) → Footer.

Tones: dark sections are the one-person advantage, support and contact (plus footer). Everything
else is light (`paper`).

## 8. Accessibility & performance checklist

- Semantic HTML, correct heading order, visible focus (`focus-visible` is styled globally).
- Interactive elements are real `<button>`/`<a>`; state via `aria-pressed`/`aria-expanded`/`aria-controls`.
- Contrast: body text on light is `ink-950`/`ink-500`; on dark `paper`/`ink-300`. Don't use `ink-400` for body copy.
- Forms: `<label for>`, `aria-describedby` for hints/errors, `aria-live` for status.
- No layout shift: give mockups fixed aspect ratios.
- Minimal JS: CSS animations first; IntersectionObserver for triggers; no animation libraries.
- Loop animations must carry `motion-safe-only`; JS-driven motion must bail out under reduced motion.
