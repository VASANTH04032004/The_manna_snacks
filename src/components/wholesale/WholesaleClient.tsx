'use client';

import KineticText from '@/components/ui/KineticText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PricingTable from './PricingTable';
import InquiryForm from './InquiryForm';
import CertBadges from './CertBadges';

export default function WholesaleClient() {
  return (
    <div className="section-spacing">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <p className="label label-gold mb-6">Partner With Us</p>
            <KineticText
              text="Wholesale Partnership"
              tag="h1"
              className="mb-8"
            />
            <p className="text-lg opacity-70 max-w-xl">
              Bring the authentic taste of South India to your shelves. We offer competitive pricing, dedicated support, and premium quality snacks for retailers, distributors, and corporate gifting.
            </p>
          </div>
        </ScrollReveal>

        <PricingTable />

        <ScrollReveal>
          <div className="mt-24 mb-12">
            <div className="hairline mb-12" />
            <h2 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Partner Application</h2>
            <p className="opacity-70 max-w-2xl">
              Ready to elevate your snack offerings? Fill out the form below and our wholesale team will get in touch with you.
            </p>
          </div>
        </ScrollReveal>

        <InquiryForm />

        <CertBadges />
      </div>
    </div>
  );
}
