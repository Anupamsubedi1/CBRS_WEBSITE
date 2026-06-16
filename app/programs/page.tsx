import type { Metadata } from "next";
import { Layers, MapPin, HandHeart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero, HeroChip } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ProgramsGrid } from "@/components/programs/programs-grid";
import { DonateBand } from "@/components/layout/donate-band";
import { getPrograms } from "@/lib/programs";
import { getProgramsPageContent } from "@/lib/programs-page";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore CBRS Nepal's programs across rehabilitation, education, livelihood, rights and community development, changing lives across Gandaki Province.",
};

export default async function ProgramsPage() {
  const [programs, hero] = await Promise.all([
    getPrograms(),
    getProgramsPageContent(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
        image={{ src: "/banner.jpg" }}
      >
        <HeroChip icon={<Layers className="size-4" aria-hidden="true" />}>
          {programs.length} Themes of Work
        </HeroChip>
        <HeroChip icon={<HandHeart className="size-4" aria-hidden="true" />}>
          Community-based approach
        </HeroChip>
        <HeroChip icon={<MapPin className="size-4" aria-hidden="true" />}>
          Gandaki Province and beyond
        </HeroChip>
      </PageHero>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <ProgramsGrid programs={programs} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
