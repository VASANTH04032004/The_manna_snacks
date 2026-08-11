"use client";

import { useRef, useCallback, useEffect, useState } from "react";

/**
 * Detects device capabilities for progressive enhancement.
 * Used to disable WebGL/R3F on low-end devices and fall back
 * to simpler animations.
 */

interface DeviceCapability {
  hasWebGL: boolean;
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  gpuTier: "high" | "medium" | "low";
  shouldUse3D: boolean;
  shouldUseParticles: boolean;
  maxParticles: number;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    hasWebGL: true,
    isMobile: false,
    isTouch: false,
    prefersReducedMotion: false,
    gpuTier: "high",
    shouldUse3D: true,
    shouldUseParticles: true,
    maxParticles: 50,
  });

  useEffect(() => {
    // WebGL detection
    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      hasWebGL = false;
    }

    // Touch/mobile detection
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = isTouch && window.innerWidth < 768;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // GPU tier estimation (simplified)
    const deviceMemory = (navigator as unknown as Record<string, number>).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    let gpuTier: "high" | "medium" | "low" = "high";
    if (deviceMemory <= 2 || hardwareConcurrency <= 2) gpuTier = "low";
    else if (deviceMemory <= 4 || hardwareConcurrency <= 4) gpuTier = "medium";

    // Derived decisions
    const shouldUse3D = hasWebGL && !isMobile && !prefersReducedMotion && gpuTier !== "low";
    const shouldUseParticles = !prefersReducedMotion && gpuTier !== "low";
    const maxParticles =
      gpuTier === "high" ? 50 : gpuTier === "medium" ? 25 : 10;

    setCapability({
      hasWebGL,
      isMobile,
      isTouch,
      prefersReducedMotion,
      gpuTier,
      shouldUse3D,
      shouldUseParticles,
      maxParticles,
    });
  }, []);

  return capability;
}

/**
 * Simple hook for prefers-reduced-motion only.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
