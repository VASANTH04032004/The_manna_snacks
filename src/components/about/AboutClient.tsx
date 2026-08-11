'use client';

import KineticText from '@/components/ui/KineticText';
import { ProcessTimeline } from './ProcessTimeline';
import { ValuesSection } from './ValuesSection';
import { CertBadges } from './CertBadges';
import { motion } from 'framer-motion';

export function AboutClient() {
  return (
    <div className="section-spacing">
      {/* Hero Section */}
      <section className="container-editorial mb-24">
        <div className="max-w-4xl mb-16">
          <p className="label label-gold mb-6">Our Story</p>
          <KineticText
            text="From Our Family Kitchen To Your Table"
            tag="h1"
            className="mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl opacity-60 max-w-xl leading-relaxed"
          >
            The Manna Snacks by Vel Brothers Food Products brings the authentic taste of tradition to every bite.
            Tasty &amp; Delicious — since generations.
          </motion.p>
        </div>

        {/* Factory & Packaging Workplace Facility Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-charcoal-light)]"
        >
          <img
            src="/images/factory-workplace.jpg"
            alt="The Manna Snacks Facility & Packaging Room"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute bottom-6 left-6 z-10">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[var(--color-wheat)] text-xs uppercase tracking-widest font-medium border border-white/10">
              The Manna Snacks Crafting &amp; Packaging Facility · Madurai
            </span>
          </div>
        </motion.div>
      </section>

      {/* Story Text Section */}
      <section className="container-editorial mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              A Legacy of Taste
            </h2>
            <div className="hairline mb-8" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-sm md:text-base opacity-70 leading-relaxed"
          >
            <p>
              Decades ago, our family started making snacks using secret recipes
              learned from our elders in Madurai. The distinct flavours, the perfect crunch, and the
              wholesome ingredients quickly made our snacks a favourite in the neighbourhood.
            </p>
            <p>
              Today, The Manna Snacks (Vel Brothers Food Products) continues that legacy. We&apos;ve scaled our operations, but we
              haven&apos;t changed the recipes. Every murukku, pakoda, and chip is still made with
              the same love and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <ValuesSection />

      {/* Quality Commitment & Certifications */}
      <div className="container-editorial">
        <CertBadges />
      </div>

      {/* Process Section */}
      <section className="section-spacing" style={{ background: 'var(--color-cream)' }}>
        <div className="container-editorial text-center mb-16">
          <p className="label label-gold mb-4">Our Process</p>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            How We Make It
          </h2>
          <p className="text-sm md:text-base opacity-60 max-w-2xl mx-auto">
            Our meticulous process ensures that every snack that reaches you is perfect.
          </p>
        </div>
        <ProcessTimeline />
      </section>
    </div>
  );
}
