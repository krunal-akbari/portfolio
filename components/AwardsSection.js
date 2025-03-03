'use client';

import { motion } from 'framer-motion';

// Awards Section
export default function AwardsSection({ setCursorVariant }) {
    const awards = [
        {
            icon: "🏆",
            title: "Webby Awards",
            description: "Nominee for Best Visual Design",
            year: "2023",
        },
        {
            icon: "🎨",
            title: "Awwwards",
            description: "Site of the Day",
            year: "2022",
        },
        {
            icon: "✨",
            title: "CSS Design Awards",
            description: "Best UI Design",
            year: "2022",
        },
        {
            icon: "🌟",
            title: "FWA",
            description: "Site of the Month",
            year: "2021",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-sm uppercase tracking-widest text-blue-600 font-medium mb-2">
                        Recognition
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Awards & Accolades
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {awards.map((award, index) => (
                        <motion.div
                            key={award.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 text-center"
                            onMouseEnter={() => setCursorVariant("button")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            <div className="text-4xl mb-3 mx-auto">{award.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{award.title}</h3>
                            <p className="text-gray-600 text-sm mb-1">{award.description}</p>
                            <p className="text-blue-600 text-sm font-medium">{award.year}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
                    {['Forbes', 'TechCrunch', 'Wired', 'FastCompany', 'DesignWeek'].map((brand) => (
                        <div key={brand} className="text-xl md:text-2xl font-bold text-gray-500">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
