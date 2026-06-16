import { ProgramCard } from "@/components/shared/program-card";
import type { Program } from "@/lib/types";

export function ProgramsGrid({ programs }: { programs: Program[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {programs.map((p) => (
        <ProgramCard key={p.slug} program={p} />
      ))}
    </div>
  );
}
