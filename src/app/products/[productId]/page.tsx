'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { Star, Minus, Plus } from 'lucide-react';

export default function ProductPage({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(params.productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      notFound();
    }
  }, [params.productId]);
  
  if (!product) {
    return <div className="container mx-auto flex justify-center items-center h-96">Loading...</div>;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-square relative w-full rounded-lg overflow-hidden">
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={product.imageHint}
              />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'fill-muted-foreground/30 text-muted-foreground/30'}`} />
                ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
          </div>
          <p className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-foreground/80">{product.description}</p>
          
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
                  <Minus className="h-4 w-4"/>
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                  readOnly
                />
                 <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4"/>
                </Button>
              </div>
              <Button size="lg" onClick={() => addToCart(product, quantity)} className="flex-1">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
