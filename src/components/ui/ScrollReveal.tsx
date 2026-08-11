'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { spring } from '@/lib/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export default function ScrollReveal({ children, delay = 0, className, direction = 'up' }: ScrollRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (direction) {
      case 'left': return { opacity: 0, x: -50, filter: 'blur(8px)' };
      case 'right': return { opacity: 0, x: 50, filter: 'blur(8px)' };
      case 'up':
      default:
        return { opacity: 0, y: 50, filter: 'blur(8px)' };
    }
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={getInitial()}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : getInitial()}
      transition={{ ...spring.soft, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
