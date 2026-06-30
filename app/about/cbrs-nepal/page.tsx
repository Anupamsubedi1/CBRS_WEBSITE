import type { Metadata } from "next";
import Image from "next/image";
import { Quote, Target, Eye, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeIcon } from "@/components/shared/icon";
import { DonateBand } from "@/components/layout/donate-band";
import { site } from "@/lib/data/site";
import { themes, trainings } from "@/lib/data/themes";
import { mission, coreValues, supporters } from "@/lib/data/about";
import { HeroContent } from "./_components/hero-content";

export const metadata: Metadata = {
  title: "CBRS Nepal: Our Story",
  description:
    "Learn about CBRS Nepal: our introduction, vision, mission, history, core values and the six themes through which we serve people with disabilities.",
  alternates: { canonical: "/about/cbrs-nepal" },
};

export default function CbrsNepalPage() {
  return (
    <>
      {/* Page intro with photograph and single brand-primary overlay */}
      <section className="relative isolate w-full overflow-hidden">
        <div className="absolute inset-0 -z-30 bg-primary" aria-hidden="true" />
        <Image
          src="/anniversary_celebration.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: "center" }}
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-b from-primary/80 via-primary/70 to-primary/65 lg:bg-linear-to-r lg:from-primary/85 lg:via-primary/70 lg:to-primary/40"
          aria-hidden="true"
        />
        <Container className="relative flex min-h-60 items-center py-12 lg:min-h-80 lg:py-16">
          <HeroContent />
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative order-2 pb-8 lg:order-1">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/banner.jpg"
                alt="CBRS Nepal team and community members standing together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-0 right-5 hidden rounded-2xl bg-accent px-5 py-4 text-white shadow-float sm:block">
              <span className="block text-sm font-semibold">
                {site.registration.dao}
              </span>
              <span className="text-xs text-white/85">
                {site.registration.swc}
              </span>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">Introduction</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                A community-based organization rooted in dignity
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Community Based Rehabilitation Service (CBRS) Nepal is a
                  non-government organization based in Pokhara that works with
                  and for people with disabilities, their families and
                  marginalized communities on the issues they face.
                </p>
                <p>
                  We use participatory methods, involving the people we serve
                  in planning, decision-making, monitoring and evaluation.
                  Registered with the District Administration Office, Kaski and
                  affiliated with the Social Welfare Council, we focus on
                  Gandaki Province while supporting work across the country.
                </p>
                <p>
                  We serve people with disabilities of all types and ages,
                  encouraging communities to contribute their time, resources
                  and skills so that, together, we move towards enabling and
                  empowerment.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/about/our-team">
                  Meet Our Team <ArrowRight />
                </Button>
                <Button href="/programs" variant="outline">
                  Explore Programs
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-10">
                <div className="pattern-grid absolute inset-0 opacity-20" aria-hidden="true" />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <Eye className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Our Vision
                  </h2>
                  <Quote className="mt-4 size-8 text-white/30" aria-hidden="true" />
                  <p className="mt-2 text-lg leading-relaxed text-white/90">
                    {site.vision}
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="h-full rounded-3xl border border-accent/20 bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover sm:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-50 text-accent-700">
                  <Target className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {mission}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Participatory & community-based",
                    "Rights-based & inclusive",
                    "Skilled, compassionate care",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2
                        className="size-5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What Guides Us"
              title="Our Core Values"
              description="The principles behind every visit, every classroom and every conversation."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v) => (
              <StaggerItem key={v.title} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-700">
                    <ThemeIcon name={v.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Organizational themes */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              title="Our Themes of Work"
              description="Six interconnected themes, each with clear objectives and on-the-ground activities."
            />
          </Reveal>
          <div className="mt-14 space-y-6">
            {themes.map((theme, i) => (
              <Reveal key={theme.slug} delay={(i % 2) * 0.05}>
                <article
                  id={theme.slug}
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="grid gap-0 lg:grid-cols-[1fr_1.3fr]">
                    <div className="relative flex flex-col justify-center gap-4 overflow-hidden bg-primary p-8 text-white sm:p-10">
                      <div
                        className="pattern-grid absolute inset-0 opacity-20"
                        aria-hidden="true"
                      />
                      <div className="relative">
                        <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                          <ThemeIcon
                            name={theme.icon}
                            className="size-7 text-white"
                          />
                        </span>
                        <div className="mt-4">
                          <Badge variant="on-dark" size="sm">
                            Theme {i + 1}
                          </Badge>
                          <h3 className="mt-2 text-2xl font-bold text-white">
                            {theme.title}
                          </h3>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-white/85">
                          {theme.objective}
                        </p>
                      </div>
                    </div>
                    <div className="p-8 sm:p-10">
                      <p className="text-muted">{theme.description}</p>
                      <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
                        Key Activities
                      </h4>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {theme.activities.map((a) => (
                          <li
                            key={a}
                            className="flex items-start gap-2 text-sm text-muted"
                          >
                            <CheckCircle2
                              className="mt-0.5 size-4 shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Training courses (Human Resource Development theme) */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capacity Building"
              title="Training Courses We Deliver"
              description="Under our Human Resource Development and Research theme, CBRS Nepal delivers a wide range of specialised training courses."
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trainings.map((t) => (
              <StaggerItem key={t}>
                <div className="flex h-full items-start gap-2.5 rounded-xl border border-border bg-surface p-4 text-sm text-foreground shadow-card">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {t}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Supporters */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Supporters"
              title="Working Together in Partnership"
              description="CBRS Nepal works with the support of local governments, partner organisations and individuals, and encourages communities to contribute their time, skills and resources."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {supporters.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-card"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
