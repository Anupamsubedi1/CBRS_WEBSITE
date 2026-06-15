import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { SuccessStories } from "@/components/home/success-stories";
import { news } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";
import type { GalleryItem, HomeSuccessStory } from "@/lib/types";

function LatestNews() {
  const latest = news
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Latest News &amp; Notices</h3>
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>

      <ul className="mt-5 flex-1 space-y-3">
        {latest.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/news/${item.slug}`}
              className="group flex gap-4 rounded-2xl border border-border bg-surface p-3 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <Media
                src={item.coverImage}
                alt={item.title}
                seed={item.slug}
                ratio="aspect-square"
                rounded="rounded-xl"
                className="size-20 shrink-0"
              />
              <div className="min-w-0 flex-1 py-0.5">
                <Badge variant="accent" size="sm">
                  {item.category}
                </Badge>
                <h4 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h4>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {formatDate(item.date)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GalleryPreview({ items }: { items: GalleryItem[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Latest Photos</h3>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>

      <Link
        href="/gallery"
        className="mt-5 grid flex-1 grid-cols-3 gap-2.5 rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        aria-label="View the full photo gallery"
      >
        {items.map((g) => (
          <Media
            key={g.id}
            src={g.image?.url}
            alt={g.title}
            seed={g.id}
            ratio="aspect-square"
            rounded="rounded-xl"
            className="transition-transform duration-300 hover:scale-[1.04]"
          />
        ))}
      </Link>
    </div>
  );
}

export function Highlights({
  successStories,
  galleryItems,
}: {
  successStories: HomeSuccessStory[];
  galleryItems: GalleryItem[];
}) {
  return (
    <section className="bg-white py-20 lg:py-24" aria-label="Stories, news and gallery">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-3">
            <SuccessStories stories={successStories} />
            <LatestNews />
            <GalleryPreview items={galleryItems} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
