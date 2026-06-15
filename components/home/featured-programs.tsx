import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ProgramCard } from "@/components/shared/program-card";
import type { HomeFeaturedPrograms, Program } from "@/lib/types";

export function FeaturedPrograms({
  content,
  programs,
}: {
  content: HomeFeaturedPrograms;
  programs: Program[];
}) {
  return (
    <section className="py-20 lg:py-24" aria-labelledby="featured-programs">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow={content.eyebrow}
              title={<span id="featured-programs">{content.title}</span>}
              description={content.description}
              className="max-w-2xl"
            />
            <Button href={content.ctaHref} variant="outline" className="shrink-0">
              {content.ctaLabel} <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProgramCard program={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
