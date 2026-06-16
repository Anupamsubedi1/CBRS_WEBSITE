import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ThemesGrid } from "@/components/home/themes-grid";

export function ThemesSection() {
  return (
    <section className="overflow-hidden bg-white py-8 lg:py-12" aria-labelledby="themes">
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

        <ThemesGrid />
      </Container>
    </section>
  );
}
