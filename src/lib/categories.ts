import { Product } from "@/types/product";

/**
 * Extracts unique categories from products — the ONLY place
 * category knowledge comes from. No hardcoded list.
 */
export function getCategories(products: Product[]): string[] {
  const unique = [...new Set(products.map((p) => p.category))];
  return unique.sort();
}

/**
 * Filters products by category. If category is null/undefined/"all",
 * returns all products.
 */
export function filterByCategory(
  products: Product[],
  category?: string | null
): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

/**
 * Gets featured products.
 */
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((p) => p.featured);
}

/**
 * Finds a product by slug.
 */
export function getProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug);
}
