'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Our Story */}
            <StorySection />

            {/* Our Values */}
            <ValuesSection />

            {/* Our Expertise */}
            <ExpertiseSection />

            {/* Team Section */}
            <TeamSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
}

// Hero Section
function HeroSection() {
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

// Story Section
function StorySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div className="py-16 bg-white overflow-hidden lg:py-24" ref={ref}>
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="relative">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Our Story
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500"
                    >
                        From humble beginnings to award-winning designs
                    </motion.p>
                </div>

                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                                Founded with passion in 2018
                            </h3>
                            <p className="mt-3 text-lg text-gray-500">
                                Studio Vertex was born from a shared vision between two designers who believed in creating meaningful digital experiences. What started as freelance collaborations from a small apartment has grown into a boutique design studio with clients worldwide.
                            </p>

                            <dl className="mt-10 space-y-10">
                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Global perspective</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        We've worked with clients across 15 countries, bringing diverse cultural insights to every project.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Rapid growth</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        From 2 founders to a team of 12 creative professionals in just 5 years of business.
                                    </dd>
                                </div>
                            </dl>
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-10 -mx-4 relative lg:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <div className="relative h-80 md:h-96 rounded-xl shadow-xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="Our team collaborating"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Values Section
function ValuesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const values = [
        {
            name: 'Purposeful Design',
            description: 'Every design choice serves both aesthetic and functional purposes. We believe great design solves problems elegantly.',
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            name: 'Collaborative Spirit',
            description: 'We view clients as partners in the creative process. Your insights combined with our expertise create the best outcomes.',
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            name: 'Continuous Learning',
            description: 'The digital landscape evolves rapidly. We stay at the forefront through constant learning and experimentation.',
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            name: 'Attention to Detail',
            description: 'The smallest details often make the biggest impact. We obsess over the details that transform good design into great design.',
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-gray-50 py-16 lg:py-24" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <motion.h2
                        className="text-base text-blue-600 font-semibold tracking-wide uppercase"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Our Values
                    </motion.h2>
                    <motion.p
                        className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        What guides our creative process
                    </motion.p>
                    <motion.p
                        className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        These core principles shape our approach to every project and client relationship.
                    </motion.p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.name}
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                            >
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        {value.icon}
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{value.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">{value.description}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

// Expertise Section
function ExpertiseSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div className="py-16 bg-white lg:py-24" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="lg:text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Expertise</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        What we do best
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Our team brings diverse skills to create cohesive digital experiences.
                    </p>
                </motion.div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'UI/UX Design',
                                description: 'Creating intuitive, accessible, and delightful user experiences across platforms.',
                                image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                            },
                            {
                                title: 'Web Development',
                                description: 'Building responsive, performance-optimized websites and web applications.',
                                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                            },
                            {
                                title: 'Brand Identity',
                                description: 'Crafting memorable brands with visual systems that tell compelling stories.',
                                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                            },
                        ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.15) }}
                                >
                                    <div className="w-full h-48 mb-6 relative rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-3 text-base text-gray-500">{item.description}</p>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Team Section
function TeamSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const team = [
        {
            name: 'Alex Morgan',
            role: 'Founder & Creative Director',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            bio: 'With over 15 years in design, Alex leads our creative vision and ensures every project upholds our quality standards.',
        },
        {
            name: 'Samantha Chen',
            role: 'Lead UX Designer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            bio: 'Sam transforms complex problems into intuitive user experiences. Her background in psychology gives her unique insight into user behavior.',
        },
        {
            name: 'Marcus Williams',
            role: 'Senior Developer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            bio: 'Marcus brings designs to life with clean, efficient code. He specializes in creating performant, accessible web applications.',
        },
        {
            name: 'Elena Rodriguez',
            role: 'Brand Strategist',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            bio: 'Elena helps clients discover and articulate their unique brand voice, creating cohesive brand experiences across all touchpoints.',
        },
    ];

    return (
        <div className="bg-gray-50 py-16 lg:py-24" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Meet our team
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        A collective of passionate creative professionals
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((person, index) => (
                        <motion.div
                            key={person.name}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                        >
                            <div className="relative h-64">
                                <Image
                                    className="object-cover"
                                    src={person.image}
                                    alt={person.name}
                                    fill
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
                                <p className="text-sm text-blue-600 mb-3">{person.role}</p>
                                <p className="text-gray-600 text-sm">{person.bio}</p>

                                <div className="mt-4 flex space-x-3">
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.278-1.39-2.278-1.39 0-1.601 1.084-1.601 2.205v4.25H8.014v-8.59h2.559v1.174h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.202 1.778 3.202 4.091v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Link
                            href="/team"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            View full team
                            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const testimonials = [
        {
            content: "Working with Studio Vertex transformed our brand. Their attention to detail and strategic approach helped us increase engagement by 47% within three months of launch.",
            author: "Sarah Johnson",
            role: "Marketing Director, Novus Tech",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
        },
        {
            content: "The team at Studio Vertex doesn't just deliver beautiful designs—they create strategic solutions that drive business results. They're now our go-to partner for all digital initiatives.",
            author: "Michael Chen",
            role: "CEO, Bright Ventures",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
        },
        {
            content: "We needed a complete website overhaul that would reflect our brand evolution. Studio Vertex delivered a site that not only looks stunning but has dramatically improved our conversion rates.",
            author: "Emily Roberts",
            role: "Founder, EcoStyle",
            image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
        }
    ];

    return (
        <div className="bg-white py-16 lg:py-24" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        What our clients say
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Success stories from businesses we've helped
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            className="bg-gray-50 rounded-xl p-8 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + (index * 0.15) }}
                        >
                            <div className="relative">
                                <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className="relative text-lg text-gray-600">{testimonial.content}</p>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full relative overflow-hidden">
                                        <Image
                                            className="object-cover"
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <div className="text-base font-medium text-gray-900">{testimonial.author}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// CTA Section
function CTASection() {
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

