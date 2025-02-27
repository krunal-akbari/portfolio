'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProcessPage = () => {
    const [activeStep, setActiveStep] = useState(null);
    const processRef = useRef(null);
    const isInView = useInView(processRef, { once: false, amount: 0.2 });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const steps = [
        {
            id: 1,
            name: 'Discovery',
            icon: '/icons/discovery.svg',
            description: 'We begin by understanding your business goals, target audience, and project requirements through in-depth consultations and research.',
            deliverables: [
                'Client questionnaire',
                'Market research',
                'Competitor analysis',
                'Project scope document',
                'Initial timeline'
            ],
            color: 'from-blue-400 to-indigo-500'
        },
        {
            id: 2,
            name: 'Strategy',
            icon: '/icons/strategy.svg',
            description: 'Based on our findings, we develop a comprehensive strategy that outlines the approach, features, and technical specifications needed to achieve your goals.',
            deliverables: [
                'User personas',
                'Information architecture',
                'Content strategy',
                'Technical specifications',
                'Project roadmap'
            ],
            color: 'from-indigo-500 to-purple-600'
        },
        {
            id: 3,
            name: 'Design',
            icon: '/icons/design.svg',
            description: 'Our design team creates the visual language and user experience that aligns with your brand and engages your target audience.',
            deliverables: [
                'Wireframes',
                'Mood boards',
                'UI design concepts',
                'Interactive prototypes',
                'Design system'
            ],
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 4,
            name: 'Development',
            icon: '/icons/development.svg',
            description: 'Our developers transform the approved designs into a fully functional website or application using modern, scalable technologies.',
            deliverables: [
                'Front-end development',
                'Back-end systems',
                'CMS integration',
                'Interactive components',
                'Cross-browser testing'
            ],
            color: 'from-pink-500 to-red-500'
        },
        {
            id: 5,
            name: 'Testing',
            icon: '/icons/testing.svg',
            description: 'We rigorously test all aspects of your project to ensure everything works flawlessly across devices and browsers.',
            deliverables: [
                'Functionality testing',
                'Performance optimization',
                'Responsive design testing',
                'User acceptance testing',
                'SEO validation'
            ],
            color: 'from-red-500 to-orange-500'
        },
        {
            id: 6,
            name: 'Launch',
            icon: '/icons/launch.svg',
            description: 'We coordinate the launch of your project, ensuring a smooth transition to your new digital presence with minimal disruption.',
            deliverables: [
                'Deployment checklist',
                'DNS configuration',
                'Analytics setup',
                'Content migration',
                'Go-live support'
            ],
            color: 'from-orange-400 to-yellow-500'
        },
        {
            id: 7,
            name: 'Support',
            icon: '/icons/support.svg',
            description: 'Post-launch, we provide ongoing support and maintenance to keep your digital assets performing optimally and evolving with your business.',
            deliverables: [
                'Regular maintenance',
                'Performance monitoring',
                'Content updates',
                'Security patches',
                'Growth consultations'
            ],
            color: 'from-emerald-400 to-teal-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Creative Process</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        We've refined our approach over years of successful projects. Our proven
                        methodology ensures a seamless journey from concept to completion, delivering
                        results that exceed expectations.
                    </p>
                </motion.div>
            </section>

            {/* Process Steps Section */}
            <section
                ref={processRef}
                className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl"
            >
                {/* Process Timeline */}
                <div className="mb-16 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className="relative"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div
                                    className={`
flex flex-col items-center cursor-pointer
${activeStep === step.id ? 'scale-110' : 'hover:scale-105'}
transition-all duration-300
`}
                                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                                >
                                    <div className={`
w-16 h-16 rounded-full flex items-center justify-center z-10
bg-gradient-to-r ${step.color} text-white text-xl font-bold
shadow-lg mb-3
`}>
                                        {step.id}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                                </div>

                                {/* Step Details (Expands when step is active) */}
                                <motion.div
                                    className="bg-white rounded-xl shadow-xl p-6 mt-4 md:absolute md:top-24 md:left-1/2 md:-translate-x-1/2 w-full md:w-64 lg:w-80"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeStep === step.id ? 'auto' : 0,
                                        opacity: activeStep === step.id ? 1 : 0,
                                        display: activeStep === step.id ? 'block' : 'none'
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-gray-600 mb-4">{step.description}</p>
                                    <h4 className="font-medium text-gray-900 mb-2">Deliverables:</h4>
                                    <ul className="space-y-1">
                                        {step.deliverables.map((item, i) => (
                                            <li key={i} className="flex items-start text-sm text-gray-600">
                                                <svg
                                                    className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Process Description */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Our Process Works</h2>
                            <p className="text-gray-600 mb-6">
                                Our structured approach combines creativity with technical expertise, ensuring that
                                every project is delivered on time, on budget, and exceeds expectations. We believe in:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: 'Collaboration', desc: 'We work closely with you throughout the entire process' },
                                    { title: 'Transparency', desc: 'Regular updates and clear communication at every stage' },
                                    { title: 'Flexibility', desc: 'Adapting to changes and feedback throughout the project' },
                                    { title: 'Excellence', desc: 'Unwavering commitment to quality in every deliverable' }
                                ].map((item, i) => (
                                        <li key={i} className="flex">
                                            <div className="bg-indigo-100 rounded-full p-2 mr-4">
                                                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{item.title}</h3>
                                                <p className="text-gray-600">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        <div className="relative h-72 md:h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <div className="inline-block rounded-full bg-indigo-100 p-4 mb-4">
                                        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Time to Completion</h3>
                                    <p className="text-gray-600 mb-4">Average project timeline</p>
                                    <div className="flex justify-center space-x-6">
                                        <div>
                                            <p className="text-3xl font-bold text-indigo-600">4-8</p>
                                            <p className="text-sm text-gray-600">weeks for small</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-indigo-600">8-12</p>
                                            <p className="text-sm text-gray-600">weeks for medium</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-indigo-600">12+</p>
                                            <p className="text-sm text-gray-600">weeks for large</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        What Clients Say About Our Process
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We pride ourselves on making the development journey as rewarding as the final product.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "Their organized process made what could have been a complex project feel straightforward and manageable. We always knew what was happening and what to expect next.",
                            author: "Sarah Johnson",
                            role: "Marketing Director",
                            company: "Innovate Tech"
                        },
                        {
                            quote: "The discovery and strategy phases were eye-opening. They uncovered insights about our audience we hadn't considered and shaped a solution that perfectly addressed our needs.",
                            author: "Michael Chen",
                            role: "Founder",
                            company: "GrowthSmart"
                        },
                        {
                            quote: "What impressed me most was how they adapted their process to meet our tight deadline without compromising on quality. True professionals who deliver excellence.",
                            author: "Alexis Rivera",
                            role: "Product Manager",
                            company: "Elevate Solutions"
                        }
                    ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-xl shadow-md p-6 relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div className="pt-6">
                                    <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">{testimonial.author}</p>
                                            <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Common questions about our process and workflow
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {[
                        {
                            question: "How involved will I need to be during the process?",
                            answer: "We believe in collaborative partnerships. While we handle all the technical aspects, we value your input at key milestones. Typically, clients are most involved during the discovery, design approval, and testing phases. We'll establish a communication plan that respects your time while ensuring your vision is realized."
                        },
                        {
                            question: "What if I want to make changes mid-project?",
                            answer: "Our flexible approach accommodates changes throughout the project. We'll evaluate requested changes for timeline and budget impact, then provide you with options. Minor adjustments are often incorporated without issue, while more significant changes may require adjustments to the project scope."
                        },
                        {
                            question: "How do you handle project delays or challenges?",
                            answer: "Transparency is key. If we encounter unexpected challenges, we immediately notify you, explain the implications, and present solutions. We build buffer time into our timelines and have contingency plans for common roadblocks to minimize disruptions to your launch date."
                        },
                        {
                            question: "What input do you need from me to get started?",
                            answer: "To kick off effectively, we'll need information about your business goals, target audience, design preferences, and any existing brand guidelines. Our comprehensive onboarding questionnaire guides this process, and we're available to help you gather and organize this information."
                        },
                        {
                            question: "How do you ensure the final product meets our expectations?",
                            answer: "We incorporate approval checkpoints throughout the process to ensure alignment. Our iterative approach allows for feedback at each stage, and we conduct thorough user testing before launch. Additionally, we provide training to ensure you're comfortable managing your new digital asset."
                        }
                    ].map((faq, i) => (
                            <motion.div
                                key={i}
                                className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <details className="group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                                        <span className="ml-6 flex-shrink-0 text-gray-500 group-open:rotate-180 transition-transform">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Timeline Visualization */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Project Timeline
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A visual representation of our typical project progression
                    </p>
                </motion.div>

                <div className="relative mx-auto max-w-4xl">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 h-full w-1 bg-indigo-100 -translate-x-1/2"></div>

                    {/* Timeline Items */}
                    {[
                        {
                            week: "Week 1",
                            title: "Discovery & Research",
                            description: "Initial consultations, project scoping, and research conducted to establish foundations."
                        },
                        {
                            week: "Week 2-3",
                            title: "Strategy & Planning",
                            description: "Developing the technical and creative roadmap based on research insights."
                        },
                        {
                            week: "Week 4-5",
                            title: "Design Concepts",
                            description: "Creating wireframes and visual design concepts for review and approval."
                        },
                        {
                            week: "Week 6-9",
                            title: "Development",
                            description: "Building the front-end and back-end systems according to approved designs."
                        },
                        {
                            week: "Week 10",
                            title: "Testing & Refinement",
                            description: "Quality assurance, user testing, and final adjustments."
                        },
                        {
                            week: "Week 11-12",
                            title: "Launch Preparation & Go-Live",
                            description: "Final checklist, deployment, and public launch of your project."
                        }
                    ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={`relative flex items-start mb-12 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex-1"></div>

                                <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${i % 6 === 0 ? 'from-blue-400 to-indigo-500' :
i % 6 === 1 ? 'from-indigo-500 to-purple-600' :
i % 6 === 2 ? 'from-purple-500 to-pink-500' :
i % 6 === 3 ? 'from-pink-500 to-red-500' :
i % 6 === 4 ? 'from-red-500 to-orange-500' :
'from-orange-400 to-yellow-500'} flex items-center justify-center text-white shadow-lg`}>
                                        {i + 1}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className={`bg-white rounded-xl shadow-md p-6 mx-4 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-2">{item.week}</span>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Tools & Technologies */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-900 rounded-3xl text-white">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Tools & Technologies
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We leverage industry-leading tools and cutting-edge technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { name: "React", category: "Front-end" },
                        { name: "Next.js", category: "Framework" },
                        { name: "Node.js", category: "Back-end" },
                        { name: "MongoDB", category: "Database" },
                        { name: "Figma", category: "Design" },
                        { name: "TailwindCSS", category: "CSS" },
                        { name: "Framer Motion", category: "Animation" },
                        { name: "Vercel", category: "Deployment" },
                        { name: "Sanity.io", category: "CMS" },
                        { name: "GraphQL", category: "API" },
                        { name: "TypeScript", category: "Language" },
                        { name: "GitHub", category: "Version Control" }
                    ].map((tool, i) => (
                            <motion.div
                                key={i}
                                className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, scale: 1.05 }}
                            >
                                <div className="w-12 h-12 bg-gray-700 rounded-lg mb-3"></div>
                                <h3 className="font-medium text-white">{tool.name}</h3>
                                <p className="text-sm text-gray-400">{tool.category}</p>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="px-8 py-16 md:px-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Let's discuss how our process can transform your ideas into exceptional digital experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all"
                            >
                                Schedule a Consultation
                            </Link>      <Link
                                href="/pricing"
                                className="inline-block bg-transparent text-white border border-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-all"
                            >
                                View Pricing
                            </Link>     </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ProcessPage;


