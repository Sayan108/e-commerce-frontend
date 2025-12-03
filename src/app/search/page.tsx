'use client';

import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/lib/data';
import { ProductCard } from '@/components/products/product-card';
import { SearchX } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProducts(query);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Search Results</h1>
        {query && (
          <p className="mt-2 text-lg text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} for <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        )}
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <SearchX className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-muted-foreground">We couldn't find any products matching your search.</p>
        </div>
      )}
    </div>
  );
}
