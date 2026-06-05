"use client";

import * as React from "react";
import { Search, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { GeneralMember } from "@/lib/types";

const PAGE_SIZE = 8;

export function MembersTable({ members }: { members: GeneralMember[] }) {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.ward.toLowerCase().includes(q),
    );
  }, [members, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  // Reset to first page whenever the search changes.
  React.useEffect(() => setPage(1), [query]);

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-6">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members…"
            aria-label="Search members by name, role or ward"
            className="pl-10"
          />
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} member{filtered.length !== 1 && "s"}
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            CBRS Nepal general members and volunteers
          </caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th scope="col" className="px-3 py-3 font-semibold">Name</th>
              <th scope="col" className="px-3 py-3 font-semibold">Role</th>
              <th scope="col" className="px-3 py-3 font-semibold">Ward</th>
              <th scope="col" className="px-3 py-3 font-semibold">Member Since</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-12 text-center text-muted">
                  <Users className="mx-auto mb-2 size-6 opacity-50" aria-hidden="true" />
                  No members match “{query}”.
                </td>
              </tr>
            ) : (
              rows.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border/70 transition-colors hover:bg-primary-50/50"
                >
                  <th scope="row" className="px-3 py-3.5 font-semibold text-foreground">
                    {m.name}
                  </th>
                  <td className="px-3 py-3.5 text-muted">{m.role}</td>
                  <td className="px-3 py-3.5 text-muted">{m.ward}</td>
                  <td className="px-3 py-3.5 text-muted">{m.joined}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Members pagination"
          className="mt-5 flex items-center justify-between border-t border-border pt-4"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary-50 disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === current ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={cn(
                  "grid size-9 place-items-center rounded-lg text-sm font-medium transition-colors",
                  p === current
                    ? "bg-primary text-white"
                    : "border border-border text-foreground hover:bg-primary-50",
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary-50 disabled:pointer-events-none disabled:opacity-50"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
