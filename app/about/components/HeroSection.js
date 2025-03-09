'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <div className="relative bg-gray-50 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-800 opacity-20"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        We're <span className="text-blue-600">Studio Vertex</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                        A creative design studio crafting digital experiences that inspire, engage, and deliver results.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
