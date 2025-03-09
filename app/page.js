import { Metadata } from "next";

// app/metadata.js

export const metadata = {
  title: "Krunal Akbari | Digital Design Studio & Branding Expert",
  description:
    "Elevate your brand with innovative digital design & strategy. Krunal Akbari specializes in UX/UI, web development, brand identity, and digital marketing.",
  keywords: "UX/UI, web development, brand identity, digital marketing, Krunal Akbari",
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

import HomePageComponent from "@/components/HomePageComponent";
export default function HomePage() {
    return <HomePageComponent />;
}

