"use client";

import { ProductCard } from "@/components/products/product-card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";

import { useParams } from "next/navigation";

export default function CategoryPage() {
  const {
    loading,
    products,
    fetchProductByCategory,
    fetchPaginatedProducts,
    moreLoading,
  } = useProducts();

  const params = useParams<any>();
  const { selectedCategory } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    fetchProductByCategory(params.categoryId);
  }, [params.categoryId]);

  // ---------------- WINDOW SCROLL ----------------
  useEffect(() => {
    const handleScroll = () => {
      if (loading || moreLoading) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 250;

      if (scrollPosition >= threshold) {
        fetchPaginatedProducts({ categoryId: params.categoryId });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, moreLoading, params.categoryId, fetchPaginatedProducts]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded-md w-1/3 mb-2"></div>
            <div className="h-6 bg-muted rounded-md w-1/2 mb-8"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold tracking-tight font-headline">
              {selectedCategory?.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse through our collection of{" "}
              {selectedCategory?.name.toLowerCase()}.
            </p>
          </>
        )}
      </header>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showAddTocart={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Loading more */}
      {moreLoading && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
