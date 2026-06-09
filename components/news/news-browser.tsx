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
  const [gridKey, setGridKey] = React.useState(0);

  const sorted = React.useMemo(
    () => items.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [items],
  );

  const featured = sorted.find((i) => i.featured) ?? sorted[0];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted
      .filter((i) => i.slug !== featured.slug)
      .filter((i) => category === "All" || i.category === category)
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q),
      );
  }, [sorted, query, category, featured.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  React.useEffect(() => { setPage(1); setGridKey((k) => k + 1); }, [query, category]);
  React.useEffect(() => { setGridKey((k) => k + 1); }, [page]);

  return (
    <div>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInBottom {
          from {
            opacity: 0;
            transform: translateY(80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-left {
          animation: slideInLeft 900ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .animate-slide-bottom {
          animation: slideInBottom 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .animate-fade-scale {
          animation: fadeInScale 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }

        /* Cards slide in from left on load */
        .news-card-enter {
          animation: slideInLeft 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        /* Card Hover - Black Background with White Text */
        .news-card {
          transition: all 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .news-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 800ms ease-out;
          z-index: 10;
          pointer-events: none;
        }

        .news-card:hover::before {
          opacity: 1;
        }

        .news-card:hover {
          transform: translateY(-20px) scale(1.05);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
          background: #000000;
        }

        .news-card:hover h3 {
          color: white;
          text-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
        }

        .news-card:hover .card-excerpt {
          color: rgba(255, 255, 255, 0.85);
        }

        .news-card:hover .card-badge {
          background: rgba(255, 255, 255, 0.15) !important;
          color: white !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .news-card:hover .card-date {
          color: white;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .news-card:hover .card-read-more {
          color: white;
          font-weight: 900;
        }
      `}</style>

      {/* Featured */}
      <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card animate-slide-left">
        <div className="grid lg:grid-cols-2">
          <Link
            href={`/news/${featured.slug}`}
            className="group relative block focus-visible:outline-none"
            aria-label={featured.title}
          >
            <Media
              src={featured.coverImage}
              alt={featured.title}
              seed={featured.slug}
              ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
              fill={false}
              className="h-full transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4">
              <Badge variant="accent">Featured</Badge>
            </span>
          </Link>
          <div className="flex flex-col justify-center p-8 lg:p-10 animate-slide-left delay-100">
            <Badge variant={badgeForCategory[featured.category]} className="self-start">
              {featured.category}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl transition-colors duration-700 hover:text-[#00A89E]">
              <Link href={`/news/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <CalendarDays className="size-4" aria-hidden="true" />
              {formatDate(featured.date)}
            </p>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <Button href={`/news/${featured.slug}`} className="mt-6 self-start">
              Read Full Story <ArrowRight />
            </Button>
          </div>
        </div>
      </article>

      {/* Controls */}
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between animate-slide-left delay-200">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-700 animate-fade-scale",
                category === c
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary",
              )}
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs animate-slide-left delay-300">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news…"
            aria-label="Search news and notices"
            className="pl-10"
          />
        </div>
      </div>

      {/* Grid */}
      {rows.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted animate-slide-bottom delay-400">
          <Newspaper className="mx-auto mb-3 size-7 opacity-50" aria-hidden="true" />
          No articles found. Try a different search or category.
        </div>
      ) : (
        <div key={gridKey} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((item, i) => (
            <article
              key={item.slug}
              className="news-card news-card-enter group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Link
                href={`/news/${item.slug}`}
                aria-label={item.title}
                className="block focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <Media
                  src={item.coverImage}
                  alt={item.title}
                  seed={item.slug}
                  ratio="aspect-[16/10]"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <Badge variant={badgeForCategory[item.category]} size="sm" className="card-badge">
                    {item.category}
                  </Badge>
                  <span className="card-date flex items-center gap-1 text-xs text-muted transition-colors duration-700">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-foreground transition-colors duration-700">
                  <Link href={`/news/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h3>
                <p className="card-excerpt mt-2 line-clamp-3 flex-1 text-sm text-muted transition-colors duration-700">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="card-read-more mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors duration-700"
                >
                  Read More
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="News pagination" className="mt-12 flex justify-center gap-1.5 animate-slide-bottom delay-500">
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