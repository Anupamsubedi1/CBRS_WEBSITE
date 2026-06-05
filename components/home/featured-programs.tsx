import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ProgramCard } from "@/components/shared/program-card";
import { programs } from "@/lib/data/programs";

export function FeaturedPrograms() {
  const featured = programs.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 lg:py-24" aria-labelledby="featured-programs">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Our Programs"
              title={<span id="featured-programs">Featured Programs</span>}
              description="On-the-ground work changing lives across Gandaki Province and beyond."
              className="max-w-2xl"
            />
            <Button href="/programs" variant="outline" className="shrink-0">
              View All Programs <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProgramCard program={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
