import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Color theme — use "light" on dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  /** Heading level for correct document outline. */
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            tone === "light" && "text-accent-100",
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "text-3xl font-bold sm:text-4xl",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
            tone === "light" && "text-white/80",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
