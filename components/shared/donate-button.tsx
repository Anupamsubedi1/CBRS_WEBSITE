import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Donate CTA styled to match the reference: a solid red pill with a white
 * circle holding a red heart, bold uppercase label, and a 3D bottom edge.
 * The `.cta-pulse` class gives it a gentle "pop" to draw the eye.
 */
export function DonateButton({
  href = "/donate",
  label = "Donate Now",
  size = "md",
  className,
}: {
  href?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pad =
    size === "lg"
      ? "py-2 pl-2 pr-7 text-lg gap-3"
      : size === "sm"
        ? "py-1 pl-1 pr-4 text-sm gap-2"
        : "py-1.5 pl-1.5 pr-6 text-base gap-2.5";
  const circle = size === "lg" ? "size-11" : size === "sm" ? "size-7" : "size-9";
  const heart = size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5";

  return (
    <Link
      href={href}
      className={cn(
        "cta-pulse inline-flex items-center rounded-full bg-[#e8232b] font-extrabold uppercase tracking-wide text-white",
        "shadow-[0_5px_0_0_#b31a20,0_14px_22px_-10px_rgba(232,35,43,0.85)]",
        "transition-colors duration-200 hover:bg-[#d31e26]",
        "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#e8232b]/45",
        pad,
        className,
      )}
    >
      <span className={cn("grid shrink-0 place-items-center rounded-full bg-white", circle)}>
        <Heart className={cn("fill-[#e8232b] text-[#e8232b]", heart)} aria-hidden="true" />
      </span>
      {label}
    </Link>
  );
}
