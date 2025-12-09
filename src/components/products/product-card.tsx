"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/redux/types/product.types";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "@/lib/redux/slices/products.slice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    ((product.originalPrice - product.price) / product.originalPrice) * 100;

  const dispatch = useDispatch();

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
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageurl}
            alt={product.name}
            fill
            className="
              object-cover rounded-t-xl 
              transition-all duration-500 
              group-hover:scale-110 group-hover:brightness-90
            "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Hover Overlay Button */}
        <div
          className="
            absolute inset-0 flex items-center justify-center 
            bg-black/30 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
          "
        >
          <Button
            asChild
            className="
              bg-white text-black hover:bg-neutral-200 
              font-semibold shadow-md
            "
          >
            <Link
              href={`/products/${product.id}`}
              onClick={() => {
                console.log(product);
                dispatch(setCurrentProduct(product));
              }}
            >
              View Details
            </Link>
          </Button>
        </div>

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
        <Link
          href={`/products/${product.id}`}
          onClick={() => {
            dispatch(setCurrentProduct(product));
          }}
        >
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
        <Button
          onClick={() => {
            dispatch(setCurrentProduct(product));
          }}
          className="w-full rounded-lg py-5 font-semibold transition-all"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
