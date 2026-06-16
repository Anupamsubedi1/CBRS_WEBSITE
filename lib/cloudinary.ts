import crypto from "crypto";
import type { CloudinaryImage } from "@/lib/types";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

const FOLDER = "cbrs-nepal/homepage";

function sign(params: Record<string, string | number>): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(toSign + API_SECRET)
    .digest("hex");
}

/** Upload an image file to Cloudinary, returning its URL and public ID. */
export async function uploadImage(file: File): Promise<CloudinaryImage> {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = sign({ folder: FOLDER, timestamp });

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", API_KEY);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);
  body.append("folder", FOLDER);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body },
  );

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed: ${await res.text()}`);
  }

  const data = (await res.json()) as { secure_url: string; public_id: string };
  return { url: data.secure_url, publicId: data.public_id };
}

/** Permanently delete an image from Cloudinary by its public ID. */
export async function deleteImage(publicId: string): Promise<void> {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = sign({ public_id: publicId, timestamp });

  const body = new FormData();
  body.append("public_id", publicId);
  body.append("api_key", API_KEY);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
    { method: "POST", body },
  );

  if (!res.ok) {
    throw new Error(`Cloudinary delete failed: ${await res.text()}`);
  }
}
