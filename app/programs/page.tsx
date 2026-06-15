import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ProgramsGrid } from "@/components/programs/programs-grid";
import { DonateBand } from "@/components/layout/donate-band";
import { getPrograms } from "@/lib/programs";
import { getProgramsPageContent } from "@/lib/programs-page";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore CBRS Nepal's programs across rehabilitation, education, livelihood, rights and community development — changing lives across Gandaki Province.",
};

export default async function ProgramsPage() {
  const [programs, hero] = await Promise.all([getPrograms(), getProgramsPageContent()]);
  const categories = Array.from(new Set(programs.map((p) => p.category)));

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
      />

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <ProgramsGrid programs={programs} categories={categories} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
