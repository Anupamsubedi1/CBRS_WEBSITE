"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/admin/image-picker";
import { saveTeamAction } from "@/app/actions/team";
import type { TeamContent } from "@/lib/types";

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function TeamEditor({ initialTeam }: { initialTeam: TeamContent }) {
  const [team, setTeam] = React.useState<TeamContent>(initialTeam);
  const [toDelete, setToDelete] = React.useState<string[]>([]);
  const [state, formAction, pending] = useActionState(saveTeamAction, undefined);

  function update(fn: (draft: TeamContent) => void) {
    setTeam((prev) => {
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
      <input type="hidden" name="team" value={JSON.stringify(team)} />
      <input type="hidden" name="toDelete" value={JSON.stringify(toDelete)} />

      {/* Board members */}
      <section className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">Board of Directors</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {team.board.map((m, i) => (
            <div key={m.id} className="space-y-3 rounded-xl border border-border p-4">
              <ImagePicker
                name={`board-${m.id}`}
                label="Photo"
                image={m.photo ?? null}
                ratio="aspect-square"
                className="max-w-[10rem]"
                onRemove={() => update((d) => { d.board[i].photo = null; })}
                onMarkDelete={markDelete}
              />
              <LabeledInput label="Name" value={m.name} onChange={(v) => update((d) => { d.board[i].name = v; })} />
              <LabeledInput label="Position" value={m.position} onChange={(v) => update((d) => { d.board[i].position = v; })} />
              <LabeledInput label="Ward / Location" value={m.ward} onChange={(v) => update((d) => { d.board[i].ward = v; })} />
              <LabeledInput label="Contact" value={m.contact} onChange={(v) => update((d) => { d.board[i].contact = v; })} />
              <button
                type="button"
                onClick={() =>
                  update((d) => {
                    if (d.board[i].photo) markDelete(d.board[i].photo!.publicId);
                    d.board.splice(i, 1);
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
              >
                <Trash2 className="size-4" /> Remove member
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update((d) => { d.board.push({ id: crypto.randomUUID(), name: "", position: "Member", ward: "", contact: "", photo: null }); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add board member
        </button>
      </section>

      {/* Advisors */}
      <section className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">Advisors</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {team.advisors.map((a, i) => (
            <div key={a.id} className="space-y-3 rounded-xl border border-border p-4">
              <ImagePicker
                name={`advisor-${a.id}`}
                label="Photo"
                image={a.photo ?? null}
                ratio="aspect-square"
                className="max-w-[10rem]"
                onRemove={() => update((d) => { d.advisors[i].photo = null; })}
                onMarkDelete={markDelete}
              />
              <LabeledInput label="Name" value={a.name} onChange={(v) => update((d) => { d.advisors[i].name = v; })} />
              <LabeledInput label="Position" value={a.position} onChange={(v) => update((d) => { d.advisors[i].position = v; })} />
              <LabeledInput label="Expertise" value={a.expertise} onChange={(v) => update((d) => { d.advisors[i].expertise = v; })} />
              <LabeledInput label="Contact" value={a.contact} onChange={(v) => update((d) => { d.advisors[i].contact = v; })} />
              <button
                type="button"
                onClick={() =>
                  update((d) => {
                    if (d.advisors[i].photo) markDelete(d.advisors[i].photo!.publicId);
                    d.advisors.splice(i, 1);
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline"
              >
                <Trash2 className="size-4" /> Remove advisor
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update((d) => { d.advisors.push({ id: crypto.randomUUID(), name: "", position: "Advisor", expertise: "", contact: "", photo: null }); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add advisor
        </button>
      </section>

      {/* General members */}
      <section className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">General Members</h2>
        <div className="space-y-2">
          {team.generalMembers.map((m, i) => (
            <div key={m.id} className="flex flex-wrap items-end gap-2">
              <div className="min-w-[10rem] flex-1 space-y-1.5">
                <Label>Name</Label>
                <Input value={m.name} onChange={(e) => update((d) => { d.generalMembers[i].name = e.target.value; })} />
              </div>
              <div className="min-w-[8rem] flex-1 space-y-1.5">
                <Label>Ward / Location</Label>
                <Input value={m.ward} onChange={(e) => update((d) => { d.generalMembers[i].ward = e.target.value; })} />
              </div>
              <div className="min-w-[8rem] flex-1 space-y-1.5">
                <Label>Contact</Label>
                <Input value={m.contact} onChange={(e) => update((d) => { d.generalMembers[i].contact = e.target.value; })} />
              </div>
              <button
                type="button"
                onClick={() => update((d) => { d.generalMembers.splice(i, 1); })}
                className="rounded-lg border border-border p-2.5 text-muted hover:border-danger/40 hover:text-danger"
                aria-label="Remove member"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update((d) => { d.generalMembers.push({ id: crypto.randomUUID(), name: "", ward: "", contact: "" }); })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" /> Add general member
        </button>
      </section>

      <div className="sticky bottom-4 flex items-center justify-end gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg">
        {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
        {state?.success && <p className="text-sm font-medium text-primary">Team saved.</p>}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
