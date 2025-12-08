"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl group border rounded-lg">
      <CardContent className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.imageHint}
            />
          </div>
        </Link>
      </CardContent>
      <div className="flex-grow p-4 bg-background flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-base font-semibold leading-tight hover:text-primary transition-colors mb-1 truncate">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
              {product.discount}
            </p>
          </div>
        </div>
        <Button onClick={() => {}} className="w-full">
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
