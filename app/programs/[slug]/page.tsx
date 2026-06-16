import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  CheckCircle2,
  Heart,
  Tag,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DonateBand } from "@/components/layout/donate-band";
import { getPrograms, getProgramBySlug } from "@/lib/programs";
import { getGalleryItems } from "@/lib/gallery";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };
  return { title: program.title, description: program.excerpt };
}

export default async function ProgramDetailPage({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const [allPrograms, galleryItems] = await Promise.all([
    getPrograms(),
    getGalleryItems(),
  ]);
  // Program photos come from two places: the program's own gallery (edited in the
  // Program editor) and any Gallery-admin photos tagged with this program. Show
  // only entries that actually have an uploaded image.
  const photos = [
    ...program.gallery
      .filter((g) => g.image)
      .map((g, i) => ({ key: `pg-${i}`, url: g.image!.url, label: g.caption })),
    ...galleryItems
      .filter((g) => g.programSlug === program.slug && g.image)
      .map((g) => ({ key: g.id, url: g.image!.url, label: g.title })),
  ];
  const related = allPrograms
    .filter((p) => p.slug !== program.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-hero text-white">
        <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <Container className="relative py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{program.title}</li>
            </ol>
          </nav>
          <Badge variant="on-dark">{program.category}</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {program.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{program.excerpt}</p>
        </Container>
      </section>

      {/* Cover */}
      <Container className="-mt-2">
        <Reveal className="relative z-10 -translate-y-8">
          <Media
            src={program.coverImage?.url}
            alt={program.title}
            seed={program.slug}
            label={program.category}
            ratio="aspect-[21/9]"
            rounded="rounded-3xl"
            className="shadow-float ring-1 ring-black/5"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </Reveal>
      </Container>

      {/* Body */}
      <section className="pb-20">
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Main */}
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold">About this program</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {program.description}
              </p>
            </Reveal>

            {/* Objectives */}
            <Reveal className="mt-10">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Target className="size-5 text-accent" aria-hidden="true" />
                Objectives
              </h3>
              <ul className="mt-4 space-y-3">
                {program.objectives.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm text-foreground">{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Activities */}
            <Reveal className="mt-10">
              <h3 className="text-xl font-bold">Key Activities</h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {program.activities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 rounded-xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-900"
                  >
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {a}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Gallery (photos linked to this program) */}
            {photos.length > 0 && (
              <Reveal className="mt-10">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">Program Gallery</h3>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    View in gallery
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((g) => (
                    <Media
                      key={g.key}
                      src={g.url}
                      alt={g.label || program.title}
                      seed={g.key}
                      label={g.label}
                      ratio="aspect-square"
                      rounded="rounded-2xl"
                    />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {/* Donate CTA */}
            <div className="overflow-hidden rounded-2xl bg-accent-band p-6 text-white">
              <Heart className="size-7 fill-current" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-white">
                Support this work
              </h3>
              <p className="mt-2 text-sm text-white/85">
                Your gift helps us reach more people with disabilities across
                Nepal with programs like this one.
              </p>
              <Button href="/donate" variant="white" className="mt-4 w-full">
                Donate Now <ArrowRight />
              </Button>
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                <Tag className="size-4" aria-hidden="true" /> Theme
              </h3>
              <p className="mt-2 font-semibold text-foreground">{program.category}</p>
            </div>
          </aside>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-white py-16">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Related Programs</h2>
              <Button href="/programs" variant="ghost" size="sm">
                <ArrowLeft /> All Programs
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  className="group flex gap-5 rounded-2xl border border-border bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <Media
                    src={p.coverImage?.url}
                    alt={p.title}
                    seed={p.slug}
                    ratio="aspect-square"
                    rounded="rounded-xl"
                    className="size-28 shrink-0"
                  />
                  <div className="py-1">
                    <Badge variant="accent" size="sm">{p.category}</Badge>
                    <h3 className="mt-2 font-bold text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <DonateBand />
    </>
  );
}
