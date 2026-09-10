import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/content/site";
import { Boot } from "@/components/layout/Boot";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { baseOpenGraph } from "@/lib/i18n/metadata";
import { themeBootScript } from "@/lib/theme";
import "../globals.css";

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    keywords: [
      "web design",
      "web development",
      "website development",
      "Shopify development",
      "custom web apps",
      "web applications",
      "website maintenance",
      "small business websites",
      "startup websites",
      "Next.js developer",
      "Webflow",
    ],
    /* No title/description here: Next fills the og: and twitter: equivalents from
       each route's own title and description, so child pages never unfurl with
       homepage copy. */
    openGraph: baseOpenGraph(locale),
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0f" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

function structuredData(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/apple-icon`,
        description,
        ...(site.email ? { email: site.email } : {}),
        knowsAbout: [
          "Web design",
          "Web development",
          "Next.js",
          "React",
          "Webflow",
          "Shopify",
          "Custom web applications",
          "Website maintenance",
        ],
        makesOffer: [
          "Websites and landing pages",
          "Shopify stores",
          "Custom web applications",
          "Hosting, maintenance and technical support",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: localeMeta[locale].tag,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <html
      lang={localeMeta[locale].tag}
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint: flags JS for the scroll reveals and applies the
            saved theme (or the system preference) so there is no flash of the
            wrong mode. <Boot /> below repeats it for renders where React
            skips inline scripts. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale, t.meta.ogDescription)) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Boot />
        <Navbar locale={locale} nav={t.nav} common={t.common} tagline={t.footer.tagline} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} nav={t.nav} footer={t.footer} common={t.common} />
      </body>
    </html>
  );
}
