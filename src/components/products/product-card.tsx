"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/redux/types/product.types";
import { useCart } from "@/hooks/useCart";
import { Loader } from "lucide-react";
import useProducts from "@/hooks/useProducts";
import OptimizedImage from "../shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";

interface ProductCardProps {
  product: Product;
  showAddTocart?: boolean;
}

export function ProductCard({
  product,
  showAddTocart = true,
}: ProductCardProps) {
  const discount =
    ((product.originalPrice - product.price) / product.originalPrice) * 100;

  const { addToCart, loading } = useCart();
  const { currentProduct } = useProducts();

  return (
    <Card
      className="
        group relative overflow-hidden rounded-lg border
        bg-white dark:bg-neutral-900
        transition-all duration-300
        md:hover:shadow-xl md:hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <OptimizedImage
            src={product.imageurl ?? productFallback}
            alt={product.name}
            fallback={productFallback}
            className="
              object-cover
              transition-transform duration-300
              md:group-hover:scale-110
            "
          />
        </Link>

        {/* DISCOUNT */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
            {Math.round(discount)}% OFF
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1.5 md:gap-3">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <p className="text-base sm:text-lg md:text-xl font-bold">
            ₹{product.price.toFixed(2)}
          </p>

          {product.originalPrice > product.price && (
            <p className="text-xs sm:text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* BUTTON */}
        {showAddTocart && (
          <Button
            onClick={() => addToCart(1)}
            className="
              mt-1 w-full rounded-md
              py-2 text-xs sm:text-sm
              md:py-3 md:text-base
            "
          >
            {loading && product?._id === currentProduct?._id ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Add to cart"
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
