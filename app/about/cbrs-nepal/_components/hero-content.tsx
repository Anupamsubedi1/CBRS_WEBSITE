"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0 }}
        className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md"
      >
        ABOUT US
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        Working With and For{" "}
        <span className="text-accent">People with Disabilities</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
      >
        Since 2005, CBRS Nepal has stood beside people with disabilities and
        marginalized communities — building inclusion, dignity and opportunity
        together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-9 flex flex-wrap gap-4"
      >
        <Button
          href="/donate"
          className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
        >
          <Heart className="size-5 fill-current" /> Donate Now
        </Button>
        <Button
          href="/programs"
          className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
        >
          Explore Programs <ArrowRight className="size-5" />
        </Button>
      </motion.div>
    </div>
  );
}