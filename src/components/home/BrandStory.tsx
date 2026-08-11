"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function BrandStory() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-spacing overflow-hidden">
      <div className="container-editorial">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left — Large editorial text */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label mb-6" style={{ color: "var(--color-olive)" }}>
              Our Story
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-8"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 1.2,
              }}
            >
              Crafted with tradition,
              <br />
              <span style={{ color: "var(--color-terracotta)" }}>
                savoured for generations
              </span>
            </h2>
            <div className="space-y-4 text-sm md:text-base opacity-70 max-w-lg">
              <p>
                The Manna Snacks carries forward the rich culinary heritage of
                South India, proudly produced by Vel Brothers Food Products in Madurai. Every recipe — from our signature Ribbon Pakoda to
                the hand-pressed Murukku — is crafted using time-honoured
                methods and the finest natural ingredients.
              </p>
              <p>
                No preservatives. No shortcuts. Just authentic flavours that
                have made us the all-time favourite across thousands of homes
                and retail shelves.
              </p>
            </div>
          </motion.div>

          {/* Right — Decorative editorial accent */}
          <motion.div
            className="md:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Large decorative quote mark */}
              <div
                className="text-[12rem] leading-none opacity-5 absolute -top-10 -left-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                "
              </div>

              {/* Quote */}
              <blockquote
                className="relative z-10 pl-6 py-8"
                style={{
                  borderLeft: "2px solid var(--color-gold)",
                }}
              >
                <p
                  className="text-xl md:text-2xl italic mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  Tasty & Delicious — the promise that has defined every pack
                  of The Manna Snacks since day one.
                </p>
                <cite
                  className="label not-italic block"
                  style={{ color: "var(--color-wheat)" }}
                >
                  — Vel Brothers Food Products
                </cite>
              </blockquote>

              {/* Decorative blob */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-wheat) 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
