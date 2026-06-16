"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  CalendarDays,
  ArrowRight,
  Newspaper,
  Megaphone,
} from "lucide-react";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatDate, cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

const PAGE_SIZE = 5;

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

  // Notices go to the right-hand listing; everything else is a blog article.
  const notices = React.useMemo(
    () => sorted.filter((i) => i.category === "Notice"),
    [sorted],
  );
  const articles = React.useMemo(
    () => sorted.filter((i) => i.category !== "Notice"),
    [sorted],
  );

  const featured = articles.find((i) => i.featured) ?? articles[0];

  // Tabs only cover article categories — notices have their own panel.
  const articleCategories = categories.filter((c) => c !== "Notice");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((i) => i.slug !== featured?.slug)
      .filter((i) => category === "All" || i.category === category)
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q),
      );
  }, [articles, query, category, featured?.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }
  function changeCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12 xl:gap-16">
      {/* ===================== News — blog feed ===================== */}
      <div className="min-w-0">
        {/* Featured article */}
        {featured && (
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover">
            <div className="grid sm:grid-cols-2">
              <div className="relative overflow-hidden">
                <Media
                  src={featured.coverImage?.url}
                  alt={featured.title}
                  seed={featured.slug}
                  ratio="aspect-[16/10] sm:aspect-auto sm:h-full"
                  className="h-full transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <span className="absolute left-4 top-4">
                  <Badge variant="on-dark">Featured</Badge>
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
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
                <p className="mt-3 line-clamp-3 text-muted">{featured.excerpt}</p>
                <Link
                  href={`/news/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary"
                >
                  Read Full Story
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter news by category"
            className="flex flex-wrap gap-2"
          >
            {articleCategories.map((c) => (
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
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              placeholder="Search news…"
              aria-label="Search news"
              className="pl-10"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} article{filtered.length !== 1 && "s"} found
        </p>

        {/* Blog-style list */}
        {rows.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted">
            <Newspaper className="mx-auto mb-3 size-7 opacity-50" aria-hidden="true" />
            {articles.length === 0
              ? "No news articles yet. Please check back soon."
              : "No articles found. Try a different search or category."}
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-8">
            {rows.map((item) => (
              <article
                key={item.slug}
                className="group grid gap-5 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="relative block overflow-hidden rounded-2xl"
                >
                  <Media
                    src={item.coverImage?.url}
                    alt={item.title}
                    seed={item.slug}
                    ratio="aspect-[16/10]"
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 15rem"
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <Badge variant={badgeForCategory[item.category]} size="sm">
                      {item.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-foreground">
                    <Link
                      href={`/news/${item.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted sm:text-base">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary"
                  >
                    Read More
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
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

      {/* ===================== Notices — right-hand listing ===================== */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
          <div className="flex items-center gap-2.5 border-b border-border bg-primary-50/60 px-5 py-4">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-white">
              <Megaphone className="size-4" aria-hidden="true" />
            </span>
            <h2 className="text-base font-bold text-foreground">Notices</h2>
          </div>

          {notices.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted">
              No notices at the moment. New announcements will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {notices.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/news/${n.slug}`}
                    className="group block px-5 py-4 transition-colors hover:bg-primary-50/60"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(n.date)}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {n.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
