'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export default function CustomCursor() {
  const { isTouch } = useDeviceCapability();
  const cursorRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch) return;

    document.documentElement.classList.add('custom-cursor-active');

    // Create high-performance quickTo setters for coordinates
    const cursorToX = gsap.quickTo(cursorRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const cursorToY = gsap.quickTo(cursorRef.current, "y", { duration: 0.08, ease: "power3.out" });
    const blurToX = gsap.quickTo(blurRef.current, "x", { duration: 0.22, ease: "power2.out" });
    const blurToY = gsap.quickTo(blurRef.current, "y", { duration: 0.22, ease: "power2.out" });

    // Idle timer management
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isCursorVisible = true;

    const showCursor = () => {
      if (!isCursorVisible) {
        isCursorVisible = true;
        if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.15, overwrite: "auto" });
        if (blurRef.current) gsap.to(blurRef.current, { opacity: 0.35, duration: 0.15, overwrite: "auto" });
      }
    };

    const hideCursor = () => {
      isCursorVisible = false;
      if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
      if (blurRef.current) gsap.to(blurRef.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
    };

    const wakeAndResetTimer = () => {
      showCursor();
      if (idleTimer) clearTimeout(idleTimer);
      // Fade out after 2.5 seconds of absolute stillness
      idleTimer = setTimeout(() => {
        hideCursor();
      }, 2500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      wakeAndResetTimer();
      cursorToX(e.clientX);
      cursorToY(e.clientY);
      blurToX(e.clientX);
      blurToY(e.clientY);
    };

    const handleInteraction = (e: MouseEvent | TouchEvent | PointerEvent) => {
      wakeAndResetTimer();
      if ('clientX' in e) {
        cursorToX(e.clientX);
        cursorToY(e.clientY);
        blurToX(e.clientX);
        blurToY(e.clientY);
      }
    };

    const handleMouseLeaveWindow = () => {
      hideCursor();
    };

    const handleMouseEnterWindow = () => {
      wakeAndResetTimer();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handleInteraction, { passive: true });
    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('scroll', wakeAndResetTimer, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnterWindow, { passive: true });

    // Initial wake
    wakeAndResetTimer();

    // State parameters updated without React re-render overhead
    let isHovering = false;
    let hoverType: 'link' | 'card' | 'input' | 'phone' | 'none' = 'none';
    let isMouseDown = false;

    const setEmojiText = (text: string) => {
      if (emojiRef.current && emojiRef.current.innerText !== text) {
        emojiRef.current.innerText = text;
      }
    };

    const updateEmoji = () => {
      if (isMouseDown) {
        setEmojiText('🥳'); // Winking party face on click
      } else {
        switch (hoverType) {
          case 'card':
            setEmojiText('🤤'); // Drooling face on product cards
            break;
          case 'input':
            setEmojiText('✍️'); // Writing pencil on forms/inputs
            break;
          case 'phone':
            setEmojiText('📞'); // Phone on tel links
            break;
          case 'link':
            setEmojiText('🤩'); // Star eyes on other buttons & links
            break;
          case 'none':
          default:
            setEmojiText('😋'); // Yummy face by default
            break;
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInput = !!target.closest('input, textarea, select');
      const isPhone = !!(target.closest('[href^="tel:"]') || target.closest('[href^="mailto:"]') || target.closest('[href*="wa.me"]'));
      const isCard = !!(target.closest('.group') || target.closest('[href^="/retail#"]') || target.closest('.aspect-square'));
      
      const isLink = !!(
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.classList.contains('interactive')
      );

      if (isInput) {
        hoverType = 'input';
      } else if (isPhone) {
        hoverType = 'phone';
      } else if (isCard) {
        hoverType = 'card';
      } else if (isLink) {
        hoverType = 'link';
      } else {
        hoverType = 'none';
      }

      const isInteractable = hoverType !== 'none';

      if (isInteractable && !isHovering) {
        isHovering = true;
        gsap.to(cursorRef.current, { scale: 1.35, duration: 0.25, ease: "power2.out" });
        gsap.to(blurRef.current, { scale: 1.5, opacity: 0.15, duration: 0.25, ease: "power2.out" });
      } else if (!isInteractable && isHovering) {
        isHovering = false;
        gsap.to(cursorRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
        gsap.to(blurRef.current, { scale: 1, opacity: 0.35, duration: 0.25, ease: "power2.out" });
      }

      updateEmoji();
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      wakeAndResetTimer();
      gsap.to(cursorRef.current, { scale: 0.85, duration: 0.1, ease: "power2.out" });
      updateEmoji();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      wakeAndResetTimer();
      gsap.to(cursorRef.current, { scale: isHovering ? 1.35 : 1, duration: 0.18, ease: "power2.out" });
      updateEmoji();
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', wakeAndResetTimer);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Trailing blur circle */}
      <div
        ref={blurRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-md mix-blend-screen"
        style={{ 
          backgroundColor: 'var(--color-gold)', 
          willChange: 'transform, opacity',
          transform: 'translate3d(0,0,0)'
        }}
      />
      {/* Dynamic Emoji Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center select-none"
        style={{
          width: '24px',
          height: '24px',
          willChange: 'transform, opacity',
          transform: 'translate3d(0,0,0)'
        }}
      >
        <span 
          ref={emojiRef}
          style={{ 
            fontSize: '20px',
            lineHeight: 1,
            filter: 'drop-shadow(0px 2px 4px rgba(43,38,32,0.12))'
          }}
        >
          😋
        </span>
      </div>
    </>
  );
}
