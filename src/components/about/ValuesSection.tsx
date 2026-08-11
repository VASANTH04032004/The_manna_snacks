'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: 'No Preservatives',
    description: 'We believe in pure, unadulterated taste. Our traditional snacks are prepared fresh without artificial preservatives or synthetic chemicals.',
  },
  {
    title: 'Traditional Recipes',
    description: 'Every snack is crafted using time-honored recipes passed down through generations in Madurai, preserving authentic regional flavors.',
  },
  {
    title: 'Family Owned',
    description: 'As a family-run heritage brand, Vel Brothers puts personal dedication and pride into every batch made in our hygienic facility.',
  },
  {
    title: 'Premium Ingredients',
    description: 'We source pure gram flour, freshly milled spices, and high-grade oils to guarantee exceptional crunch and unmistakable purity.',
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function ValuesSection() {
  return (
    <section className="relative py-28 overflow-hidden text-[var(--color-cream)]">
      {/* Background workplace photo with rich dark vignette overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory-workplace.jpg"
          alt="The Manna Snacks Madurai Workplace & Crafting Facility"
          fill
          className="object-cover object-center filter brightness-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/90 via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/95 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="label label-gold mb-3 inline-block">Our Guiding Pillars</span>
          <h2 className="text-4xl md:text-5xl font-display mb-4 text-[var(--color-cream)]">Our Core Values &amp; Heritage</h2>
          <p className="text-base md:text-lg text-[var(--color-wheat)] max-w-2xl mx-auto font-body opacity-90 leading-relaxed">
            The principles that guide us in bringing you the finest traditional snacks — prepared with pride in our Madurai facility.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {values.map((value) => (
            <motion.div 
              key={value.title} 
              variants={itemVariants} 
              className="relative p-6 sm:p-8 rounded-2xl bg-[var(--color-charcoal)]/60 border border-[var(--color-wheat)]/20 backdrop-blur-md hover:border-[var(--color-gold)] transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-[var(--color-gold)] text-sm font-bold">★</span>
              </div>
              <h3 className="text-xl font-display mb-3 text-[var(--color-wheat)] group-hover:text-[var(--color-gold)] transition-colors">{value.title}</h3>
              <p className="text-sm text-[var(--color-cream)]/80 font-body leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
