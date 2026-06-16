"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";

/**
 * Counts up to a numeric target when scrolled into view. Preserves any
 * thousands separators and suffix/prefix (e.g. "65,000+", "19+").
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();

  const match = value.match(/[\d,]+(?:\.\d+)?/);
  const target = match ? Number(match[0].replace(/,/g, "")) : NaN;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : value;

  const mv = useMotionValue(0);
  const [display, setDisplay] = React.useState(`${prefix}0${suffix}`);
  const animatable = !reduce && !isNaN(target);

  React.useEffect(() => {
    if (!animatable || !inView) return;
    const controls = animate(mv, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setDisplay(`${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, target, animatable, mv, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {animatable ? display : value}
    </span>
  );
}
