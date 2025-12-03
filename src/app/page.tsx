import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryHighlights } from "@/components/home/category-highlights";
import { Testimonials } from "@/components/home/testimonials";
import { MarketingVideo } from "@/components/home/marketing-video";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HeroSection />
      <CategoryHighlights />
      <FeaturedProducts />
      <MarketingVideo />
      <Testimonials />
    </div>
  );
}
