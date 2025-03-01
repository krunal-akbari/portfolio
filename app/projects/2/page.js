'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetailPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(0);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Project data (in a real app, this would come from an API/CMS)
    const project = {
        id: 1,
        title: "Artisan Brew Co.",
        subtitle: "E-commerce & Brand Identity",
        client: "Artisan Craft Brewery",
        year: "2023",
        duration: "12 weeks",
        category: "Web Development, E-commerce, Branding",
        heroImage: "/images/projects/artisan-brew-hero.jpg", // These would be your actual image paths
        thumbnails: [
            "/images/projects/artisan-1.jpg",
            "/images/projects/artisan-2.jpg",
            "/images/projects/artisan-3.jpg",
            "/images/projects/artisan-4.jpg",
            "/images/projects/artisan-5.jpg",
        ],
        overview: "Artisan Brew Co. needed a complete digital transformation to expand their market reach and establish an e-commerce presence. Our team developed a comprehensive solution that included brand refinement, a custom e-commerce platform, and a unique digital experience that captures the essence of their craft brewing process.",
        challenge: "The client was struggling with an outdated website that failed to convey their brand story and couldn't support direct online sales. They needed a solution that would showcase their artisanal brewing process while providing a seamless shopping experience for customers nationwide.",
        approach: [
            {
                title: "Discovery & Strategy",
                description: "We conducted extensive research into the craft beer industry, competitive analysis, and customer interviews to understand the unique positioning opportunities for Artisan Brew Co."
            },
            {
                title: "Brand Refinement",
                description: "Working with their existing logo, we expanded the brand system with a refined color palette, typography, and visual language that expressed their artisanal quality and heritage."
            },
            {
                title: "UX Design",
                description: "We designed an intuitive user experience that guides visitors through the brand story, brewing process, and product catalog with engaging interactions and micro-animations."
            },
            {
                title: "Development",
                description: "Built on Next.js with a headless CMS, the site features custom animations, a product filtering system, and seamless integration with their inventory management system."
            }
        ],
        technologies: ["Next.js", "Framer Motion", "Sanity CMS", "Stripe", "TailwindCSS", "GraphQL", "Vercel"],
        results: [
            "175% increase in online sales within first 3 months",
            "68% improvement in average time spent on site",
            "42% increase in returning customers",
            "Successful expansion into 3 new regional markets"
        ],
        testimonial: {
            quote: "The team delivered beyond our expectations. Not only is the website visually stunning, but it's also driving real business results. The attention to detail in conveying our brewing story while creating a seamless shopping experience has transformed how we connect with our customers.",
            author: "James Wilson",
            position: "Founder, Artisan Brew Co."
        },
        relatedProjects: [
            { id: 2, title: "Nomad Workspace", category: "Web Design", image: "/images/projects/related-1.jpg" },
            { id: 3, title: "Fresh Harvest Delivery", category: "E-commerce", image: "/images/projects/related-2.jpg" },
            { id: 4, title: "Zenith Financial App", category: "UI/UX, Development", image: "/images/projects/related-3.jpg" }
        ]
    };

    // Open lightbox with specific image
    const openLightbox = (index) => {
        setLightboxImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    // Navigate lightbox images
    const navigateLightbox = (direction) => {
        const newIndex = (lightboxImage + direction + project.thumbnails.length) % project.thumbnails.length;
        setLightboxImage(newIndex);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Parallax Hero Section */}
            <motion.section
                ref={heroRef}
                className="relative h-screen w-full overflow-hidden"
                style={{ opacity: heroOpacity }}
            >
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        scale: heroScale,
                        y: heroY
                    }}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative h-full w-full">
                        {/* This would be your actual image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-800" />
                    </div>
                </motion.div>

                <div className="relative z-20 h-full flex flex-col justify-end container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                            {project.subtitle}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Project Overview */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-10 items-start">
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            {project.overview}
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            {project.challenge}
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-50 rounded-xl p-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Client</p>
                                <p className="font-medium text-gray-900">{project.client}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Year</p>
                                <p className="font-medium text-gray-900">{project.year}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Timeline</p>
                                <p className="font-medium text-gray-900">{project.duration}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Services</p>
                                <p className="font-medium text-gray-900">{project.category}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Showcased Images */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-10 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Project Showcase
                    </motion.h2>

                    {/* Main Showcase Image */}
                    <motion.div
                        className="relative aspect-video mb-8 overflow-hidden rounded-xl cursor-pointer shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => openLightbox(currentImage)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                            View Project Images
                        </div>
                    </motion.div>

                    {/* Thumbnail Navigation */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        {project.thumbnails.map((thumb, index) => (
                            <motion.div
                                key={index}
                                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${currentImage === index ? 'ring-2 ring-indigo-500' : ''
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    setCurrentImage(index);
                                    openLightbox(index);
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A strategic, phased approach delivered exceptional results for Artisan Brew Co.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16">
                    {project.approach.map((phase, index) => (
                        <motion.div
                            key={index}
                            className="flex"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mr-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl">
                                    {index + 1}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                                <p className="text-gray-600">{phase.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Results Section */}
            <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                            Our solution delivered measurable business impact and exceeded client expectations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {project.results.map((result, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="text-white">
                                    {result}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-8 left-8 text-indigo-200">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl text-gray-600 italic mb-8">
                            "{project.testimonial.quote}"
                        </p>

                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4"></div>
                            <div>
                                <p className="font-medium text-gray-900">{project.testimonial.author}</p>
                                <p className="text-gray-500">{project.testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Related Projects */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Projects</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore more of our work in similar industries and services
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {project.relatedProjects.map((related, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <Link href={`/projects/${related.id}`}
                                    className="block"
                                >
                                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-white font-medium">View Project</div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{related.title}</h3>
                                    <p className="text-gray-500">{related.category}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Navigation */}
            <section className="py-16 border-t border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Link href="/projects/4"
                            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors mb-4 md:mb-0"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous Project
                        </Link>

                        <Link href="/projects"
                            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                        >
                            All Projects
                        </Link>

                        <Link href="/projects/2"
                            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Next Project
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Create Your Success Story?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Let's discuss how we can transform your digital presence and achieve measurable results.
                        </p>
                        <Link href="/contact"
                            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all"
                        >
                            Start Your Project
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
                            onClick={closeLightbox}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Close</span>
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox(-1);
                            }}
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </button>

                        <motion.div
                            className="relative max-w-6xl max-h-full"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full h-full aspect-video bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                                {/* In a real app, this would be your actual image */}
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    Project Image {lightboxImage + 1}
                                </div>
                            </div>
                        </motion.div>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox(1);
                            }}
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </button>

                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                            <div className="flex space-x-2">
                                {project.thumbnails.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2.5 h-2.5 rounded-full ${lightboxImage === index ? 'bg-white' : 'bg-white/40'
                                            }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLightboxImage(index);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetailPage;

