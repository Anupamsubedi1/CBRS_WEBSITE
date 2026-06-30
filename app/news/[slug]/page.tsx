import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DonateBand } from "@/components/layout/donate-band";
import { getNews, getNewsBySlug } from "@/lib/news";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Article Not Found" };
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${slug}` },
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const more = (await getNews())
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <article>
        {/* Header */}
        <section className="relative overflow-hidden bg-brand-hero text-white">
          <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <Container size="narrow" className="relative py-12 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/news"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    News &amp; Notices
                  </Link>
                </li>
              </ol>
            </nav>
            <Badge variant="on-dark">{item.category}</Badge>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-in fade-in slide-in-from-bottom">
              {item.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/80 animate-in fade-in slide-in-from-bottom">
              <span className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white">
                <CalendarDays className="size-4" aria-hidden="true" />
                {formatDate(item.date)}
              </span>
              {item.author && (
                <span className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white">
                  <User className="size-4" aria-hidden="true" />
                  {item.author}
                </span>
              )}
            </div>
          </Container>
        </section>

        <Container size="narrow" className="py-12 lg:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <Media
                src={item.coverImage?.url}
                alt={item.title}
                seed={item.slug}
                label={item.category}
                ratio="aspect-[16/9]"
                rounded="rounded-3xl"
                className="transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </Reveal>

          <Reveal className="prose-cbrs mt-10 max-w-none">
            {item.body.map((para, i) => (
              <p
                key={i}
                className="mt-5 text-lg leading-relaxed text-foreground/90 transition-colors duration-300 hover:text-foreground first:mt-0"
              >
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button
                href="/news"
                variant="ghost"
                size="sm"
                className="transition-all duration-300 hover:-translate-x-1 active:translate-x-0"
              >
                <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to News
              </Button>
              <Button
                href="/donate"
                variant="accent"
                size="sm"
                className="transition-all duration-300 hover:translate-x-1 active:translate-x-0"
              >
                Support Our Work
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </article>

      {/* More news */}
      <section className="border-t border-border bg-white py-16">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground animate-in fade-in slide-in-from-left">
              More News &amp; Notices
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((n) => (
              <Reveal key={n.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/50">
                  <Link
                    href={`/news/${n.slug}`}
                    aria-label={n.title}
                    className="block overflow-hidden"
                  >
                    <Media
                      src={n.coverImage?.url}
                      alt={n.title}
                      seed={n.slug}
                      ratio="aspect-[16/10]"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex items-center gap-2 text-xs text-muted transition-colors duration-300 group-hover:text-foreground/70">
                      <Badge variant="neutral" size="sm">{n.category}</Badge>
                      {formatDate(n.date)}
                    </span>
                    <h3 className="mt-3 font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                      <Link
                        href={`/news/${n.slug}`}
                        className="transition-colors duration-300 hover:text-accent"
                      >
                        {n.title}
                      </Link>
                    </h3>
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