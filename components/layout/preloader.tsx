"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** The hero photo must be ready before we reveal the site. */
const HERO_SRC = "/cbrs_heroone.jpeg";
/** Keep the animation on screen at least this long so it never just flashes. */
const MIN_VISIBLE_MS = 700;
/** Hard cap so a slow/failed image never traps the user behind the loader. */
const SAFETY_MS = 6000;

/**
 * Full-screen loading page shown on first load. It preloads the hero image
 * first, then fades out to reveal the site. The CBRS logo sits in the centre
 * with the dotted loader ring spinning around it.
 */
export function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        setLoaded(true);
      }
    };

    const minDelay = new Promise<void>((r) => window.setTimeout(r, MIN_VISIBLE_MS));
    const heroReady = new Promise<void>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = HERO_SRC;
      if (img.complete) resolve();
    });

    const safety = window.setTimeout(finish, SAFETY_MS);
    Promise.all([minDelay, heroReady]).then(finish);
    return () => window.clearTimeout(safety);
  }, []);

  // Lock page scrolling while the loader covers the viewport.
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  if (removed) return null;

  return (
    <div
      className={`preloader${loaded ? " preloader--hidden" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      onTransitionEnd={() => {
        if (loaded) setRemoved(true);
      }}
    >
      <div className="preloader__stack">
        <span className="loader" aria-hidden="true" />
        <span className="preloader__logo">
          <Image
            src="/cbrs_logo.jpeg"
            alt="CBRS Nepal"
            fill
            sizes="104px"
            priority
            className="object-cover"
          />
        </span>
      </div>
    </div>
  );
}
