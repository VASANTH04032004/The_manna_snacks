'use client';

import { motion, Variants } from 'framer-motion';
import KineticText from '@/components/ui/KineticText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from './ContactForm';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactClient() {
  return (
    <div className="section-spacing">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="mb-16">
            <p className="label label-gold mb-6">Get In Touch</p>
            <KineticText
              text="Contact Us"
              tag="h1"
              className="mb-6"
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Visit Us</h2>
              <p className="opacity-70 leading-relaxed">
                <strong>Vel Brothers Food Products</strong><br />
                173-C Govindhasamy Street<br />
                Thirunagar 7th Stop, Thirunagar<br />
                Madurai – 625006<br />
                Tamil Nadu, India
              </p>
            </motion.div>

            <div className="hairline my-10" />

            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact Info</h2>
              <div className="space-y-3 opacity-70">
                <p><strong className="font-medium">Phone &amp; WhatsApp:</strong> <a href="tel:+917402222232" className="hover:underline font-semibold text-[var(--color-terracotta)]">+91 74022 22232</a></p>
                <p><strong className="font-medium">Email:</strong> hello@themannasnacks.com</p>
                <p><strong className="font-medium">Wholesale &amp; Bulk:</strong> b2b@themannasnacks.com</p>
              </div>
            </motion.div>

            <div className="hairline my-10" />

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Business Hours</h2>
              <div className="space-y-3 opacity-70">
                <div className="flex justify-between max-w-[280px]">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between max-w-[280px]">
                  <span>Saturday</span>
                  <span>9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between max-w-[280px]">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="p-8 md:p-12" style={{ background: 'var(--color-cream-dark)', borderRadius: '2px' }}>
                <h2 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-display)' }}>Send a Message</h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
