"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type Layout = "1×1" | "2×2" | "4×1";

/** Inline SVG icons for each layout */
function SlideIcon({ active }: { active: boolean }) {
  const fill = active ? "#fff" : "rgba(255,255,255,0.6)";
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="19" height="13" rx="1.5" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
    </svg>
  );
}
function GridIcon({ active }: { active: boolean }) {
  const fill = active ? "#fff" : "rgba(255,255,255,0.6)";
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="8" height="5.5" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="11.5" y="0.5" width="8" height="5.5" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="0.5" y="8" width="8" height="5.5" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="11.5" y="8" width="8" height="5.5" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
    </svg>
  );
}
function RowIcon({ active }: { active: boolean }) {
  const fill = active ? "#fff" : "rgba(255,255,255,0.6)";
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="3.5" height="13" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="5.5" y="0.5" width="3.5" height="13" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="10.5" y="0.5" width="3.5" height="13" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
      <rect x="15.5" y="0.5" width="3.5" height="13" rx="1" stroke={fill} fill={active ? fill : "none"} strokeWidth="1" />
    </svg>
  );
}

const LAYOUTS: { key: Layout; label: string; icon: (a: boolean) => React.ReactNode }[] = [
  { key: "1×1", label: "Single slide", icon: (a) => <SlideIcon active={a} /> },
  { key: "2×2", label: "Grid 2×2",     icon: (a) => <GridIcon active={a} /> },
  { key: "4×1", label: "Row 4×1",      icon: (a) => <RowIcon active={a} /> },
];

/* ------------------------------------------------------------------ */
/*  Images                                                            */
/* ------------------------------------------------------------------ */

const HERO_IMAGES = [
  { src: "/herocarousel/1.jpeg", alt: "CBRS Nepal community activity 1" },
  { src: "/herocarousel/2.jpeg", alt: "CBRS Nepal community activity 2" },
  { src: "/herocarousel/3.jpeg", alt: "CBRS Nepal community activity 3" },
  { src: "/herocarousel/4.jpg", alt: "CBRS Nepal community activity 4" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface HeroCarouselProps {
  /** Optional className for the outer wrapper */
  className?: string;
}

export function HeroCarousel({ className }: HeroCarouselProps) {
  const [layout, setLayout] = useState<Layout>("1×1");

  /* Embla — always mounted (used on mobile always, on desktop only in 1×1) */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 8000, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  /* Stop/start autoplay when leaving/entering slide mode */
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    if (layout === "1×1") {
      autoplay.play();
    } else {
      autoplay.stop();
    }
  }, [layout, emblaApi]);

  /* Desktop visibility helpers */
  const showSlide = layout === "1×1";
  const showGrid = layout === "2×2";
  const showRow = layout === "4×1";

  return (
    <>
      {/* ---- Background images ---- */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {/* ── Embla slide carousel ── */}
        {/* Always visible on mobile. On desktop, only when layout is 1×1. */}
        <div
          className={cn(
            "h-full w-full overflow-hidden",
            /* mobile: always show; desktop: only in slide mode */
            "block",
            showSlide ? "md:block" : "md:hidden",
          )}
          ref={emblaRef}
        >
          <div className="flex h-full">
            {HERO_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 38%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── 2×2 Grid layout (desktop only) ── */}
        <div
          className={cn(
            "hidden h-full w-full",
            showGrid && "md:grid md:grid-cols-2 md:grid-rows-2",
          )}
        >
          {HERO_IMAGES.map((img, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image
                src={img.src}
                alt=""
                fill
                priority={i < 2}
                sizes="50vw"
                className="object-cover"
                style={{ objectPosition: "50% 38%" }}
              />
            </div>
          ))}
        </div>

        {/* ── 4×1 Row layout (desktop only) ── */}
        <div
          className={cn(
            "hidden h-full w-full",
            showRow && "md:flex",
          )}
        >
          {HERO_IMAGES.map((img, i) => (
            <div key={i} className="relative h-full w-1/4 shrink-0 overflow-hidden">
              <Image
                src={img.src}
                alt=""
                fill
                priority={i < 2}
                sizes="25vw"
                className="object-cover"
                style={{ objectPosition: "50% 38%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---- Desktop slide dots (only in 1×1 mode) ---- */}
      {showSlide && (
        <div className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-8 bg-white/90"
                  : "w-2 bg-white/40 hover:bg-white/60",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ---- Layout switcher — top right (desktop only) ---- */}
      <div className="absolute right-4 top-4 z-30 hidden items-center gap-1 rounded-lg bg-black/50 px-2.5 py-2 backdrop-blur-sm md:flex">
        {LAYOUTS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setLayout(key)}
            className={cn(
              "rounded-md p-1.5 transition-all",
              layout === key
                ? "bg-white/20 shadow-sm"
                : "hover:bg-white/10",
            )}
            aria-label={label}
            title={label}
          >
            {icon(layout === key)}
          </button>
        ))}
      </div>

      {/* ---- Mobile slide dots (always visible, always 1×1) ---- */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:hidden">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === selectedIndex
                ? "w-8 bg-white/90"
                : "w-2 bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
