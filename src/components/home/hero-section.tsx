"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Banner } from "@/lib/redux/types/dashboard.types";
import { ArrowRight } from "lucide-react";

/* ---------------- HERO SKELETON ---------------- */
export const HeroSkeleton = () => (
  <section className="relative w-full overflow-hidden">
    <div className="relative aspect-[16/7] w-full">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-16 lg:px-24 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- HERO SECTION ---------------- */
interface HeroProp {
  bannerList: Banner[];
  loading: boolean;
}

export function HeroSection({ bannerList, loading }: HeroProp) {
  const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  if (loading) return <HeroSkeleton />;

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerList.map((banner) => (
            <CarouselItem key={banner._id}>
              <Card className="border-none rounded-none">
                <CardContent className="relative aspect-[16/7] w-full p-0">
                  {banner.imageurl && (
                    <Image
                      src={banner.imageurl}
                      alt={banner.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  )}

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-xl px-6 md:px-16 lg:px-24">
                      <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
                        {banner.name}
                      </h1>

                      <p className="mt-4 max-w-lg text-base md:text-lg text-white/90">
                        {banner.description}
                      </p>

                      <div className="mt-6 space-y-4">
                        <ul className="flex flex-wrap gap-3 text-sm text-white/90">
                          <li className="rounded-full bg-white/10 px-3 py-1">
                            Free Shipping
                          </li>
                          <li className="rounded-full bg-white/10 px-3 py-1">
                            Easy Returns
                          </li>
                          <li className="rounded-full bg-white/10 px-3 py-1">
                            Secure Payments
                          </li>
                        </ul>

                        <div className="flex items-center gap-4">
                          <Button asChild size="lg" className="rounded-xl px-6">
                            <Link
                              href={banner.link}
                              className="flex items-center gap-2"
                            >
                              Shop now <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <span className="text-sm text-white/80">
                            Limited time offers available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* CONTROLS */}
        <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-between px-4">
          <CarouselPrevious className="pointer-events-auto" />
          <CarouselNext className="pointer-events-auto" />
        </div>
      </Carousel>
    </section>
  );
}
