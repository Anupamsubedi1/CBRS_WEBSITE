"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Media } from "@/components/shared/media";
import type { HomeSuccessStory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SuccessStories({ stories: successStories }: { stories: HomeSuccessStory[] }) {
  const [index, setIndex] = React.useState(0);
  const reduce = useReducedMotion();
  const count = successStories.length;

  const go = React.useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-advance, paused for reduced-motion users.
  React.useEffect(() => {
    if (reduce || count === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [reduce, count]);

  if (count === 0) return null;

  const story = successStories[index];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Success Stories</h3>
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-5 flex-1 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <Quote className="size-8 text-accent/30" aria-hidden="true" />
        <div className="relative mt-2 min-h-[9.5rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={story.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.975rem] leading-relaxed text-foreground">
                “{story.quote}”
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <Media
                  src={story.photo?.url}
                  alt={`Portrait of ${story.name}`}
                  seed={story.id}
                  ratio="aspect-square"
                  rounded="rounded-full"
                  className="size-12 shrink-0"
                />
                <div>
                  <cite className="block text-sm font-semibold not-italic text-foreground">
                    {story.name}
                  </cite>
                  <span className="text-xs text-muted">{story.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-1.5" role="tablist" aria-label="Choose a story">
            {successStories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Story ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted/50",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
