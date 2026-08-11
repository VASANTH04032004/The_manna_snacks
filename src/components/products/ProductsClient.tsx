'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { filterByCategory } from '@/lib/categories';
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import KineticText from '@/components/ui/KineticText';
import { motion, LayoutGroup } from 'framer-motion';

interface ProductsClientProps {
  products: Product[];
}

export function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory
    ? filterByCategory(products, activeCategory)
    : products;

  return (
    <div className="section-spacing">
      <div className="container-editorial mb-16">
        <p className="label label-gold mb-6">Our Collection</p>
        <KineticText
          text="Our Products"
          tag="h1"
          className="mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg opacity-60 max-w-xl"
        >
          Discover our range of authentic, traditional snacks made with the finest ingredients and time-honored recipes.
        </motion.p>
      </div>

      <div className="container-editorial">
        <LayoutGroup>
          <CategoryFilter
            products={products}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ProductGrid products={filteredProducts} />
        </LayoutGroup>
      </div>
    </div>
  );
}
