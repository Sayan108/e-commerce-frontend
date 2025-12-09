import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";

export function FeaturedProducts() {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/categories">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
