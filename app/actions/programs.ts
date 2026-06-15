"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminId } from "@/app/actions/auth";
import { saveProgram as persistProgram, deleteProgram as removeProgram } from "@/lib/programs";
import { saveProgramsPageContent } from "@/lib/programs-page";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { CloudinaryImage, Program, ProgramsPageContent } from "@/lib/types";

export type SaveProgramState = { error?: string; success?: boolean } | undefined;

/** Maps an image field key from the editor to its location in the program. */
function setImageSlot(program: Program, key: string, image: CloudinaryImage) {
  if (key === "cover") {
    program.coverImage = image;
    return;
  }
  if (key.startsWith("gallery-")) {
    const index = Number(key.slice("gallery-".length));
    if (program.gallery[index]) program.gallery[index].image = image;
  }
}

export async function saveProgramAction(
  _prev: SaveProgramState,
  formData: FormData,
): Promise<SaveProgramState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const raw = formData.get("program");
  if (typeof raw !== "string") return { error: "Invalid form submission." };

  let program: Program;
  try {
    program = JSON.parse(raw) as Program;
  } catch {
    return { error: "Invalid form submission." };
  }

  if (!program.title.trim() || !program.slug.trim()) {
    return { error: "Title and slug are required." };
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
    // Upload newly-selected images first so a failed upload doesn't strand us
    // having already deleted the images they were meant to replace.
    for (const [name, value] of formData.entries()) {
      if (!name.startsWith("file:") || !(value instanceof File) || value.size === 0) continue;
      const key = name.slice("file:".length);
      const uploaded = await uploadImage(value);
      setImageSlot(program, key, uploaded);
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await persistProgram(program);
  } catch (err) {
    console.error("Failed to save program", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/programs");
  revalidatePath(`/programs/${program.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/programs");

  return { success: true };
}

export async function deleteProgramAction(id: string): Promise<void> {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const deleted = await removeProgram(id);

  if (deleted) {
    const publicIds = [
      deleted.coverImage?.publicId,
      ...deleted.gallery.map((g) => g.image?.publicId),
    ].filter((id): id is string => Boolean(id));

    await Promise.all(publicIds.map((publicId) => deleteImage(publicId).catch(() => {})));
  }

  revalidatePath("/programs");
  revalidatePath("/");
  revalidatePath("/admin/programs");
}

export type SaveProgramsPageState = { error?: string; success?: boolean } | undefined;

export async function saveProgramsPageHero(
  _prev: SaveProgramsPageState,
  formData: FormData,
): Promise<SaveProgramsPageState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const content: ProgramsPageContent = {
    eyebrow: String(formData.get("eyebrow") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
  };

  if (!content.title.trim()) {
    return { error: "Title is required." };
  }

  try {
    await saveProgramsPageContent(content);
  } catch (err) {
    console.error("Failed to save programs page content", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/programs");
  revalidatePath("/admin/programs");

  return { success: true };
}
