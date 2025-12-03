'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg leading-snug hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'fill-muted-foreground/50 text-muted-foreground/50'}`} />
            ))}
          </div>
          <span>({product.reviews})</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
