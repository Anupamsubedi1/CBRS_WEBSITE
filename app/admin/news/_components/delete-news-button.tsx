"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteNewsAction } from "@/app/actions/news";

export function DeleteNewsButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteNewsAction(slug);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-danger transition-colors hover:border-danger/40 disabled:opacity-55"
    >
      <Trash2 className="size-4" /> {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
