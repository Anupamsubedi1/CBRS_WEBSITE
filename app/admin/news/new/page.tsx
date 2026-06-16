import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { NewsEditor } from "../_components/news-editor";
import type { NewsItem } from "@/lib/types";

export default async function NewNewsPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const blank: NewsItem = {
    slug: "",
    title: "",
    category: "News",
    date: new Date().toISOString().slice(0, 10),
    excerpt: "",
    body: [""],
    coverImage: null,
    author: "",
    featured: false,
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to news
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Add Article</h1>
        <p className="mt-0.5 text-sm text-muted">
          Create a news item, notice, event or story — it appears on the public News page once saved.
        </p>
      </header>

      <NewsEditor initialItem={blank} isNew />
    </div>
  );
}
