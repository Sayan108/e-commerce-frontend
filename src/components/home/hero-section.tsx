"use client";

import React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import OptimizedImage from "../shared/errorHandledImage";
import { Banner } from "@/lib/redux/types/dashboard.types";
import { productFallback } from "@/lib/utils/constants";

/* ---------------- SKELETON ---------------- */
export const HeroSkeleton = () => (
  <section className="relative w-full">
    <div className="relative aspect-[16/7] w-full">
      <Skeleton className="absolute inset-0" />
    </div>
  </section>
);

interface HeroProp {
  bannerList: Banner[];
  loading: boolean;
}

export function HeroSection({ bannerList, loading }: HeroProp) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  if (loading) return <HeroSkeleton />;

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {bannerList.map((banner, index) => (
            <CarouselItem key={banner._id ?? index}>
              <Card className="border-none rounded-none">
                <CardContent
                  className="
                    relative p-0 w-full
                    aspect-[4/5]
                    sm:aspect-[16/9]
                    lg:aspect-[16/7]
                  "
                >
                  {/* IMAGE */}
                  <OptimizedImage
                    src={banner.imageurl}
                    alt={banner.name}
                    fallback={productFallback}
                    className="object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className="
                        max-w-3xl
                        px-4 sm:px-10 lg:px-24
                        text-center sm:text-left
                      "
                    >
                      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white">
                        {banner.name}
                      </h1>

                      {banner.description && (
                        <p className="mt-4 max-w-xl text-base lg:text-lg text-white/90">
                          {banner.description}
                        </p>
                      )}

                      {/* FEATURES */}
                      {banner.subFeatures?.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-white/90">
                          {banner.subFeatures.map((feature, idx) => (
                            <li
                              key={idx}
                              className="rounded-full bg-white/10 px-3 py-1 backdrop-blur"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <div className="mt-7 flex justify-center sm:justify-start">
                        <Button asChild size="lg" className="rounded-xl px-7">
                          <Link
                            href={banner.link ?? "/"}
                            className="flex items-center gap-2"
                          >
                            {banner.ctaButtonTitle ?? "Shop Now"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ARROWS (DESKTOP ONLY) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-between px-6">
          <CarouselPrevious className="pointer-events-auto bg-white/80 hover:bg-white" />
          <CarouselNext className="pointer-events-auto bg-white/80 hover:bg-white" />
        </div>
      </Carousel>
    </section>
  );
}
