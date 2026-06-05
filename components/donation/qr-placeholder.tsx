import { cn } from "@/lib/utils";

/**
 * Decorative QR-style emblem used until the organisation uploads its real
 * donation QR (admin-managed). Deterministic so it renders identically each
 * time. Replace with <Image src={qrUrl} .../> once a real QR is available.
 */
export function QrPlaceholder({ className }: { className?: string }) {
  const size = 21; // modules per side
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    // Pseudo-random but stable module pattern.
    cells.push(((i * 73 + ((i / size) | 0) * 17) % 5) % 2 === 0);
  }

  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };

  return (
    <div
      className={cn(
        "grid aspect-square w-full place-items-center rounded-2xl bg-white p-4 shadow-inner ring-1 ring-border",
        className,
      )}
      role="img"
      aria-label="Donation QR code placeholder — scan with your mobile wallet"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full" shapeRendering="crispEdges">
        <rect width={size} height={size} fill="#fff" />
        {cells.map((on, i) => {
          const r = (i / size) | 0;
          const c = i % size;
          if (isFinder(r, c)) return null;
          return on ? (
            <rect key={i} x={c} y={r} width={1} height={1} fill="#002b52" />
          ) : null;
        })}
        {/* Finder patterns */}
        {[
          [0, 0],
          [0, size - 7],
          [size - 7, 0],
        ].map(([y, x], k) => (
          <g key={k}>
            <rect x={x} y={y} width={7} height={7} fill="#005daa" />
            <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
            <rect x={x + 2} y={y + 2} width={3} height={3} fill="#00a99d" />
          </g>
        ))}
      </svg>
    </div>
  );
}
