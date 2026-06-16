"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveHomeContent } from "@/app/actions/home-content";
import type { HomepageContent, IconName } from "@/lib/types";

const ICON_OPTIONS: { value: IconName; label: string }[] = [
  { value: "heart-pulse", label: "Heart Pulse" },
  { value: "briefcase", label: "Briefcase" },
  { value: "graduation-cap", label: "Graduation Cap" },
  { value: "scale", label: "Scale" },
  { value: "users", label: "Users" },
  { value: "home", label: "Home" },
  { value: "hand-heart", label: "Hand Heart" },
  { value: "stethoscope", label: "Stethoscope" },
  { value: "sprout", label: "Sprout" },
  { value: "book-open", label: "Book Open" },
  { value: "accessibility", label: "Accessibility" },
  { value: "handshake", label: "Handshake" },
];

function newId() {
  return crypto.randomUUID();
}

function SectionCard({
  title,
  description,
  children,
  defaultOpen,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-border bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4">
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
        </div>
        <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-6 border-t border-border px-6 py-6">{children}</div>
    </details>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {textarea ? (
        <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function IconSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: IconName;
  onChange: (value: IconName) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value as IconName)}>
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export function HomeEditor({ initialContent }: { initialContent: HomepageContent }) {
  const [content, setContent] = React.useState<HomepageContent>(initialContent);
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveHomeContent, undefined);

  function update(fn: (draft: HomepageContent) => void) {
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
      <input type="hidden" name="content" value={JSON.stringify(content)} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      {/* Hero */}
      <SectionCard title="Hero Section" description="The full-width banner at the top of the homepage." defaultOpen>
        <Field
          label="Badge text"
          value={content.hero.badge}
          onChange={(v) => update((d) => { d.hero.badge = v; })}
        />
        <Field
          label="Heading"
          value={content.hero.headingMain}
          onChange={(v) => update((d) => { d.hero.headingMain = v; })}
          textarea
          rows={2}
        />
        <Field
          label="Heading highlight (accent colour)"
          value={content.hero.headingHighlight}
          onChange={(v) => update((d) => { d.hero.headingHighlight = v; })}
        />
        <Field
          label="Description"
          value={content.hero.description}
          onChange={(v) => update((d) => { d.hero.description = v; })}
          textarea
          rows={3}
        />
        <ImagePicker
          name="hero"
          label="Background image"
          image={content.hero.image}
          ratio="aspect-[16/9]"
          onRemove={() => update((d) => { d.hero.image = null; })}
          onMarkDelete={markDelete}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Primary button label"
            value={content.hero.ctaPrimaryLabel}
            onChange={(v) => update((d) => { d.hero.ctaPrimaryLabel = v; })}
          />
          <Field
            label="Primary button link"
            value={content.hero.ctaPrimaryHref}
            onChange={(v) => update((d) => { d.hero.ctaPrimaryHref = v; })}
          />
          <Field
            label="Secondary button label"
            value={content.hero.ctaSecondaryLabel}
            onChange={(v) => update((d) => { d.hero.ctaSecondaryLabel = v; })}
          />
          <Field
            label="Secondary button link"
            value={content.hero.ctaSecondaryHref}
            onChange={(v) => update((d) => { d.hero.ctaSecondaryHref = v; })}
          />
        </div>
        <div>
          <Label>Service pillars</Label>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {content.hero.pillars.map((pillar, i) => (
              <div key={i} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2">
                <IconSelect
                  label="Icon"
                  value={pillar.icon}
                  onChange={(v) => update((d) => { d.hero.pillars[i].icon = v; })}
                />
                <Field
                  label="Label"
                  value={pillar.label}
                  onChange={(v) => update((d) => { d.hero.pillars[i].label = v; })}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* About / Who We Are */}
      <SectionCard title="Who We Are" description="The about strip with stats, just below the hero.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Eyebrow"
            value={content.about.eyebrow}
            onChange={(v) => update((d) => { d.about.eyebrow = v; })}
          />
          <Field
            label="Title"
            value={content.about.title}
            onChange={(v) => update((d) => { d.about.title = v; })}
          />
        </div>
        <div className="space-y-3">
          <Label>Paragraphs</Label>
          {content.about.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Textarea
                rows={3}
                value={p}
                onChange={(e) => update((d) => { d.about.paragraphs[i] = e.target.value; })}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => update((d) => { d.about.paragraphs.splice(i, 1); })}
                className="self-start rounded-lg border border-border p-2 text-muted hover:border-danger/40 hover:text-danger"
                aria-label="Remove paragraph"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update((d) => { d.about.paragraphs.push(""); })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add paragraph
          </button>
        </div>
        <ImagePicker
          name="about"
          label="Photo"
          image={content.about.image}
          ratio="aspect-[5/4]"
          onRemove={() => update((d) => { d.about.image = null; })}
          onMarkDelete={markDelete}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Floating badge value"
            value={content.about.badgeValue}
            onChange={(v) => update((d) => { d.about.badgeValue = v; })}
          />
          <Field
            label="Floating badge label"
            value={content.about.badgeLabel}
            onChange={(v) => update((d) => { d.about.badgeLabel = v; })}
          />
          <Field
            label="Button label"
            value={content.about.ctaLabel}
            onChange={(v) => update((d) => { d.about.ctaLabel = v; })}
          />
          <Field
            label="Button link"
            value={content.about.ctaHref}
            onChange={(v) => update((d) => { d.about.ctaHref = v; })}
          />
        </div>
        <div>
          <Label>Stats row</Label>
          <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.about.stats.map((stat, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                <Field
                  label="Value"
                  value={stat.value}
                  onChange={(v) => update((d) => { d.about.stats[i].value = v; })}
                />
                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(v) => update((d) => { d.about.stats[i].label = v; })}
                />
                <IconSelect
                  label="Icon"
                  value={stat.icon}
                  onChange={(v) => update((d) => { d.about.stats[i].icon = v; })}
                />
                <button
                  type="button"
                  onClick={() => update((d) => { d.about.stats.splice(i, 1); })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
                >
                  <Trash2 className="size-4" /> Remove stat
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => update((d) => { d.about.stats.push({ value: "", label: "", icon: "users" }); })}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add stat
          </button>
        </div>
      </SectionCard>

      {/* Themes section */}
      <SectionCard title="Our Themes of Work" description="The grid of theme cards linking to the About page.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Eyebrow"
            value={content.themesSection.eyebrow}
            onChange={(v) => update((d) => { d.themesSection.eyebrow = v; })}
          />
          <Field
            label="Title"
            value={content.themesSection.title}
            onChange={(v) => update((d) => { d.themesSection.title = v; })}
          />
        </div>
        <Field
          label="Description"
          value={content.themesSection.description}
          onChange={(v) => update((d) => { d.themesSection.description = v; })}
          textarea
          rows={2}
        />
        <div>
          <Label>Theme cards</Label>
          <div className="mt-2 grid gap-4 lg:grid-cols-2">
            {content.themesSection.items.map((theme, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Title"
                    value={theme.title}
                    onChange={(v) => update((d) => { d.themesSection.items[i].title = v; })}
                  />
                  <IconSelect
                    label="Icon"
                    value={theme.icon}
                    onChange={(v) => update((d) => { d.themesSection.items[i].icon = v; })}
                  />
                </div>
                <Field
                  label="Description"
                  value={theme.description}
                  onChange={(v) => update((d) => { d.themesSection.items[i].description = v; })}
                  textarea
                  rows={3}
                />
                <Field
                  label="Slug (links to /about/cbrs-nepal#<slug>)"
                  value={theme.slug}
                  onChange={(v) => update((d) => { d.themesSection.items[i].slug = v; })}
                />
                <button
                  type="button"
                  onClick={() => update((d) => { d.themesSection.items.splice(i, 1); })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
                >
                  <Trash2 className="size-4" /> Remove theme
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              update((d) => {
                d.themesSection.items.push({ slug: "", title: "", icon: "users", description: "" });
              })
            }
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add theme
          </button>
        </div>
      </SectionCard>

      {/* Impact band */}
      <SectionCard title="Impact Band" description="The dark band showing headline impact numbers.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Eyebrow"
            value={content.impact.eyebrow}
            onChange={(v) => update((d) => { d.impact.eyebrow = v; })}
          />
          <Field
            label="Title"
            value={content.impact.title}
            onChange={(v) => update((d) => { d.impact.title = v; })}
          />
        </div>
        <Field
          label="Description"
          value={content.impact.description}
          onChange={(v) => update((d) => { d.impact.description = v; })}
          textarea
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Button label"
            value={content.impact.ctaLabel}
            onChange={(v) => update((d) => { d.impact.ctaLabel = v; })}
          />
          <Field
            label="Button link"
            value={content.impact.ctaHref}
            onChange={(v) => update((d) => { d.impact.ctaHref = v; })}
          />
        </div>
        <div>
          <Label>Stats</Label>
          <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.impact.stats.map((stat, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                <Field
                  label="Value"
                  value={stat.value}
                  onChange={(v) => update((d) => { d.impact.stats[i].value = v; })}
                />
                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(v) => update((d) => { d.impact.stats[i].label = v; })}
                />
                <IconSelect
                  label="Icon"
                  value={stat.icon}
                  onChange={(v) => update((d) => { d.impact.stats[i].icon = v; })}
                />
                <button
                  type="button"
                  onClick={() => update((d) => { d.impact.stats.splice(i, 1); })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
                >
                  <Trash2 className="size-4" /> Remove stat
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => update((d) => { d.impact.stats.push({ value: "", label: "", icon: "users" }); })}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add stat
          </button>
        </div>
      </SectionCard>

      {/* Featured programs */}
      <SectionCard title="Featured Programs" description="The program cards shown on the homepage.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Eyebrow"
            value={content.featuredPrograms.eyebrow}
            onChange={(v) => update((d) => { d.featuredPrograms.eyebrow = v; })}
          />
          <Field
            label="Title"
            value={content.featuredPrograms.title}
            onChange={(v) => update((d) => { d.featuredPrograms.title = v; })}
          />
        </div>
        <Field
          label="Description"
          value={content.featuredPrograms.description}
          onChange={(v) => update((d) => { d.featuredPrograms.description = v; })}
          textarea
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Button label"
            value={content.featuredPrograms.ctaLabel}
            onChange={(v) => update((d) => { d.featuredPrograms.ctaLabel = v; })}
          />
          <Field
            label="Button link"
            value={content.featuredPrograms.ctaHref}
            onChange={(v) => update((d) => { d.featuredPrograms.ctaHref = v; })}
          />
        </div>
        <p className="rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm text-muted">
          The programs shown here are the ones marked &ldquo;Featured&rdquo; in{" "}
          <Link href="/admin/programs" className="font-semibold text-primary hover:underline">
            Programs
          </Link>
          .
        </p>
      </SectionCard>

      {/* Success stories */}
      <SectionCard title="Success Stories" description="The rotating quotes carousel on the homepage.">
        <div className="space-y-4">
          {content.successStories.map((story, i) => (
            <div key={story.id} className="space-y-3 rounded-xl border border-border p-4">
              <Field
                label="Quote"
                value={story.quote}
                onChange={(v) => update((d) => { d.successStories[i].quote = v; })}
                textarea
                rows={3}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={story.name}
                  onChange={(v) => update((d) => { d.successStories[i].name = v; })}
                />
                <Field
                  label="Role"
                  value={story.role}
                  onChange={(v) => update((d) => { d.successStories[i].role = v; })}
                />
              </div>
              <ImagePicker
                name={`story-${story.id}`}
                label="Portrait"
                image={story.photo}
                ratio="aspect-square"
                onRemove={() => update((d) => { d.successStories[i].photo = null; })}
                onMarkDelete={markDelete}
              />
              <button
                type="button"
                onClick={() =>
                  update((d) => {
                    const item = d.successStories[i];
                    if (item.photo) markDelete(item.photo.publicId);
                    d.successStories.splice(i, 1);
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
              >
                <Trash2 className="size-4" /> Remove story
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              update((d) => {
                d.successStories.push({
                  id: newId(),
                  quote: "",
                  name: "",
                  role: "",
                  photo: null,
                });
              })
            }
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Plus className="size-4" /> Add story
          </button>
        </div>
      </SectionCard>

      {/* Donate band */}
      <SectionCard title="Donate Band" description="The call-to-action band above the footer.">
        <Field
          label="Title"
          value={content.donateBand.title}
          onChange={(v) => update((d) => { d.donateBand.title = v; })}
          textarea
          rows={2}
        />
        <Field
          label="Description"
          value={content.donateBand.description}
          onChange={(v) => update((d) => { d.donateBand.description = v; })}
          textarea
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Button label"
            value={content.donateBand.ctaLabel}
            onChange={(v) => update((d) => { d.donateBand.ctaLabel = v; })}
          />
          <Field
            label="Button link"
            value={content.donateBand.ctaHref}
            onChange={(v) => update((d) => { d.donateBand.ctaHref = v; })}
          />
        </div>
      </SectionCard>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        <div>
          {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-primary">Homepage updated.</p>}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
