import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getDonationContent } from "@/lib/donation";
import { DonationEditor } from "./_components/donation-editor";

export default async function AdminDonationPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const content = await getDonationContent();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Donation</h1>
        <p className="mt-0.5 text-sm text-muted">
          Manage the QR code, payment details and copy on the public Donation page.
        </p>
      </header>

      <DonationEditor initialContent={content} />
    </div>
  );
}
