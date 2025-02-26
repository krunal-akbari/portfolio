import { Geist, Geist_Mono } from "next/font/google";
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Krunal",
    description: "This is a app where you can contact me",
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <GoogleTagManager gtmId="GTM-T7HGCDLT" />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
