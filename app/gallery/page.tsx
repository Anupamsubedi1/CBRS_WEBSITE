import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DonateBand } from "@/components/layout/donate-band";
import { gallery, galleryCategories } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from CBRS Nepal's work — rehabilitation, inclusive education, livelihoods, community development and events across Gandaki Province.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Our Work in Pictures"
        description="Every photo tells a story of inclusion, resilience and dignity. Explore moments from across our programs and communities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <GalleryGrid items={gallery} categories={[...galleryCategories]} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
