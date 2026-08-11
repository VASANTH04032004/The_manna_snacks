'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { getCategories } from '@/lib/categories';

interface CategoryFilterProps {
  products: Product[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ products, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = getCategories(products);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
      <FilterButton
        active={activeCategory === null}
        onClick={() => onCategoryChange(null)}
      >
        All
      </FilterButton>
      {categories.map((category) => (
        <FilterButton
          key={category}
          active={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </FilterButton>
      ))}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2.5 text-sm tracking-wide transition-colors duration-300"
      style={{
        fontFamily: 'var(--font-body)',
        color: active ? 'var(--color-charcoal)' : 'var(--color-charcoal-light)',
      }}
    >
      {active && (
        <motion.div
          layoutId="activeCategoryFilter"
          className="absolute inset-0 -z-10"
          style={{
            background: 'var(--color-gold)',
            opacity: 0.15,
            borderBottom: '2px solid var(--color-gold)',
          }}
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
