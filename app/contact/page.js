'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Get in <span className="text-blue-600">Touch</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Let's discuss your project and see how we can bring your ideas to life.
                    </p>
                </motion.div>

                {/* Location and Contact Info Section */}
                <div className="mb-24">
                    <LocationContactSection />
                </div>

                {/* Contact Form Section */}
                <div className="mb-20">
                    <ContactFormSection />
                </div>
            </div>
        </div>
    );
}

// Location and Contact Info Section
function LocationContactSection() {
    return (
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
                {/* Map/Location Visual */}
                <div className="relative h-[450px] bg-gray-300">
                    {/* In a real implementation, you'd use Google Maps or another map provider */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615381418!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1631799901865!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="grayscale contrast-125 brightness-90"
                    ></iframe>

                    {/* Location Pin Animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-8 w-8">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative block h-8 w-8 rounded-full bg-blue-500">
                                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="p-10 sm:px-12 md:p-16 bg-white">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900">Where to find us</h2>
                        <div className="mt-8 space-y-8">
                            <ContactItem
                                icon="location"
                                title="Our Studio"
                                content={<>123 Design Avenue<br />Creative District<br />New York, NY 10001</>}
                            />

                            <ContactItem
                                icon="phone"
                                title="Phone"
                                content={<a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800 transition-colors">(123) 456-7890</a>}
                            />

                            <ContactItem
                                icon="email"
                                title="Email"
                                content={<a href="mailto:krunal@nalashaa.com" className="text-blue-600 hover:text-blue-800 transition-colors">hello@portfolio.com</a>}
                            />

                            <ContactItem
                                icon="time"
                                title="Working Hours"
                                content={<>Monday – Friday<br />9:00 AM – 6:00 PM</>}
                            />
                        </div>

                        <div className="mt-10 flex space-x-5">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                                >
                                    <span className="sr-only">{social}</span>
                                    <SocialIcon type={social} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Contact Item component
function ContactItem({ icon, title, content }) {
    return (
        <div className="flex">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 text-blue-600">
                    {icon === 'location' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                    {icon === 'phone' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    )}
                    {icon === 'email' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    )}
                    {icon === 'time' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-gray-600">{content}</p>
            </div>
        </div>
    );
}

// Social Icon component
function SocialIcon({ type }) {
    switch (type) {
        case 'facebook':
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            );
        case 'twitter':
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            );
        default:
            return null;
    }
}

// Modern Contact Form Section
function ContactFormSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        service: '',
        budget: '',
    });

    const [focused, setFocused] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFocus = (field) => {
        setFocused(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        setFocused(prev => ({ ...prev, [field]: false }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                service: '',
                budget: '',
            });
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="relative">
                {/* Decorative elements */}
                <div className="hidden sm:block absolute -top-10 -left-10 -z-10">
                    <div className="w-32 h-32 bg-blue-100 bg-opacity-50 rounded-full blur-md"></div>
                </div>
                <div className="hidden sm:block absolute -bottom-10 -right-10 -z-10">
                    <div className="w-48 h-48 bg-purple-100 bg-opacity-50 rounded-full blur-md"></div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
            >
                <div className="p-8 md:p-12 lg:p-16">
                    {submitted ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Your message has been received. We'll get back to you shortly.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900">Send a message</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Have a project in mind? Let's discuss how we can help you achieve your goals.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                    {/* Name Field */}
                                    <div className="relative">
                                        <label
                                            htmlFor="name"
                                            className={`absolute left-3 transition-all duration-200 ${focused.name || formData.name
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={() => handleBlur('name')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className={`absolute left-3 transition-all duration-200 ${focused.email || formData.email
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={() => handleBlur('email')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Service Selection */}
                                    <div className="relative">
                                        <label
                                            htmlFor="service"
                                            className={`absolute left-3 transition-all duration-200 ${focused.service || formData.service
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Service needed
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('service')}
                                            onBlur={() => handleBlur('service')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value=""></option>
                                            <option value="web-development">Web Development</option>
                                            <option value="ui-ux-design">UI/UX Design</option>
                                            <option value="branding">Branding</option>
                                            <option value="mobile-app">Mobile App</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Budget Range */}
                                    <div className="relative">
                                        <label
                                            htmlFor="budget"
                                            className={`absolute left-3 transition-all duration-200 ${focused.budget || formData.budget
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Budget range
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('budget')}
                                            onBlur={() => handleBlur('budget')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value=""></option>
                                            <option value="<5k">Less than $5,000</option>
                                            <option value="5k-10k">$5,000 - $10,000</option>
                                            <option value="10k-25k">$10,000 - $25,000</option>
                                            <option value="25k+">$25,000+</option>
                                            <option value="not-sure">Not sure yet</option>
                                        </select>
                                    </div>

                                    {/* Subject Field - Full Width */}
                                    <div className="relative sm:col-span-2">
                                        <label
                                            htmlFor="subject"
                                            className={`absolute left-3 transition-all duration-200 ${focused.subject || formData.subject
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('subject')}
                                            onBlur={() => handleBlur('subject')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Message Field - Full Width */}
                                    <div className="relative sm:col-span-2">
                                        <label
                                            htmlFor="message"
                                            className={`absolute left-3 transition-all duration-200 ${focused.message || formData.message
                                                ? '-top-2.5 bg-white px-1 text-sm text-blue-600'
                                                : 'top-3 text-gray-500'
                                                }`}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('message')}
                                            onBlur={() => handleBlur('message')}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="sm:flex sm:justify-between sm:items-center">
                                    {/* Privacy note */}
                                    <p className="text-sm text-gray-500 mb-6 sm:mb-0">
                                        By submitting this form, you agree to our{' '}
                                        <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                                            Privacy Policy
                                        </a>
                                        .
                                    </p>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg
                                                    className="ml-2 -mr-1 w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Additional Contact Channels */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <ContactChannel
                    icon="chat"
                    title="Live Chat"
                    description="Chat with our team in real-time for quick support"
                    action="Start chat"
                    link="#"
                />
                <ContactChannel
                    icon="calendar"
                    title="Schedule a Call"
                    description="Book a 30-minute consultation call with an expert"
                    action="Book now"
                    link="#"
                />
                <ContactChannel
                    icon="faq"
                    title="Read FAQs"
                    description="Find answers to common questions in our help center"
                    action="View FAQs"
                    link="#"
                />
            </div>
        </div>
    );
}

// Contact Channel component
function ContactChannel({ icon, title, description, action, link }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
        >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                {icon === 'chat' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}

                {icon === 'calendar' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}

                {icon === 'faq' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <a
                href={link}
                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
            >
                {action}
                <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </a>
        </motion.div>
    );
}



