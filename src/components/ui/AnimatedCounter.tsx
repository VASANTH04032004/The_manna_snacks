'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '', className }: AnimatedCounterProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const countRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !isInView || !countRef.current) return;
    
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(obj.val).toLocaleString();
        }
      },
    });
  }, [end, duration, isInView, shouldReduceMotion]);

  return (
    <span ref={ref as any} className={className}>
      {prefix}
      <span ref={countRef}>
        {shouldReduceMotion ? end.toLocaleString() : '0'}
      </span>
      {suffix}
    </span>
  );
}
