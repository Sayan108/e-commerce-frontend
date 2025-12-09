"use client";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryHighlights } from "@/components/home/category-highlights";
import { Testimonials } from "@/components/home/testimonials";
import { MarketingVideo } from "@/components/home/marketing-video";
import useDashboard from "@/hooks/useDashboard";

export default function Home() {
  const { loading, videos, banners } = useDashboard();
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HeroSection bannerList={banners} loading={loading} />
      <CategoryHighlights />
      <FeaturedProducts />
      <MarketingVideo />
      <Testimonials />
    </div>
  );
}
