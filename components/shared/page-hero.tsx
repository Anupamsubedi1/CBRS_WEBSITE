import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

/** Consistent inner-page banner on the brand gradient, with breadcrumbs. */
export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-hero text-white">
      <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-20 -top-16 size-72 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-14 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              {breadcrumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="size-4 text-white/40" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <span className="eyebrow text-accent-100">{eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
