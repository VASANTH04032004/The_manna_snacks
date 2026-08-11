import { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | The Manna Snacks',
  description: 'Learn about our story, our traditional recipes, and the process behind The Manna Snacks by Vel Brothers Food Products.',
};

export default function AboutPage() {
  return (
    <ClientLayout>
      <main>
        <AboutClient />
      </main>
    </ClientLayout>
  );
}
