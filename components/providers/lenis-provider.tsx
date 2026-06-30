"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * App-wide smooth scrolling, mounted once in the root layout so every page
 * inherits it. It honours `prefers-reduced-motion` (falling back to native
 * scrolling) and snaps to the top on client-side navigation — otherwise Lenis
 * would smoothly animate the new page back down to the previous scroll offset.
 */
export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // `lerp` (frame-rate-independent interpolation) gives a cleaner, more
    // consistent feel than duration-based tweening, which restarts its tween on
    // every wheel tick and reads as stuttery during continuous scrolling.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
