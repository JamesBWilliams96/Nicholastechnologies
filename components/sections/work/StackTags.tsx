import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/utils";

/** The technologies a project was built with, as the same tool badges used in the Technology section. */
export function StackTags({ stack, className }: { stack: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Built with">
      {stack.map((tech) => (
        <li key={tech}>
          <Wordmark className="text-2xs">{tech}</Wordmark>
        </li>
      ))}
    </ul>
  );
}
