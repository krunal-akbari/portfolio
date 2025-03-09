'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';


export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div className="bg-blue-700" ref={ref}>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24 lg:flex lg:items-center lg:justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to bring your ideas to life?</span>
                        <span className="block text-blue-200">Let's start a project together.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-100">
                        Whether you need a complete digital transformation or have a specific project in mind,
                        we're here to help you create meaningful experiences.
                    </p>
                </motion.div>
                <motion.div
                    className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="inline-flex rounded-md shadow">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                        >
                            Get in touch
                        </Link>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500"
                        >
                            View our work
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
