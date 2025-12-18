"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/redux/types/product.types";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

  const { addToCart, loading } = useCart();

  const { currentProduct } = useProducts();

  return (
    <Card
      className="
        group relative overflow-hidden rounded-xl border 
        shadow-sm hover:shadow-xl transition-all duration-300 
        hover:-translate-y-1 bg-white dark:bg-neutral-900
      "
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <OptimizedImage
            src={product.imageurl ?? productFallback}
            alt={product.name}
            fallback={productFallback}
            className="
              object-cover rounded-t-xl 
              transition-all duration-500 
              group-hover:scale-110 group-hover:brightness-90
            "
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span
            className="
              absolute top-3 left-3 px-3 py-1 text-xs font-bold 
              bg-red-600 text-white rounded-full shadow 
              animate-fade-in
            "
          >
            {Math.round(discount)}% OFF
          </span>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col gap-3">
        <Link href={`/products/${product._id}`}>
          <h3
            className="
              text-lg font-semibold leading-tight 
              hover:text-primary transition-colors line-clamp-2
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <p className="text-xl font-bold text-foreground">
            ₹{product.price.toFixed(2)}
          </p>

          {product.originalPrice > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* Add to cart */}

        {showAddTocart && (
          <Button
            onClick={() => {
              addToCart(1);
            }}
            className="w-full rounded-lg py-5 font-semibold transition-all"
          >
            {loading && product?._id === currentProduct?._id ? (
              <Loader />
            ) : (
              "Add to cart"
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
