'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {
  // Filter categories
  const categories = ['All', 'Web Design', 'UI/UX', 'Branding', 'Development'];
  const [activeFilter, setActiveFilter] = useState('All');

  // For custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Track scroll position for parallax effects
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Luminary E-Commerce Platform",
      category: "Development",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-blue-400 to-indigo-600"
    },
    {
      id: 2,
      title: "Nebula App Redesign",
      category: "UI/UX",
      tags: ["Mobile", "User Experience", "Interface Design"],
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-emerald-400 to-teal-600"
    },
    {
      id: 3,
      title: "Prism Creative Agency",
      category: "Branding",
      tags: ["Logo Design", "Identity", "Visual System"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-purple-400 to-pink-600"
    },
    {
      id: 4,
      title: "Horizon Finance Dashboard",
      category: "Web Design",
      tags: ["Dashboard", "Data Visualization", "UI Design"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-amber-400 to-orange-600"
    },
    {
      id: 5,
      title: "Quantum Health & Fitness",
      category: "UI/UX",
      tags: ["Website", "Mobile App", "UX Research"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-blue-400 to-cyan-600"
    },
    {
      id: 6,
      title: "Echo Music Streaming",
      category: "Development",
      tags: ["Full Stack", "React Native", "API Integration"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-red-400 to-rose-600"
    },
    {
      id: 7,
      title: "Terra Sustainability",
      category: "Branding",
      tags: ["Brand Strategy", "Visual Identity", "Marketing"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-green-400 to-emerald-600"
    },
    {
      id: 8,
      title: "Pulse News Platform",
      category: "Web Design",
      tags: ["Responsive", "Content Strategy", "Information Architecture"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
      color: "from-violet-400 to-purple-600"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Custom cursor variants
  const cursorVariants = {
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
    <div className="min-h-screen bg-gray-50">
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Hero section with parallax */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-gray-900 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{ y: scrollY * 0.5 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Projects background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Projects</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of award-winning digital experiences that push the boundaries of design and technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        {/* Project filters */}
        <motion.div
          className="flex flex-wrap justify-center mb-12 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
                onMouseEnter={() => setCursorVariant("project")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-2 mb-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} opacity-90`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-sm text-white/80">{project.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{project.category}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="text-blue-600 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-600">
              We couldn't find any projects in the "{activeFilter}" category.
            </p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full inline-flex items-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              View all projects
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Contact CTA Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have a project in mind?
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              We'd love to hear about your ideas and help bring them to life with our design expertise.
            </p>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-blue-900 font-medium hover:bg-opacity-95 transition-all duration-300 inline-flex items-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Get in Touch
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

