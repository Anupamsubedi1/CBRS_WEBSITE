import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { BankQR } from "@/components/shared/bank-qr";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /**
   * Optional photographic backdrop. Rendered under a single brand-primary
   * overlay (opacity fade only) so each inner page can open with a real
   * human moment instead of a flat banner.
   */
  image?: { src: string; position?: string };
  /** Optional slot below the description — stat chips, quick actions, etc. */
  children?: React.ReactNode;
}

/** Inner-page intro: brand backdrop (or photo + primary overlay), breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-hero text-white">
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
          {/* Single brand-primary overlay, opacity-only fade */}
          <div className="hero-overlay-y absolute inset-0 -z-10 lg:hidden" aria-hidden="true" />
          <div className="hero-overlay-x absolute inset-0 -z-10 hidden lg:block" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div
            className="absolute -right-20 -top-16 size-72 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
        </>
      )}

      <Container
        className={cn(
          image ? "py-16 lg:py-24" : "py-14 lg:py-20",
          "relative lg:flex lg:items-center lg:justify-between lg:gap-12",
        )}
      >
        <div className="lg:min-w-0 lg:flex-1">
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
        {children && (
          <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
        )}
        </div>

        {/* Bank-account QR — admin-managed; shown on the right of the banner (lg+) */}
        <BankQR className="hidden lg:block" />
      </Container>
    </section>
  );
}

/** Small translucent stat/action chip for use inside `PageHero`. */
export function HeroChip({
  icon,
  href,
  children,
}: {
  icon?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-sm";

  if (href) {
    return (
      <a
        href={href}
        className={`${className} transition-colors hover:bg-white/20`}
      >
        {icon}
        {children}
      </a>
    );
  }
  return (
    <span className={className}>
      {icon}
      {children}
    </span>
  );
}
