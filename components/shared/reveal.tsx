"use client";

import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** HTML element to render. */
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Scroll-triggered fade/slide reveal. Respects prefers-reduced-motion by
 * rendering content immediately without transform.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Per-child delay step in seconds. */
  step?: number;
}

/** Container that staggers the reveal of its `Reveal` children. */
export function StaggerGroup({ children, className, step = 0.08 }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ staggerChildren: step }}
      variants={{ hidden: {}, visible: {} }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside a StaggerGroup. */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={baseVariants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
