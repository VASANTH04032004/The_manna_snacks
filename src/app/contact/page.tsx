import ClientLayout from '@/components/layout/ClientLayout';
import ContactClient from '@/components/contact/ContactClient';

export const metadata = {
  title: 'Contact Us | The Manna Snacks',
  description: 'Get in touch with The Manna Snacks (Vel Brothers Food Products) for inquiries, feedback, or wholesale partnership.',
};

export default function ContactPage() {
  return (
    <ClientLayout>
      <ContactClient />
    </ClientLayout>
  );
}
