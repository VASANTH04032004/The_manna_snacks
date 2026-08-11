import { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import { ProductsClient } from '@/components/products/ProductsClient';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore our range of traditional South Indian snacks, made with authentic recipes and premium ingredients.',
};

export default function ProductsPage() {
  return (
    <ClientLayout>
      <main>
        <ProductsClient products={products} />
      </main>
    </ClientLayout>
  );
}
