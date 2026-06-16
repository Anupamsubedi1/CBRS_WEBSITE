"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveNewsAction } from "@/app/actions/news";
import { slugify } from "@/lib/utils";
import type { NewsCategory, NewsItem } from "@/lib/types";

const CATEGORIES: NewsCategory[] = ["News", "Notice", "Event", "Story"];

function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {textarea ? (
        <Textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function NewsEditor({
  initialItem,
  isNew,
}: {
  initialItem: NewsItem;
  isNew: boolean;
}) {
  const [item, setItem] = React.useState<NewsItem>(initialItem);
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveNewsAction, undefined);
  // Auto-derive slug from the title only while creating, until edited by hand.
  const [slugLocked, setSlugLocked] = React.useState(!isNew);

  function update(fn: (draft: NewsItem) => void) {
    setItem((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }

  function markDelete(publicId: string) {
    setToDelete((prev) => (prev.includes(publicId) ? prev : [...prev, publicId]));
  }

  return (
    <form action={formAction} className="space-y-6 pb-24">
      <input type="hidden" name="news" value={JSON.stringify(item)} />
      <input type="hidden" name="previousSlug" value={isNew ? "" : initialItem.slug} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      <div className="space-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Field
          label="Title"
          value={item.title}
          onChange={(v) =>
            update((d) => {
              d.title = v;
              if (!slugLocked) d.slug = slugify(v);
            })
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Slug (used in /news/<slug>)"
            value={item.slug}
            onChange={(v) =>
              update((d) => {
                d.slug = v;
                setSlugLocked(true);
              })
            }
            placeholder="my-news-slug"
          />
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={item.category}
              onChange={(e) => update((d) => { d.category = e.target.value as NewsCategory; })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Date</Label>
            <Input
              type="date"
              value={item.date ? item.date.slice(0, 10) : ""}
              onChange={(e) => update((d) => { d.date = e.target.value; })}
            />
          </div>
          <Field
            label="Author (optional)"
            value={item.author ?? ""}
            onChange={(v) => update((d) => { d.author = v; })}
            placeholder="CBRS Nepal"
          />
        </div>
        <Field
          label="Excerpt"
          value={item.excerpt}
          onChange={(v) => update((d) => { d.excerpt = v; })}
          textarea
          rows={2}
        />
        <ImagePicker
          name="cover"
          label="Cover image"
          image={item.coverImage}
          ratio="aspect-[16/9]"
          onRemove={() => update((d) => { d.coverImage = null; })}
          onMarkDelete={markDelete}
        />
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={item.featured ?? false}
            onChange={(e) => update((d) => { d.featured = e.target.checked; })}
            className="size-4 rounded border-border text-primary focus-visible:outline-2 focus-visible:outline-primary/40"
          />
          Feature this article at the top of the News page
        </label>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Label>Body (one paragraph per box)</Label>
        {item.body.map((para, i) => (
          <div key={i} className="flex gap-2">
            <Textarea
              rows={3}
              value={para}
              placeholder={`Paragraph ${i + 1}`}
              onChange={(e) => update((d) => { d.body[i] = e.target.value; })}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => update((d) => { d.body.splice(i, 1); })}
              className="h-fit rounded-lg border border-border p-2 text-muted hover:border-danger/40 hover:text-danger"
              aria-label="Remove paragraph"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => update((d) => { d.body.push(""); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add paragraph
        </button>
      </div>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> All news
          </Link>
          {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-primary">Saved.</p>}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save article"}
        </Button>
      </div>
    </form>
  );
}
