import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Studio } from "@/components/sections/Studio";
import { FixedPrice } from "@/components/sections/FixedPrice";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Support } from "@/components/sections/Support";
import { Contact } from "@/components/sections/Contact";

/* Route-level metadata replaces the layout's openGraph object wholesale,
   so the homepage restates the shared fields alongside its own URL. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
    title: site.title,
    description: site.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Services />
      <Work />
      <Studio />
      <FixedPrice />
      <Process />
      <Stack />
      <About />
      <Support />
      <Contact />
    </>
  );
}
