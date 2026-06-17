"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveGalleryAction } from "@/app/actions/gallery";
import type { GalleryItem, Program } from "@/lib/types";

const SPAN_OPTIONS: { value: NonNullable<GalleryItem["span"]>; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Wide" },
  { value: "tall", label: "Tall" },
];

function newId() {
  return crypto.randomUUID();
}

export function GalleryEditor({
  initialItems,
  initialCategories,
  programs,
}: {
  initialItems: GalleryItem[];
  initialCategories: string[];
  programs: Pick<Program, "slug" | "title">[];
}) {
  const [items, setItems] = React.useState<GalleryItem[]>(initialItems);
  const [categories, setCategories] = React.useState<string[]>(initialCategories);
  const [newCategory, setNewCategory] = React.useState("");
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveGalleryAction, undefined);

  function updateItems(fn: (draft: GalleryItem[]) => void) {
    setItems((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }

  function markDelete(publicId: string) {
    setToDelete((prev) => (prev.includes(publicId) ? prev : [...prev, publicId]));
  }

  // After a successful save, adopt the persisted content (which now includes
  // the uploaded image URLs). This keeps the form's serialized state in sync
  // with the database, so a later save can't overwrite earlier images with
  // stale nulls. `pickerKey` remounts the image pickers to drop blob previews.
  // Done with React's "adjust state during render" pattern rather than an
  // effect, so it applies before paint without cascading renders.
  const [pickerKey, setPickerKey] = React.useState(0);
  const [handledState, setHandledState] = React.useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state?.success && state.items) {
      setItems(state.items);
      if (state.categories) setCategories(state.categories);
      setToDelete([]);
      setPickerKey((k) => k + 1);
    }
  }

  function addCategory() {
    const name = newCategory.trim();
    if (!name || categories.includes(name)) return;
    setCategories((prev) => [...prev, name]);
    setNewCategory("");
  }

  function removeCategory(name: string) {
    setCategories((prev) => prev.filter((c) => c !== name));
  }

  return (
    <form action={formAction} className="space-y-6 pb-24">
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <input type="hidden" name="categories" value={JSON.stringify(categories)} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      {/* Categories */}
      <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
            >
              {cat}
              <button
                type="button"
                onClick={() => removeCategory(cat)}
                aria-label={`Remove category ${cat}`}
                className="text-muted hover:text-danger"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted">No categories yet — add one below.</p>
          )}
        </div>
        <div className="flex max-w-sm gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCategory();
              }
            }}
          />
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40"
          >
            <Plus className="size-4" /> Add
          </button>
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Label>Photos</Label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.id} className="space-y-3 rounded-xl border border-border p-4">
              <ImagePicker
                key={`${item.id}-${pickerKey}`}
                name={`item-${item.id}`}
                label="Image"
                image={item.image}
                ratio="aspect-square"
                onRemove={() => updateItems((d) => { d[i].image = null; })}
                onMarkDelete={markDelete}
              />
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) => updateItems((d) => { d[i].title = e.target.value; })}
                  placeholder="Photo title"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Program</Label>
                <Select
                  value={item.programSlug}
                  onChange={(e) =>
                    updateItems((d) => {
                      const slug = e.target.value;
                      d[i].programSlug = slug;
                      d[i].category =
                        programs.find((p) => p.slug === slug)?.title ?? "";
                    })
                  }
                >
                  <option value="">Select a program</option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </Select>
                <p className="text-xs text-muted">
                  The photo appears under this program in the gallery and on the
                  program&apos;s page.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label>Layout span</Label>
                <Select
                  value={item.span ?? "normal"}
                  onChange={(e) => updateItems((d) => { d[i].span = e.target.value as GalleryItem["span"]; })}
                >
                  {SPAN_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateItems((d) => {
                    const removed = d[i];
                    if (removed.image) markDelete(removed.image.publicId);
                    d.splice(i, 1);
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
              >
                <Trash2 className="size-4" /> Remove photo
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            updateItems((d) => {
              d.unshift({
                id: newId(),
                title: "",
                programSlug: "",
                category: "",
                image: null,
                span: "normal",
                createdAt: Date.now(),
              });
            })
          }
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add photo
        </button>
        {items.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
            No photos yet. Add your first photo to get started.
          </p>
        )}
      </div>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        <div>
          {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-primary">Gallery saved.</p>}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
