import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-input bg-surface px-4 text-sm text-foreground transition-colors",
        "placeholder:text-muted/70",
        "focus-visible:border-secondary focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-secondary/25",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:outline-danger/25",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
