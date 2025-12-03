import { faker } from '@faker-js/faker';
import type { Product, Category, SubCategory, Testimonial } from './types';
import { PlaceHolderImages } from './placeholder-images';

faker.seed(123);

const productData: Omit<Product, 'id' | 'description' | 'category' | 'categoryId' | 'subcategory' | 'subcategoryId' | 'rating' | 'reviews'>[] = [
    { name: 'Classic Leather Tote', price: 150.00, originalPrice: 200.00, discount: '25% off', imageId: 'product-tote' },
    { name: 'Silk Neck Scarf', price: 35.00, originalPrice: 50.00, discount: '30% off', imageId: 'product-scarf' },
    { name: 'Vintage Denim Jacket', price: 85.00, originalPrice: 120.00, discount: '29% off', imageId: 'product-denim-jacket' },
    { name: 'Leather Ankle Boots', price: 120.00, originalPrice: 180.00, discount: '33% off', imageId: 'product-boots' },
    { name: 'Striped Cotton Shirt', price: 45.00, originalPrice: 60.00, discount: '25% off', imageId: 'product-shirt' },
    { name: 'High-Waisted Trousers', price: 70.00, originalPrice: 100.00, discount: '30% off', imageId: 'product-trousers' },
    { name: 'Knit Beanie Hat', price: 25.00, originalPrice: 35.00, discount: '28% off', imageId: 'product-beanie' },
    { name: 'Aviator Sunglasses', price: 80.00, originalPrice: 110.00, discount: '27% off', imageId: 'product-sunglasses' },
    { name: 'Suede Loafers', price: 90.00, originalPrice: 130.00, discount: '31% off', imageId: 'product-loafers' },
    { name: 'Plaid Wool Blazer', price: 180.00, originalPrice: 250.00, discount: '28% off', imageId: 'product-blazer' },
    { name: 'White Canvas Sneakers', price: 60.00, originalPrice: 80.00, discount: '25% off', imageId: 'product-sneakers' },
    { name: 'Slim Fit Chinos', price: 65.00, originalPrice: 90.00, discount: '28% off', imageId: 'product-chinos' },
    { name: 'Floral Maxi Dress', price: 110.00, originalPrice: 160.00, discount: '31% off', imageId: 'product-maxi-dress' },
    { name: 'Crossbody Leather Bag', price: 95.00, originalPrice: 140.00, discount: '32% off', imageId: 'product-crossbody' },
    { name: 'Cashmere V-Neck Sweater', price: 200.00, originalPrice: 280.00, discount: '29% off', imageId: 'product-sweater' },
    { name: 'Sporty Running Shoes', price: 130.00, originalPrice: 170.00, discount: '24% off', imageId: 'product-running-shoes' },
    { name: 'Elegant Wristwatch', price: 250.00, originalPrice: 350.00, discount: '29% off', imageId: 'product-watch' },
    { name: 'Trench Coat', price: 220.00, originalPrice: 300.00, discount: '27% off', imageId: 'product-trench-coat' },
    { name: 'Formal Black Shoes', price: 140.00, originalPrice: 200.00, discount: '30% off', imageId: 'product-formal-shoes' },
    { name: 'Gold Hoop Earrings', price: 50.00, originalPrice: 75.00, discount: '33% off', imageId: 'product-earrings' },
];


const generateProducts = (category: {id: string, name: string}, subcategory: {id: string, name: string}, count: number): Product[] => {
  const productSlice = productData.slice(0, count);
  
  return productSlice.map((p, i) => {
    const productImage = PlaceHolderImages.find(img => img.id === p.imageId);
    if (!productImage) throw new Error(`Image not found for id: ${p.imageId}`);

    return {
      ...p,
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: productImage.imageUrl,
      imageHint: productImage.imageHint,
      category: category.name,
      categoryId: category.id,
      subcategory: subcategory.name,
      subcategoryId: subcategory.id,
      rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
      reviews: faker.number.int({ min: 10, max: 500 }),
    };
  });
};

// Shuffle product data for variety in categories
const shuffledProductData = [...productData].sort(() => 0.5 - Math.random());

const generateAllData = () => {
  let allProducts: Product[] = [];
  const categories: Category[] = [];
  const categoryNames = ['Womenswear', 'Menswear', 'Kids', 'Accessories', 'Footwear'];
  
  let productIndex = 0;

  categoryNames.forEach(categoryName => {
    const categoryId = faker.string.uuid();
    const subcategories: SubCategory[] = [];
    let categoryProducts: Product[] = [];
    const subcategoryCount = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < subcategoryCount; i++) {
        if (productIndex >= shuffledProductData.length) break;

        const subcategoryName = faker.commerce.department();
        const subcategoryId = faker.string.uuid();
        const productCountForSub = faker.number.int({ min: 2, max: 4 });
        
        const productsForSub: Product[] = [];
        for (let j = 0; j < productCountForSub; j++) {
            if (productIndex >= shuffledProductData.length) break;
            
            const pData = shuffledProductData[productIndex];
            const productImage = PlaceHolderImages.find(img => img.id === pData.imageId);
            if (!productImage) {
                console.error(`Image not found for id: ${pData.imageId}`);
                productIndex++;
                continue;
            };

            productsForSub.push({
                ...pData,
                id: faker.string.uuid(),
                description: faker.commerce.productDescription(),
                imageUrl: productImage.imageUrl,
                imageHint: productImage.imageHint,
                category: categoryName,
                categoryId: categoryId,
                subcategory: subcategoryName,
                subcategoryId: subcategoryId,
                rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
                reviews: faker.number.int({ min: 10, max: 500 }),
            });
            productIndex++;
        }

        if (productsForSub.length > 0) {
            categoryProducts = categoryProducts.concat(productsForSub);
            subcategories.push({ id: subcategoryId, name: subcategoryName, productCount: productsForSub.length });
        }
    }
    
    if (categoryProducts.length > 0) {
        allProducts = allProducts.concat(categoryProducts);
        const categoryImage = PlaceHolderImages[faker.number.int({ min: 0, max: PlaceHolderImages.length - 1 })];
        categories.push({
            id: categoryId,
            name: categoryName,
            subcategories,
            productCount: categoryProducts.length,
            imageUrl: categoryImage.imageUrl,
            imageHint: categoryImage.imageHint,
        });
    }
  });
  
  const testimonials: Testimonial[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatarUrl: `https://picsum.photos/seed/${faker.string.uuid()}/100/100`,
    quote: faker.lorem.sentence(),
    city: faker.location.city(),
  }));


  return { products: allProducts, categories, testimonials };
};


const allData = generateAllData();

export const products: Product[] = allData.products;
export const categories: Category[] = allData.categories;
export const testimonials: Testimonial[] = allData.testimonials;

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);
export const getProductsByCategory = (categoryId: string): Product[] => products.filter(p => p.categoryId === categoryId);
export const getProductsBySubcategory = (subcategoryId: string): Product[] => products.filter(p => p.subcategoryId === subcategoryId);
export const getCategoryById = (id: string): Category | undefined => categories.find(c => c.id === id);
export const getFeaturedProducts = (count: number = 8): Product[] => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
}
export const searchProducts = (query: string): Product[] => {
    if (!query) {
      return [];
    }
  
    const lowercasedQuery = query.toLowerCase();
    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery) ||
        product.subcategory.toLowerCase().includes(lowercasedQuery)
      );
    });
};
