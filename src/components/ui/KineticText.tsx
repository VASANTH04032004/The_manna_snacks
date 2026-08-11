'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface KineticTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export default function KineticText({ text, tag: Tag = 'h2', className }: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !ref.current) return;
    
    const chars = ref.current.querySelectorAll('.kinetic-char');
    
    const animation = gsap.fromTo(
      chars,
      { y: '110%', rotateX: 45, opacity: 0 },
      {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as any} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {text.split('').map((char: string, i: number) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <span className="kinetic-char" style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </Tag>
  );
}
