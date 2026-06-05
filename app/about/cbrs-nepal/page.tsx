import type { Metadata } from "next";
import { Quote, Target, Eye, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
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

export const metadata: Metadata = {
  title: "CBRS Nepal — Our Story",
  description:
    "Learn about CBRS Nepal: our introduction, vision, mission, history, core values and the six themes through which we serve people with disabilities.",
};

export default function CbrsNepalPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Working With and For People with Disabilities"
        description="Since 2005, CBRS Nepal has stood beside people with disabilities and marginalized communities — building inclusion, dignity and opportunity together."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "CBRS Nepal" },
        ]}
      />

      {/* Introduction */}
      <section className="py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <Media
              alt="CBRS Nepal team and community members standing together"
              seed="about-intro"
              label="Our community, our partners"
              ratio="aspect-[5/4]"
              rounded="rounded-3xl"
              className="shadow-card"
            />
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-accent px-5 py-4 text-white shadow-float sm:block">
              <span className="block text-sm font-semibold">{site.registration.dao}</span>
              <span className="text-xs text-white/85">{site.registration.swc}</span>
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
                  We use participatory methods — involving the people we serve in
                  planning, decision-making, monitoring and evaluation. Registered
                  with the District Administration Office, Kaski and affiliated
                  with the Social Welfare Council, we focus on Gandaki Province
                  while supporting work across the country.
                </p>
                <p>
                  We serve people with disabilities of all types and ages,
                  encouraging communities to contribute their time, resources and
                  skills so that, together, we move towards enabling and
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
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden rounded-3xl bg-brand-band p-8 text-white sm:p-10">
                <div className="pattern-grid absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <Eye className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-white">Our Vision</h2>
                  <Quote className="mt-4 size-8 text-white/30" aria-hidden="true" />
                  <p className="mt-2 text-lg leading-relaxed text-white/90">
                    {site.vision}
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="h-full rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-50 text-accent-700">
                  <Target className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-bold">Our Mission</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">{mission}</p>
                <ul className="mt-6 space-y-2.5">
                  {["Participatory & community-based", "Rights-based & inclusive", "Skilled, compassionate care"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                        <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden="true" />
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
      <section className="py-20 lg:py-24">
        <Container size="narrow">
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
                <div className="relative flex gap-6 pb-8 pl-2">
                  {i < milestones.length - 1 && (
                    <span
                      className="absolute left-[2.4rem] top-12 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative z-10 grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-card">
                    <span className="text-lg font-extrabold">{m.year}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                    <p className="mt-1.5 text-muted">{m.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Core values */}
      <section className="bg-white py-20 lg:py-24">
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
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary">
                    <ThemeIcon name={v.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{v.title}</h3>
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

      {/* Organizational themes (deep-linkable) */}
      <section className="py-20 lg:py-24">
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
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-surface shadow-card"
                >
                  <div className="grid gap-0 lg:grid-cols-[1fr_1.3fr]">
                    <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-primary to-secondary p-8 text-white sm:p-10">
                      <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                        <ThemeIcon name={theme.icon} className="size-7 text-white" />
                      </span>
                      <div>
                        <Badge variant="on-dark" size="sm">
                          Theme {i + 1}
                        </Badge>
                        <h3 className="mt-2 text-2xl font-bold text-white">
                          {theme.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-white/85">
                        {theme.objective}
                      </p>
                    </div>
                    <div className="p-8 sm:p-10">
                      <p className="text-muted">{theme.description}</p>
                      <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
                        Key Activities
                      </h4>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {theme.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-muted">
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

      {/* Why CBRS exists */}
      <section className="bg-white py-20 lg:py-24">
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
                <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-card">
                  <p className="text-3xl font-extrabold text-primary">{r.stat}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-accent-700">
                    {r.label}
                  </p>
                  <p className="mt-4 text-muted">{r.text}</p>
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
