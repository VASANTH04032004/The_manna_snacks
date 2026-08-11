"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function DualCTA() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-spacing"
    >
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Wholesale CTA */}
          <motion.div
            className="relative p-10 md:p-16 flex flex-col justify-between min-h-[300px]"
            style={{
              background: "var(--color-charcoal)",
              color: "var(--color-cream)",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="label label-gold mb-4">Our Heritage</p>
              <h3
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-cream)" }}
              >
                Tradition &amp; Quality
              </h3>
              <p className="text-sm opacity-70 max-w-sm leading-relaxed mb-8">
                Discover our generational recipes, hygienic small-batch production, and uncompromising food quality standards.
              </p>
            </div>
            <Link
              href="/about"
              className="btn-outline inline-flex self-start"
              style={{
                borderColor: "var(--color-wheat)",
                color: "var(--color-wheat)",
              }}
            >
              <span>Learn Our Story</span>
            </Link>
            {/* Decorative corner accent */}
            <div
              className="absolute top-0 right-0 w-20 h-20 opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-gold) 0%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Retail CTA */}
          <motion.div
            className="relative p-10 md:p-16 flex flex-col justify-between min-h-[300px]"
            style={{
              background: "var(--color-cream-dark)",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="label mb-4" style={{ color: "var(--color-terracotta)" }}>
                For You
              </p>
              <h3
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Shop Our Snacks
              </h3>
              <p className="text-sm opacity-60 max-w-sm leading-relaxed mb-8">
                From our kitchen to your doorstep. Explore the full range of
                The Manna favourites, crafted with tradition.
              </p>
            </div>
            <Link href="/retail" className="btn-primary inline-flex self-start">
              <span>Browse Collection</span>
            </Link>
            {/* Decorative corner accent */}
            <div
              className="absolute bottom-0 left-0 w-16 h-16 opacity-10"
              style={{
                background:
                  "linear-gradient(315deg, var(--color-terracotta) 0%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
