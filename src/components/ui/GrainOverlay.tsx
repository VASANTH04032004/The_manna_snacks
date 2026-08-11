'use client';
import { useReducedMotion } from 'framer-motion';

export default function GrainOverlay() {
  const shouldReduceMotion = useReducedMotion();
  
  // Do not render animation overlay if user prefers reduced motion
  if (shouldReduceMotion) return null;
  
  return <div className="grain-overlay pointer-events-none fixed inset-0 z-50 mix-blend-overlay" />;
}
