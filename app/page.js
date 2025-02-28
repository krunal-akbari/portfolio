'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function HomePage() {
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

// Hero Section with Parallax
function HeroSection({ setCursorVariant }) {
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

// Projects Section
function ProjectsSection({ setCursorVariant }) {
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

// Services Section
function ServicesSection({ setCursorVariant }) {
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

// Creative Process Section
function ProcessSection({ setCursorVariant }) {
  const processes = [
    {
      number: "01",
      title: "Discovery",
      description: "We dig deep to understand your business, audience, and objectives through collaborative workshops.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Based on research insights, we develop a strategic roadmap to guide the creative and technical process.",
    },
    {
      number: "03",
      title: "Design",
      description: "Our designers create intuitive, beautiful experiences that align with your brand and user needs.",
    },
    {
      number: "04",
      title: "Development",
      description: "We build robust, scalable solutions using modern technologies and development practices.",
    },
    {
      number: "05",
      title: "Launch",
      description: "After thorough testing, we deploy your project and provide training and documentation.",
    },
    {
      number: "06",
      title: "Support",
      description: "We offer ongoing support and optimization to ensure your digital product continues to evolve.",
    }
  ];

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-500 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-blue-400 font-medium mb-2">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Creative Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A structured approach that ensures we deliver exceptional results for every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={process.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="p-8 rounded-2xl border border-gray-800 hover:border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:transform hover:translate-y-[-8px] transition-all duration-300"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="text-5xl font-bold text-blue-500 opacity-40 mb-4">{process.number}</div>
              <h3 className="text-2xl font-bold mb-3">{process.title}</h3>
              <p className="text-gray-400">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection({ setCursorVariant }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Working with Studio Vertex transformed our brand. Their strategic approach and creative execution helped us increase user engagement by 47% within three months of launching our new platform.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechNova",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "Studio Vertex doesn't just deliver beautiful designs—they create strategic solutions that drive business results. They're our go-to partner for all digital initiatives.",
      author: "Michael Chen",
      role: "CEO, GrowthPoint Ventures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "We needed a complete website overhaul that would reflect our brand evolution. Studio Vertex delivered a site that not only looks stunning but has dramatically improved our conversion rates.",
      author: "Emily Roberts",
      role: "Founder, EcoStyle",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-blue-600 font-medium mb-2">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 rounded-3xl p-8 md:p-12 relative"
              >
                <div className="absolute top-0 left-12 transform -translate-y-1/2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xl md:text-2xl text-gray-700 mb-8">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{testimonials[currentIndex].author}</h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Awards Section
function AwardsSection({ setCursorVariant }) {
  const awards = [
    {
      icon: "🏆",
      title: "Webby Awards",
      description: "Nominee for Best Visual Design",
      year: "2023",
    },
    {
      icon: "🎨",
      title: "Awwwards",
      description: "Site of the Day",
      year: "2022",
    },
    {
      icon: "✨",
      title: "CSS Design Awards",
      description: "Best UI Design",
      year: "2022",
    },
    {
      icon: "🌟",
      title: "FWA",
      description: "Site of the Month",
      year: "2021",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-blue-600 font-medium mb-2">
            Recognition
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Awards & Accolades
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 text-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="text-4xl mb-3 mx-auto">{award.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{award.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{award.description}</p>
              <p className="text-blue-600 text-sm font-medium">{award.year}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {['Forbes', 'TechCrunch', 'Wired', 'FastCompany', 'DesignWeek'].map((brand) => (
            <div key={brand} className="text-xl md:text-2xl font-bold text-gray-500">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA Section
function ContactCTA({ setCursorVariant }) {
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

