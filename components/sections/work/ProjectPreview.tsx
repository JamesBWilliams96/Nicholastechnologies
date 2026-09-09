import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { PlaceholderPreview } from "./PlaceholderPreview";

type ProjectPreviewProps = {
  project: Project;
  className?: string;
  /** `sizes` hint for next/image when a real screenshot is shown. */
  sizes?: string;
  priority?: boolean;
};

/**
 * The visual for a project: a real screenshot when one exists, otherwise
 * a generated interface in a browser window. Purely presentational —
 * the parent decides positioning, cropping and hover behaviour.
 */
export function ProjectPreview({ project, className, sizes, priority }: ProjectPreviewProps) {
  if (project.image) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl bg-white shadow-float ring-1 ring-ink-950/8",
          className,
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
    );
  }
  return <PlaceholderPreview variant={project.preview ?? "website"} className={className} />;
}
