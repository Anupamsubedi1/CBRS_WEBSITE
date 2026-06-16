"use client";

import * as React from "react";
import Link from "next/link";
import { Search, CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

const PAGE_SIZE = 6;

const badgeForCategory: Record<string, "primary" | "accent" | "secondary" | "warning"> = {
  News: "primary",
  Notice: "warning",
  Event: "accent",
  Story: "secondary",
};

export function NewsBrowser({
  items,
  categories,
}: {
  items: NewsItem[];
  categories: readonly string[];
}) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [page, setPage] = React.useState(1);

  const sorted = React.useMemo(
    () => items.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [items],
  );

  const featured = sorted.find((i) => i.featured) ?? sorted[0];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted
      .filter((i) => i.slug !== featured?.slug)
      .filter((i) => category === "All" || i.category === category)
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q),
      );
  }, [sorted, query, category, featured?.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // No articles to show (the News page renders its own empty state).
  if (!featured) return null;

  // Reset to the first page whenever the filters change.
  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }
  function changeCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div>
      {/* Featured story */}
      <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden">
            <Media
              src={featured.coverImage}
              alt={featured.title}
              seed={featured.slug}
              ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
              className="h-full transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4">
              <Badge variant="on-dark">Featured</Badge>
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={badgeForCategory[featured.category]}>
                {featured.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <CalendarDays className="size-4" aria-hidden="true" />
                {formatDate(featured.date)}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
              <Link
                href={`/news/${featured.slug}`}
                className="transition-colors hover:text-primary"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <Button href={`/news/${featured.slug}`} className="mt-7 self-start">
              Read Full Story <ArrowRight />
            </Button>
          </div>
        </div>
      </article>

      {/* Controls */}
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => changeCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            placeholder="Search news…"
            aria-label="Search news and notices"
            className="pl-10"
          />
        </div>
      </div>

      {/* Results count for assistive tech */}
      <p className="sr-only" aria-live="polite">
        {filtered.length} article{filtered.length !== 1 && "s"} found
      </p>

      {/* Grid */}
      {rows.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted">
          <Newspaper
            className="mx-auto mb-3 size-7 opacity-50"
            aria-hidden="true"
          />
          No articles found. Try a different search or category.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((item) => (
            <article
              key={item.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
            >
              <div className="overflow-hidden">
                <Media
                  src={item.coverImage}
                  alt={item.title}
                  seed={item.slug}
                  ratio="aspect-[16/10]"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <Badge variant={badgeForCategory[item.category]} size="sm">
                    {item.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
                  <Link
                    href={`/news/${item.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.excerpt}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  aria-hidden="true"
                >
                  Read More
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="News pagination" className="mt-12 flex justify-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === current ? "page" : undefined}
              aria-label={`Page ${p}`}
              className={cn(
                "grid size-10 place-items-center rounded-lg text-sm font-medium transition-colors",
                p === current
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-primary-50",
              )}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
