"use server";

import { revalidatePath } from "next/cache";
import { getAdminId } from "@/app/actions/auth";
import { saveGalleryContent } from "@/lib/gallery";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { GalleryItem } from "@/lib/types";

export type SaveGalleryState = { error?: string; success?: boolean } | undefined;

export async function saveGalleryAction(
  _prev: SaveGalleryState,
  formData: FormData,
): Promise<SaveGalleryState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const rawItems = formData.get("items");
  const rawCategories = formData.get("categories");
  if (typeof rawItems !== "string" || typeof rawCategories !== "string") {
    return { error: "Invalid form submission." };
  }

  let items: GalleryItem[];
  let categories: string[];
  try {
    items = JSON.parse(rawItems) as GalleryItem[];
    categories = JSON.parse(rawCategories) as string[];
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
      if (!key.startsWith("item-")) continue;
      const id = key.slice("item-".length);
      const item = items.find((i) => i.id === id);
      if (!item) continue;
      item.image = await uploadImage(value);
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await saveGalleryContent(items, categories);
  } catch (err) {
    console.error("Failed to save gallery", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");

  return { success: true };
}
