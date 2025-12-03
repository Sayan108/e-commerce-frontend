'use client';
import { notFound } from 'next/navigation';
import { getCategoryById, getProductsByCategory } from '@/lib/data';
import { ProductCard } from '@/components/products/product-card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ProductCardSkeleton } from '@/components/products/product-card-skeleton';
import { useState, useEffect } from 'react';
import type { Category, Product } from '@/lib/types';


export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const [category, setCategory] = useState<Category | null | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const categoryData = getCategoryById(params.categoryId);
    setCategory(categoryData);
    if(categoryData){
      const productsData = getProductsByCategory(params.categoryId);
      setAllProducts(productsData);
    }
    setIsLoading(false);
  }, [params.categoryId]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="animate-pulse">
            <div className="h-10 bg-muted rounded-md w-1/3 mb-2"></div>
            <div className="h-6 bg-muted rounded-md w-1/2 mb-8"></div>
            <div className="h-10 bg-muted rounded-md w-full mb-6"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
      </div>
    );
  }
  
  if (!category) {
    notFound();
  }
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">{category.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">Browse through our collection of {category.name.toLowerCase()}.</p>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {category.subcategories.map(sub => (
            <TabsTrigger key={sub.id} value={sub.id}>{sub.name}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        {category.subcategories.map(sub => (
          <TabsContent key={sub.id} value={sub.id}>
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProducts.filter(p => p.subcategoryId === sub.id).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
