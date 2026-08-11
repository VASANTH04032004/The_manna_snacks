'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '@/types/product';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useDeviceCapability();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      className="group"
    >
      <Link
        href={`/retail#${product.id}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="block relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-cream-dark)]"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full"
        >
          {/* Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
            <Image
              src={product.image || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Dynamic soft shadow overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
            style={{
              backgroundPosition: useTransform(mouseXSpring, [-0.5, 0.5], ['0% 0%', '100% 100%']),
            }}
          />

          {/* Badges/Category */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider rounded-full">
              {product.category}
            </span>
          </div>

          {/* Hover Reveal Panel */}
          <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-sm">
            <h3 className="text-[var(--color-cream)] font-display text-2xl mb-1">{product.name}</h3>
            <p className="text-[var(--color-cream)]/80 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-gold)] font-medium">₹{product.price.retail}</span>
              <span className="text-[var(--color-cream)] text-xs uppercase tracking-widest border-b border-[var(--color-gold)] pb-0.5">View Details</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
