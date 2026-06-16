"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ThemeIcon } from "@/components/shared/icon";
import { themes } from "@/lib/data/themes";

/** Each card flies in from a different direction so the grid "assembles" itself. */
const directions = [
  { x: -90, y: -20 }, // from the left
  { x: 0, y: -80 }, // from the top
  { x: 90, y: -20 }, // from the right
  { x: -80, y: 60 }, // from the bottom-left
  { x: 0, y: 90 }, // from the bottom
  { x: 80, y: 60 }, // from the bottom-right
];

export function ThemesGrid() {
  const reduce = useReducedMotion();

  if (reduce) {
    // No transforms for users who prefer reduced motion.
    return (
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeCard key={theme.slug} theme={theme} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ staggerChildren: 0.1 }}
      variants={{ hidden: {}, visible: {} }}
    >
      {themes.map((theme, i) => {
        const d = directions[i % directions.length];
        const variants: Variants = {
          hidden: { opacity: 0, x: d.x, y: d.y, scale: 0.9 },
          visible: { opacity: 1, x: 0, y: 0, scale: 1 },
        };
        return (
          <motion.div
            key={theme.slug}
            className="h-full"
            variants={variants}
            transition={{ type: "spring", stiffness: 80, damping: 15, mass: 0.9 }}
          >
            <ThemeCard theme={theme} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ThemeCard({ theme }: { theme: (typeof themes)[number] }) {
  return (
    <Link
      href={`/about/cbrs-nepal#${theme.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-card-hover"
    >
      {/* Soft brand glow that fades in on hover for a premium feel */}
      <span
        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <ThemeIcon name={theme.icon} className="size-7" />
      </span>
      <h3 className="mt-6 text-lg font-bold text-foreground">{theme.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-700">
        {theme.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {theme.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn More
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
