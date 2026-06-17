"use server";

import { revalidatePath } from "next/cache";
import { getAdminId } from "@/app/actions/auth";
import { saveTeam } from "@/lib/team";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { TeamContent } from "@/lib/types";

export type SaveTeamState =
  | { error?: string; success?: boolean; team?: TeamContent }
  | undefined;

export async function saveTeamAction(
  _prev: SaveTeamState,
  formData: FormData,
): Promise<SaveTeamState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const raw = formData.get("team");
  if (typeof raw !== "string") return { error: "Invalid form submission." };

  let team: TeamContent;
  try {
    team = JSON.parse(raw) as TeamContent;
  } catch {
    return { error: "Invalid form submission." };
  }

  let toDelete: string[] = [];
  const rawDelete = formData.get("toDelete");
  if (typeof rawDelete === "string") {
    try {
      toDelete = JSON.parse(rawDelete) as string[];
    } catch {
      toDelete = [];
    }
  }

  try {
    // Upload newly-selected portraits. Field keys are `board-<id>` / `advisor-<id>`.
    for (const [name, value] of formData.entries()) {
      if (!name.startsWith("file:") || !(value instanceof File) || value.size === 0) continue;
      const key = name.slice("file:".length);
      if (key.startsWith("board-")) {
        const id = key.slice("board-".length);
        const member = team.board.find((m) => m.id === id);
        if (member) member.photo = await uploadImage(value);
      } else if (key.startsWith("advisor-")) {
        const id = key.slice("advisor-".length);
        const member = team.advisors.find((m) => m.id === id);
        if (member) member.photo = await uploadImage(value);
      }
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await saveTeam(team);
  } catch (err) {
    console.error("Failed to save team", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/about/our-team");
  revalidatePath("/admin/team");

  // Return the persisted content (now carrying the uploaded photo URLs) so the
  // editor can resync its state. Without this the client keeps photo:null for
  // freshly-uploaded members, and the next save writes those nulls back —
  // wiping previously-uploaded photos.
  return { success: true, team };
}
