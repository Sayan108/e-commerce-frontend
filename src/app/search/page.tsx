"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SearchX } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import useProducts from "@/hooks/useProducts";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { loading, products, moreLoading, fetchPaginatedProducts } =
    useProducts();

  /* ---------------- WINDOW SCROLL ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (loading || moreLoading) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 150;

      if (scrollPosition >= threshold) {
        fetchPaginatedProducts({ search: query });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, moreLoading, query, fetchPaginatedProducts]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Search Results
        </h1>

        {query && (
          <p className="mt-2 text-lg text-muted-foreground">
            {loading ? (
              <Skeleton className="h-5 w-16 inline-block" />
            ) : (
              products.length
            )}{" "}
            result{products.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        )}
      </header>

      {/* Initial loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showAddTocart={false}
              />
            ))}
          </div>

          {/* Load more skeletons */}
          {moreLoading && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <SearchX className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any products matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
