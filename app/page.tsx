import { Hero } from "@/components/home/hero";
import { AboutStrip } from "@/components/home/about-strip";
import { ThemesSection } from "@/components/home/themes-section";
import { ImpactBand } from "@/components/home/impact-band";
import { FeaturedPrograms } from "@/components/home/featured-programs";
import { Highlights } from "@/components/home/highlights";
import { DonateBand } from "@/components/layout/donate-band";
import { getHomeContent } from "@/lib/home-content";
import { getPrograms } from "@/lib/programs";
import { getLatestGalleryItems } from "@/lib/gallery";

export default async function HomePage() {
  const [content, programs, galleryItems] = await Promise.all([
    getHomeContent(),
    getPrograms(),
    getLatestGalleryItems(6),
  ]);
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Hero content={content.hero} />
      <AboutStrip content={content.about} />
      <ThemesSection content={content.themesSection} />
      <ImpactBand content={content.impact} />
      <FeaturedPrograms content={content.featuredPrograms} programs={featuredPrograms} />
      <Highlights successStories={content.successStories} galleryItems={galleryItems} />
      <DonateBand content={content.donateBand} />
    </>
  );
}
