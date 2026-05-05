import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage'
import translations from "../../utils/translations";

const benefitKeys = [
    {
        title: 'benefitsLearnFaster',
        description: 'benefitsLearnFasterDesc',
        emoji: "🚀",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
    },
    {
        title: 'benefitsRememberMore',
        description: 'benefitsRememberMoreDesc',
        emoji: "🧠",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20"
    },
    {
        title: 'benefitsPracticeSmarter',
        description: 'benefitsPracticeSmarterDesc',
        emoji: "🎯",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20"
    },
    {
        title: 'benefitsNoBoringExams',
        description: 'benefitsNoBoringExamsDesc',
        emoji: "😄",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/20"
    },
    {
        title: 'benefitsPersonalizedQuizzes',
        description: 'benefitsPersonalizedQuizzesDesc',
        emoji: "✨",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20"
    },
];

function BenefitsSection() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <section dir={dir} className="py-24 bg-(--main-color) relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-6">
                        {t.benefitsTitle || "Why You'll Love It"}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        {t.benefitsDescription || "Designed to make your learning journey exciting, efficient, and personalized."}
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {benefitKeys.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`relative group w-full sm:w-72 p-8 rounded-3xl border ${benefit.borderColor} ${benefit.bgColor} backdrop-blur-sm transition-all duration-300`}
                        >
                            <div className="text-5xl mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                                {benefit.emoji}
                            </div>
                            <h3 className="text-2xl font-bold text-(--text-color) mb-4">
                                {t[benefit.title] || benefit.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {t[benefit.description] || benefit.description}
                            </p>
                            
                            <motion.span 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-4 right-4 text-yellow-400 opacity-40"
                            >
                                ★
                            </motion.span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BenefitsSection