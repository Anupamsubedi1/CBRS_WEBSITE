import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getNewsBySlug } from "@/lib/news";
import { NewsEditor } from "../_components/news-editor";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to news
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{item.title || "Edit Article"}</h1>
        <p className="mt-0.5 text-sm text-muted">/news/{item.slug}</p>
      </header>

      <NewsEditor initialItem={item} isNew={false} />
    </div>
  );
}
