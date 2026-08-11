'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCartStore } from '@/store';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import MagneticButton from '@/components/ui/MagneticButton';


const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
};

export default function ShopGrid() {
  const { addItem } = useCartStore();
  const { prefersReducedMotion } = useDeviceCapability();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  return (
    <motion.div
      variants={!prefersReducedMotion ? gridVariants : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={!prefersReducedMotion ? cardVariants : undefined}
          className="group flex flex-col"
        >
          <div className="relative aspect-[4/5] bg-[var(--color-cream-dark)] rounded-2xl overflow-hidden mb-4">
            {/* Fallback color/shape if images aren't present */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-wheat)] to-[var(--color-cream)] opacity-20"></div>
            
            <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 ease-out group-hover:scale-105">
              <div className="w-full h-full relative">
                {product.image ? (
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-charcoal-light)] rounded-xl opacity-20"></div>
                )}
              </div>
            </div>
            
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.slice(0, 1).map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-xs uppercase tracking-wider rounded-full font-medium shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col flex-1">
            <span className="text-xs uppercase tracking-widest text-[var(--color-charcoal)] opacity-60 mb-1">
              {product.category}
            </span>
            <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-[var(--color-charcoal)] opacity-70 mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-charcoal-light)]">
              <span className="font-medium text-lg text-[var(--color-charcoal)]">
                ₹{product.price.retail}
              </span>
              
              <MagneticButton
                onClick={() => handleAddToCart(product)}
                variant="custom"
                className={`h-10 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 font-medium text-xs tracking-wider uppercase ${
                  addedId === product.id
                    ? 'bg-[var(--color-olive)] text-[var(--color-cream)]'
                    : 'bg-[var(--color-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]'
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                {addedId === product.id ? (
                  <>
                    <svg className="w-4 h-4 text-[var(--color-cream)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add</span>
                  </>
                )}
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
