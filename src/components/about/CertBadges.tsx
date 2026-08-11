'use client';

import { motion, Variants } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

const badges = [
  { id: 'fssai', name: 'FSSAI Certified', desc: 'Compliant with national food safety standards' },
  { id: 'hygiene', name: 'Hygienic Crafting', desc: 'Prepared in modern sanitary facilities' },
  { id: 'iso', name: 'ISO Standards', desc: 'Systematic food quality management' },
  { id: 'traditional', name: 'Authentic Heritage', desc: 'Time-tested recipes & pure ingredients' }
];

export function CertBadges() {
  const { prefersReducedMotion } = useDeviceCapability();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 50,
        duration: 0.8
      }
    }
  };

  return (
    <div className="section-spacing border-t border-[var(--color-charcoal-light)]">
      <div className="text-center mb-12">
        <h3 className="text-sm uppercase tracking-widest text-[var(--color-charcoal)] opacity-70 mb-2">Our Quality Commitment</h3>
        <h2 className="font-display text-3xl md:text-4xl text-[var(--color-charcoal)]">Certifications &amp; Standards</h2>
      </div>
      
      <motion.div 
        variants={!prefersReducedMotion ? container : undefined}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        style={{ perspective: 1000 }}
      >
        {badges.map((badge) => (
          <motion.div 
            key={badge.id}
            variants={!prefersReducedMotion ? item : undefined}
            className="flex flex-col items-center text-center p-6 bg-[var(--color-cream-dark)] rounded-2xl md:rounded-full aspect-square justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 mb-4 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center">
                <span className="text-[var(--color-gold)] text-xs font-bold">✓</span>
              </div>
            </div>
            <h4 className="font-medium text-[var(--color-charcoal)] mb-1 text-sm">{badge.name}</h4>
            <p className="text-xs text-[var(--color-charcoal)] opacity-60 leading-tight">
              {badge.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
