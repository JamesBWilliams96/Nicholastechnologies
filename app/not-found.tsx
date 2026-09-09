import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70" />
      </div>
      <div className="container-site max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 text-display-lg">That page doesn&rsquo;t exist.</h1>
        <p className="mt-5 max-w-[46ch] text-lead text-muted">
          The link may be out of date, or the page may have moved. Head back to the homepage, or
          tell me what you were looking for.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg" arrow>
            Back to the homepage
          </Button>
          <Button href="/#contact" variant="secondary" size="lg">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
