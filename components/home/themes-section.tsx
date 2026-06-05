import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ThemeIcon } from "@/components/shared/icon";
import { themes } from "@/lib/data/themes";

export function ThemesSection() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="themes">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title={<span id="themes">Our Themes of Work</span>}
            description="Six interconnected themes shape every program we run — each one a step toward a more inclusive, dignified Nepal."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <StaggerItem key={theme.slug}>
              <Link
                href={`/about/cbrs-nepal#${theme.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary transition-colors group-hover:from-primary group-hover:to-secondary group-hover:text-white">
                  <ThemeIcon name={theme.icon} className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {theme.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {theme.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
