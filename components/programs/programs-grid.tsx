"use client";

import * as React from "react";
import { ProgramCard } from "@/components/shared/program-card";
import { cn } from "@/lib/utils";
import type { Program } from "@/lib/types";

export function ProgramsGrid({
  programs,
  categories,
}: {
  programs: Program[];
  categories: string[];
}) {
  const [active, setActive] = React.useState("All");
  const tabs = ["All", ...categories];

  const visible =
    active === "All" ? programs : programs.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div
        role="tablist"
        aria-label="Filter programs by theme"
        className="flex flex-wrap gap-2.5"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === tab
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
    </div>
  );
}
