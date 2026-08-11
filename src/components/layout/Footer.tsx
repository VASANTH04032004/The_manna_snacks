'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EASINGS } from '@/lib/motion';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About Us', href: '/about' },
  { name: 'Retail', href: '/retail' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-cream-dark)', color: 'var(--color-charcoal)' }}>
      {/* Top hairline */}
      <div className="hairline" />

      <div className="container-editorial py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Col 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASINGS.premium }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}>
                THE MANNA
              </span>
              <span className="w-2 h-2 rounded-full mb-1" style={{ background: 'var(--color-gold)' }} />
              <span className="text-xs tracking-[0.2em] font-medium uppercase opacity-70">
                Snacks
              </span>
            </div>
            <p className="text-sm opacity-60 max-w-sm mb-6 leading-relaxed">
              Crafting authentic South Indian snacks with time-honored recipes, premium ingredients, and a passion for pure flavour. By Vel Brothers Food Products.
            </p>
            <p className="text-2xl italic" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-terracotta)' }}>
              All Time Favourite
            </p>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASINGS.premium }}
            className="md:col-span-3"
          >
            <h4 className="label mb-8" style={{ opacity: 0.5 }}>Explore</h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group relative inline-block text-sm">
                    {link.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 ease-out group-hover:w-full"
                      style={{ background: 'var(--color-terracotta)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.premium }}
            className="md:col-span-4"
          >
            <h4 className="label mb-8" style={{ opacity: 0.5 }}>Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 mt-0.5" style={{ color: 'var(--color-olive)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="opacity-70 leading-relaxed">
                  <strong>Vel Brothers Food Products</strong><br />
                  173-C Govindhasamy Street<br />
                  Thirunagar 7th Stop, Thirunagar<br />
                  Madurai – 625006, Tamil Nadu
                </span>
              </div>
              <a href="tel:+917402222232" className="flex items-center gap-3 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0" style={{ color: 'var(--color-olive)' }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span className="opacity-70 group-hover:opacity-100 transition-opacity font-medium">+91 74022 22232</span>
              </a>
              <a href="mailto:hello@themannasnacks.com" className="flex items-center gap-3 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0" style={{ color: 'var(--color-olive)' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">hello@themannasnacks.com</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--color-gold)]/20 hover:border-[var(--color-gold)]"
                style={{ border: '1px solid rgba(43,38,32,0.15)' }}
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-charcoal)' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--color-gold)]/20 hover:border-[var(--color-gold)]"
                style={{ border: '1px solid rgba(43,38,32,0.15)' }}
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-charcoal)' }}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--color-gold)]/20 hover:border-[var(--color-gold)]"
                style={{ border: '1px solid rgba(43,38,32,0.15)' }}
                aria-label="Twitter X"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-charcoal)' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(43,38,32,0.1)' }}
        >
          <p className="text-xs opacity-50">
            &copy; 2014 &ndash; {new Date().getFullYear()} The Manna Snacks (Vel Brothers Food Products). All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ border: '1px solid rgba(217,168,87,0.3)', background: 'rgba(217,168,87,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-gold)' }} />
            <span className="text-xs font-medium uppercase tracking-wide opacity-80">Tasty &amp; Delicious</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
