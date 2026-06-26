"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  { src: "/herocarousel/2.jpeg", alt: "CBRS Nepal community activity 1" },
  { src: "/herocarousel/3.jpeg", alt: "CBRS Nepal community activity 2" },
  { src: "/herocarousel/5.jpeg", alt: "CBRS Nepal community activity 3" },
  { src: "/herocarousel/1.jpeg", alt: "CBRS Nepal community activity 4" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface HeroCarouselProps {
  /** Optional className for the outer wrapper */
  className?: string;
}

export function HeroCarousel({ className }: HeroCarouselProps) {
  const [layout, setLayout] = useState<Layout>("2×2");

  /* Embla — always mounted (used on mobile always, on desktop only in 1×1) */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25 },
    [Autoplay({ delay: 8000, stopOnInteraction: true })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    /* Restart autoplay after any manual navigation so the timer resets */
    emblaApi.plugins()?.autoplay?.play();
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
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
      <div className="absolute inset-0 -z-20 bg-white" aria-hidden="true">
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
          <div className="flex h-full will-change-transform">
            {HERO_IMAGES.map((img, i) => (
              <div
                key={`slide-${i}`}
                className="relative min-w-0 shrink-0 grow-0 basis-full isolate backface-hidden"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-[1.04]">
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
              </div>
            ))}
          </div>
        </div>

        {/* ── 2×2 Grid layout (desktop only) ── */}
        <div
          className={cn(
            "hidden h-full w-full",
            showGrid && "md:grid md:grid-cols-2 md:grid-rows-2 md:gap-1 md:p-1 bg-white",
          )}
        >
          {HERO_IMAGES.map((img, i) => (
            <div key={`grid-${i}`} className="relative h-full w-full overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.04] backface-hidden">
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
            showRow && "md:flex md:gap-1 md:p-1",
          )}
        >
          {HERO_IMAGES.map((img, i) => (
            <div key={`row-${i}`} className="relative h-full flex-1 overflow-hidden bg-white transition-transform duration-700 ease-out hover:scale-[1.04] backface-hidden">
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
        <div className="absolute left-1/2 top-4 z-30 hidden -translate-x-1/2 items-center gap-2 md:flex">
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

      {/* ---- Prev / Next arrows (1×1 only, desktop only) ---- */}
      {showSlide && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:scale-110 active:scale-95 md:left-5 md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:scale-110 active:scale-95 md:right-5 md:block"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* ---- Layout switcher — top right (desktop only) ---- */}
      <div className="absolute right-4 top-4 z-30 hidden items-center gap-1 rounded-lg px-2.5 py-2 backdrop-blur-sm md:flex">
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
      <div className="absolute left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-2 md:hidden">
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
