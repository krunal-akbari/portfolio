'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsSection({ setCursorVariant }) {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const projects = [
    {
      id: 1,
      title: "Nebula App Redesign",
      category: "UI/UX Design",
      description: "Complete overhaul of user experience for the Nebula productivity platform",
      image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "Luminary E-Commerce",
      category: "Web Development",
      description: "End-to-end e-commerce solution with custom CMS and payment integration",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      color: "from-emerald-400 to-teal-600",
    },
    {
      id: 3,
      title: "Prism Brand Identity",
      category: "Branding",
      description: "Comprehensive visual identity for an AR technology startup",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      color: "from-purple-400 to-indigo-600",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-blue-600 font-medium mb-2">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`rounded-2xl overflow-hidden group ${index === 0 ? 'lg:col-span-2' : ''}`}
              onMouseEnter={() => setCursorVariant("project")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Link href={`/projects/${project.id}`} className="block relative">
                <div className="aspect-video lg:aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} mb-3`}>
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/80 max-w-xl mb-4">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium">
                    View Case Study
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            View All Projects
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
