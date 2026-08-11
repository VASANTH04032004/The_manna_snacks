'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/store';
import { playBubbleSound } from '@/lib/sound';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

// Dynamically import client-heavy components to avoid SSR hydration mismatches
const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const GrainOverlay = dynamic(() => import('@/components/ui/GrainOverlay'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/retail/CartDrawer'), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const isPreloaderDone = useUIStore((state) => state.isPreloaderDone);

  useEffect(() => {
    const handleGlobalClick = () => {
      playBubbleSound();
    };
    window.addEventListener('pointerdown', handleGlobalClick, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleGlobalClick);
    };
  }, []);

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      
      {!isPreloaderDone && <Preloader />}
      
      {isPreloaderDone && (
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20 md:pt-24">
            <PageTransition>{children}</PageTransition>
          </main>
          <CartDrawer />
          <Footer />
        </div>
      )}
    </>
  );
}
