"use client";

import * as React from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PALETTES = [
  "from-[#003a6f] via-[#005daa] to-[#1976d2]",
  "from-[#005daa] via-[#1976d2] to-[#0a9bb0]",
  "from-[#00897b] via-[#00a99d] to-[#1976d2]",
  "from-[#013a63] via-[#01497c] to-[#2c7da0]",
  "from-[#1976d2] via-[#00a99d] to-[#005daa]",
  "from-[#004584] via-[#006494] to-[#0a9396]",
];

function seedIndex(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

export interface MediaProps {
  src?: string | null;
  alt: string;
  seed?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  ratio?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  /** Controls image cropping behavior. Use 'object-contain' to show full pictures. */
  objectFit?: "object-cover" | "object-contain"; 
}

export function Media({
  src,
  alt,
  seed,
  label,
  icon,
  className,
  ratio = "aspect-[4/3]",
  fill,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  rounded,
  objectFit = "object-cover", // Default fallback strategy
}: MediaProps) {
  const [failed, setFailed] = React.useState(false);

  const wrapper = cn(
    "relative overflow-hidden bg-slate-100",
    !fill && ratio,
    rounded,
    className,
  );

  if (src && !failed) {
    return (
      <div className={wrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          // CHANGED: Dynamic layout control + subtle hover scale transition applied strictly to the inner asset
          className={cn(
            "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            objectFit
          )}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  const palette = PALETTES[seedIndex(seed ?? alt, PALETTES.length)];

  return (
    <div
      className={cn(wrapper, "bg-gradient-to-br", palette)}
      role="img"
      aria-label={alt}
    >
      <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-8 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-white/15 text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
          {icon ?? <ImageIcon className="size-6" aria-hidden="true" />}
        </span>
        {label && (
          <span className="max-w-[16rem] text-sm font-medium text-white/90">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}