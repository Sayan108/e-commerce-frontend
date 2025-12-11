"use client";

import { ProductCard } from "@/components/products/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { loading, products } = useProducts();

  const { selectedCategory } = useSelector(
    (state: RootState) => state.categories
  );

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-muted rounded-md w-1/3 mb-2"></div>
          <div className="h-6 bg-muted rounded-md w-1/2 mb-8"></div>
          <div className="h-10 bg-muted rounded-md w-full mb-6"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {selectedCategory?.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse through our collection of{" "}
          {selectedCategory?.name.toLowerCase()}.
        </p>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
