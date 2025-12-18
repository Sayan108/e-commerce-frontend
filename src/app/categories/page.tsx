"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import useCategory from "@/hooks/useCategory";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "@/lib/redux/slices/categories.slice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/redux/types/category.types";
import useProducts from "@/hooks/useProducts";
import OptimizedImage from "@/components/shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";

export default function CategoriesPage() {
  const { categories, loading } = useCategory();

  const router = useRouter();

  const handleClick = (category: Category) => {
    router.push(`/categories/${category._id}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* HEADER */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          All Categories
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Find what you're looking for from our wide selection of categories.
        </p>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <CardContent className="p-0">
                  <div className="bg-muted aspect-[4/3]" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))
          : categories.map((category) => (
              <Card
                key={category._id}
                className="group overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-2xl"
                onClick={() => handleClick(category)}
              >
                <CardContent className="p-0 flex flex-col h-full cursor-pointer">
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <OptimizedImage
                      src={category.imageurl}
                      alt={category.name}
                      fallback={productFallback}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />

                    {/* TITLE ON IMAGE */}
                    <h3 className="absolute bottom-3 left-3 right-3 text-white text-sm md:text-base font-semibold leading-tight">
                      {category.name}
                    </h3>
                  </div>

                  {/* FOOTER */}
                  <div className="p-4 mt-auto">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition"
                    >
                      Shop Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && categories.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No categories found.
        </p>
      )}
    </div>
  );
}
