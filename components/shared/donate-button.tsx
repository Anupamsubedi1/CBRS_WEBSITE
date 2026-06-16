import Link from "next/link";
import { IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Donate CTA styled for a money-green pill with a white
 * circle holding a coin icon, bold uppercase label, and a 3D bottom edge.
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
        "cta-pulse inline-flex items-center rounded-full bg-[#27ae60] font-extrabold uppercase tracking-wide text-white",
        "shadow-[0_5px_0_0_#1b6f3b,0_14px_22px_-10px_rgba(39,174,96,0.85)]",
        "transition-colors duration-200 hover:bg-[#219150]",
        "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#27ae60]/45",
        pad,
        className,
      )}
    >
      <span className={cn("grid shrink-0 place-items-center rounded-full bg-white", circle)}>
        <IndianRupee className={cn("fill-[#27ae60] text-[#27ae60]", heart)} aria-hidden="true" />
      </span>
      {label}
    </Link>
  );
}
