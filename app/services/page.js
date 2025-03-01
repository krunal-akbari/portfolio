'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ServicesPage = () => {
    const [activeTab, setActiveTab] = useState('web-development');
    const processRef = useRef(null);
    const isProcessInView = useInView(processRef, { once: false, amount: 0.2 });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
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

    const services = [
        {
            id: 'web-development',
            name: 'Web Development',
            icon: 'code',
            shortDesc: 'Custom websites and web applications built with cutting-edge technologies.',
            description: 'We create custom, high-performance websites and web applications tailored to your unique business needs. Our development team combines technical expertise with creative problem-solving to build solutions that drive results.',
            features: [
                'Custom website development',
                'Progressive Web Applications (PWAs)',
                'E-commerce solutions',
                'Content management systems',
                'API integration & development',
                'Performance optimization'
            ],
            gradient: 'from-blue-500 to-indigo-600',
            lightGradient: 'from-blue-50 to-indigo-50'
        },
        {
            id: 'ui-ux-design',
            name: 'UI/UX Design',
            icon: 'design',
            shortDesc: 'User-centered design that creates intuitive and engaging digital experiences.',
            description: 'Our design team crafts intuitive, accessible, and visually stunning user experiences. We focus on creating interfaces that not only look beautiful but also enhance usability and drive user engagement.',
            features: [
                'User research & persona development',
                'Information architecture',
                'Wireframing & prototyping',
                'Visual design & UI systems',
                'Usability testing',
                'Interaction design & animations'
            ],
            gradient: 'from-purple-500 to-pink-500',
            lightGradient: 'from-purple-50 to-pink-50'
        },
        {
            id: 'digital-branding',
            name: 'Digital Branding',
            icon: 'brand',
            shortDesc: 'Comprehensive brand identity design that establishes a powerful market presence.',
            description: 'We develop cohesive brand identities that communicate your values and resonate with your audience. From logo design to complete visual systems, we help businesses establish a distinctive and memorable presence.',
            features: [
                'Brand strategy & positioning',
                'Logo & visual identity design',
                'Brand guidelines & assets',
                'Marketing collateral',
                'Social media branding',
                'Brand messaging & tone of voice'
            ],
            gradient: 'from-amber-500 to-orange-600',
            lightGradient: 'from-amber-50 to-orange-50'
        },
        {
            id: 'e-commerce',
            name: 'E-Commerce',
            icon: 'shop',
            shortDesc: 'Powerful online stores that drive sales and deliver exceptional shopping experiences.',
            description: 'We build robust e-commerce solutions that convert visitors into customers. Our online stores combine seamless shopping experiences with powerful backend systems to help you sell more effectively online.',
            features: [
                'Custom e-commerce development',
                'Shopping cart & checkout optimization',
                'Payment gateway integration',
                'Inventory management systems',
                'Customer account portals',
                'Order fulfillment workflows'
            ],
            gradient: 'from-emerald-500 to-teal-600',
            lightGradient: 'from-emerald-50 to-teal-50'
        },
        {
            id: 'digital-marketing',
            name: 'Digital Marketing',
            icon: 'marketing',
            shortDesc: 'Results-driven strategies that increase visibility and drive qualified traffic.',
            description: 'Our data-driven marketing strategies help you reach your target audience and achieve meaningful business results. We focus on sustainable growth tactics that build your online presence and generate qualified leads.',
            features: [
                'Search engine optimization (SEO)',
                'Content marketing',
                'Social media management',
                'Email marketing campaigns',
                'PPC & display advertising',
                'Analytics & performance reporting'
            ],
            gradient: 'from-red-500 to-rose-600',
            lightGradient: 'from-red-50 to-rose-50'
        },
        {
            id: 'web-maintenance',
            name: 'Maintenance & Support',
            icon: 'support',
            shortDesc: 'Comprehensive care for your digital assets to ensure optimal performance.',
            description: 'We provide ongoing maintenance and support to keep your digital presence secure, up-to-date, and performing at its best. Our proactive approach helps prevent issues before they impact your business.',
            features: [
                'Website maintenance & updates',
                'Security monitoring & patches',
                'Performance optimization',
                'Content updates & management',
                'Technical support & troubleshooting',
                'Hosting management & monitoring'
            ],
            gradient: 'from-cyan-500 to-blue-600',
            lightGradient: 'from-cyan-50 to-blue-50'
        }
    ];

    const activeService = services.find(service => service.id === activeTab);

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'code':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
            case 'design':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                );
            case 'brand':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                );
            case 'shop':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                );
            case 'marketing':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                );
            case 'support':
                return (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-28 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 -z-10"></div>

                {/* Animated Shapes */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl -z-10"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                            We transform ideas into exceptional digital experiences through a perfect blend of
                            creativity, technology, and strategic thinking.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/contact"
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Get a Quote
                            </Link>
                            <Link href="/projects"
                                className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors" >
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Comprehensive Digital Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        End-to-end solutions to help your business thrive in the digital world
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            onClick={() => setActiveTab(service.id)}
                        >
                            <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                            <div className="p-6">
                                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${service.lightGradient} flex items-center justify-center text-gray-800 mb-4`}>
                                    {renderIcon(service.icon)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                                <button
                                    onClick={() => setActiveTab(service.id)}
                                    className={`text-sm font-medium inline-flex items-center ${activeTab === service.id ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                                >
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Selected Service Details */}
            <section className={`py-20 bg-gradient-to-r ${activeService.lightGradient}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            key={activeService.id} // Force re-render when service changes
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${activeService.gradient} text-white text-sm font-medium mb-4`}>
                                {activeService.name}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                How We Deliver Excellence in {activeService.name}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {activeService.description}
                            </p>

                            <div className="space-y-4 mb-8">
                                {activeService.features.map((feature, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${activeService.gradient} flex items-center justify-center text-white mr-3 mt-0.5`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700">{feature}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact"
                                    className={`px-6 py-3 bg-gradient-to-r ${activeService.gradient} hover:opacity-90 text-white font-medium rounded-lg transition-all text-center`}
                                >
                                    Discuss Your Project
                                </Link>
                                <Link href="/process"
                                    className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors text-center">
                                    Our Process
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            key={`image-${activeService.id}`}
                            className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${activeService.gradient} opacity-20`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${activeService.gradient} text-white flex items-center justify-center`}>
                                    {renderIcon(activeService.icon)}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section ref={processRef} className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Our Service Delivery Process
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A structured approach that ensures quality, efficiency, and exceptional results
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        {
                            step: 1,
                            title: "Discovery",
                            description: "We begin by understanding your business goals, target audience, and project requirements.",
                            color: "from-blue-500 to-indigo-600"
                        },
                        {
                            step: 2,
                            title: "Strategy & Planning",
                            description: "We develop a comprehensive plan outlining the approach, features, and timeline.",
                            color: "from-indigo-500 to-purple-600"
                        },
                        {
                            step: 3,
                            title: "Design & Development",
                            description: "Our team brings the vision to life through creative design and technical implementation.",
                            color: "from-purple-500 to-pink-600"
                        },
                        {
                            step: 4,
                            title: "Launch & Support",
                            description: "We ensure a smooth launch and provide ongoing support to ensure long-term success.",
                            color: "from-pink-500 to-rose-600"
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={step.step}
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Connector Line */}
                            {index < 3 && (
                                <div className="absolute top-10 left-full w-full h-1 bg-gray-200 -z-10 hidden md:block"></div>
                            )}

                            <div className="flex flex-col items-center text-center mb-2">
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-2xl font-bold mb-4`}>
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Link href="/process"
                        className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700"
                    >
                        Learn more about our process
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We deliver more than just services—we create valuable partnerships and exceptional results
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expert Team",
                                description: "Our multidisciplinary team brings years of experience and specialized expertise to every project.",
                                icon: "team"
                            },
                            {
                                title: "Tailored Solutions",
                                description: "We craft custom solutions designed to address your specific business challenges and goals.",
                                icon: "custom"
                            },
                            {
                                title: "Results-Driven Approach",
                                description: "We focus on delivering measurable outcomes that drive real business growth and success.",
                                icon: "results"
                            },
                            {
                                title: "Cutting-Edge Technology",
                                description: "We stay at the forefront of technology trends to provide innovative and future-proof solutions.",
                                icon: "tech"
                            },
                            {
                                title: "Transparent Communication",
                                description: "We maintain open, honest communication throughout the project lifecycle.",
                                icon: "communication"
                            },
                            {
                                title: "Ongoing Support",
                                description: "Our relationship doesn't end at launch—we provide continued support to ensure lasting success.",
                                icon: "support"
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-14 h-14 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {benefit.icon === 'team' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        )}
                                        {benefit.icon === 'custom' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                        )}
                                        {benefit.icon === 'results' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        )}
                                        {benefit.icon === 'tech' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        )}
                                        {benefit.icon === 'communication' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        )}
                                        {benefit.icon === 'support' && (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        )}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it—hear from the businesses we've helped succeed
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "The team delivered a website that exceeded our expectations. Their attention to detail and commitment to our vision transformed our digital presence.",
                            author: "Olivia Martinez",
                            position: "CEO, BrightFuture Inc."
                        },
                        {
                            quote: "Their comprehensive approach to digital branding and development brought our project to life. We saw instant results in user engagement.",
                            author: "Ethan Chen",
                            position: "Marketing Director, Urban Edge"
                        },
                        {
                            quote: "From planning to execution, the professionalism and creativity they demonstrated were exceptional. Our new e-commerce platform has boosted our sales significantly.",
                            author: "Sophia Patel",
                            position: "Founder, StyleSphere"
                        }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 001.414 0l4-4z" />
                                </svg>
                            </div>
                            <div className="pt-6">
                                <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final Call-to-Action */}
            <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Amplify Your Digital Presence?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Let's work together to transform your ideas into outstanding digital experiences.
                        </p>
                        <Link href="/contact"
                            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium px-10 py-4 rounded-lg transition-all"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

