"use client";

import * as React from "react";
import Image from "next/image";
import { ImageIcon, Upload, X } from "lucide-react";
import type { CloudinaryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  /** Field key — rendered as a `file:<name>` form field the server action reads. */
  name: string;
  label: string;
  image: CloudinaryImage | null;
  /** Clears the image reference in the editor's content state. */
  onRemove: () => void;
  /** Marks a Cloudinary public ID for deletion once the form is saved. */
  onMarkDelete: (publicId: string) => void;
  className?: string;
  ratio?: string;
}

/**
 * Image upload control for the homepage editor. Renders a real `<input type="file">`
 * so the chosen file is included in the form's native FormData on submit — the
 * server action uploads it to Cloudinary and deletes the previous image.
 */
export function ImagePicker({
  name,
  label,
  image,
  onRemove,
  onMarkDelete,
  className,
  ratio = "aspect-video",
}: ImagePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image) onMarkDelete(image.publicId);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemove() {
    if (inputRef.current) inputRef.current.value = "";
    setPreviewUrl(null);
    if (image) onMarkDelete(image.publicId);
    onRemove();
  }

  const src = previewUrl ?? image?.url ?? null;
  const hasImage = Boolean(src);

  return (
    <div className={cn("space-y-2", className)}>
      <span className="block text-sm font-medium text-foreground">{label}</span>
      <div
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-xl border border-dashed border-border bg-slate-50",
          ratio,
        )}
      >
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" unoptimized={Boolean(previewUrl)} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1.5 text-muted">
            <ImageIcon className="size-6" aria-hidden="true" />
            <span className="text-xs">No image set</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          name={`file:${name}`}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Upload className="size-3.5" aria-hidden="true" />
          {hasImage ? "Replace image" : "Upload image"}
        </button>
        {hasImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-danger transition-colors hover:border-danger/40"
          >
            <X className="size-3.5" aria-hidden="true" />
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
