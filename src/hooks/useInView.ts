"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Intersection Observer hook for scroll-triggered reveals.
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook for staggered reveal of multiple children.
 * Returns a ref for the container and individual delay values.
 */
export function useStaggeredInView(
  itemCount: number,
  staggerDelay = 0.06,
  options: UseInViewOptions = {}
) {
  const { ref, isInView } = useInView(options);

  const getDelay = useCallback(
    (index: number) => index * staggerDelay,
    [staggerDelay]
  );

  return { ref, isInView, getDelay, itemCount };
}
