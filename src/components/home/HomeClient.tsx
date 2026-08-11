"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import StatsSection from "@/components/home/StatsSection";
import DualCTA from "@/components/home/DualCTA";
import BrandStory from "@/components/home/BrandStory";

/* Lazy-load heavy 3D scene */
const HeroScene = dynamic(() => import("@/components/home/HeroScene"), {
  ssr: false,
  loading: () => null,
});
const HeroFallback = dynamic(() => import("@/components/home/HeroFallback"), {
  ssr: false,
});
const KineticText = dynamic(() => import("@/components/ui/KineticText"), {
  ssr: false,
});

export default function HomePage() {
  const { shouldUse3D } = useDeviceCapability();

  return (
    <main>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Scene or Fallback */}
        {shouldUse3D ? <HeroScene /> : <HeroFallback />}

        {/* Hero Content Overlay */}
        <div className="container-editorial relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.p
              className="label label-gold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Est. Since Generations
            </motion.p>

            <KineticText
              text="All Time Favourite  The Manna Snacks"
              tag="h1"
              className="mb-6"
            />

            <motion.p
              className="text-base md:text-lg opacity-70 max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Premium organic snacks crafted with tradition. Tasty &amp;
              Delicious — from our family kitchen to yours.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="/products" className="btn-primary">
                <span>Explore Products</span>
              </a>
              <a href="/retail" className="btn-outline">
                <span>Shop Retail</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="label text-xs" style={{ color: "var(--color-charcoal-light)" }}>
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: "var(--color-charcoal)" }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <div className="hairline" />
      <BrandStory />

      {/* ─── STATS ─── */}
      <StatsSection />

      {/* ─── DUAL CTA ─── */}
      <div className="hairline" />
      <DualCTA />
    </main>
  );
}
