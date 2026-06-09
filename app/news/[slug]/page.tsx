import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DonateBand } from "@/components/layout/donate-band";
import { news, getNewsBySlug } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Article Not Found" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const more = news
    .filter((n) => n.slug !== item.slug)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <article>
        {/* Header */}
        <section className="relative overflow-hidden bg-brand-hero text-white">
          <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
          {/* Decorative gradient orb */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-[500px] rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <Container size="narrow" className="relative py-14 lg:py-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li>
                  <Link
                    href="/news"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    News &amp; Notices
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li className="text-white/90 line-clamp-1">{item.title}</li>
              </ol>
            </nav>

            <Badge variant="on-dark">{item.category}</Badge>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/75">
              <span className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white">
                <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                {formatDate(item.date)}
              </span>
              {item.author && (
                <span className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white">
                  <User className="size-4 shrink-0" aria-hidden="true" />
                  {item.author}
                </span>
              )}
              <span className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white">
                <Tag className="size-4 shrink-0" aria-hidden="true" />
                {item.category}
              </span>
            </div>
          </Container>
        </section>

        {/* Body */}
        <Container size="narrow" className="py-12 lg:py-16">
          {/* Cover image */}
          <Reveal>
            <div className="group overflow-hidden rounded-3xl border border-border shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-2xl">
              <Media
                src={item.coverImage}
                alt={item.title}
                seed={item.slug}
                label={item.category}
                ratio="aspect-[16/9]"
                rounded="rounded-3xl"
                className="transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </Reveal>

          {/* Article body */}
          <Reveal className="mt-10 max-w-none">
            {item.body.map((para, i) => (
              <p
                key={i}
                className="mt-5 text-lg leading-relaxed text-foreground/90 transition-colors duration-200 first:mt-0 hover:text-foreground"
              >
                {para}
              </p>
            ))}
          </Reveal>

          {/* Bottom nav */}
          <div className="mt-14 flex items-center justify-between border-t border-border pt-6">
            <Button href="/news" variant="ghost" size="sm">
              <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to News
            </Button>
            <Button href="/donate" variant="accent" size="sm">
              Support Our Work
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </Container>
      </article>

      {/* More news */}
      <section className="border-t border-border bg-white py-16 lg:py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold lg:text-3xl">
                More News &amp; Notices
              </h2>
              <Link
                href="/news"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
              >
                View all
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl">
                  {/* Thumbnail */}
                  <Link
                    href={`/news/${n.slug}`}
                    aria-label={n.title}
                    className="block overflow-hidden"
                  >
                    <Media
                      src={n.coverImage}
                      alt={n.title}
                      seed={n.slug}
                      ratio="aspect-[16/10]"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <Badge variant="neutral" size="sm">
                        {n.category}
                      </Badge>
                      <span className="flex items-center gap-1 transition-colors duration-200 group-hover:text-foreground">
                        <CalendarDays className="size-3" aria-hidden="true" />
                        {formatDate(n.date)}
                      </span>
                    </span>

                    <h3 className="mt-3 font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent">
                      <Link
                        href={`/news/${n.slug}`}
                        className="hover:text-primary"
                      >
                        {n.title}
                      </Link>
                    </h3>

                    {n.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted transition-colors duration-300 group-hover:text-foreground/80">
                        {n.excerpt}
                      </p>
                    )}

                    {/* Read more link */}
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/news/${n.slug}`}
                        className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 hover:gap-2"
                      >
                        Read more
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}