import { Sparkles } from "lucide-react";

/**
 * Home-only scrolling marquee — a thin brand band of the values that drive
 * CBRS Nepal's work. Pure CSS (no JS): two identical lists translate together
 * via `.animate-ticker` for a seamless loop. Auto-pauses under reduced-motion.
 */
const phrases = [
  "Rehabilitation Services",
  "Inclusive Education",
  "Livelihood Development",
  "Rights & Advocacy",
  "Community Empowerment",
  "Dignity for Every Person",
  "Accessibility & Inclusion",
];

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {phrases.map((phrase) => (
        <li key={phrase} className="flex shrink-0 items-center gap-10 sm:gap-14">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-base">
            {phrase}
          </span>
          <Sparkles className="size-4 shrink-0 text-accent-100" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ className }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden border-y border-white/15 bg-primary/90 py-3.5 backdrop-blur-sm ${className ?? ""}`}
      aria-label="What CBRS Nepal stands for"
    >
      {/* Two identical rows; the wrapper scrolls -50% (exactly one row width) for a
          seamless, jump-free loop. */}
      <div className="flex w-max animate-ticker">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
