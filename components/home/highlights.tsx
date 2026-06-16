import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { gallery } from "@/lib/data/gallery";

export function Highlights() {
  const items = gallery.slice(0, 6);

  return (
    <section className="bg-white py-8 lg:py-12" aria-labelledby="gallery-preview">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Gallery"
              title={<span id="gallery-preview">Our Work in Pictures</span>}
              description="Moments from across our programs, organized by the work they belong to."
              className="max-w-2xl"
            />
            <Button href="/gallery" variant="outline" className="shrink-0">
              View Full Gallery <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((g) => (
            <StaggerItem key={g.id}>
              <Link
                href="/gallery"
                className="group relative block overflow-hidden rounded-2xl shadow-card focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                aria-label={`${g.title} (view gallery)`}
              >
                <Media
                  src={g.image?.url}
                  alt={g.title}
                  seed={g.id}
                  ratio="aspect-square"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="p-4 text-left text-sm font-semibold text-white">
                    {g.title}
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
