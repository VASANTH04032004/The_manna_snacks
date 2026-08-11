'use client';

import { motion, Variants } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';


const tiers = [
  {
    name: 'Starter',
    minOrder: '50+ units',
    discount: '15% Off',
    features: ['Standard shipping', 'Net 30 terms', 'Email support', 'Basic marketing kit'],
    recommended: false,
  },
  {
    name: 'Business',
    minOrder: '200+ units',
    discount: '25% Off',
    features: ['Priority shipping', 'Net 45 terms', 'Dedicated account manager', 'Full marketing kit', 'Custom packaging options'],
    recommended: true,
  },
  {
    name: 'Enterprise',
    minOrder: '500+ units',
    discount: '35% Off',
    features: ['Free shipping', 'Net 60 terms', '24/7 dedicated support', 'Co-branding opportunities', 'Quarterly business reviews'],
    recommended: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
};

export default function PricingTable() {
  const { prefersReducedMotion } = useDeviceCapability();

  return (
    <div className="section-spacing">
      <motion.div
        variants={!prefersReducedMotion ? containerVariants : undefined}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
      >
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            variants={!prefersReducedMotion ? itemVariants : undefined}
            className={`relative p-8 border rounded-2xl flex flex-col ${
              tier.recommended
                ? 'border-[var(--color-gold)] bg-[var(--color-cream)] z-10'
                : 'border-[var(--color-charcoal-light)] bg-transparent'
            }`}
            animate={
              tier.recommended && !prefersReducedMotion
                ? {
                    boxShadow: [
                      '0px 0px 0px 0px rgba(212, 175, 55, 0)',
                      '0px 0px 20px 4px rgba(212, 175, 55, 0.15)',
                      '0px 0px 0px 0px rgba(212, 175, 55, 0)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {tier.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[var(--color-gold)] text-[var(--color-cream)] text-xs uppercase tracking-wider rounded-full font-semibold">
                Recommended
              </div>
            )}
            
            <h3 className="font-display text-2xl mb-2 text-[var(--color-charcoal)]">{tier.name}</h3>
            <div className="text-[var(--color-gold)] font-display text-4xl mb-1">{tier.discount}</div>
            <div className="text-sm text-[var(--color-charcoal)] opacity-70 mb-8 border-b border-[var(--color-charcoal-light)] pb-6">
              Min. {tier.minOrder}
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-[var(--color-charcoal)]">
                  <svg className="w-5 h-5 text-[var(--color-gold)] mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 px-6 rounded-full text-sm font-medium transition-colors ${
              tier.recommended 
                ? 'bg-[var(--color-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-gold)]' 
                : 'border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)]'
            }`}>
              Select Tier
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
