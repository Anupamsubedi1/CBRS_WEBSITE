"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  text: string;
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
 * Loops a typewriter effect: types the text out, holds, deletes, and repeats,
 * with a blinking caret. Users who prefer reduced motion get the static text.
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
  const [count, setCount] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;

    let delay: number;
    if (!deleting) {
      delay = count < text.length ? typeSpeed : holdAfterType;
    } else {
      delay = count > 0 ? deleteSpeed : holdAfterDelete;
    }

    const id = setTimeout(() => {
      if (!deleting) {
        if (count < text.length) setCount((c) => c + 1);
        else setDeleting(true);
      } else {
        if (count > 0) setCount((c) => c - 1);
        else setDeleting(false);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [count, deleting, reduce, text, typeSpeed, deleteSpeed, holdAfterType, holdAfterDelete]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
