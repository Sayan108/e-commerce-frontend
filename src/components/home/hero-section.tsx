import Image from "next/image";
import Link from "next/link";
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
  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <div className="bg-black/50 p-6 md:p-10 rounded-lg shadow-2xl backdrop-blur-sm">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl font-headline">
                        {banner.title}
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
                        {banner.description}
                        </p>
                        <Button asChild size="lg" className="mt-6" variant="secondary">
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
