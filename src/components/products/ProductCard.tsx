'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '@/types/product';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useDeviceCapability();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      className="group cursor-pointer"
      onClick={() => onSelect && onSelect(product)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="block relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--color-cream-dark)] shadow-md transition-shadow hover:shadow-2xl"
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
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
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
            className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
            style={{
              backgroundPosition: useTransform(mouseXSpring, [-0.5, 0.5], ['0% 0%', '100% 100%']),
            }}
          />

          {/* Badges/Category */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Hover Reveal Panel */}
          <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] group-hover:backdrop-blur-sm">
            <h3 className="text-[var(--color-cream)] font-display text-2xl mb-1">{product.name}</h3>
            <p className="text-[var(--color-cream)]/80 text-xs mb-3 line-clamp-2">{product.shortDescription || product.description}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[var(--color-gold)] font-semibold text-lg">₹{product.price.retail}</span>
              <span className="px-3 py-1 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                <span>Select KG / WhatsApp</span>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.058-2.129-.533-1.488-.616-2.457-2.115-2.53-2.213-.075-.098-.606-.807-.606-1.541 0-.734.385-1.096.522-1.246.137-.15.299-.187.399-.187.1 0 .199.002.285.007.091.004.212-.034.331.252.124.298.423 1.034.46 1.11.038.075.062.164.013.264-.05.099-.075.162-.149.25-.075.088-.158.196-.226.264-.075.075-.153.157-.066.307.087.149.387.639.83 1.034.57.509 1.05.666 1.2.741.149.075.237.062.325-.038.087-.1.374-.436.474-.585.099-.149.199-.124.336-.075.137.05.872.411 1.021.486.149.075.249.112.286.175.037.062.037.362-.107.767z" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
