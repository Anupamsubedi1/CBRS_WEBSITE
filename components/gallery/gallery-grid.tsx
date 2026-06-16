"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Media } from "@/components/shared/media";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/types";

const ratioForSpan: Record<NonNullable<GalleryItem["span"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  normal: "aspect-square",
};

export function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: string[];
}) {
  const [active, setActive] = React.useState("All");
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const reduce = useReducedMotion();

  const visible =
    active === "All" ? items : items.filter((g) => g.category === active);

  const close = React.useCallback(() => setLightbox(null), []);
  const step = React.useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // Keyboard controls for the lightbox.
  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const activeItem = lightbox !== null ? visible[lightbox] : null;

  return (
    <div>
      {/* Filter */}
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-card focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            aria-label={`View image: ${g.title}`}
          >
            <Media
              src={g.image?.url}
              alt={g.title}
              seed={g.id}
              ratio={ratioForSpan[g.span ?? "normal"]}
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex w-full items-center justify-between p-4 text-left">
                <span className="text-sm font-semibold text-white">{g.title}</span>
                <Maximize2 className="size-4 text-white" aria-hidden="true" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>

            <motion.figure
              key={activeItem.id}
              className="max-h-[85vh] w-full max-w-3xl"
              initial={reduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Media
                src={activeItem.image?.url}
                alt={activeItem.title}
                seed={activeItem.id}
                ratio="aspect-[3/2]"
                rounded="rounded-2xl"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <figcaption className="mt-3 text-center text-sm text-white/90">
                {activeItem.title}
                <span className="ml-2 text-white/50">
                  ({(lightbox ?? 0) + 1}/{visible.length})
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
