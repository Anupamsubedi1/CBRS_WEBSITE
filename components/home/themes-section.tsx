import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ThemeIcon } from "@/components/shared/icon";
import { themes } from "@/lib/data/themes";

export function ThemesSection() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="themes">
      <Container>
        {/* Editorial two-column header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">What We Do</span>
            <h2 id="themes" className="mt-3 text-3xl font-bold sm:text-4xl">
              Our Themes of Work
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Six interconnected themes shape every program we run, each one a
              step toward a more inclusive, dignified Nepal.
            </p>
            <Link
              href="/about/cbrs-nepal"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
            >
              How our themes work together
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {themes.map((theme) => (
            <StaggerItem key={theme.slug} className="h-full">
              <Link
                href={`/about/cbrs-nepal#${theme.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <ThemeIcon name={theme.icon} className="size-7" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-foreground">
                  {theme.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-700">
                  {theme.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {theme.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
