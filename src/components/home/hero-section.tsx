
'use client';
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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "../ui/card";

const heroBanners = [
  {
    id: "hero-1",
    title: "Summer Styles are Here",
    description: "Discover the latest trends and refresh your wardrobe.",
    buttonText: "Shop Now",
    buttonLink: "/categories",
    image: PlaceHolderImages.find(img => img.id === 'hero-1')
  },
  {
    id: "hero-2",
    title: "Accessorize Your Look",
    description: "Up to 30% off on watches, bags, and more.",
    buttonText: "Explore Accessories",
    buttonLink: "/categories",
    image: PlaceHolderImages.find(img => img.id === 'hero-2')
  },
  {
    id: "hero-3",
    title: "New Season, New Shoes",
    description: "Find your perfect pair for any occasion.",
    buttonText: "Discover Shoes",
    buttonLink: "/categories",
    image: PlaceHolderImages.find(img => img.id === 'hero-3')
  }
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );
  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroBanners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Card className="border-none rounded-none">
                <CardContent className="relative aspect-[2/1] w-full p-0">
                  {banner.image && (
                      <Image
                        src={banner.image.imageUrl}
                        alt={banner.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={banner.image.imageHint}
                        priority
                      />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white p-8 md:p-16 lg:p-24">
                    <div className="max-w-md animate-fade-in-up">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl font-headline">
                        {banner.title}
                        </h1>
                        <p className="mt-4 text-lg text-primary-foreground/90">
                        {banner.description}
                        </p>
                        <Button asChild size="lg" className="mt-8" variant="secondary">
                        <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
        </div>
      </Carousel>
    </section>
  );
}
