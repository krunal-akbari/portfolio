"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [hoveredPlan, setHoveredPlan] = useState(null);

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
                staggerChildren: 0.2
            }
        }
    };

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Perfect for small businesses just getting started with digital presence.',
            monthlyPrice: 500,
            yearlyPrice: 5000,
            features: [
                '3 page custom website',
                'Responsive design',
                'Basic SEO optimization',
                'Contact form integration',
                '1 month of support',
            ],
            cta: 'Get Started',
            popular: false,
            bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-100'
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Ideal for growing businesses looking to expand their digital footprint.',
            monthlyPrice: 1200,
            yearlyPrice: 12000,
            features: [
                '7 page custom website',
                'Advanced animations',
                'Google Analytics integration',
                'Complete SEO package',
                'Social media integration',
                '3 months of support',
                'Content management system'
            ],
            cta: 'Choose Professional',
            popular: true,
            bgGradient: 'bg-gradient-to-br from-indigo-500 to-purple-600'
        },
        {
            id: 'premium',
            name: 'Premium',
            description: 'Enhanced solutions for established businesses with complex needs.',
            monthlyPrice: 2500,
            yearlyPrice: 25000,
            features: [
                'Unlimited page custom website',
                'Custom animations and interactions',
                'E-commerce functionality',
                'Premium content management',
                'Performance optimization',
                'Advanced SEO strategy',
                '6 months of priority support',
                'Monthly analytics reports'
            ],
            cta: 'Choose Premium',
            popular: false,
            bgGradient: 'bg-gradient-to-br from-gray-800 to-gray-900'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Tailored solutions for large organizations with specialized requirements.',
            monthlyPrice: null,
            yearlyPrice: null,
            features: [
                'Fully customized digital experience',
                'Complex application development',
                'Custom API integrations',
                'Dedicated project manager',
                'Personalized strategy sessions',
                'Priority development queue',
                '12 months of enterprise support',
                'Performance & security audits',
                'White glove onboarding'
            ],
            cta: 'Contact Us',
            popular: false,
            bgGradient: 'bg-gradient-to-br from-gray-100 to-gray-200'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    className="text-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the perfect plan for your business needs.
                        All plans include our award-winning design and development expertise.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-10 mb-16 flex items-center justify-center">
                        <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative inline-flex h-8 w-16 items-center rounded-full bg-indigo-600"
                        >
                            <span className="sr-only">Toggle billing cycle</span>
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
}`}
                            />
                        </button>
                        <span className={`ml-3 flex items-center ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                            Yearly
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Save 15%
                            </span>
                        </span>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`relative rounded-2xl overflow-hidden shadow-lg ${
plan.popular ? 'ring-4 ring-indigo-500 scale-105 z-10' : ''
} ${plan.bgGradient} transition-all duration-300`}
                            variants={fadeIn}
                            onMouseEnter={() => setHoveredPlan(plan.id)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className={`text-2xl font-bold mb-2 ${
plan.id === 'professional' ? 'text-white' :
plan.id === 'premium' ? 'text-white' : 'text-gray-900'
}`}>
                                    {plan.name}
                                </h3>
                                <p className={`mb-6 ${
plan.id === 'professional' || plan.id === 'premium' ?
'text-indigo-100' : 'text-gray-600'
}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-8">
                                    {plan.monthlyPrice ? (
                                        <>
                                            <span className={`text-4xl font-bold ${
plan.id === 'professional' || plan.id === 'premium' ?
'text-white' : 'text-gray-900'
}`}>
                                                ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                            </span>
                                            <span className={`${
plan.id === 'professional' || plan.id === 'premium' ?
'text-indigo-100' : 'text-gray-500'
}`}>
                                                {billingCycle === 'monthly' ? '/month' : '/year'}
                                            </span>
                                        </>
                                    ) : (
                                            <span className="text-3xl font-bold text-gray-900">Custom Pricing</span>
                                        )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-start ${
plan.id === 'professional' || plan.id === 'premium' ?
'text-white' : 'text-gray-700'
}`}
                                        >
                                            <svg
                                                className={`h-5 w-5 mr-2 ${
plan.id === 'professional' || plan.id === 'premium' ?
'text-indigo-200' : 'text-indigo-500'
}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a href={plan.id === 'enterprise' ? '/contact' : '/signup'}>
                                    <a className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${
plan.id === 'professional' ?
'bg-white text-indigo-600 hover:bg-gray-100' :
plan.id === 'premium' ?
'bg-white text-gray-900 hover:bg-gray-100' :
'bg-indigo-600 text-white hover:bg-indigo-700'
}`}>
                                        {plan.cta}
                                    </a>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our pricing and services.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        {
                            q: "What's included in all pricing plans?",
                            a: "All plans include responsive design, SEO optimization, custom development, hosting setup assistance, and basic training on how to update your site."
                        },
                        {
                            q: "Can I upgrade my plan later?",
                            a: "Absolutely! You can upgrade your plan at any time. We'll apply the remaining value of your current plan to the new one."
                        },
                        {
                            q: "Do I need to pay for hosting separately?",
                            a: "Yes, hosting costs are not included in the pricing plans. However, we can recommend affordable hosting solutions based on your needs and help set everything up."
                        },
                        {
                            q: "How long does it take to complete a website?",
                            a: "Development timelines vary based on complexity and plan. Starter sites typically take 2-3 weeks, Professional 4-6 weeks, Premium 6-8 weeks, and Enterprise projects are custom scoped."
                        },
                        {
                            q: "What payment methods do you accept?",
                            a: "We accept all major credit cards, bank transfers, and PayPal. For Enterprise plans, we can accommodate custom payment schedules."
                        },
                        {
                            q: "What if I need additional services not listed?",
                            a: "We offer a range of additional services that can be added to any plan. Contact us for custom quotes on services like content creation, photography, or ongoing maintenance."
                        }
                    ].map((faq, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-lg shadow-md p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + (i * 0.1) }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <div className="px-8 py-16 md:px-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Not sure which plan is right for you?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Let's discuss your project requirements and find the perfect solution for your business needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact">
                                <a className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-all">
                                    Schedule a Consultation
                                </a>
                            </a>
                            <a href="/projects">
                                <a className="inline-block bg-transparent text-white border border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-all">
                                    View Our Work
                                </a>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PricingPage;

