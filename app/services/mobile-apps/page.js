import Link from 'next/link';

const WebDevelopmentServicePage = () => {
  const service = {
    id: 'web-development',
    name: 'Web Development',
    shortDesc:
      'Custom websites and web applications built with cutting-edge technologies.',
    description:
      'Our web development service creates high-performance websites and web applications tailored to your unique business needs. Leveraging the latest technologies and a human-centric design approach, our team delivers scalable and secure digital solutions that drive results. Whether you need a simple marketing site or a complex web application, we ensure engaging user experiences and seamless integration with backend systems.',
    features: [
      'Custom website development',
      'Progressive Web Applications (PWAs)',
      'E-commerce solutions',
      'Content management systems',
      'API integration & development',
      'Performance optimization',
    ],
    gradient: 'from-blue-500 to-indigo-600',
    lightGradient: 'from-blue-50 to-indigo-50',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
        {/* Animated Shapes (static gradients in this case) */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-opacity duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Web Development
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Custom websites and web applications built with cutting-edge
            technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact"className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                Get a Quote
            </Link>
            <Link href="/portfolio"className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center transition-all duration-500">
          {/* Text Content */}
          <div>
            <div
              className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm font-medium mb-4`}
            >
              {service.name}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Delivering Digital Excellence in Web Development
            </h2>
            <p className="text-lg text-gray-600 mb-8">{service.description}</p>
            <div className="space-y-4 mb-8">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white mr-3 mt-0.5`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-medium rounded-lg transition-all text-center">
                  Discuss Your Project
              </Link>
              <Link href="/process"className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors text-center">
                  Our Process
              </Link>
            </div>
          </div>

          {/* Image or Graphic */}
          <div>
            <div
              className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] transition-all duration-500"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Replace the below div with your actual image using Next.js Image component */}
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 flex items-center justify-center text-white font-bold text-2xl">
                  Web
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transition-opacity duration-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our web development services have transformed businesses—with
            stunning design and seamless functionality.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Their web development expertise drove our online sales up by 150%. The site is fast, responsive, and beautifully designed.",
              author: "Alex Johnson",
              position: "Founder, TechNova",
            },
            {
              quote:
                "The team delivered an exceptional website that perfectly represents our brand. Highly recommended!",
              author: "Sarah Thompson",
              position: "CMO, EcoFriendly Solutions",
            },
            {
              quote:
                "Professional, creative, and detail-oriented. They created a seamless digital experience for our users.",
              author: "Michael Lee",
              position: "CEO, Urban Innovations",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 relative transition-all duration-500"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 001.414 0l4-4z" />
                </svg>
              </div>
              <div className="pt-6">
                <p className="italic text-gray-600 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and build a custom solution that drives
            results.
          </p>
          <Link href="/contact"className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-medium px-10 py-4 rounded-lg transition-all">
              Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentServicePage;



