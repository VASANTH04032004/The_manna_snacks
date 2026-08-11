'use client';

import KineticText from '@/components/ui/KineticText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ShopGrid from './ShopGrid';

export default function RetailClient() {
  return (
    <>
      <div className="section-spacing">
        <div className="container-editorial">
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <p className="label label-gold mb-6">Our Collection</p>
              <KineticText
                text="Shop Retail"
                tag="h1"
                className="mb-8"
              />
              <p className="text-lg opacity-70 max-w-xl">
                Discover our range of handcrafted South Indian snacks. Made with premium ingredients and traditional recipes to bring you the authentic taste of home.
              </p>
            </div>
          </ScrollReveal>

          <ShopGrid />
        </div>
      </div>
    </>
  );
}
