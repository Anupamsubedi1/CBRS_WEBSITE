import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getHomeContent } from "@/lib/home-content";
import { HomeEditor } from "./_components/home-editor";

export default async function AdminHomePage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const content = await getHomeContent();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Homepage Content</h1>
        <p className="mt-0.5 text-sm text-muted">
          Edit every section of the public homepage — text, links, images and stats.
        </p>
      </header>

      <HomeEditor initialContent={content} />
    </div>
  );
}
