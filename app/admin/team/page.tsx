import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getTeam } from "@/lib/team";
import { TeamEditor } from "./_components/team-editor";

export default async function AdminTeamPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const team = await getTeam();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Our Team</h1>
        <p className="mt-0.5 text-sm text-muted">
          Manage board members, advisors and general members shown on the public Our Team page.
        </p>
      </header>

      <TeamEditor initialTeam={team} />
    </div>
  );
}
