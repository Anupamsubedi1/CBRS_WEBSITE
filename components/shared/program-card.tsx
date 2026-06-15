import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/lib/types";

type ProgramCardData = Pick<Program, "slug" | "title" | "category" | "excerpt" | "coverImage">;

export function ProgramCard({ program }: { program: ProgramCardData }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        href={`/programs/${program.slug}`}
        className="block focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        aria-label={program.title}
      >
        <div className="relative">
          <Media
            src={program.coverImage?.url}
            alt={program.title}
            seed={program.slug}
            label={program.category}
            ratio="aspect-[16/10]"
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <Badge variant="on-dark" size="sm">
              {program.category}
            </Badge>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-foreground">
          <Link
            href={`/programs/${program.slug}`}
            className="transition-colors hover:text-primary focus-visible:outline-none"
          >
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {program.excerpt}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          View Program
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
