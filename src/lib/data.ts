import { faker } from '@faker-js/faker';
import type { Product, Category, SubCategory, Testimonial } from './types';

// Set a seed to ensure consistent data generation across server and client
faker.seed(123);

const generateProducts = (category: {id: string, name: string}, subcategory: {id: string, name: string}, count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => {
    const productName = faker.commerce.productName();
    const productId = faker.string.uuid();
    return {
      id: productId,
      name: productName,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      imageUrl: `https://picsum.photos/seed/${productId}/600/600`,
      imageHint: "product " + i,
      category: category.name,
      categoryId: category.id,
      subcategory: subcategory.name,
      subcategoryId: subcategory.id,
      rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
      reviews: faker.number.int({ min: 10, max: 500 }),
    };
  });
};

const generateSubcategoriesAndProducts = (category: {id: string, name: string}) => {
  const subcategories: SubCategory[] = [];
  let products: Product[] = [];
  const subcategoryCount = faker.number.int({ min: 4, max: 6 });

  for (let i = 0; i < subcategoryCount; i++) {
    const subcategoryName = faker.commerce.department();
    const subcategoryId = faker.string.uuid();
    const productCount = faker.number.int({ min: 10, max: 20 });
    const newProducts = generateProducts(category, { id: subcategoryId, name: subcategoryName }, productCount);
    products = products.concat(newProducts);
    subcategories.push({ id: subcategoryId, name: subcategoryName, productCount });
  }

  return { subcategories, products };
};

const generateAllData = () => {
  let allProducts: Product[] = [];
  const categories: Category[] = [];
  const categoryCount = 50;

  for (let i = 0; i < categoryCount; i++) {
    const categoryName = faker.commerce.department();
    const categoryId = faker.string.uuid();
    const { subcategories, products } = generateSubcategoriesAndProducts({ id: categoryId, name: categoryName });
    allProducts = allProducts.concat(products);
    categories.push({
      id: categoryId,
      name: categoryName,
      subcategories,
      productCount: products.length,
      imageUrl: `https://picsum.photos/seed/${categoryId}/400/500`,
      imageHint: `category ${i}`,
    });
  }
  
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
    // simple shuffle and slice for variety on each load if this function was re-run
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
}
