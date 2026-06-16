"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveProgramAction } from "@/app/actions/programs";
import type { Program } from "@/lib/types";

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

function ListField({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="rounded-lg border border-border p-2 text-muted hover:border-danger/40 hover:text-danger"
            aria-label={`Remove ${label.toLowerCase()} item`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <Plus className="size-4" /> Add item
      </button>
    </div>
  );
}

export function ProgramEditor({ initialProgram }: { initialProgram: Program }) {
  const [program, setProgram] = React.useState<Program>(initialProgram);
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveProgramAction, undefined);

  function update(fn: (draft: Program) => void) {
    setProgram((prev) => {
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
      <input type="hidden" name="program" value={JSON.stringify(program)} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      <div className="space-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Title"
            value={program.title}
            onChange={(v) => update((d) => { d.title = v; })}
          />
          <Field
            label="Slug (used in /programs/<slug>)"
            value={program.slug}
            onChange={(v) => update((d) => { d.slug = v; })}
            placeholder="my-program-slug"
          />
        </div>
        <Field
          label="Category"
          value={program.category}
          onChange={(v) => update((d) => { d.category = v; })}
        />
        <Field
          label="Excerpt"
          value={program.excerpt}
          onChange={(v) => update((d) => { d.excerpt = v; })}
          textarea
          rows={2}
        />
        <Field
          label="Full description"
          value={program.description}
          onChange={(v) => update((d) => { d.description = v; })}
          textarea
          rows={5}
        />
        <ImagePicker
          name="cover"
          label="Cover image"
          image={program.coverImage}
          ratio="aspect-[16/10]"
          onRemove={() => update((d) => { d.coverImage = null; })}
          onMarkDelete={markDelete}
        />
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={program.featured}
            onChange={(e) => update((d) => { d.featured = e.target.checked; })}
            className="size-4 rounded border-border text-primary focus-visible:outline-2 focus-visible:outline-primary/40"
          />
          Show in &ldquo;Featured Programs&rdquo; on the homepage
        </label>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <ListField
          label="Objectives"
          items={program.objectives}
          onChange={(items) => update((d) => { d.objectives = items; })}
          placeholder="Objective"
        />
        <ListField
          label="Key activities"
          items={program.activities}
          onChange={(items) => update((d) => { d.activities = items; })}
          placeholder="Activity"
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Label>Gallery</Label>
        {program.gallery.map((item, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4">
            <ImagePicker
              name={`gallery-${i}`}
              label="Image"
              image={item.image}
              ratio="aspect-square"
              className="max-w-xs"
              onRemove={() => update((d) => { d.gallery[i].image = null; })}
              onMarkDelete={markDelete}
            />
            <Field
              label="Caption"
              value={item.caption}
              onChange={(v) => update((d) => { d.gallery[i].caption = v; })}
            />
            <button
              type="button"
              onClick={() =>
                update((d) => {
                  const removed = d.gallery[i];
                  if (removed.image) markDelete(removed.image.publicId);
                  d.gallery.splice(i, 1);
                })
              }
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
            >
              <Trash2 className="size-4" /> Remove gallery item
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => update((d) => { d.gallery.push({ image: null, caption: "" }); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add gallery item
        </button>
      </div>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> All programs
          </Link>
          {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-primary">Program saved.</p>}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save program"}
        </Button>
      </div>
    </form>
  );
}
