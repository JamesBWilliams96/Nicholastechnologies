import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
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
