import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getNews } from "@/lib/news";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { DeleteNewsButton } from "./_components/delete-news-button";

export default async function AdminNewsPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const news = await getNews();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-foreground">News &amp; Notices</h1>
          <p className="mt-0.5 text-sm text-muted">
            Publish news, notices, events and stories shown on the public News page.
          </p>
        </div>
        <Button href="/admin/news/new">
          <Plus /> Add Article
        </Button>
      </header>

      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item.slug}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-semibold text-foreground">{item.title}</h2>
                <Badge variant="neutral" size="sm">{item.category}</Badge>
                {item.featured && (
                  <Badge variant="accent" size="sm">Featured</Badge>
                )}
              </div>
              <p className="mt-0.5 truncate text-sm text-muted">
                {formatDate(item.date)} · /news/{item.slug}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button href={`/admin/news/${item.slug}`} variant="outline" size="sm">
                <Pencil /> Edit
              </Button>
              <DeleteNewsButton slug={item.slug} title={item.title} />
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No news or notices yet. Add your first article to get started.
          </p>
        )}
      </div>
    </div>
  );
}
