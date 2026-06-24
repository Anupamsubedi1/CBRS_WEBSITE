"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  /** A single phrase, or several phrases to cycle through in a loop. */
  text: string | string[];
  className?: string;
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** pause once fully typed (ms) */
  holdAfterType?: number;
  /** pause once fully deleted (ms) */
  holdAfterDelete?: number;
}

/**
 * Loops a typewriter effect: types a phrase out, holds, deletes, then moves on
 * to the next phrase and repeats forever, with a blinking caret. When several
 * phrases are given they cycle in order. Reduced-motion users get static text.
 */
export function Typewriter({
  text,
  className,
  typeSpeed = 95,
  deleteSpeed = 45,
  holdAfterType = 1800,
  holdAfterDelete = 600,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const phrases = React.useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );

  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  const current = phrases[index] ?? "";

  React.useEffect(() => {
    if (reduce) return;

    let delay: number;
    if (!deleting) {
      delay = count < current.length ? typeSpeed : holdAfterType;
    } else {
      delay = count > 0 ? deleteSpeed : holdAfterDelete;
    }

    const id = setTimeout(() => {
      if (!deleting) {
        if (count < current.length) setCount((c) => c + 1);
        else setDeleting(true);
      } else if (count > 0) {
        setCount((c) => c - 1);
      } else {
        // Fully deleted — advance to the next phrase and start typing it.
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [
    count,
    deleting,
    reduce,
    current,
    phrases.length,
    typeSpeed,
    deleteSpeed,
    holdAfterType,
    holdAfterDelete,
  ]);

  if (reduce) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span
      className="grid w-full grid-cols-1 items-start justify-items-start"
      aria-label={current}
    >
      {/* Invisible copies of every phrase reserve the tallest footprint the
          typewriter can occupy, so the heading never reflows — and the hero
          section never resizes (which is what made the background photo appear
          to zoom in/out) — as the phrases type and delete. */}
      {phrases.map((phrase, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1"
        >
          {phrase}
        </span>
      ))}
      {/* The visible, animated phrase, overlaid on the reserved space. */}
      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1${className ? ` ${className}` : ""}`}
      >
        {current.slice(0, count)}
        <span className="typewriter-caret" />
      </span>
    </span>
  );
}
