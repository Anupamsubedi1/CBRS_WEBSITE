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

const stats = [
  { value: `${gallery.length}+`, label: "Photos" },
  { value: `${galleryCategories.length}`, label: "Categories" },
  { value: "30+", label: "Years of Stories" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Our Work in Pictures"
        description="Every photo tells a story of inclusion, resilience and dignity. Explore moments from across our programs and communities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      {/* Stats strip — matches the impact counter row on homepage */}
      <div className="border-b border-border bg-white">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center justify-center gap-1 py-6 transition-colors duration-300 hover:bg-primary/5"
              >
                <span className="text-3xl font-extrabold text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-accent lg:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Main gallery section */}
      <section className="py-20 lg:py-24">
        <Container>

          {/* Section header — matches "OUR PROGRAMS / Featured Programs" style */}
          <Reveal>
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Browse by Category
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                Explore Our Gallery
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Filter through our programs — from rehabilitation and inclusive
                education to livelihood support and community events across
                Gandaki Province.
              </p>
            </div>
          </Reveal>

          {/* Gallery grid — clean white card matching homepage program cards */}
          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:shadow-2xl">
              <div className="p-6 sm:p-8 lg:p-10">
                <GalleryGrid items={gallery} categories={[...galleryCategories]} />
              </div>
            </div>
          </Reveal>

          {/* Consent note */}
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-muted">
              All photographs are shared with the consent of individuals and
              communities depicted.
            </p>
          </Reveal>

        </Container>
      </section>

      <DonateBand />
    </>
  );
}