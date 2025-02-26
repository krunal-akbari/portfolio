import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata = {
  title: 'Contact Us to Build ',
  description: 'Some one is with you to create best application'
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
