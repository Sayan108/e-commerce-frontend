"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { useCart } from "@/hooks/useCart";

const ProductPageSkeleton = () => (
  <div className="container mx-auto max-w-7xl px-4 py-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  </div>
);

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { currentProduct: product } = useSelector(
    (state: RootState) => state.products
  );

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!product) return <ProductPageSkeleton />;

  // --- Handlers ---
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const addToCartHandler = () => {
    addToCart(quantity); // dispatch(addToCartSaga({...}))
  };

  const buyNowHandler = () => {
    console.log("buy now clicked");
    // redirect to checkout
  };

  return (
    <div className="relative min-h-screen pb-32">
      <div className="container mx-auto max-w-7xl px-4 py-8 pb-40">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* ✨ Product Image */}
          <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-sm">
            <Image
              src={product.imageurl || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ✨ Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">
              {product.name}
            </h1>

            {/* ⭐ Ratings */}
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(4)
                        ? "fill-primary text-primary"
                        : "fill-muted-foreground/30 text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">
                (10 reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-4 text-3xl font-bold">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="mt-6 text-foreground/80 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="font-medium mb-2 block text-sm">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ Sticky Add to Cart + Buy Now */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t shadow-lg p-4 z-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 h-12 text-base rounded-xl"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 h-12 text-base rounded-xl"
              onClick={buyNowHandler}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
