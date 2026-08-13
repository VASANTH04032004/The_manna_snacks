'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  return (
    <motion.div layout className="min-h-[50vh]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full h-full"
            >
              <ProductCard product={product} onSelect={onSelectProduct} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {products.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <p className="text-xl text-[var(--color-charcoal-light)] font-display mb-4">No products found in this category.</p>
          <p className="text-sm text-[var(--color-charcoal-light)]">Try selecting another category or view all products.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
