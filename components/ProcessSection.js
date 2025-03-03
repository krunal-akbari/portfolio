'use client'
import { motion } from 'framer-motion';

// Creative Process Section
export default function ProcessSection({ setCursorVariant }) {
  const processes = [
    {
      number: "01",
      title: "Discovery",
      description: "We dig deep to understand your business, audience, and objectives through collaborative workshops.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Based on research insights, we develop a strategic roadmap to guide the creative and technical process.",
    },
    {
      number: "03",
      title: "Design",
      description: "Our designers create intuitive, beautiful experiences that align with your brand and user needs.",
    },
    {
      number: "04",
      title: "Development",
      description: "We build robust, scalable solutions using modern technologies and development practices.",
    },
    {
      number: "05",
      title: "Launch",
      description: "After thorough testing, we deploy your project and provide training and documentation.",
    },
    {
      number: "06",
      title: "Support",
      description: "We offer ongoing support and optimization to ensure your digital product continues to evolve.",
    }
  ];

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-500 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-blue-400 font-medium mb-2">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Creative Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A structured approach that ensures we deliver exceptional results for every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={process.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="p-8 rounded-2xl border border-gray-800 hover:border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:transform hover:translate-y-[-8px] transition-all duration-300"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="text-5xl font-bold text-blue-500 opacity-40 mb-4">{process.number}</div>
              <h3 className="text-2xl font-bold mb-3">{process.title}</h3>
              <p className="text-gray-400">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
