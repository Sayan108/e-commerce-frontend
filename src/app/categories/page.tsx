import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">All Categories</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find what you're looking for from our wide selection of categories.</p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map(category => (
          <Link href={`/categories/${category.id}`} key={category.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                    data-ai-hint={category.imageHint}
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-foreground font-headline group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Shop Now <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
