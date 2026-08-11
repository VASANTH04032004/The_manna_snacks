import ClientLayout from '@/components/layout/ClientLayout';
import RetailClient from '@/components/retail/RetailClient';

export const metadata = {
  title: 'Shop Retail | The Manna Snacks',
  description: 'Shop our collection of handcrafted South Indian snacks by Vel Brothers Food Products.',
};

export default function RetailPage() {
  return (
    <ClientLayout>
      <RetailClient />
    </ClientLayout>
  );
}
