'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const FAQPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const searchRef = useRef(null);

    const categories = [
        { id: 'all', name: 'All Questions' },
        { id: 'services', name: 'Our Services' },
        { id: 'process', name: 'Work Process' },
        { id: 'pricing', name: 'Pricing & Payment' },
        { id: 'support', name: 'Support & Maintenance' },
    ];

    const faqItems = [
        { id: 1,
            category: 'services',
            question: 'What services do you offer?',
            answer: 'We offer comprehensive digital solutions including web design and development, mobile app development, e-commerce solutions, UI/UX design, brand identity design, digital marketing, and custom web application development. Each service is tailored to meet the unique needs of your business.'
        },
        { id: 2,
            category: 'services',
            question: 'Do you work with specific industries?',
            answer: 'We work with clients across various industries including tech startups, e-commerce businesses, healthcare, education, finance, and creative industries. Our diverse experience allows us to bring fresh perspectives while understanding industry-specific requirements and challenges.'
        },
        { id: 3,
            category: 'process',
            question: 'How long does it take to complete a project?',
            answer: 'Project timelines vary based on scope and complexity. Small websites typically take 4-8 weeks, while larger projects with custom functionality may take 8-12 weeks or more. During our initial consultation, we\'ll provide a timeline estimate specific to your project needs, with clear milestones throughout the development process.' },
        { id: 4,
            category: 'process',
            question: 'What is your design process like?',
            answer: 'Our design process begins with discovery and research, followed by wireframing and prototyping. We then create visual designs and interactive prototypes for your review. After incorporating feedback, we finalize designs before moving to development. We encourage collaboration throughout to ensure the final product matches your vision.'
        },
        {
            id: 5,
            category: 'pricing',
            question: 'How much does a website cost?',
            answer: 'Our websites start at $500 for basic projects, with more complex websites ranging from $1,200 to $2,500+. Enterprise solutions are custom-quoted based on specific requirements. We provide detailed proposals that break down costs for complete transparency, and offer flexible payment schedules for larger projects.'
        },
        {
            id: 6,
            category: 'pricing',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, bank transfers, and PayPal. For larger projects, we typically work with a 50% deposit to begin work, with the remaining balance due upon project completion. We can also arrange milestone-based payment schedules for extended projects.'
        },
        {
            id: 7,
            category: 'pricing',
            question: 'Do you offer maintenance packages?',
            answer: 'Yes, we offer various maintenance packages to keep your site secure, updated, and performing optimally. These range from basic monitoring and updates to comprehensive plans including content updates, performance optimization, and regular consultations. We can customize a maintenance plan to fit your specific needs and budget.'
        },
        {
            id: 8,
            category: 'support',
            question: 'What kind of support do you provide after launch?',
            answer: 'Post-launch, we provide technical support, bug fixes, and guidance on using your new digital tools. Our standard support period is 30 days after launch, included with every project. Extended support packages are available for ongoing assistance, content updates, feature additions, and performance monitoring.'
        },
        {
            id: 9,
            category: 'support',
            question: 'How do you handle website hosting?',
            answer: 'While we don\'t provide hosting directly, we work with premium hosting providers and can manage the setup and configuration on your behalf.We\'ll recommend hosting solutions based on your project\'s technical requirements, expected traffic, and budget.We ensure smooth deployment and provide documentation for accessing your hosting environment.'
        },
        {
            id: 10,
            category: 'services',
            question: 'Can you redesign my existing website?',
            answer: 'Absolutely! We specialize in website redesigns that improve both aesthetics and performance. Our process includes analyzing your current site, identifying improvement opportunities, and creating a modernized design while preserving your brand identity. We can also enhance functionality and optimize for better conversion rates during the redesign.'
        },
        {
            id: 11,
            category: 'process',
            question: 'Will my website be mobile-friendly?',
            answer: 'Yes, all our websites are built with a mobile-first approach, ensuring they look and function perfectly across all devices including smartphones, tablets, laptops, and desktops. We extensively test on multiple devices and browsers to guarantee responsive performance and consistent user experience regardless of screen size.'
        },
        {
            id: 12,
            category: 'support',
            question: 'Do you provide training for content management?',
            answer: 'Yes, we provide comprehensive training to ensure you\'re comfortable managing your website content.This includes personalized walkthrough sessions, video tutorials, and detailed documentation customized to your specific CMS implementation.Additional training sessions can be arranged as needed for new team members or advanced features.'
        }
    ];

    const filteredFAQs = faqItems
        .filter(item => activeCategory === 'all' || item.category === activeCategory)
        .filter(item =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    useEffect(() => {
        // Reset expanded item when category changes
        setExpandedId(null);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Search */}
            <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 -z-10"></div>

                {/* Animated Shapes */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full blur-3xl -z-10"></div>

                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Find answers to common questions about our services, process, and more. If you can't find what you're looking for, don't hesitate to contact us.
                    </p>

                    {/* Search Bar */}
                    <motion.div
                        className="relative max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="relative">
                            <input
                                ref={searchRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for answers..."
                                className="w-full py-4 pl-14 pr-4 text-gray-700 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Category Tabs */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    className="flex flex-wrap justify-center gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${activeCategory === category.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq) => (
                            <motion.div
                                key={faq.id}
                                variants={fadeIn}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                            >
                                <button
                                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                                    className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
                                >
                                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                                    <div className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 transition-transform duration-300 ${expandedId === faq.id ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {expandedId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-3">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            variants={fadeIn}
                            className="text-center py-12"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find any FAQs matching your search. Try different keywords or browse by category.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveCategory('all');
                                    if (searchRef.current) searchRef.current.focus();
                                }}
                                className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                            >
                                Clear search and show all FAQs
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* Still Have Questions */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl max-w-7xl mx-auto mb-20">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Still Have Questions?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        We're here to help. If you can't find the answer you're looking for, please reach out to our team.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact"
                            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all" >
                                Contact Us
                        </Link>
                        <a
                            href="mailto:hello@yourdomain.com"
                            className="inline-block bg-transparent text-white border border-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-all"
                        >
                            Email Support
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Resources Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Additional Resources
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our helpful resources for more detailed information
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Our Process Guide",
                            description: "A detailed look at our development process from start to finish",
                            link: "/process",
                            icon: "document"
                        },
                        {
                            title: "Pricing Information",
                            description: "Transparent pricing details and payment options for our services",
                            link: "/pricing",
                            icon: "currency"
                        },
                        {
                            title: "Portfolio & Case Studies",
                            description: "Explore our past work and client success stories",
                            link: "/projects",
                            icon: "portfolio"
                        }
                    ].map((resource, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="p-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {resource.icon === "document" && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        )}
                                        {resource.icon === "currency" && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                        {resource.icon === "portfolio" && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        )}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                                <p className="text-gray-600 mb-4">{resource.description}</p>
                                <Link
                                 href={resource.link}
                                 className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                                >
                                        Learn more
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
