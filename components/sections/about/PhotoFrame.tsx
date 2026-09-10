import Image from "next/image";
import { ImageBlock } from "@/components/mockups/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** A photo file under /public. `width`/`height` are the source pixel size. */
export type FounderPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------
   The photo frame. A 4:5 portrait on phones and from `lg`, a wide banner
   on tablets where it spans the whole column. Holds either the real
   founder photo or a deliberately designed empty slot — never a fake
   portrait.
   ------------------------------------------------------------------ */

const frame =
  "group relative isolate aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 shadow-card ring-1 ring-line sm:aspect-[16/10] lg:aspect-[4/5]";

/** One L-shaped crop mark. */
function CornerMark({ className }: { className: string }) {
  return (
    <span
      className={cn(
        "absolute size-3.5 border-ink-950/25 transition-[translate] duration-500 ease-spring",
        className,
      )}
    />
  );
}

function EmptySlot({ className, label }: { className?: string; label: string }) {
  return (
    <div aria-hidden="true" className={cn(frame, "tone-light", className)}>
      {/* Warm gradient (the site's image treatment) with an engineering grid on top */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out-quart group-hover:scale-[1.025]">
        <ImageBlock variant="warm" className="size-full">
          <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70 [background-size:40px_40px]" />
          {/* Depth: a soft vignette towards the bottom-right, a light bloom top-left */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_100%,rgb(10_11_15/0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_10%_0%,rgb(255_255_255/0.5),transparent_70%)]" />
        </ImageBlock>
      </div>
      {/* Inner top highlight, like the site's cards */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

      {/* Crop marks: this is a place for a picture */}
      <CornerMark className="left-5 top-5 rounded-tl-[3px] border-l border-t group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
      <CornerMark className="right-5 top-5 rounded-tr-[3px] border-r border-t group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <CornerMark className="bottom-5 left-5 rounded-bl-[3px] border-b border-l group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
      <CornerMark className="bottom-5 right-5 rounded-br-[3px] border-b border-r group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

      {/* The mark stands in for a face until there is one */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <LogoMark className="size-12 drop-shadow-[0_10px_20px_rgb(10_11_15/0.18)] sm:size-14" />
        <p className="mt-4 text-md font-semibold tracking-[-0.02em] text-ink-950">{site.name}</p>
      </div>

      {/* Label */}
      <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/75 px-2.5 py-1 font-mono text-2xs font-medium uppercase leading-none tracking-[0.14em] text-ink-700 ring-1 ring-inset ring-ink-950/8 backdrop-blur">
        <span className="size-1.5 rounded-full bg-accent-500" />
        {label}
      </span>
    </div>
  );
}

export function PhotoFrame({
  photo,
  label,
  className,
}: {
  photo: FounderPhoto | null;
  /** Caption on the empty slot, e.g. "Photo". */
  label: string;
  className?: string;
}) {
  if (!photo) return <EmptySlot className={className} label={label} />;

  // Tablets show a wide crop; keep the top of a portrait (where a face is) in frame.
  const portrait = photo.height > photo.width;
  return (
    <figure className={cn(frame, className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 36vw, 100vw"
        className={cn(
          "object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.025]",
          portrait ? "object-[50%_25%] lg:object-center" : "object-center",
        )}
      />
    </figure>
  );
}
