import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Centered page column. 1200px max, responsive gutters. */
export function Container({ className, ...rest }: ContainerProps) {
  return <div className={cn("container-site", className)} {...rest} />;
}
