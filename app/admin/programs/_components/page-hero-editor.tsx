"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { saveProgramsPageHero } from "@/app/actions/programs";
import type { ProgramsPageContent } from "@/lib/types";

export function PageHeroEditor({ initialContent }: { initialContent: ProgramsPageContent }) {
  const [state, formAction, pending] = useActionState(saveProgramsPageHero, undefined);

  return (
    <details className="group mb-6 rounded-2xl border border-border bg-white shadow-sm" open>
      <summary className="cursor-pointer list-none px-6 py-4">
        <h2 className="font-semibold text-foreground">Page Banner</h2>
        <p className="mt-0.5 text-sm text-muted">
          The hero banner shown at the top of the public /programs page.
        </p>
      </summary>
      <form action={formAction} className="space-y-4 border-t border-border px-6 py-6">
        <div className="space-y-1.5">
          <Label>Eyebrow</Label>
          <Input name="eyebrow" defaultValue={initialContent.eyebrow} />
        </div>
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input name="title" defaultValue={initialContent.title} />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea name="description" rows={2} defaultValue={initialContent.description} />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={pending} size="sm">
            {pending ? "Saving…" : "Save banner"}
          </Button>
          {state?.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-primary">Banner updated.</p>}
        </div>
      </form>
    </details>
  );
}
