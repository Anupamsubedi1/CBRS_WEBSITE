import type { Metadata } from "next";
import Image from "next/image";
import { Quote, Target, Eye, CheckCircle2, ArrowRight, Heart, Briefcase, BookOpen, Scale, Users, Lightbulb } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeIcon } from "@/components/shared/icon";
import { DonateBand } from "@/components/layout/donate-band";
import { site } from "@/lib/data/site";
import { themes } from "@/lib/data/themes";
import { mission, coreValues, milestones, reasons } from "@/lib/data/about";
import { HeroContent } from "./_components/hero-content";

export const metadata: Metadata = {
  title: "CBRS Nepal — Our Story",
  description:
    "Learn about CBRS Nepal: our introduction, vision, mission, history, core values and the six themes through which we serve people with disabilities.",
};

export default function CbrsNepalPage() {
  return (
    <>
      {/* Hero Section with Background Image - Compact Version */}
      <section className="relative isolate w-full">
        {/* Background fallback */}
        <div className="absolute inset-0 -z-30 bg-primary" aria-hidden="true" />

        {/* Hero photograph */}
        <Image
          src="/community.jpeg"
          alt="People with disabilities in community setting"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: "center" }}
        />

        {/* Overlay - Darker for better text visibility */}
        <div
          className="absolute inset-0 -z-10 bg-linear-to-b from-primary/75 via-primary/70 to-primary/65 lg:bg-linear-to-r lg:from-primary/75 lg:via-primary/70 lg:to-primary/60"
          aria-hidden="true"
        />

        {/* Animated hero content lives in a client component */}
        <Container className="relative flex items-center py-10 lg:py-14 min-h-60 lg:min-h-75">
          <HeroContent />
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <Container className="grid items-center gap-8 lg:gap-10 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1 group h-full">
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] h-full">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-card transition-shadow duration-300 group-hover:shadow-2xl h-full bg-teal-600">
                <Image
                  src="/banner.jpg"
                  alt="CBRS Nepal team and community members standing together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-accent px-5 py-4 text-white shadow-float transition-all duration-300 sm:block hover:shadow-xl hover:-bottom-6 hover:-right-5">
              <span className="block text-sm font-semibold">{site.registration.dao}</span>
              <span className="text-xs text-white/85">{site.registration.swc}</span>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow text-accent transition-colors duration-300 animate-in fade-in slide-in-from-right">Introduction</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-foreground transition-colors duration-300 animate-in fade-in slide-in-from-right">
                A community-based organization rooted in dignity
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p className="transition-colors duration-300 hover:text-foreground/80 animate-in fade-in slide-in-from-right">
                  Community Based Rehabilitation Service (CBRS) Nepal is a
                  non-government organization based in Pokhara that works with
                  and for people with disabilities, their families and
                  marginalized communities on the issues they face.
                </p>
                <p className="transition-colors duration-300 hover:text-foreground/80 animate-in fade-in slide-in-from-right">
                  We use participatory methods — involving the people we serve in
                  planning, decision-making, monitoring and evaluation. Registered
                  with the District Administration Office, Kaski and affiliated
                  with the Social Welfare Council, we focus on Gandaki Province
                  while supporting work across the country.
                </p>
                <p className="transition-colors duration-300 hover:text-foreground/80 animate-in fade-in slide-in-from-right">
                  We serve people with disabilities of all types and ages,
                  encouraging communities to contribute their time, resources and
                  skills so that, together, we move towards enabling and
                  empowerment.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href="/about/our-team"
                  className="transition-all duration-300 hover:translate-x-1 active:translate-x-0 animate-in fade-in slide-in-from-bottom"
                >
                  Meet Our Team <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  href="/programs"
                  variant="outline"
                  className="transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent animate-in fade-in slide-in-from-bottom"
                >
                  Explore Programs
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden rounded-3xl bg-primary p-8 text-white sm:p-10 shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-black group animate-in slide-in-from-left">
                <div className="pattern-grid absolute inset-0 opacity-20" aria-hidden="true" />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110">
                    <Eye className="size-6 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-white">Our Vision</h2>
                  <Quote className="mt-4 size-8 text-white/30 transition-colors duration-300 group-hover:text-white/50" aria-hidden="true" />
                  <p className="mt-2 text-lg leading-relaxed text-white/90 transition-colors duration-300 group-hover:text-white">
                    {site.vision}
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="h-full rounded-3xl border border-accent/20 bg-surface p-8 shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-green-600 hover:bg-green-600 sm:p-10 group animate-in slide-in-from-right">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-white group-hover:text-accent group-hover:scale-110">
                  <Target className="size-6 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-white">Our Mission</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted transition-colors duration-300 group-hover:text-white">{mission}</p>
                <ul className="mt-6 space-y-2.5">
                  {["Participatory & community-based", "Rights-based & inclusive", "Skilled, compassionate care"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:translate-x-1.5 group/item group-hover:text-white"
                      >
                        <CheckCircle2 className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover/item:scale-125 group-hover/item:rotate-12 group-hover:text-white" aria-hidden="true" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* History timeline */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 120\"><path d=\"M0,50 Q300,0 600,50 T1200,50\" fill=\"none\" stroke=\"%23007A8E\" strokeWidth=\"2\"/></svg>')" }}
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Our Journey"
              title="A History of Inclusion"
              description="Nearly two decades of walking alongside people with disabilities and their communities."
            />
          </Reveal>
          <ol className="mt-14 space-y-2">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-8 pl-2 transition-all duration-300 hover:translate-x-1 group animate-in fade-in slide-in-from-left">
                  {i < milestones.length - 1 && (
                    <span
                      className="absolute left-[2.4rem] top-12 h-full w-px bg-accent/30 transition-all duration-500"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative z-10 grid size-20 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-card transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 group-hover:bg-secondary">
                    <span className="text-lg font-extrabold">{m.year}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">{m.title}</h3>
                    <p className="mt-1.5 text-muted transition-colors duration-300 group-hover:text-foreground/70">{m.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Core values */}
      <section className="bg-white py-16 lg:py-20">
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
              <StaggerItem key={v.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-primary/10 bg-surface p-6 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2 hover:bg-accent/5 group">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-125 group-hover:rotate-12">
                    <ThemeIcon name={v.icon} className="size-6 transition-transform duration-300" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-accent">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
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
      <section className="py-16 lg:py-20 bg-linear-to-b from-background to-white">
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
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1 group"
                >
                  <div className="grid gap-0 lg:grid-cols-[1fr_1.3fr]">
                    <div className="relative flex flex-col justify-center gap-4 bg-linear-to-br from-primary to-primary/90 p-8 text-white sm:p-10 transition-all duration-500 group-hover:from-black group-hover:to-black overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-500" aria-hidden="true" />
                      <div className="relative transition-all duration-300 group-hover:scale-110 origin-left inline-block w-fit">
                        <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                          <ThemeIcon name={theme.icon} className="size-7 text-white transition-transform duration-300 group-hover:rotate-12" />
                        </span>
                      </div>
                      <div>
                        <Badge variant="on-dark" size="sm" className="transition-all duration-300 group-hover:bg-white group-hover:text-secondary">
                          Theme {i + 1}
                        </Badge>
                        <h3 className="mt-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-white">
                          {theme.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white/95">
                        {theme.objective}
                      </p>
                    </div>
                    <div className="p-8 sm:p-10 transition-all duration-500 group-hover:bg-accent group-hover:text-white">
                      <p className="text-muted transition-colors duration-300 group-hover:text-white group-hover:font-500">{theme.description}</p>
                      <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors duration-300 group-hover:text-white">
                        Key Activities
                      </h4>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {theme.activities.map((a, idx) => (
                          <li
                            key={a}
                            className="flex items-start gap-2 text-sm text-muted transition-all duration-300 hover:text-accent hover:translate-x-1.5 group/item group-hover:text-white animate-in fade-in slide-in-from-left"
                            style={{ transitionDelay: `${idx * 50}ms`, animationDelay: `${idx * 100}ms` }}
                          >
                            <CheckCircle2
                              className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 group-hover/item:scale-125 group-hover/item:rotate-12 group-hover:text-white"
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

      {/* Why CBRS exists */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why We Exist"
              title="Because Inclusion Cannot Wait"
              description="Disability should never mean exclusion. CBRS exists to close the gap between rights on paper and dignity in daily life."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <StaggerItem key={r.label}>
                <div className="h-full rounded-2xl border border-accent/20 bg-linear-to-br from-background to-background/50 p-7 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2 hover:bg-linear-to-br hover:from-accent hover:to-accent/90 group animate-in fade-in">
                  <p className="text-3xl font-extrabold text-primary transition-all duration-300 group-hover:text-white group-hover:scale-110 origin-left inline-block">
                    {r.stat}
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-accent transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                    {r.label}
                  </p>
                  <p className="mt-4 text-muted transition-colors duration-300 group-hover:text-white group-hover:font-500">{r.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}