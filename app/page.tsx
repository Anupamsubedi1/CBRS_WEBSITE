import { Hero } from "@/components/home/hero";
import { AboutStrip } from "@/components/home/about-strip";
import { ThemesSection } from "@/components/home/themes-section";
import { FeaturedPrograms } from "@/components/home/featured-programs";
import { Highlights } from "@/components/home/highlights";
import { DonateBand } from "@/components/layout/donate-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutStrip />
      <ThemesSection />
      <FeaturedPrograms />
      <Highlights />
      <DonateBand />
    </>
  );
}
