import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";
// src/components/ui/skeleton-loader.tsx
export const SkeletonLoader = () => (
  <div className="flex flex-col p-4 space-y-4 bg-gray-200 animate-pulse rounded-lg shadow-md">
    {/* Product Image Skeleton */}
    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>

    {/* Product Title Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>

    {/* Product Description Skeleton */}
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>

    {/* Price Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
  </div>
);

export function FeaturedProducts() {
  const { products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts({});
  }, []);

  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Featured Products
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Hand-picked just for you
        </p>
      </div>

      {/* Show Skeleton Loader while loading */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showAddTocart={false}
            />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/categories">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
