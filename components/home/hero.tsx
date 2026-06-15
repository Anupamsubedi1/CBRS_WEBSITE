"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ThemeIcon } from "@/components/shared/icon";
import type { HomeHero } from "@/lib/types";

/** Alternating tints for the floating service cards (2 blue, 2 teal). */
const TINTS = ["bg-primary", "bg-primary", "bg-accent", "bg-accent"];

export function Hero({ content }: { content: HomeHero }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease, delay },
        };

  return (
    <section className="relative isolate w-full">
      {/* ---- Background layers ---- */}
      {/* 1 · Brand-primary fallback (shown if the photo is unavailable) */}
      <div className="hero-fallback absolute inset-0 -z-30" aria-hidden="true" />
      {/* 2 · Hero photograph — optimized, object-fit: cover, focal point on subject */}
      <Image
        src={content.image?.url ?? "/cbrs_hero_background.png"}
        alt="A CBRS Nepal facilitator supporting a smiling boy who uses a wheelchair, surrounded by community members in a Nepali village"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: "72% center" }}
      />
      {/* 3 · Brand-primary overlay — vertical on mobile, left→right fade on desktop */}
      <div className="hero-overlay-y absolute inset-0 -z-10 lg:hidden" aria-hidden="true" />
      <div className="hero-overlay-x absolute inset-0 -z-10 hidden lg:block" aria-hidden="true" />

      {/* ---- Content ---- */}
      <Container className="relative flex min-h-[88vh] items-center py-20 lg:min-h-[86vh] lg:py-24">
        <div className="max-w-[640px]">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md"
          >
            {content.badge}
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {content.headingMain}{" "}
            <span className="text-accent">{content.headingHighlight}</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85"
          >
            {content.description}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-4">
            <Button href={content.ctaPrimaryHref} variant="accent" size="lg">
              <Heart className="fill-current" /> {content.ctaPrimaryLabel}
            </Button>
            <Button href={content.ctaSecondaryHref} variant="outline-white" size="lg">
              {content.ctaSecondaryLabel} <ArrowRight />
            </Button>
          </motion.div>

          {/* Mobile/tablet: cards as a responsive grid below the CTAs */}
          <motion.ul
            {...rise(0.34)}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden"
          >
            {content.pillars.map(({ icon, label }, i) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2.5 rounded-2xl bg-white px-3 py-4 text-center shadow-float"
              >
                <span className={`grid size-11 place-items-center rounded-full ${TINTS[i % TINTS.length]} text-white`}>
                  <ThemeIcon name={icon} className="size-5" />
                </span>
                <span className="text-xs font-semibold leading-tight text-foreground">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>

      {/* Desktop: 4 service cards floating at the bottom-right, overlapping the edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block"
        aria-hidden="false"
      >
        <Container className="relative">
          <motion.ul
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, ease, delay: 0.45 },
                })}
            className="pointer-events-auto absolute bottom-0 right-0 flex translate-y-1/3 gap-4"
          >
            {content.pillars.map(({ icon, label }, i) => (
              <li
                key={label}
                className="flex w-[10.75rem] flex-col items-center gap-3 rounded-2xl bg-white px-4 py-6 text-center shadow-float"
              >
                <span className={`grid size-12 place-items-center rounded-full ${TINTS[i % TINTS.length]} text-white`}>
                  <ThemeIcon name={icon} className="size-6" />
                </span>
                <span className="text-sm font-semibold leading-tight text-foreground">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </Container>
      </div>

      {/* spacer so the floating cards clear the next section on desktop */}
      <div className="hidden h-20 lg:block" aria-hidden="true" />
    </section>
  );
}
