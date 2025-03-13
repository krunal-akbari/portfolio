'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Braning() {
  const [activeTab, setActiveTab] = useState('identity');

  const brandingFeatures = [
    {
      title: "Brand Identity Design",
      description: "We create distinctive visual identities that capture your brand's essence and resonate with your target audience.",
      icon: "🎨",
    },
    {
      title: "Logo Design & Development",
      description: "Professional, memorable logos that communicate your brand values and stand the test of time.",
      icon: "✏️",
    },
    {
      title: "Brand Strategy",
      description: "Strategic positioning and messaging that differentiates your brand in the marketplace.",
      icon: "🧠",
    },
    {
      title: "Brand Guidelines",
      description: "Comprehensive style guides that ensure brand consistency across all touchpoints.",
      icon: "📋",
    },
    {
      title: "Brand Voice & Messaging",
      description: "Developing a consistent tone and messaging framework that speaks to your audience.",
      icon: "💬",
    },
    {
      title: "Rebranding Services",
      description: "Refreshing existing brands to better align with current business goals and market conditions.",
      icon: "🔄",
    },
  ];

  const testimonials = [
    {
      quote: "The branding work completely transformed how our customers perceive us. Our new identity perfectly captures our company values while feeling modern and approachable.",
      author: "Sarah Johnson",
      position: "Marketing Director, Elevate Solutions",
    },
    {
      quote: "Not only did they deliver an exceptional visual identity, but the brand strategy insights have been invaluable for our marketing efforts. Worth every penny.",
      author: "Michael Chen",
      position: "Founder, Horizon Tech",
    },
  ];

  const brandingProcess = [
    {
      step: "1",
      title: "Discovery",
      description: "We dive deep into understanding your business, audience, competitors, and goals to inform our branding approach.",
    },
    {
      step: "2",
      title: "Strategy",
      description: "Developing a comprehensive brand strategy that positions you effectively in the market.",
    },
    {
      step: "3",
      title: "Design",
      description: "Creating visual elements and messaging that bring your brand to life in a cohesive, memorable way.",
    },
    {
      step: "4",
      title: "Refinement",
      description: "Iterative feedback and adjustments to perfect every aspect of your brand identity.",
    },
    {
      step: "5",
      title: "Implementation",
      description: "Delivering final assets and guidelines for consistent application across all channels.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transform Your Brand Identity
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                We create memorable, distinctive brands that connect with your audience and drive business growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/projects"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-300 opacity-80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Brand Identity Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Branding Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your brand is more than just a logo—it's the complete experience you offer. We help you build a cohesive brand that resonates with your audience and stands out in the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandingFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Branding Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to develop brands that are authentic, memorable, and effective.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 transform -translate-x-1/2"></div>
            
            {brandingProcess.map((step, index) => (
              <div key={index} className="relative mb-12 md:mb-24">
                <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}>
                  <div className={`mb-8 md:mb-0 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="md:hidden flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <h3 className="hidden md:block text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className={`bg-gray-100 rounded-lg h-48 flex items-center justify-center ${
                    index % 2 === 0 ? "md:order-first" : ""
                  }`}>
                    <span className="text-gray-500">Process Illustration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Services Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Branding Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our specialized branding services in more detail
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('identity')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'identity'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Brand Identity
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'strategy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Brand Strategy
            </button>
            <button
              onClick={() => setActiveTab('rebranding')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'rebranding'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rebranding
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            {activeTab === 'identity' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand Identity Design</h3>
                  <p className="text-gray-600 mb-6">
                    Your visual identity is the face of your brand. We create comprehensive identity systems that include logos, color palettes, typography, and visual elements that work together to create a cohesive and memorable brand presence.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Logo design (primary, secondary, and icon variations)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Color palette development with primary and secondary colors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Typography selection and hierarchy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Visual elements and patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Brand guidelines documentation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500">Brand Identity Examples</span>
                </div>
              </div>
            )}

            {activeTab === 'strategy' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand Strategy</h3>
                  <p className="text-gray-600 mb-6">
                    A strong brand starts with a clear strategy. We help you define your brand's positioning, values, personality, and messaging to create a foundation for all your marketing efforts.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Brand positioning and differentiation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Target audience analysis and persona development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Brand voice and messaging framework</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Brand values and mission statement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Competitive analysis and market positioning</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500">Brand Strategy Illustration</span>
                </div>
              </div>
            )}

            {activeTab === 'rebranding' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Rebranding Services</h3>
                  <p className="text-gray-600 mb-6">
                    Sometimes brands need to evolve. Whether you're looking for a refresh or a complete overhaul, our rebranding services help you transition smoothly while maintaining brand equity.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Brand audit and assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Repositioning strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Visual identity redesign</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Messaging refinement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Rollout strategy and implementation plan</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500">Before & After Examples</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have transformed their brand with our services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="text-4xl text-blue-600 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Let's create a brand that resonates with your audience and drives business growth. Contact us today to discuss your branding project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium px-8 py-3 rounded-lg"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium px-8 py-3 rounded-lg"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
