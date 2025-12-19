"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import useCategory from "@/hooks/useCategory";

import OptimizedImage from "../shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";
import { useEffect } from "react";

export function CategoryHighlights() {
  const { categories, loading, fetchCategory, updateCurrentCategory } =
    useCategory();

  useEffect(() => {
    fetchCategory(true);
  }, []);

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm sm:text-lg text-muted-foreground">
          Explore our curated collections
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {/* LOADER */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <CardContent className="p-0">
                <div className="aspect-square sm:aspect-[4/5] bg-muted" />
                <div className="p-4 sm:p-6 space-y-2">
                  <div className="h-4 w-2/3 bg-muted rounded" />
                  <div className="h-3 w-1/3 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}

        {/* DATA */}
        {!loading &&
          categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              onClick={() => updateCurrentCategory(category)}
              className="group"
            >
              <Card className="relative overflow-hidden transition-all duration-300 md:group-hover:shadow-xl md:group-hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* IMAGE */}
                  <div className="relative aspect-square sm:aspect-[4/5] w-full">
                    <OptimizedImage
                      src={category.imageurl ?? productFallback}
                      alt={category.name}
                      fallback={productFallback}
                      className="object-cover md:group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-white font-headline leading-tight">
                      {category.name}
                    </h3>

                    <div className="mt-1 sm:mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90">
                      Shop Now
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </section>
  );
}
