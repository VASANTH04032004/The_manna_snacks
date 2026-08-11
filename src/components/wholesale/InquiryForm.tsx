'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';


const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

export default function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { prefersReducedMotion } = useDeviceCapability();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--color-cream-dark)] p-12 text-center rounded-2xl border border-[var(--color-charcoal-light)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="w-20 h-20 bg-[var(--color-gold)] rounded-full mx-auto flex items-center justify-center mb-6"
        >
          <svg className="w-10 h-10 text-[var(--color-cream)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-display text-3xl mb-4 text-[var(--color-charcoal)]">Inquiry Sent Successfully</h3>
        <p className="text-[var(--color-charcoal)] opacity-80 max-w-md mx-auto">
          Thank you for your interest in partnering with The Manna Snacks (Vel Brothers Food Products). Our wholesale team will review your details and contact you within 1-2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form 
      variants={!prefersReducedMotion ? formVariants : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="floating-field">
          <input type="text" id="name" required placeholder=" " />
          <label htmlFor="name">Full Name</label>
        </motion.div>
        
        <motion.div variants={itemVariants} className="floating-field">
          <input type="email" id="email" required placeholder=" " />
          <label htmlFor="email">Email Address</label>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="floating-field">
          <input type="tel" id="phone" required placeholder=" " />
          <label htmlFor="phone">Phone Number</label>
        </motion.div>
        
        <motion.div variants={itemVariants} className="floating-field">
          <input type="text" id="company" required placeholder=" " />
          <label htmlFor="company">Company Name</label>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="floating-field relative">
        <select id="quantity" required defaultValue="" className="appearance-none">
          <option value="" disabled hidden></option>
          <option value="50-199">50 - 199 units / month</option>
          <option value="200-499">200 - 499 units / month</option>
          <option value="500-999">500 - 999 units / month</option>
          <option value="1000+">1000+ units / month</option>
        </select>
        <label htmlFor="quantity">Estimated Monthly Volume</label>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-charcoal)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="floating-field">
        <textarea id="message" required rows={4} placeholder=" "></textarea>
        <label htmlFor="message">Tell us about your business</label>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4 text-center">
        <MagneticButton
          type="submit"
          disabled={status === 'submitting'}
          variant="custom"
          className="btn-primary w-full md:w-auto min-w-[200px]"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
        </MagneticButton>
      </motion.div>
    </motion.form>
  );
}
