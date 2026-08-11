/**
 * Motion configuration — spring physics, easing presets, and duration constants
 * used across all animation components.
 */

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/** Alias for subagent-generated components that import EASINGS */
export const EASINGS = {
  premium: EASE_PREMIUM as unknown as [number, number, number, number],
  spring: EASE_SPRING as unknown as [number, number, number, number],
};

/** Framer Motion spring presets */
export const spring = {
  /** Soft, unhurried spring for most transitions */
  soft: { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 },
  /** Gentle bounce for micro-interactions */
  bounce: { type: "spring" as const, stiffness: 300, damping: 15, mass: 0.8 },
  /** Snappy for small elements */
  snappy: { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.5 },
  /** Slow and weighted for large elements */
  heavy: { type: "spring" as const, stiffness: 60, damping: 18, mass: 1.5 },
  /** Magnetic pull */
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.2 },
};

/** Framer Motion tween presets */
export const tween = {
  slow: { type: "tween" as const, duration: 0.7, ease: EASE_PREMIUM as unknown as [number, number, number, number] },
  medium: { type: "tween" as const, duration: 0.45, ease: EASE_PREMIUM as unknown as [number, number, number, number] },
  fast: { type: "tween" as const, duration: 0.25, ease: EASE_PREMIUM as unknown as [number, number, number, number] },
};

/** Stagger children delays */
export const stagger = {
  fast: 0.03,
  medium: 0.06,
  slow: 0.1,
};

/** Common Framer Motion variants */
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  /** For staggered children containers */
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.medium,
        delayChildren: 0.1,
      },
    },
  },
};
