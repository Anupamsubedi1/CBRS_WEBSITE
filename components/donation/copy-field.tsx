"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

/** Labelled value row with a copy-to-clipboard button. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0">
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
        <dd className="truncate font-semibold text-foreground">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
      >
        {copied ? (
          <Check className="size-4 text-accent" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
