import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 5, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "flex w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground transition-colors resize-y",
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
Textarea.displayName = "Textarea";
