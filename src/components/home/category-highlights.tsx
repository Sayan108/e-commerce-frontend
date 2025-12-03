import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function CategoryHighlights() {
  const highlightedCategories = categories.slice(0, 3);

  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Shop by Category</h2>
        <p className="mt-2 text-lg text-muted-foreground">Explore our curated collections</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {highlightedCategories.map(category => (
          <Link href={`/categories/${category.id}`} key={category.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={category.imageHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white font-headline">{category.name}</h3>
                   <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                    Shop Now <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
