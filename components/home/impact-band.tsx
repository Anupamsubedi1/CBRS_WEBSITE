import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";
import { ThemeIcon } from "@/components/shared/icon";
import type { HomeImpact } from "@/lib/types";

export function ImpactBand({ content }: { content: HomeImpact }) {
  return (
    <section className="relative overflow-hidden bg-brand-band py-20 text-white lg:py-24">
      <div className="pattern-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <Reveal>
            <span className="eyebrow text-accent-100">{content.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-white/80">{content.description}</p>
            <Button href={content.ctaHref} variant="white" className="mt-6">
              {content.ctaLabel} <ArrowRight />
            </Button>
          </Reveal>

          <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {content.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <ThemeIcon name={s.icon} className="size-6 text-white" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold text-white">
                    <Counter value={s.value} />
                  </p>
                  <p className="mt-1 text-sm leading-tight text-white/75">
                    {s.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
