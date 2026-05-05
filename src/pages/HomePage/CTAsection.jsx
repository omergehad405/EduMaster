import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../utils/translations';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

function CTAsection() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <section dir={dir} className="py-24 bg-(--bg-color) relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-gradient-to-br from-(--second-color) to-purple-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/20 rounded-full blur-3xl"
                        />
                    </div>

                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-8"
                    >
                        <FaRocket className="text-3xl text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        {t.startLearningToday || "Start Your Learning Journey Today"}
                    </h1>
                    
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                        {t.ctaDescription || "Join thousands of students who are already learning smarter and faster with our AI-powered platform."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to="/register"
                            className="group bg-white text-(--second-color) hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all duration-300 flex items-center gap-2"
                        >
                            {t.ctaJoinNow || "Join for Free"}
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/learn"
                            className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300"
                        >
                            {t.ctaExploreTracks || "View All Tracks"}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTAsection;