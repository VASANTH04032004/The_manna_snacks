'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export default function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    totalPrice 
  } = useCartStore();
  const { prefersReducedMotion } = useDeviceCapability();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsCheckingOut(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const getWhatsAppLink = () => {
    const itemList = items
      .map((item, index) => `${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹${item.product.price.retail * item.quantity}`)
      .join('\n');
    
    const message = `*Hello The Manna Snacks / Vel Brothers!* 👋\n\nI would like to order / negotiate price for the following items:\n\n${itemList}\n\n*Estimated Total:* ₹${totalPrice()}\n*Total Items:* ${items.reduce((sum, item) => sum + item.quantity, 0)} pcs\n\nPlease let me know the best discounted price and delivery details.\n\n*My Details:*\nName:\nDelivery Location:`;
    
    return `https://wa.me/917402222232?text=${encodeURIComponent(message)}`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent("The Manna Snacks Order Inquiry & Price Negotiation");
    const body = encodeURIComponent(`Hello The Manna Snacks (Vel Brothers Food Products) Team,\n\nI would like to purchase the following items. Since the prices are negotiable for custom quantities, please contact me with options:\n\n${items.map(item => `- ${item.product.name} (Qty: ${item.quantity})`).join('\n')}\n\nEstimated Subtotal: ₹${totalPrice()}\n\nContact Details:\nName:\nPhone:\nCompany Name (Optional):\n\nThank you!`);
    return `mailto:sales@themannasnacks.com?subject=${subject}&body=${body}`;
  };

  const drawerVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    }
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={!prefersReducedMotion ? overlayVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
            className="fixed inset-0 bg-[var(--color-charcoal)]/40 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={!prefersReducedMotion ? drawerVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-cream)] shadow-2xl z-[70] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-charcoal-light)]">
              <h2 id="cart-title" className="font-display text-2xl text-[var(--color-charcoal)]">
                {isCheckingOut ? 'Instant WhatsApp Desk' : 'Your Cart'}
              </h2>
              <button 
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal-light)] transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {isCheckingOut ? (
                /* --- CHECKOUT / NEGOTIATE SCREEN --- */
                <div className="space-y-6">
                  <div className="p-4 bg-[var(--color-wheat)]/15 border border-[var(--color-wheat)]/40 rounded-2xl">
                    <h3 className="font-display text-lg text-[var(--color-terracotta)] mb-2 flex items-center gap-2">
                      <span>⭐</span> Direct Price Negotiation
                    </h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                      At The Manna Snacks (Vel Brothers Food Products), **all final prices are highly negotiable** for retail, events, and wholesale volume orders.
                    </p>
                  </div>

                  <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl">
                    <p className="text-xs font-semibold text-[#128C7E] uppercase tracking-wider mb-2">⚡ 1-Click WhatsApp Ordering</p>
                    <p className="text-sm text-[var(--color-charcoal)] opacity-90 leading-relaxed">
                      Click the button below to instantly load your complete cart of <strong>{items.length} snacks</strong> into WhatsApp and chat directly with our team!
                    </p>
                  </div>

                  <div>
                    <h4 className="label text-xs mb-3 text-[var(--color-charcoal-light)]">Contact Desk Info</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[#128C7E]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.058-2.129-.533-1.488-.616-2.457-2.115-2.53-2.213-.075-.098-.606-.807-.606-1.541 0-.734.385-1.096.522-1.246.137-.15.299-.187.399-.187.1 0 .199.002.285.007.091.004.212-.034.331.252.124.298.423 1.034.46 1.11.038.075.062.164.013.264-.05.099-.075.162-.149.25-.075.088-.158.196-.226.264-.075.075-.153.157-.066.307.087.149.387.639.83 1.034.57.509 1.05.666 1.2.741.149.075.237.062.325-.038.087-.1.374-.436.474-.585.099-.149.199-.124.336-.075.137.05.872.411 1.021.486.149.075.249.112.286.175.037.062.037.362-.107.767z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">WhatsApp / Phone Orders</p>
                          <a href="tel:+917402222232" className="text-base text-[var(--color-terracotta)] hover:underline font-semibold">+91 74022 22232</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[var(--color-olive)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email Desk</p>
                          <a href={getMailtoLink()} className="text-sm text-[var(--color-terracotta)] hover:underline">sales@themannasnacks.com</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-charcoal-light)]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[var(--color-charcoal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Packaging Unit &amp; Office</p>
                          <p className="text-xs opacity-70 leading-relaxed">
                            Vel Brothers Food Products<br />
                            173-C Govindhasamy Street, Thirunagar 7th Stop<br />
                            Thirunagar, Madurai – 625006
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : items.length === 0 ? (
                /* --- EMPTY CART SCREEN --- */
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[var(--color-charcoal)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-charcoal)] opacity-70 mb-6">Your cart is currently empty.</p>
                  <button onClick={closeCart} className="btn-outline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                /* --- STANDARD ITEMS LIST SCREEN --- */
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 rounded-2xl bg-[var(--color-cream-dark)]/50 border border-[var(--color-charcoal-light)]">
                      <div className="relative w-20 h-20 bg-[var(--color-cream)] rounded-xl overflow-hidden shrink-0">
                        {item.product.image && (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1.5"
                          />
                        )}
                      </div>
                      
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-[var(--color-charcoal)] line-clamp-1 text-sm">{item.product.name}</h3>
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-[var(--color-charcoal)] opacity-40 hover:opacity-100 transition-opacity p-1"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-[var(--color-charcoal)] font-semibold text-sm mb-auto">
                          ₹{item.product.price.retail * item.quantity} <span className="text-xs font-normal opacity-60">({item.quantity} × ₹{item.product.price.retail})</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[var(--color-charcoal-light)] rounded-full bg-[var(--color-cream)]">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal-light)] rounded-l-full font-bold"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal-light)] rounded-r-full font-bold"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-charcoal-light)] bg-[var(--color-cream-dark)]">
                {isCheckingOut ? (
                  /* Footer during Checkout */
                  <div className="flex flex-col gap-3">
                    <a 
                      href={getWhatsAppLink()} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-center flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.058-2.129-.533-1.488-.616-2.457-2.115-2.53-2.213-.075-.098-.606-.807-.606-1.541 0-.734.385-1.096.522-1.246.137-.15.299-.187.399-.187.1 0 .199.002.285.007.091.004.212-.034.331.252.124.298.423 1.034.46 1.11.038.075.062.164.013.264-.05.099-.075.162-.149.25-.075.088-.158.196-.226.264-.075.075-.153.157-.066.307.087.149.387.639.83 1.034.57.509 1.05.666 1.2.741.149.075.237.062.325-.038.087-.1.374-.436.474-.585.099-.149.199-.124.336-.075.137.05.872.411 1.021.486.149.075.249.112.286.175.037.062.037.362-.107.767z" />
                      </svg>
                      <span>Send Message to WhatsApp</span>
                    </a>

                    <a 
                      href={getMailtoLink()} 
                      className="btn-outline w-full py-3 text-center block text-xs"
                    >
                      Or Send Negotiable Inquiry Email
                    </a>

                    <button 
                      onClick={() => setIsCheckingOut(false)} 
                      className="text-xs font-medium text-[var(--color-charcoal)] opacity-70 hover:opacity-100 transition-opacity text-center py-1"
                    >
                      ← Back to Cart
                    </button>
                  </div>
                ) : (
                  /* Standard Cart Footer */
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[var(--color-charcoal)] opacity-70">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span className="font-display text-xl text-[var(--color-charcoal)]">₹{totalPrice()}</span>
                    </div>
                    <p className="text-xs text-[var(--color-charcoal)] opacity-60 mb-5">
                      Standard pricing. Single-click to order &amp; negotiate on WhatsApp.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <a 
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.058-2.129-.533-1.488-.616-2.457-2.115-2.53-2.213-.075-.098-.606-.807-.606-1.541 0-.734.385-1.096.522-1.246.137-.15.299-.187.399-.187.1 0 .199.002.285.007.091.004.212-.034.331.252.124.298.423 1.034.46 1.11.038.075.062.164.013.264-.05.099-.075.162-.149.25-.075.088-.158.196-.226.264-.075.075-.153.157-.066.307.087.149.387.639.83 1.034.57.509 1.05.666 1.2.741.149.075.237.062.325-.038.087-.1.374-.436.474-.585.099-.149.199-.124.336-.075.137.05.872.411 1.021.486.149.075.249.112.286.175.037.062.037.362-.107.767z" />
                        </svg>
                        <span>Direct WhatsApp Order</span>
                      </a>
                      <button 
                        onClick={() => setIsCheckingOut(true)}
                        className="btn-outline w-full py-2.5 text-center text-xs"
                      >
                        More Contact &amp; Email Options
                      </button>
                      <button onClick={closeCart} className="text-xs font-medium text-[var(--color-charcoal)] opacity-70 hover:opacity-100 transition-opacity text-center py-1">
                        Continue Shopping
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
