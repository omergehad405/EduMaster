import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations"

function AboutUs() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <section
            dir={dir}
            className='py-24 px-6 md:px-20 bg-(--main-color) relative overflow-hidden'
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <motion.div 
                    initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 relative group"
                >
                    <div className="absolute -inset-4 bg-gradient-to-tr from-(--second-color) to-purple-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition duration-500"></div>
                    <img 
                        src="./aboutUs.jpg" 
                        alt="About Us" 
                        className='relative w-full rounded-2xl shadow-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700' 
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-(--second-color) rounded-2xl -z-10 animate-bounce-slow"></div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='w-full md:w-1/2'
                >
                    <h2 className='text-(--second-color) font-bold tracking-widest uppercase text-sm mb-4'>
                        {t.aboutSubtitle || "Our Story"}
                    </h2>
                    <h1 className='text-4xl font-bold text-(--text-color) mb-6 leading-tight'>
                        {(t.aboutTitle || "About Us").split(' ').map((word, i) =>
                            i === 1
                                ? <span key={i} className='text-(--second-color)'>{word} </span>
                                : <span key={i}>{word} </span>
                        )}
                    </h1>
                    <p className='text-gray-500 text-lg mb-8 leading-relaxed'>
                        {t.aboutDescription ||
                            "This platform helps students learn through structured tracks and test themselves using AI-generated questions from any uploaded file (PDF, Word, text, or slides)."
                        }
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {[
                            { text: t.aboutLearningTracks || "Learning Tracks", icon: "📚" },
                            { text: t.aboutAIQuizGenerator || "AI Quiz Generator", icon: "🤖" },
                            { text: t.aboutProgressTracking || "Progress Tracking", icon: "📈" },
                            { text: t.communitySupport || "Community", icon: "🤝" }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center gap-3 p-4 bg-gray-50/5 rounded-xl border border-white/5 hover:border-(--second-color)/30 transition-all"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-(--text-color) font-semibold">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutUs
