'use client'
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialsSection() {
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
