import React from 'react'
import { motion } from 'framer-motion'
import { FaBook, FaBrain, FaChartLine, FaCloudUploadAlt, FaMobileAlt, FaUserGraduate } from 'react-icons/fa'
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations"

function OurFeatures() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const features = [
        {
            icon: <FaBook className="text-blue-500" />,
            title: t.featureTracksTitle || "Learning Tracks",
            desc: t.featureTracksDesc || "Expertly curated paths to guide your learning journey from beginner to pro."
        },
        {
            icon: <FaBrain className="text-purple-500" />,
            title: t.featureAIQuizTitle || "AI Quiz Engine",
            desc: t.featureAIQuizDesc || "Generate custom quizzes instantly from your own PDFs, Word docs, or notes."
        },
        {
            icon: <FaChartLine className="text-green-500" />,
            title: t.featureAnalyticsTitle || "Smart Analytics",
            desc: t.featureAnalyticsDesc || "Track your progress with detailed insights and performance breakdown."
        },
        {
            icon: <FaCloudUploadAlt className="text-orange-500" />,
            title: t.featureUploadTitle || "Any File Type",
            desc: t.featureUploadDesc || "Upload PDF, Word, slides, or just paste text to create your study material."
        },
        {
            icon: <FaMobileAlt className="text-pink-500" />,
            title: t.featureMobileTitle || "Learn Anywhere",
            desc: t.featureMobileDesc || "Fully responsive design allows you to study and test yourself on any device."
        },
        {
            icon: <FaUserGraduate className="text-indigo-500" />,
            title: t.featurePersonalizedTitle || "Personalized",
            desc: t.featurePersonalizedDesc || "AI adapts to your level to provide the most effective learning experience."
        }
    ];

    return (
        <section dir={dir} className="py-24 bg-(--bg-color) relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-(--second-color) font-bold uppercase tracking-widest text-sm mb-3">
                        {t.featuresSubtitle || "Premium Features"}
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-6">
                        {t.featuresTitle || "Master Any Subject with Ease"}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        {t.featuresDescription || "Our platform combines the power of AI with structured learning to give you the ultimate study companion."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-(--main-color) p-8 rounded-3xl border border-white/5 shadow-xl hover:shadow-(--second-color)/10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-(--bg-color) flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-(--text-color) mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurFeatures