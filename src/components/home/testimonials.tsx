'use client';
import React from 'react';
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star } from 'lucide-react';

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline">What Our Customers Say</h2>
          <p className="mt-2 text-lg text-muted-foreground">Thousands of happy customers can't be wrong.</p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <Avatar className="w-20 h-20 mb-4">
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      <p className="mb-4 italic text-foreground/80">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                      </div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
