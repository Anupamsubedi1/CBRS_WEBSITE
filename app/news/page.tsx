import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { NewsBrowser } from "@/components/news/news-browser";
import { DonateBand } from "@/components/layout/donate-band";
import { news, newsCategories } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News & Notices",
  description:
    "Latest news, notices and events from CBRS Nepal — programs, awareness campaigns, vacancies and announcements.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay Informed"
        title="News & Notices"
        description="Updates from the field, official notices and stories of impact from across the CBRS Nepal community."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Notices" }]}
      />

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <NewsBrowser items={news} categories={newsCategories} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
