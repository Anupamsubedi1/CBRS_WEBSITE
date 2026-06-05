import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary",
        accent: "bg-accent-50 text-accent-700",
        secondary: "bg-secondary-50 text-secondary",
        neutral: "bg-slate-100 text-slate-600",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        outline: "border border-border bg-surface text-muted",
        "on-dark": "bg-white/15 text-white backdrop-blur-sm",
      },
      size: {
        sm: "px-2.5 py-1 text-[0.7rem]",
        md: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
