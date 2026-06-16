import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data/site";

/**
 * CBRS brand lockup: the official circular logo beside the wordmark.
 * The JPEG's circle is inscribed in its square, so `rounded-full` + cover
 * cleanly clips the corners on both light and dark backgrounds.
 */
export function BrandLogo({
  className,
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
}) {
  const content = (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_4px_12px_-4px_rgba(0,93,170,0.6)] ring-1 ring-black/5">
        <Image
          src="/cbrs_logo.jpeg"
          alt="CBRS Nepal logo"
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-primary",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.12em]",
            tone === "light" ? "text-white/70" : "text-muted",
          )}
        >
          {site.fullName}
        </span>
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      aria-label={`${site.name} home page`}
      className="rounded-lg focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary"
    >
      {content}
    </Link>
  );
}
