import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getProgramById } from "@/lib/programs";
import { ProgramEditor } from "../_components/program-editor";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin/programs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to programs
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{program.title || "Edit Program"}</h1>
        <p className="mt-0.5 text-sm text-muted">/programs/{program.slug || "…"}</p>
      </header>

      <ProgramEditor initialProgram={program} />
    </div>
  );
}
