import Link from "next/link";
import { getAdminId } from "@/app/actions/auth";
import { AdminNav } from "./_components/admin-nav";
import { LogoutButton } from "./_components/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminId = await getAdminId();

  // Unauthenticated routes (the login page) render bare, without admin chrome.
  if (!adminId) {
    return <div className="min-h-screen bg-[#f1f5f9]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] lg:flex">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-slate-200 bg-white px-4 py-6 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:sticky lg:top-0">
        <Link href="/admin" className="px-3">
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            CBRS Nepal
          </span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
            Admin Panel
          </span>
        </Link>

        <AdminNav />

        <div className="mt-auto border-t border-slate-200 px-3 pt-4">
          <p className="text-xs text-muted">
            Signed in as{" "}
            <span className="font-semibold text-foreground">{adminId}</span>
          </p>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
