import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ProgramsGrid } from "@/components/programs/programs-grid";
import { DonateBand } from "@/components/layout/donate-band";
import { programs, programCategories } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore CBRS Nepal's programs across rehabilitation, education, livelihood, rights and community development — changing lives across Gandaki Province.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Programs That Change Lives"
        description="From home-based therapy to inclusive classrooms and sustainable livelihoods — practical work that turns rights into reality."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
      />

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <ProgramsGrid programs={programs} categories={programCategories} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
