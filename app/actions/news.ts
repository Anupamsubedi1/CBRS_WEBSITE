"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminId } from "@/app/actions/auth";
import { saveNews as persistNews, deleteNews as removeNews } from "@/lib/news";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { NewsItem } from "@/lib/types";

export type SaveNewsState = { error?: string; success?: boolean } | undefined;

export async function saveNewsAction(
  _prev: SaveNewsState,
  formData: FormData,
): Promise<SaveNewsState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const raw = formData.get("news");
  if (typeof raw !== "string") return { error: "Invalid form submission." };

  let item: NewsItem;
  try {
    item = JSON.parse(raw) as NewsItem;
  } catch {
    return { error: "Invalid form submission." };
  }

  if (!item.title.trim() || !item.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const previousSlug = String(formData.get("previousSlug") ?? "") || undefined;

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
    // Upload a newly-selected cover image first.
    const file = formData.get("file:cover");
    if (file instanceof File && file.size > 0) {
      item.coverImage = await uploadImage(file);
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await persistNews(item, previousSlug);
  } catch (err) {
    console.error("Failed to save news item", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/news");
  revalidatePath(`/news/${item.slug}`);
  if (previousSlug && previousSlug !== item.slug) {
    revalidatePath(`/news/${previousSlug}`);
  }
  revalidatePath("/admin/news");

  return { success: true };
}

export async function deleteNewsAction(slug: string): Promise<void> {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const deleted = await removeNews(slug);

  if (deleted?.coverImage) {
    await deleteImage(deleted.coverImage.publicId).catch(() => {});
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
}
