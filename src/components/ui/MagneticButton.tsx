'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMagneticElement } from '@/hooks/useMagneticElement';
import { spring } from '@/lib/motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'outline' | 'custom';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  [key: string]: any;
}

export default function MagneticButton({ 
  children, 
  onClick, 
  href, 
  className, 
  variant = 'primary',
  type = 'button',
  disabled = false,
  ...rest
}: MagneticButtonProps) {
  const { ref, magneticProps } = useMagneticElement();
  const shouldReduceMotion = useReducedMotion();
  const [clicks, setClicks] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (onClick) onClick(e);
    
    if (!shouldReduceMotion) {
      const id = Date.now();
      setClicks((prev) => [...prev, id]);
      setTimeout(() => setClicks((prev) => prev.filter((clickId) => clickId !== id)), 1000);
    }
  };

  const isPrimary = variant === 'primary';
  const buttonClasses = variant === 'custom'
    ? (className || '')
    : `relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-medium transition-colors ${
        isPrimary 
          ? 'bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-wheat)]' 
          : 'border-2 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]'
      } ${className || ''}`;

  const content = (
    <motion.div
      ref={ref as any}
      {...magneticProps}
      whileTap={shouldReduceMotion || disabled ? undefined : { scale: 0.92 }}
      transition={spring.soft}
      className={buttonClasses}
    >
      <span className="relative z-10 flex items-center justify-center w-full h-full">{children}</span>
      <AnimatePresence>
        {!disabled && clicks.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute h-2 w-2 rounded-full ${isPrimary ? 'bg-white' : 'bg-[var(--color-gold)]'}`}
                initial={{ x: 0, y: 0 }}
                animate={{
                  x: Math.cos((i * Math.PI) / 3) * 50,
                  y: Math.sin((i * Math.PI) / 3) * 50,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleClick} passHref className="inline-block outline-none" {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      disabled={disabled}
      onClick={handleClick} 
      className={`inline-block appearance-none border-none bg-transparent p-0 outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...rest}
    >
      {content}
    </button>
  );
}
