"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/shared/typewriter";

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
    /* The hero fills exactly the viewport below the header (never taller).
       The service cards now live in their own section just below the hero. */
    <section className="relative isolate flex min-h-[78svh] w-full flex-col overflow-hidden lg:min-h-[calc(100svh-var(--header-h)-7rem)]">
      {/* ---- Background layers ---- */}
      {/* 1 · Brand-primary fallback (shown if the photo is unavailable) */}
      <div
        className="hero-fallback absolute inset-0 -z-30"
        aria-hidden="true"
      />
      {/* 2 · Hero photograph — optimized, object-fit: cover, focal point on subject */}
      <Image
        src="/cbrs_heroone.jpeg"
        alt="A CBRS Nepal facilitator supporting a smiling boy who uses a wheelchair, surrounded by community members in a Nepali village"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: "50% 38%" }}
      />
      {/* 3 · Brand-primary overlay — vertical on mobile, left→right fade on desktop */}
      <div
        className="hero-overlay-y absolute inset-0 -z-10 lg:hidden"
        aria-hidden="true"
      />
      <div
        className="hero-overlay-x absolute inset-0 -z-10 hidden lg:block"
        aria-hidden="true"
      />

      {/* ---- Content: copy vertically centred; extra bottom padding leaves
           room for the service cards that overlap the hero's lower edge ---- */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-28 pt-10 lg:pb-40">
        <div className="max-w-[44rem]">
          <motion.h1
            {...rise(0.08)}
            className="font-extrabold leading-[1.12] tracking-tight text-white text-[clamp(1.75rem,4vw,2.75rem)]"
          >
            Building an{" "}
            <br className="hidden sm:block" />
            Inclusive Society Where{" "}
            <br className="hidden sm:block" />
            Every Person Can Live with{" "}
            <br className="hidden sm:block" />
            <Typewriter
              text={[
                "Dignity and Opportunity",
                "Community-led inclusion",
                "Equal opportunity care",
                "Sustainable life empowerment",
              ]}
              className="text-[#08c6b9] relative inline-block after:absolute after:inset-0 after:-z-10 after:bg-black/40 after:blur-md after:scale-110"
              
            />
            
          </motion.h1>

          <motion.div
            {...rise(0.18)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="/about/cbrs-nepal" variant="accent" size="lg">
              About Us <ArrowRight />
            </Button>
            <Button href="/programs" variant="outline-white" size="lg">
              Explore Programs <ArrowRight />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
