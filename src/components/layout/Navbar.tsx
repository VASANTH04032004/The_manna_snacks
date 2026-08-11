'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCartStore, useUIStore } from '@/store';
import { EASINGS } from '@/lib/motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Retail', href: '/retail' },
  { name: 'Contact', href: '/contact' },
];

/* Simple magnetic link using inline logic */
function MagneticLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    ref.current.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-4 py-2 text-sm tracking-wide block transition-colors duration-300"
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        color: isActive ? 'var(--color-terracotta)' : 'var(--color-charcoal)',
      }}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  const totalItems = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 50);
    if (latest > 150 && latest > previous && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: EASINGS.premium }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled || isMobileMenuOpen ? 'var(--color-cream)' : 'transparent',
        boxShadow: isScrolled ? '0 1px 0 rgba(43,38,32,0.08)' : 'none',
      }}
    >
      <div className="container-editorial h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <span
            className="text-2xl md:text-3xl tracking-tight transition-colors"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)', fontWeight: 300 }}
          >
            THE MANNA
          </span>
          <span className="w-1.5 h-1.5 rounded-full mb-1" style={{ background: 'var(--color-gold)' }} />
          <span className="text-xs tracking-[0.2em] font-medium mt-1 hidden sm:block uppercase" style={{ color: 'var(--color-charcoal)' }}>
            Snacks
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <MagneticLink key={link.name} href={link.href} isActive={pathname === link.href}>
              {link.name}
            </MagneticLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 z-50">
          <motion.button
            key={totalItems}
            animate={{ 
              scale: totalItems > 0 ? [1, 1.25, 0.95, 1.1, 1] : 1,
              rotate: totalItems > 0 ? [0, -10, 10, -5, 0] : 0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={openCart}
            className="relative p-2 transition-colors rounded-full hover:bg-[var(--color-wheat)]/15"
            style={{ color: 'var(--color-charcoal)' }}
            aria-label={`Open Cart${totalItems > 0 ? ` (${totalItems} items)` : ''}`}
          >
            {/* Shopping bag icon SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm"
                  style={{ background: 'var(--color-terracotta)', color: 'var(--color-cream)' }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--color-charcoal)' }}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASINGS.premium }}
            className="fixed inset-0 pt-24 px-6 z-40 md:hidden flex flex-col h-screen"
            style={{ background: 'var(--color-cream)' }}
          >
            <nav className="flex flex-col gap-6 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASINGS.premium }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl block"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: pathname === link.href ? 'var(--color-terracotta)' : 'var(--color-charcoal)',
                      fontWeight: 300,
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pb-12"
            >
              <div className="hairline mb-6" />
              <p className="label" style={{ color: 'var(--color-charcoal-light)' }}>
                The Manna Snacks · Vel Brothers Food Products
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
