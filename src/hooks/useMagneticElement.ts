"use client";

import { useRef, useCallback, MouseEvent as ReactMouseEvent } from "react";
import { useReducedMotion } from "./useDeviceCapability";

interface MagneticOptions {
  strength?: number; // Pull strength, 0-1, default 0.3
  radius?: number;   // Activation radius in px, default 100
}

/**
 * Makes an element magnetically pull toward the cursor within a radius.
 * Returns ref to attach + handlers to spread on the element.
 */
export function useMagneticElement(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      if (prefersReduced || !ref.current) return;

      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        el.style.transform = `translate(${deltaX * pull}px, ${deltaY * pull}px)`;
        el.style.transition = "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)";
      }
    },
    [strength, radius, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition =
      "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }, []);

  return {
    ref,
    magneticProps: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
