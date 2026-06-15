import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { ProgramEditor } from "../_components/program-editor";
import type { Program } from "@/lib/types";

export default async function NewProgramPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const blankProgram: Program = {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    category: "",
    coverImage: null,
    excerpt: "",
    description: "",
    objectives: [],
    activities: [],
    gallery: [],
    featured: false,
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin/programs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to programs
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Add Program</h1>
        <p className="mt-0.5 text-sm text-muted">
          Create a new program — it will appear on the public Programs page once saved.
        </p>
      </header>

      <ProgramEditor initialProgram={blankProgram} />
    </div>
  );
}
