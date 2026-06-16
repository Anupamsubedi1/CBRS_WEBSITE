"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonateButton } from "@/components/shared/donate-button";

export function HeroContent() {
  const reduce = useReducedMotion();
  const entrance = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <div className="max-w-2xl">
      <motion.span
        {...entrance(0)}
        className="eyebrow inline-block text-accent-100"
      >
        About Us
      </motion.span>

      <motion.h1
        {...entrance(0.1)}
        className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        Working With and For{" "}
        <span className="text-accent-100">People with Disabilities</span>
      </motion.h1>

      <motion.p
        {...entrance(0.2)}
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
      >
        CBRS Nepal stands beside people with disabilities and marginalized
        communities, building inclusion, dignity and opportunity together.
      </motion.p>

      <motion.div {...entrance(0.3)} className="mt-9 flex flex-wrap gap-4">
        <DonateButton size="lg" />
        <Button href="/programs" variant="outline-white" size="lg">
          Explore Programs <ArrowRight />
        </Button>
      </motion.div>
    </div>
  );
}
