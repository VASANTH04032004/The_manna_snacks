'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useUIStore } from '@/store';

export default function Preloader() {
  const setPreloaderDone = useUIStore((state) => state.setPreloaderDone);
  const isPreloaderDone = useUIStore((state) => state.isPreloaderDone);
  
  const mRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreloaderDone) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderDone();
      }
    });

    const mChars = mRef.current?.querySelectorAll('span');
    const sChars = sRef.current?.querySelectorAll('span');

    if (mChars && sChars && lineRef.current) {
      tl.fromTo(mChars, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
        .fromTo(sChars, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.2')
        .to([mChars, sChars, lineRef.current], { opacity: 0, y: -20, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, '+=0.5');
    } else {
      setTimeout(() => setPreloaderDone(), 1000);
    }

  }, [isPreloaderDone, setPreloaderDone]);

  return (
    <AnimatePresence>
      {!isPreloaderDone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-cream)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center overflow-hidden">
            <div ref={mRef} className="flex text-4xl md:text-6xl tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)', fontWeight: 300 }}>
              {'THE MANNA'.split('').map((c, i) => (
                <span key={i} className="inline-block">{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </div>
            <div ref={sRef} className="mt-2 flex text-xl md:text-2xl tracking-[0.3em]" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal-light)', fontWeight: 400 }}>
              {'SNACKS'.split('').map((c, i) => (
                <span key={i} className="inline-block">{c}</span>
              ))}
            </div>
            <div ref={lineRef} className="mt-8 h-[2px] w-32 origin-center" style={{ background: 'var(--color-gold)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
