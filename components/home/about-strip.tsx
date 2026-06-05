import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { Reveal } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";
import { ThemeIcon } from "@/components/shared/icon";
import { orgStats } from "@/lib/data/impact";

export function AboutStrip() {
  return (
    <section className="py-20 lg:py-24" aria-labelledby="who-we-are">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image with floating badge */}
        <Reveal className="relative">
          <Media
            alt="A family with a person who uses a wheelchair, smiling together in a Nepali village"
            seed="who-we-are"
            label="Families we walk alongside"
            ratio="aspect-[5/4]"
            rounded="rounded-3xl"
            className="shadow-card"
            icon={<Users className="size-7" aria-hidden="true" />}
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-primary px-5 py-4 text-white shadow-float sm:block">
            <span className="block text-3xl font-bold">
              <Counter value="2005" />
            </span>
            <span className="text-xs text-white/80">Serving since</span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">Who We Are</span>
            <h2 id="who-we-are" className="mt-3 text-3xl font-bold sm:text-4xl">
              CBRS Nepal
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              CBRS Nepal is a non-government organization working with and for
              people with disabilities, their families and marginalized
              communities across Nepal since 2005. We believe in inclusion,
              equality and dignity for all — and we work in genuine partnership
              with the people we serve.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Registered with the District Administration Office, Kaski and
              affiliated with the Social Welfare Council, we focus our work
              across Gandaki Province while supporting initiatives nationwide.
            </p>
            <Button href="/about/cbrs-nepal" className="mt-7">
              Learn More About Us <ArrowRight />
            </Button>
          </Reveal>

          {/* Stats */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
            {orgStats.map((s, i) => (
              <Reveal as="div" key={s.label} delay={i * 0.06}>
                <span className="grid size-10 place-items-center rounded-xl bg-accent-50 text-accent-700">
                  <ThemeIcon name={s.icon} className="size-5" />
                </span>
                <dd className="mt-3 text-2xl font-bold text-primary">
                  <Counter value={s.value} />
                </dd>
                <dt className="text-sm text-muted">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
