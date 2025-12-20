"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryHighlights } from "@/components/home/category-highlights";
import OurSpecialitiesSection from "@/components/home/our-specilities";
import { Testimonials } from "@/components/home/testimonials";
import { MarketingVideo } from "@/components/home/marketing-video";
import useDashboard from "@/hooks/useDashboard";

export default function Home() {
  const { loading, videos, banners } = useDashboard();

  return (
    <main className="flex flex-col">
      {/* HERO — full width on all screens */}
      <HeroSection bannerList={banners} loading={loading} />

      {/* CONTENT WRAPPER */}
      <div className="space-y-12 sm:space-y-16 md:space-y-24">
        {/* CATEGORIES */}
        <section className="container mx-auto px-3 sm:px-4">
          <CategoryHighlights />
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="container mx-auto px-3 sm:px-4">
          <FeaturedProducts />
        </section>

        {/* SPECIALITIES */}
        <section className="bg-muted/40 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <OurSpecialitiesSection />
          </div>
        </section>

        {/* MARKETING VIDEO */}
        <section className="container mx-auto px-3 sm:px-4">
          <MarketingVideo videos={videos} loading={loading} />
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-muted/40 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <Testimonials />
          </div>
        </section>
      </div>
    </main>
  );
}
