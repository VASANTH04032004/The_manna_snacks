'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCartStore } from '@/store';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCartStore();
  const { prefersReducedMotion } = useDeviceCapability();
  const [kgInput, setKgInput] = useState<string>('1');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Reset KG quantity when a new product is selected
  useEffect(() => {
    if (product) {
      setKgInput('1');
      setAddedSuccess(false);
    }
  }, [product]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  // Calculate pack size in grams from product weight string (default 200g)
  const getPackWeightGrams = (): number => {
    if (!product.weight) return 200;
    const match = product.weight.match(/(\d+)\s*g/i);
    if (match) return parseInt(match[1], 10);
    if (product.weight.toLowerCase().includes('700ml')) return 700; // liquid sarbath
    if (product.weight.toLowerCase().includes('50 pcs')) return 1000; // coconut mittai jar ~1kg
    return 200;
  };

  const packGrams = getPackWeightGrams();
  
  // Parse input string to number, fallback to 1 if invalid
  const parsedKg = parseFloat(kgInput);
  const kgQuantity = isNaN(parsedKg) || parsedKg <= 0 ? 1 : parsedKg;

  // Number of packs needed for selected KG
  const totalPacks = Math.max(1, Math.round((kgQuantity * 1000) / packGrams));
  const estimatedTotalPrice = totalPacks * product.price.retail;

  // Quick KG preset buttons
  const presets = [0.5, 1, 2, 5, 10];

  const getWhatsAppLink = () => {
    // If order exceeds ₹2000 or 10+ KG, consider it a wholesale inquiry
    const isWholesale = estimatedTotalPrice >= 2000 || kgQuantity >= 10;
    const inquiryType = isWholesale ? 'Wholesale/Bulk Order' : 'Retail Order';

    const message = `*Namaste The Manna Snacks / Vel Brothers!* 🙏\n\nI would like to place a *${inquiryType}*:\n\n📦 *Product:* ${product.name}\n⚖️ *Quantity Required:* ${kgQuantity} KG (${totalPacks} Packs / Units)\n💰 *Estimated Total:* ₹${estimatedTotalPrice}\n🏷️ *Category:* ${product.category}\n\nPlease share your best negotiable price and dispatch availability.\n\n*My Details:*\nName:\nDelivery Location:`;
    return `https://wa.me/917402222232?text=${encodeURIComponent(message)}`;
  };

  const handleAddToCart = () => {
    addItem(product, totalPacks, 'kg', kgQuantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--color-charcoal)]/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, scale: 0.95, y: 20 } : undefined}
            animate={!prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
            exit={!prefersReducedMotion ? { opacity: 0, scale: 0.95, y: 20 } : undefined}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-2xl bg-[var(--color-cream)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--color-charcoal-light)]/20 z-10 my-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[var(--color-charcoal)]/10 text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)] flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image Panel */}
              <div className="relative aspect-square md:aspect-auto bg-[var(--color-cream-dark)] p-8 flex items-center justify-center">
                {product.image ? (
                  <div className="relative w-full h-full min-h-[220px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-[var(--color-charcoal-light)]/20 rounded-full" />
                )}

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--color-charcoal)] text-[var(--color-cream)] text-xs font-semibold uppercase tracking-wider rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info & KG Selection Panel */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--color-charcoal)] mb-2">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[var(--color-charcoal)] opacity-60 mb-4">
                    Pack Weight: {product.weight} · Retail Price: ₹{product.price.retail}/unit
                  </p>
                  <p className="text-sm text-[var(--color-charcoal)] opacity-80 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* KG Quantity Selector */}
                  <div className="p-4 rounded-2xl bg-[var(--color-cream-dark)]/70 border border-[var(--color-charcoal-light)]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
                        Select Quantity (KG)
                      </label>
                      <span className="text-xs font-medium text-[var(--color-terracotta)]">
                        ≈ {totalPacks} Pack{totalPacks > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2">
                      {presets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setKgInput(preset.toString())}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            kgQuantity === preset
                              ? 'bg-[var(--color-gold)] text-[var(--color-charcoal)] shadow-sm'
                              : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)]/10'
                          }`}
                        >
                          {preset} KG
                        </button>
                      ))}
                    </div>

                    {/* Manual Stepper & Custom KG Input */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-[var(--color-charcoal-light)]/40 rounded-xl bg-[var(--color-cream)]">
                        <button
                          type="button"
                          onClick={() => setKgInput(Math.max(0.5, parseFloat((kgQuantity - 0.5).toFixed(1))).toString())}
                          className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal-light)]/20 rounded-l-xl text-lg"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={kgInput}
                          onChange={(e) => setKgInput(e.target.value)}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value);
                            if (isNaN(val) || val < 0.5) {
                              setKgInput('0.5');
                            } else {
                              setKgInput(val.toString());
                            }
                          }}
                          className="w-16 text-center font-display font-semibold text-base bg-transparent border-none focus:outline-none"
                        />
                        <span className="text-xs font-semibold pr-2">KG</span>
                        <button
                          type="button"
                          onClick={() => setKgInput(parseFloat((kgQuantity + 0.5).toFixed(1)).toString())}
                          className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal-light)]/20 rounded-r-xl text-lg"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex-1 text-right">
                        <span className="text-xs opacity-60 block">Est. Price</span>
                        <span className="font-display text-xl text-[var(--color-charcoal)] font-semibold">
                          ₹{estimatedTotalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-center flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01]"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.058-2.129-.533-1.488-.616-2.457-2.115-2.53-2.213-.075-.098-.606-.807-.606-1.541 0-.734.385-1.096.522-1.246.137-.15.299-.187.399-.187.1 0 .199.002.285.007.091.004.212-.034.331.252.124.298.423 1.034.46 1.11.038.075.062.164.013.264-.05.099-.075.162-.149.25-.075.088-.158.196-.226.264-.075.075-.153.157-.066.307.087.149.387.639.83 1.034.57.509 1.05.666 1.2.741.149.075.237.062.325-.038.087-.1.374-.436.474-.585.099-.149.199-.124.336-.075.137.05.872.411 1.021.486.149.075.249.112.286.175.037.062.037.362-.107.767z" />
                    </svg>
                    <span>Inquire / Order {kgQuantity} KG via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-6 rounded-full border border-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider transition-all ${
                      addedSuccess
                        ? 'bg-[var(--color-olive)] text-[var(--color-cream)] border-[var(--color-olive)]'
                        : 'bg-transparent text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)]'
                    }`}
                  >
                    {addedSuccess ? `✓ Added ${totalPacks} Packs (${kgQuantity} KG) to Cart` : `Add ${kgQuantity} KG to Cart`}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
