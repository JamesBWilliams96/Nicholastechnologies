import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { ProjectPreview } from "./ProjectPreview";
import { StackTags } from "./StackTags";
import type { PreviewVariant } from "./PlaceholderPreview";

/** Where a card should link, if anywhere. Placeholders never link. */
function projectLink(project: Project): { href: string; external: boolean } | null {
  if (project.placeholder) return null;
  if (project.caseStudy) return { href: `/work/${project.slug}`, external: false };
  if (project.href) return { href: project.href, external: true };
  return null;
}

/* The stage behind each preview takes a faint tint from the kind of
   interface it holds, so the three slots read as three different things. */
const stageTint: Record<PreviewVariant | "image", string> = {
  website: "bg-[linear-gradient(160deg,#edf0f7_0%,#e4e8f0_100%)]",
  store: "bg-[linear-gradient(160deg,#f4f1eb_0%,#ebe6dc_100%)]",
  app: "bg-ink-950",
  image: "bg-surface-2",
};

type ProjectCardProps = {
  project: Project;
  /** Position in the list, shown as a mono index. */
  index: number;
  /** Full-width layout: preview beside the text on large screens. */
  featured?: boolean;
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const link = projectLink(project);
  const kind: PreviewVariant | "image" = project.image ? "image" : (project.preview ?? "website");
  const dark = kind === "app";

  const statusChip = project.placeholder ? (
    <Chip className="border border-dashed border-line-strong bg-transparent py-[3px] ring-0">
      Placeholder
    </Chip>
  ) : link ? (
    <Chip tone="accent">{link.external ? "Live site" : "Case study"}</Chip>
  ) : null;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card",
        "transition-[transform,translate,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-lift",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-accent-500",
        featured && "lg:grid lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]",
      )}
    >
      {/* Preview stage — the interface sits on a tinted ground and is
          cropped by the card edge, like a product screenshot. A real
          screenshot keeps its alt text; generated mocks are decorative. */}
      <div
        aria-hidden={project.image ? undefined : true}
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          featured && "lg:aspect-auto lg:min-h-[25rem]",
          stageTint[kind],
        )}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 mask-fade-b",
            dark
              ? "opacity-70 [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:40px_40px]"
              : "bg-grid opacity-50",
          )}
        />
        {dark ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-20%] h-[80%] w-[90%] -translate-x-1/2 glow-accent opacity-70"
          />
        ) : null}
        <div className="absolute inset-x-[7%] top-[12%] origin-top transition-transform duration-500 ease-out-quart group-hover:-translate-y-1.5 group-hover:scale-[1.012] lg:top-[11%]">
          <ProjectPreview
            project={project}
            sizes={
              featured
                ? "(min-width: 1024px) 700px, (min-width: 640px) 90vw, 100vw"
                : "(min-width: 768px) 560px, 100vw"
            }
          />
        </div>
      </div>

      {/* Copy */}
      <div className={cn("flex flex-1 flex-col p-6 sm:p-8", featured && "lg:p-10")}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{project.category}</Chip>
            {statusChip}
          </div>
          <span aria-hidden className="font-mono text-xs text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className={cn("mt-6", featured && "lg:my-auto lg:py-8")}>
          <h3 className={cn("text-display-sm", featured && "lg:text-display-md")}>
            {link ? (
              link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
                >
                  {project.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
                >
                  {project.name}
                </Link>
              )
            ) : (
              project.name
            )}
          </h3>
          <p className="mt-3 max-w-[42ch] text-muted">{project.summary}</p>
        </div>

        <div
          className={cn(
            "mt-8 flex items-end justify-between gap-4",
            !featured && "lg:mt-auto lg:pt-8",
          )}
        >
          <StackTags stack={project.stack} />
          {link ? (
            <span
              aria-hidden="true"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-fg ring-1 ring-line transition-[background-color,color] duration-300 ease-out-quart group-hover:bg-fg group-hover:text-bg"
            >
              {link.external ? (
                <ArrowUpRightIcon className="size-4 transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              ) : (
                <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5" />
              )}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
