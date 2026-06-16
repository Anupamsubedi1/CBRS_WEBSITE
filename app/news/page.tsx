import type { Metadata } from "next";
import { Newspaper, Megaphone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero, HeroChip } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { NewsBrowser } from "@/components/news/news-browser";
import { DonateBand } from "@/components/layout/donate-band";
import { Button } from "@/components/ui/button";
import { news, newsCategories } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News & Notices",
  description:
    "Latest news, notices and events from CBRS Nepal, including programs, awareness campaigns, vacancies and announcements.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay Informed"
        title="News & Notices"
        description="Updates from the field, official notices and stories of impact from across the CBRS Nepal community."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Notices" }]}
      >
        <HeroChip icon={<Newspaper className="size-4" aria-hidden="true" />}>
          News &amp; Notices
        </HeroChip>
        <HeroChip icon={<Megaphone className="size-4" aria-hidden="true" />}>
          Updates from the field
        </HeroChip>
      </PageHero>

      <section className="py-20 lg:py-24">
        <Container>
          {news.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-surface p-12 text-center shadow-card">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
                  <Newspaper className="size-7" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-foreground">
                  No news or notices yet
                </h2>
                <p className="mt-2 text-muted">
                  We will publish our latest news, notices and events here.
                  Please check back soon or get in touch to learn more about our
                  work.
                </p>
                <Button href="/contact" className="mt-6">
                  Contact Us
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <NewsBrowser items={news} categories={newsCategories} />
            </Reveal>
          )}
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
