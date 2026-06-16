import type { Metadata } from "next";
import { Camera, Layers, HandHeart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero, HeroChip } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DonateBand } from "@/components/layout/donate-band";
import { getGalleryItems, getGalleryCategories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from CBRS Nepal's work in rehabilitation, inclusive education, livelihoods and community development across Gandaki Province.",
};

export default async function GalleryPage() {
  const [gallery, galleryCategories] = await Promise.all([
    getGalleryItems(),
    getGalleryCategories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Our Work in Pictures"
        description="Every photo tells a story of inclusion, resilience and dignity. Explore moments from across our programs and communities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        <HeroChip icon={<Layers className="size-4" aria-hidden="true" />}>
          {galleryCategories.length - 1} Programs
        </HeroChip>
        <HeroChip icon={<Camera className="size-4" aria-hidden="true" />}>
          Organized by program
        </HeroChip>
      </PageHero>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Browse by Program"
              title="Explore Our Gallery"
              description="Filter our work by program, from rehabilitation and inclusive education to livelihood, rights and community development."
            />
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <GalleryGrid items={gallery} categories={[...galleryCategories]} />
          </Reveal>

          {/* Dignity & consent note */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 text-center text-sm text-muted">
              <HandHeart
                className="size-4 shrink-0 text-accent-700"
                aria-hidden="true"
              />
              All photographs are shared with the consent of the individuals
              and communities depicted.
            </p>
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
