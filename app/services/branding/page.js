
import Braning from './component';

export const metadata = {
  title: "Branding Services | Transform Your Brand Identity",
  description:
    "Professional branding services to help your business stand out. Create memorable brand identities, logos, style guides, and brand strategies that connect with your audience.",
  keywords: "branding services, brand identity, logo design, brand strategy, visual identity, brand guidelines, rebranding",
  alternates: {
    canonical: "https://krunalakbari.in",
  },
  openGraph: {
    title: "Krunal Akbari | Digital Design Studio & Branding Expert",
    description:
      "Elevate your brand with innovative digital design & strategy. Krunal Akbari specializes in UX/UI, web development, brand identity, and digital marketing.",
    url: "https://krunalakbari.in",
    siteName: "Krunal Akbari",
    images: [
      {
        url: "https://krunalakbari.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krunal Akbari Digital Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krunal Akbari | Digital Design Studio & Branding Expert",
    description:
      "Elevate your brand with innovative digital design & strategy. Krunal Akbari specializes in UX/UI, web development, brand identity, and digital marketing.",
    images: ["https://krunalakbari.in/og-image.jpg"],
  },
};

// export const metadata = {
//   title: 'Branding Services | Transform Your Brand Identity',
//   description: 'Professional branding services to help your business stand out. We create memorable brand identities, logos, style guides, and brand strategies that connect with your audience.',
//   keywords: 'branding services, brand identity, logo design, brand strategy, visual identity, brand guidelines, rebranding',
//   openGraph: {
//     title: 'Branding Services | Transform Your Brand Identity',
//     description: 'Professional branding services to help your business stand out. We create memorable brand identities, logos, style guides, and brand strategies that connect with your audience.',
//     images: [{ url: '/images/branding-service-og.jpg' }],
//   },
// };

export default function BrandingService() {
    return <Braning />;
}
