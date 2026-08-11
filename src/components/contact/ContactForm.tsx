'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

const formTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: formTransition }
};

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={formTransition}
        className="h-full flex flex-col items-center justify-center text-center p-12"
      >
        <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            className="absolute inset-0 rounded-full opacity-20"
            style={{ background: 'var(--color-gold)' }}
          />
          <svg className="w-12 h-12 relative z-10" viewBox="0 0 50 50" style={{ color: 'var(--color-gold)' }}>
            <motion.path
              fill="transparent"
              strokeWidth="4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14,26 L22,33 L35,16"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </div>
        <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Message Sent</h3>
        <p className="opacity-70 max-w-sm">
          We&apos;ll be in touch shortly. Thank you for reaching out to The Manna Snacks (Vel Brothers Food Products).
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="floating-field">
          <input type="text" id="contact-name" required placeholder=" " />
          <label htmlFor="contact-name">Name</label>
        </div>
        <div className="floating-field">
          <input type="email" id="contact-email" required placeholder=" " />
          <label htmlFor="contact-email">Email</label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="floating-field">
          <input type="tel" id="contact-phone" placeholder=" " />
          <label htmlFor="contact-phone">Phone (Optional)</label>
        </div>
        <div className="floating-field">
          <input type="text" id="contact-subject" required placeholder=" " />
          <label htmlFor="contact-subject">Subject</label>
        </div>
      </div>

      <div className="floating-field">
        <textarea id="contact-message" required rows={5} placeholder=" " />
        <label htmlFor="contact-message">Message</label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
        >
          <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
        </button>
      </div>
    </form>
  );
}
