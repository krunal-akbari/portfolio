'use client';


import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ setCursorVariant }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            {/* Parallax background elements */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: y1, opacity }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-[100px] opacity-40" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-purple-500 blur-[120px] opacity-30" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-500 blur-[80px] opacity-20" />
            </motion.div>

            {/* Hero content */}
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-6"
                    >
                        <span className="inline-block text-sm md:text-base uppercase tracking-widest bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-medium">
                            Digital Design Studio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
                    >
                        We Create <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                            Digital Experiences
                        </span> <br className="hidden md:block" />
                        That Inspire
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
                    >
                        Transforming brands through strategic design and innovative technology solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/projects"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                            onMouseEnter={() => setCursorVariant("button")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            View Our Work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
                            onMouseEnter={() => setCursorVariant("button")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400 mb-2">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                    >
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
