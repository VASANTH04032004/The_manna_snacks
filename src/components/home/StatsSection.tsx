"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { spring, variants } from "@/lib/motion";

const stats = [
  { value: 14, suffix: "+", label: "Years of Tradition" },
  { value: 20, suffix: "+", label: "Premium Products" },
  { value: 120, suffix: "+", label: "Retail Partners" },
  { value: 118, suffix: "+", label: "Wholesale Clients" },
];

export default function StatsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-spacing"
      style={{ background: "var(--color-charcoal)", color: "var(--color-cream)" }}
    >
      <div className="container-editorial">
        {/* Section label */}
        <motion.p
          className="label label-gold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          By The Numbers
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="text-4xl md:text-5xl lg:text-6xl mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <div className="hairline mb-3" style={{ opacity: 0.2, background: "var(--color-cream)" }} />
              <p
                className="text-sm tracking-wide"
                style={{ color: "var(--color-wheat)", opacity: 0.8 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
