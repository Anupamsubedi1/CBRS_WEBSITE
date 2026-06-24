import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { getPrograms } from "@/lib/programs";

export async function FeaturedPrograms() {
  const programs = await getPrograms();
  const featured = programs.filter((p) => p.featured).slice(0, 3);
  if (featured.length === 0) return null;
  const [lead, ...rest] = featured;

  return (
    <section className="py-8 lg:py-12" aria-labelledby="featured-programs">
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

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Lead program — editorial feature card */}
          <Reveal className="lg:col-span-3">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover">
              <div className="relative overflow-hidden">
                <Media
                  src={lead.coverImage?.url}
                  alt={lead.title}
                  seed={lead.slug}
                  label={lead.category}
                  ratio="aspect-[16/9]"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute left-4 top-4">
                  <Badge variant="on-dark">{lead.category}</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
                  <Link
                    href={`/programs/${lead.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  >
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                  {lead.excerpt}
                </p>
                {lead.objectives.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {lead.objectives.slice(0, 2).map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  aria-hidden="true"
                >
                  View Program
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </Reveal>

          {/* Supporting programs — compact horizontal cards */}
          <StaggerGroup className="flex flex-col gap-6 lg:col-span-2">
            {rest.map((p) => (
              <StaggerItem key={p.slug} className="flex-1">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover sm:flex-row">
                  <div className="relative shrink-0 overflow-hidden sm:w-44 lg:w-40">
                    <Media
                      src={p.coverImage?.url}
                      alt={p.title}
                      seed={p.slug}
                      ratio="aspect-[16/9] sm:aspect-auto sm:h-full"
                      className="h-full transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="accent" size="sm" className="self-start">
                      {p.category}
                    </Badge>
                    <h3 className="mt-3 text-base font-bold leading-snug text-foreground">
                      <Link
                        href={`/programs/${p.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                      {p.excerpt}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      aria-hidden="true"
                    >
                      View Program
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
