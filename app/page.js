import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Krunal Akbari | Digital Design Studio & Branding Expert",
    description: "Elevate your brand with innovative digital design & strategy. Krunal Akbari specializes in UX/UI, web development, brand identity, and digital marketing.",
};

import  HomePageComponent  from "@/components/HomePageComponent";
export default function HomePage() {
    return <HomePageComponent />;
}

