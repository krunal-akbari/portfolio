'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export default function ContactCTA({ setCursorVariant }) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full h-full blur-3xl opacity-20 transform -translate-x-1/2">
          <svg viewBox="0 0 1208 1024" className="absolute top-10 left-1/2 -translate-x-1/2 h-[120%] w-[300%]">
            <defs>
              <radialGradient id="radial-gradient" cx="604" cy="512" r="400" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#7c3aed" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="604" cy="512" r="400" fill="url(#radial-gradient)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              Let's collaborate to create digital experiences that exceed your expectations and drive real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-blue-900 font-medium hover:bg-opacity-95 transition-all duration-300"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full bg-blue-800 bg-opacity-50 backdrop-blur-sm text-white font-medium border border-blue-300/30 hover:bg-opacity-70 transition-all duration-300"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
