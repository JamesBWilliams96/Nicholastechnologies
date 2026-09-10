# Nicholas Technologies — website

The marketing site for Nicholas Technologies, a one-person software studio building websites,
Shopify stores and small custom web apps for local businesses and early-stage startups.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4. No animation libraries,
no component kits: the design system lives in `app/globals.css` and `components/ui`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional. Public origin of the deployed site (with `https://`). Defaults to `https://nicholastechnology.dev` in production builds and `http://localhost:3000` in development; only set it if the domain changes. Drives canonical URLs, Open Graph, JSON-LD, the sitemap and robots.txt. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Shown in the footer and offered as a fallback if the enquiry form can't send. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Enquiry form delivery through [Resend](https://resend.com). Until these are set, the form still completes normally for the visitor and each submission is written to the server logs (visible in the hosting dashboard) instead of being emailed. |

## Languages

The site is available in Slovak, Czech, German, Polish, Hungarian and English, each under its
own prefix (`/sk`, `/cs`, `/de`, `/pl`, `/hu`, `/en`). A request without a prefix is sent to the
visitor's language: an explicit choice remembered in a cookie first, then the browser's
`Accept-Language`, then English (`proxy.ts`). Every page declares `hreflang` alternates and the
sitemap lists all languages.

Copy lives in `content/i18n/<locale>.ts`, one file per language with the same shape
(`content/i18n/types.ts`). English (`en.ts`) is the reference: change the copy there first, then
mirror the change in the other files. Interface mockups keep their English sample text; the few
diagrams that carry a section's message are translated. To add a language, add it to
`lib/i18n/config.ts`, create its dictionary and register it in `lib/i18n/dictionaries.ts`.

## Light and dark mode

The theme toggle in the navbar switches between light and dark. The choice is stored in
`localStorage` and applied before first paint by a small inline script; with no choice saved the
site follows the system preference. The dark palette lives next to the light one in
`app/globals.css` (`:root[data-theme="dark"]`).

## Where things live

```
app/[locale]/         the pages, layout, localised 404 and share image (one copy per language)
app/                  sitemap, robots, icons, API route for enquiries
proxy.ts              language detection and locale-prefix redirects
content/i18n/         copy for every language
lib/i18n/             locale config and dictionary loader
components/ui/        design-system primitives (Button, Section, SectionHeading, Reveal, Chip, Logo, icons)
components/mockups/   browser / phone / app frames and mock UI building blocks
components/layout/    Navbar, Footer
components/sections/  one folder or file per homepage section
content/site.ts       name, navigation, CTA, tagline, currency symbol used in mockups
content/projects.ts   portfolio entries (placeholders until real projects are added)
docs/design-system.md the design brief: tokens, type scale, voice, rules
```

## Replacing the portfolio placeholders

The "Selected work" section renders `content/projects.ts`. Every entry ships as a clearly
labelled placeholder — nothing on the site is invented. To add a real project:

1. Set `placeholder: false` and fill in `name`, `summary`, `category`, `stack` and optionally `href`.
2. Add a screenshot under `public/work/` and set `image` (`src`, `alt`, `width`, `height`).
3. Optionally add a `caseStudy` (`challenge`, `solution`, and an optional `result`). It gets its
   own page at `/work/<slug>` and is added to the sitemap automatically. `result` describes what
   the client can now do (take bookings online, orders without phone calls) — never a percentage,
   revenue or traffic figure; the brief's hard rules forbid case-study results.

## Founder photo

`components/sections/About.tsx` has a `founderPhoto` constant. Leave it `null` for the designed
placeholder slot, or point it at a real photo under `public/` to render it.

## Local tooling

`scripts/` is reserved for untracked local scripts and screenshots (for example, one-off
Playwright checks). Anything you keep there is excluded from lint and typecheck
(`eslint.config.mjs`, `tsconfig.json`), and `scripts/screenshots` is gitignored.

## Deploying

The site is a standard Next.js app and deploys unchanged to Vercel or any Node host. Set the
environment variables above in the hosting dashboard. Security headers are configured in
`next.config.ts`.
