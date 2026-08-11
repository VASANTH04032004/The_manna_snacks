'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EASINGS } from '@/lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Fallback animation for prefers-reduced-motion
  const reducedMotionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Organic circle mask transition
  const maskVariants = {
    initial: {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
    },
    animate: {
      clipPath: 'circle(150% at 50% 50%)',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASINGS.premium,
      },
    },
    exit: {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: EASINGS.premium,
      },
    },
  };

  const variants = shouldReduceMotion ? reducedMotionVariants : maskVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full min-h-screen bg-[var(--color-cream)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
