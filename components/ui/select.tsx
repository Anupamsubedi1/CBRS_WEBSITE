import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Styled native select — keyboard-accessible by default. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-input bg-surface pl-4 pr-10 text-sm text-foreground transition-colors",
          "focus-visible:border-secondary focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-secondary/25",
          "disabled:cursor-not-allowed disabled:opacity-55",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  ),
);
Select.displayName = "Select";
