import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getGalleryItems, getGalleryCategories } from "@/lib/gallery";
import { GalleryEditor } from "./_components/gallery-editor";

export default async function AdminGalleryPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const [items, categories] = await Promise.all([getGalleryItems(), getGalleryCategories()]);

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Gallery</h1>
        <p className="mt-0.5 text-sm text-muted">
          Manage photos and categories shown on the public Gallery page and the homepage.
        </p>
      </header>

      <GalleryEditor initialItems={items} initialCategories={categories} />
    </div>
  );
}
