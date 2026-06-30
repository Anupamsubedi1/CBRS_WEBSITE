import Image from "next/image";
import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDonationContent } from "@/lib/donation";

/**
 * Bank-account QR card for the right side of page banners. Reads the single
 * admin-managed Donation document; shows a branded placeholder until a real QR
 * image is uploaded, so banners never break.
 */
export async function BankQR({ className }: { className?: string }) {
  const { bankQr } = await getDonationContent();

  return (
    <div
      className={cn(
        "w-52 shrink-0 rounded-2xl bg-white p-3 text-center shadow-float sm:w-60",
        className,
      )}
    >
      <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl bg-primary-50">
        {bankQr.image ? (
          <Image
            src={bankQr.image.url}
            alt="CBRS Nepal bank account QR code for donations"
            fill
            sizes="(min-width: 1024px) 176px, (min-width: 640px) 256px, 100vw"
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
