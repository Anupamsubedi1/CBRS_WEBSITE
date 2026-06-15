import { redirect } from "next/navigation";
import { getAdminId } from "@/app/actions/auth";
import { LogoutButton } from "./_components/logout-button";

export default async function AdminDashboardPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  return (
    <div className="p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted">
            Signed in as <span className="font-semibold text-foreground">{adminId}</span>
          </p>
        </div>
        <LogoutButton />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashCard title="Home Page" description="Edit every section of the homepage" href="/admin/home" />
        <DashCard title="Programs" description="Manage programs and activities" href="/admin/programs" />
        <DashCard title="News & Events" description="Publish news, notices, and events" href="/admin/news" />
        <DashCard title="Gallery" description="Upload and organise gallery images" href="/admin/gallery" />
        <DashCard title="Team" description="Manage board members and staff" href="/admin/team" />
        <DashCard title="Donations" description="View donation records" href="/admin/donations" />
        <DashCard title="Settings" description="Site-wide settings" href="/admin/settings" />
      </div>
    </div>
  );
}

function DashCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </a>
  );
}
