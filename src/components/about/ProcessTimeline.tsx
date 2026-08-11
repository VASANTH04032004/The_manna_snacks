'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stages = [
  {
    title: 'Sourcing',
    description: 'We partner with local farmers to source the highest quality, organic ingredients, ensuring freshness and sustainability.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Processing',
    description: 'Our ingredients are cleaned and prepared using traditional methods that have been passed down through generations.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: 'Preparation',
    description: 'Cooked in small batches with cold-pressed oils, ensuring every snack retains its authentic flavor and perfect crunch.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Packaging',
    description: 'Sealed immediately to lock in freshness, using eco-friendly materials whenever possible, ready for your table.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (pathRef.current && containerRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-24 max-w-5xl mx-auto px-4">
      {/* SVG Line for desktop/tablet */}
      <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 -ml-0.5">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 1000">
          <path
            d="M2,0 L2,1000"
            stroke="var(--color-charcoal-light)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            ref={pathRef}
            d="M2,0 L2,1000"
            stroke="var(--color-gold)"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-16 md:gap-24">
        {stages.map((stage, index) => (
          <ProcessNode key={stage.title} stage={stage} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProcessNode({ stage, index }: { stage: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`hidden md:block w-1/2 ${isEven ? 'pl-16' : 'pr-16 text-right'}`}>
        <h3 className="text-3xl font-display text-[var(--color-charcoal)] mb-4">{stage.title}</h3>
        <p className="text-[var(--color-charcoal-light)] font-body leading-relaxed">{stage.description}</p>
      </div>

      <div className="absolute left-[24px] md:left-1/2 -ml-6 w-12 h-12 rounded-full bg-[var(--color-cream)] border-4 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)] shadow-lg z-20">
        {stage.icon}
      </div>

      <div className={`md:hidden pl-16 w-full`}>
        <h3 className="text-2xl font-display text-[var(--color-charcoal)] mb-2">{stage.title}</h3>
        <p className="text-[var(--color-charcoal-light)] font-body leading-relaxed">{stage.description}</p>
      </div>
      
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}
