"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveDonationAction } from "@/app/actions/donation";
import type { DonationContent } from "@/lib/types";

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

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div>
        <h2 className="font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function DonationEditor({ initialContent }: { initialContent: DonationContent }) {
  const [content, setContent] = React.useState<DonationContent>(initialContent);
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveDonationAction, undefined);

  function update(fn: (draft: DonationContent) => void) {
    setContent((prev) => {
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
      <input type="hidden" name="donation" value={JSON.stringify(content)} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      <Card title="Bank QR code" description="Shown on the donation page and on every inner-page banner.">
        <ImagePicker
          name="qr"
          label="QR image"
          image={content.bankQr.image}
          ratio="aspect-square"
          className="max-w-xs"
          onRemove={() => update((d) => { d.bankQr.image = null; })}
          onMarkDelete={markDelete}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Caption"
            value={content.bankQr.caption}
            onChange={(v) => update((d) => { d.bankQr.caption = v; })}
          />
          <Field
            label="Account name"
            value={content.bankQr.accountName}
            onChange={(v) => update((d) => { d.bankQr.accountName = v; })}
          />
        </div>
      </Card>

      <Card title="Page banner">
        <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => update((d) => { d.hero.eyebrow = v; })} />
        <Field label="Title" value={content.hero.title} onChange={(v) => update((d) => { d.hero.title = v; })} />
        <Field label="Description" value={content.hero.description} onChange={(v) => update((d) => { d.hero.description = v; })} textarea rows={2} />
      </Card>

      <Card title="Why give">
        <Field label="Eyebrow" value={content.whyGive.eyebrow} onChange={(v) => update((d) => { d.whyGive.eyebrow = v; })} />
        <Field label="Title" value={content.whyGive.title} onChange={(v) => update((d) => { d.whyGive.title = v; })} />
        <div className="space-y-2">
          <Label>Paragraphs</Label>
          {content.whyGive.paragraphs.map((para, i) => (
            <div key={i} className="flex gap-2">
              <Textarea
                rows={3}
                value={para}
                placeholder={`Paragraph ${i + 1}`}
                onChange={(e) => update((d) => { d.whyGive.paragraphs[i] = e.target.value; })}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => update((d) => { d.whyGive.paragraphs.splice(i, 1); })}
                className="h-fit rounded-lg border border-border p-2 text-muted hover:border-danger/40 hover:text-danger"
                aria-label="Remove paragraph"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update((d) => { d.whyGive.paragraphs.push(""); })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add paragraph
          </button>
        </div>
      </Card>

      <Card title="Ways to give" description="Heading above the digital-wallet cards.">
        <Field label="Eyebrow" value={content.waysToGive.eyebrow} onChange={(v) => update((d) => { d.waysToGive.eyebrow = v; })} />
        <Field label="Title" value={content.waysToGive.title} onChange={(v) => update((d) => { d.waysToGive.title = v; })} />
        <Field label="Description" value={content.waysToGive.description} onChange={(v) => update((d) => { d.waysToGive.description = v; })} textarea rows={2} />
      </Card>

      <Card title="Digital wallets">
        {content.paymentMethods.map((m, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Label" value={m.label} onChange={(v) => update((d) => { d.paymentMethods[i].label = v; })} />
              <Field label="ID / number" value={m.id} onChange={(v) => update((d) => { d.paymentMethods[i].id = v; })} />
              <Field label="Account name" value={m.name} onChange={(v) => update((d) => { d.paymentMethods[i].name = v; })} />
              <div className="space-y-1.5">
                <Label>Brand colour</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={m.color}
                    onChange={(e) => update((d) => { d.paymentMethods[i].color = e.target.value; })}
                    className="h-10 w-14 shrink-0 rounded-lg border border-border"
                    aria-label="Brand colour"
                  />
                  <Input value={m.color} onChange={(e) => update((d) => { d.paymentMethods[i].color = e.target.value; })} />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => update((d) => { d.paymentMethods.splice(i, 1); })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
            >
              <Trash2 className="size-4" /> Remove wallet
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => update((d) => { d.paymentMethods.push({ label: "", id: "", name: "", color: "#005daa" }); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add wallet
        </button>
      </Card>

      <div className="sticky bottom-4 flex items-center justify-end gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
        {state?.success && <p className="text-sm font-medium text-primary">Donation page saved.</p>}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
