
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import TeamSection from './components/TeamSection';
import ExpertiseSection from './components/ExpertiseSection';
import CTASection from './components/CTASection';
import ValuesSection from './components/ValuesSection';
import TestimonialsSection from './components/TestimonialsSection';

export const metadata = {
  title: "About Krunal Akbari | Digital Designer & Branding Expert",
  description:
    "Learn more about Krunal Akbari, a digital designer specializing in UX/UI, web development, brand identity, and digital marketing. Discover the journey and expertise behind the brand.",
  keywords: "About Krunal Akbari, UX/UI, web development, brand identity, digital marketing, designer, branding expert",
  alternates: {
    canonical: "https://krunalakbari.in/about",
  },
  openGraph: {
    title: "About Krunal Akbari | Digital Designer & Branding Expert",
    description:
      "Discover the story behind Krunal Akbari and his expertise in UX/UI design, web development, and digital branding.",
    url: "https://krunalakbari.in/about",
    siteName: "Krunal Akbari",
    images: [
      {
        url: "https://krunalakbari.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Krunal Akbari Digital Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Krunal Akbari | Digital Designer & Branding Expert",
    description:
      "Learn about Krunal Akbari's journey in digital design, UX/UI, web development, and brand strategy.",
    images: ["https://krunalakbari.in/og-image.jpg"],
  },
};



export default function AboutPage() {
    return (
        <div className="bg-white">

            <HeroSection />
            <StorySection />
            <ValuesSection />
            <ExpertiseSection />
            <TeamSection />
            <TestimonialsSection />
            <CTASection />

        </div>
    );
}




