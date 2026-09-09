import { cn } from "@/lib/utils";

/** The technologies a project was built with, as small mono tags. */
export function StackTags({ stack, className }: { stack: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Built with">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md bg-surface-2 px-2 py-1 font-mono text-2xs font-medium text-muted ring-1 ring-inset ring-line"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
