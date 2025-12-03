import { notFound } from 'next/navigation';
import { getCategoryById, getProductsByCategory } from '@/lib/data';
import { ProductCard } from '@/components/products/product-card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const category = getCategoryById(params.categoryId);
  
  if (!category) {
    notFound();
  }
  
  const allProducts = getProductsByCategory(params.categoryId);

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
