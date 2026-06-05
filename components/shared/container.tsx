import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

/** Centered max-width wrapper with responsive gutters. */
export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-4xl",
        size === "wide" && "max-w-[88rem]",
        className,
      )}
      {...props}
    />
  );
}
