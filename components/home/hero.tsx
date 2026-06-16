"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  HandHeart,
  GraduationCap,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/home/marquee";

/** Four service cards — icon tint matches the reference (2 blue, 2 teal). */
const pillars = [
  { icon: HandHeart, label: "Rehabilitation Services", tint: "bg-primary" },
  { icon: GraduationCap, label: "Inclusive Education", tint: "bg-primary" },
  { icon: Briefcase, label: "Livelihood Development", tint: "bg-accent" },
  { icon: Users, label: "Community Empowerment", tint: "bg-accent" },
];

export function Hero() {
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
    /* The hero fills exactly the viewport below the header (never taller): copy,
       service cards AND the marquee all sit within one screen on landing. */
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] w-full flex-col overflow-hidden">
      {/* ---- Background layers ---- */}
      {/* 1 · Brand-primary fallback (shown if the photo is unavailable) */}
      <div className="hero-fallback absolute inset-0 -z-30" aria-hidden="true" />
      
      {/* 2 · Hero photograph — optimized, object-fit: cover, focal point adjusted to center-left 
          to push busy focal points/subjects out from directly underneath the text block */}
      <Image
        src="/CBRS_HERO.jpeg"
        alt="A CBRS Nepal facilitator supporting a smiling boy who uses a wheelchair, surrounded by community members in a Nepali village"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: "65% center" }}
      />
      
      {/* 3 · Enhanced Brand-primary overlay — Darkened and extended to maximize contrast against white text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/20 lg:hidden" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent lg:block" aria-hidden="true" />

      {/* ---- Content: copy near the top (minimal gap to navbar), cards above the marquee ---- */}
      <Container className="relative z-10 flex flex-1 flex-col justify-between gap-10 pb-7 pt-8 sm:gap-12 lg:pb-9 lg:pt-12">
        <div className="max-w-[44rem]">
          {/* Changed text color to text-slate-900 to fix contrast against the vibrant bg-accent pill */}
         TypeScript
<motion.span
  {...rise(0)}
  className="inline-flex items-center rounded-full bg-slate-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md shadow-inner"
>
  <span className="mr-1.5 flex h-2 w-2 rounded-full bg-accent animate-pulse" />
  Working with and for people with disability and development in Nepal
</motion.span>

          {/* Swapped text-accent out for a highly accessible, brilliant warm amber/gold color */}
          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-extrabold leading-[1.1] tracking-tight text-white text-[clamp(1.75rem,4vw,2.75rem)]"
          >
            Building an Inclusive Society Where Every Person Can Live with{" "}
            <span className="text-amber-400 drop-shadow-sm">Dignity and Opportunity</span>
          </motion.h1>

          {/* Unified layout container ensuring matching vertical scale & baseline alignments */}
          <motion.div
            {...rise(0.18)}
            className="mt-8 flex flex-row flex-wrap items-center gap-4"
          >
            <Button 
              href="/about/cbrs-nepal" 
              variant="accent" 
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold shadow-lg transition-transform active:scale-[0.98]"
            >
              About Us <ArrowRight className="size-4" />
            </Button>
            <Button 
              href="/programs" 
              variant="outline-white" 
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-6 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Explore Programs <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        </div>

        {/* Service cards — compact (icon + label snug, no excess space).
            Mobile-first: 2 cols on phones, 4 across from lg. */}
        <motion.ul
          {...rise(0.3)}
          className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {pillars.map(({ icon: Icon, label, tint }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-sm px-3 py-4 text-center shadow-float sm:gap-3 sm:py-5 lg:rounded-3xl lg:py-6 transition-transform hover:-translate-y-0.5"
            >
              <span
                className={`grid size-11 place-items-center rounded-full ${tint} text-white sm:size-12 lg:size-14`}
              >
                <Icon className="size-5 sm:size-6 lg:size-7" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                {label}
              </span>
            </li>
          ))}
        </motion.ul>
      </Container>

      {/* Marquee — part of the hero so it's visible on landing */}
      <Marquee />
    </section>
  );
}