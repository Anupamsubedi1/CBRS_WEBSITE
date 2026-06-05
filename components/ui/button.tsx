import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-55 [&_svg]:shrink-0 [&_svg]:size-[1.1em] active:translate-y-px select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_6px_18px_-6px_rgba(0,93,170,0.6)] hover:bg-primary-600 focus-visible:outline-primary/40",
        accent:
          "bg-accent text-white shadow-[0_6px_18px_-6px_rgba(0,169,157,0.65)] hover:bg-accent-600 focus-visible:outline-accent/40",
        secondary:
          "bg-secondary text-white shadow-[0_6px_18px_-6px_rgba(25,118,210,0.55)] hover:bg-[#1366ba] focus-visible:outline-secondary/40",
        outline:
          "border border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary hover:bg-primary-50 focus-visible:outline-primary/30",
        "outline-white":
          "border border-white/70 text-white hover:bg-white/15 focus-visible:outline-white/60",
        ghost:
          "text-foreground hover:bg-primary-50 hover:text-primary focus-visible:outline-primary/30",
        white:
          "bg-white text-primary shadow-card hover:bg-primary-50 focus-visible:outline-white/60",
        link: "text-primary underline-offset-4 hover:underline px-0 h-auto rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button. Renders a Next `<Link>` when `href` is provided,
 * otherwise a native `<button>`. Used everywhere for consistent CTAs.
 */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    );
  }

  const { children, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export { buttonVariants };
