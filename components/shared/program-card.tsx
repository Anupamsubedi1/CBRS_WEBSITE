import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/lib/types";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover">
      <div className="relative overflow-hidden">
        <Media
          src={program.coverImage}
          alt={program.title}
          seed={program.slug}
          label={program.category}
          ratio="aspect-[16/10]"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="on-dark" size="sm">
            {program.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          <Link
            href={`/programs/${program.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {program.excerpt}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          aria-hidden="true"
        >
          View Program
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
