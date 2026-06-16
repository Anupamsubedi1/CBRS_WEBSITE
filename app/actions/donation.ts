"use server";

import { revalidatePath } from "next/cache";
import { getAdminId } from "@/app/actions/auth";
import { saveDonationContent } from "@/lib/donation";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { DonationContent } from "@/lib/types";

export type SaveDonationState = { error?: string; success?: boolean } | undefined;

export async function saveDonationAction(
  _prev: SaveDonationState,
  formData: FormData,
): Promise<SaveDonationState> {
  const adminId = await getAdminId();
  if (!adminId) return { error: "Unauthorized." };

  const raw = formData.get("donation");
  if (typeof raw !== "string") return { error: "Invalid form submission." };

  let content: DonationContent;
  try {
    content = JSON.parse(raw) as DonationContent;
  } catch {
    return { error: "Invalid form submission." };
  }

  if (!content.hero.title.trim()) {
    return { error: "The banner title is required." };
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
    // Upload a newly-selected QR image first.
    const file = formData.get("file:qr");
    if (file instanceof File && file.size > 0) {
      content.bankQr.image = await uploadImage(file);
    }

    await Promise.all(
      toDelete.filter(Boolean).map((publicId) => deleteImage(publicId).catch(() => {})),
    );

    await saveDonationContent(content);
  } catch (err) {
    console.error("Failed to save donation content", err);
    return { error: "Failed to save changes. Please try again." };
  }

  revalidatePath("/donate");
  revalidatePath("/admin/donation");
  // The bank QR appears on every inner-page banner — refresh the whole site.
  revalidatePath("/", "layout");

  return { success: true };
}
