import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The closing row of a section: a hairline, a short muted line of copy and
 * a call to action. Stacks on phones (CTA under the copy, left-aligned) and
 * sits in one row from `sm`. Pass the Button as children so each section
 * keeps its own hierarchy (ghost link, primary CTA); only the chrome is shared.
 */
export function SectionFooter({
  text,
  children,
  delay = 120,
  className,
  textClassName,
}: {
  text: ReactNode;
  children: ReactNode;
  delay?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <Reveal delay={delay} className={cn("mt-12 sm:mt-16", className)}>
      <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className={cn("max-w-[48ch] text-muted", textClassName)}>{text}</p>
        {children}
      </div>
    </Reveal>
  );
}
