import Image from "next/image";
import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { bankQr } from "@/lib/data/donation";

/**
 * Bank-account QR card for the right side of page banners. Reads the single
 * admin-managed source in `lib/data/donation.ts`; shows a branded placeholder
 * until a real QR image is uploaded, so banners never break.
 */
export function BankQR({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-44 shrink-0 rounded-2xl bg-white p-3 text-center shadow-float",
        className,
      )}
    >
      <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl bg-primary-50">
        {bankQr.image ? (
          <Image
            src={bankQr.image}
            alt="CBRS Nepal bank account QR code for donations"
            fill
            sizes="176px"
            className="object-contain"
          />
        ) : (
          <QrCode className="size-20 text-primary/30" aria-hidden="true" />
        )}
      </div>
      <p className="mt-2.5 text-sm font-bold text-foreground">{bankQr.caption}</p>
      <p className="text-xs text-muted">{bankQr.accountName}</p>
    </div>
  );
}
