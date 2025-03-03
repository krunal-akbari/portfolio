'use client';

import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactCTA from '@/components/ContactCTA';
import AwardsSection from '@/components/AwardsSection';
import TestimonialsSection from '@/components/Testimonials';
import ProcessSection from '@/components/ProcessSection';

import { useState,  useEffect } from 'react';
import { motion } from 'framer-motion';


export default function HomePageComponent() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            height: 32,
            width: 32,
        },
        project: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            backgroundColor: "rgba(75, 85, 255, 0.15)",
            border: "2px solid rgba(75, 85, 255, 0.4)",
            height: 80,
            width: 80,
            mixBlendMode: "difference",
        },
        button: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            height: 48,
            width: 48,
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Custom cursor */}
            <motion.div
                className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
                variants={variants}
                animate={cursorVariant}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />

            {/* Hero Section */}
            <HeroSection setCursorVariant={setCursorVariant} />

            {/* Featured Projects */}
            <ProjectsSection setCursorVariant={setCursorVariant} />

            {/* Services */}
            <ServicesSection setCursorVariant={setCursorVariant} />

            {/* Creative Process */}
            <ProcessSection setCursorVariant={setCursorVariant} />

            {/* Client Testimonials */}
            <TestimonialsSection setCursorVariant={setCursorVariant} />

            {/* Awards & Recognition */}
            <AwardsSection setCursorVariant={setCursorVariant} />

            {/* Contact CTA */}
            <ContactCTA setCursorVariant={setCursorVariant} />
        </div>
    );
}
