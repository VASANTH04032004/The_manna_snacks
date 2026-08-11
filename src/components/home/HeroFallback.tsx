"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spring, variants } from "@/lib/motion";

/**
 * Static hero fallback for mobile / low-end devices where WebGL is too heavy.
 * Uses CSS animations and Next.js Image for a beautiful but lightweight hero.
 */
export default function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 animate-gradient opacity-30"
        style={{
          background:
            "linear-gradient(135deg, var(--color-wheat) 0%, var(--color-cream) 40%, var(--color-terracotta) 70%, var(--color-cream) 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating product images with CSS animation */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-28 md:w-36 opacity-80"
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/products/ribbon-pakoda.jpg"
          alt=""
          width={150}
          height={200}
          className="blob-mask-3 shadow-lg"
        />
      </motion.div>

      <motion.div
        className="absolute top-[5%] right-[15%] w-32 md:w-44 opacity-90"
        animate={{ y: [6, -10, 6], rotate: [1, -3, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Image
          src="/products/potato-chips.jpg"
          alt=""
          width={180}
          height={240}
          className="blob-mask-3 shadow-xl"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[10%] w-24 md:w-32 opacity-70"
        animate={{ y: [-6, 12, -6], rotate: [-1, 3, -1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Image
          src="/products/murukku.jpg"
          alt=""
          width={130}
          height={175}
          className="blob-mask-3 shadow-lg"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] left-[5%] w-20 md:w-28 opacity-60"
        animate={{ y: [4, -8, 4], rotate: [2, -1, 2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Image
          src="/products/masala-chips.jpg"
          alt=""
          width={110}
          height={150}
          className="blob-mask-3 shadow-md"
        />
      </motion.div>
    </div>
  );
}
