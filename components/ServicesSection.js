'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesSection({ setCursorVariant }) {
  const services = [
    {
      icon: "✦",
      title: "UX/UI Design",
      description: "Creating intuitive, accessible, and delightful user experiences across web and mobile platforms.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: "◈",
      title: "Web Development",
      description: "Building performant, responsive, and secure websites and web applications with modern technologies.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: "◎",
      title: "Brand Identity",
      description: "Crafting distinctive brand identities with strategic positioning, visual systems, and messaging.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: "◇",
      title: "Digital Marketing",
      description: "Developing data-driven digital marketing strategies to increase visibility and drive conversions.",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="inline-block text-sm uppercase tracking-widest text-blue-600 font-medium mb-2">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services We Provide
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We combine strategy, design, and technology to create digital experiences that drive real business value.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Explore Services
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${service.color} text-xl mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
