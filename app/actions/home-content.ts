"use server";

import { revalidatePath } from "next/cache";
import { getAdminId } from "@/app/actions/auth";
import { saveHomeContent as persistHomeContent } from "@/lib/home-content";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { CloudinaryImage, HomepageContent } from "@/lib/types";

export type SaveHomeContentState = { error?: string; success?: boolean } | undefined;

/** Maps an image field key from the editor to its location in the content tree. */
function setImageSlot(content: HomepageContent, key: string, image: CloudinaryImage) {
  if (key === "hero") {
    content.hero.image = image;
    return;
  }
  if (key === "about") {
    content.about.image = image;
    return;
  }
  if (key.startsWith("story-")) {
    const id = key.slice("story-".length);
    const item = content.successStories.find((s) => s.id === id);
    if (item) item.photo = image;
  }
}

export async function saveHomeContent(
  _prev: SaveHomeContentState,
  formData: FormData,
): Promise<SaveHomeContentState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const raw = formData.get("content");
  if (typeof raw !== "string") return { error: "Invalid form submission." };

  let content: HomepageContent;
  try {
    content = JSON.parse(raw) as HomepageContent;
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
    // Upload newly-selected images first so a failed upload doesn't strand us
    // having already deleted the images they were meant to replace.
    for (const [name, value] of formData.entries()) {
      if (!name.startsWith("file:") || !(value instanceof File) || value.size === 0) continue;
      const key = name.slice("file:".length);
      const uploaded = await uploadImage(value);
      setImageSlot(content, key, uploaded);
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await persistHomeContent(content);
  } catch (err) {
    console.error("Failed to save homepage content", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/home");

  return { success: true };
}
