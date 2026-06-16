import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getPrograms } from "@/lib/programs";
import { getProgramsPageContent } from "@/lib/programs-page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteProgramButton } from "./_components/delete-program-button";
import { PageHeroEditor } from "./_components/page-hero-editor";

export default async function AdminProgramsPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const [programs, heroContent] = await Promise.all([getPrograms(), getProgramsPageContent()]);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-foreground">Programs</h1>
          <p className="mt-0.5 text-sm text-muted">
            Manage the programs shown on the public Programs page and the homepage.
          </p>
        </div>
        <Button href="/admin/programs/new">
          <Plus /> Add Program
        </Button>
      </header>

      <PageHeroEditor initialContent={heroContent} />

      <div className="space-y-3">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-semibold text-foreground">{program.title}</h2>
                {program.featured && (
                  <Badge variant="accent" size="sm">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 truncate text-sm text-muted">
                {program.category} · /programs/{program.slug}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button href={`/admin/programs/${program.id}`} variant="outline" size="sm">
                <Pencil /> Edit
              </Button>
              <DeleteProgramButton id={program.id} title={program.title} />
            </div>
          </div>
        ))}
        {programs.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No programs yet. Add your first program to get started.
          </p>
        )}
      </div>
    </div>
  );
}
