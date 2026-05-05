import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa'
import { useLanguage } from '../../hooks/useLanguage'
import translations from '../../utils/translations'

function FAQsection() {
    const [openIndex, setOpenIndex] = useState(null);
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    const faqData = t.faqQuestions || [
        {
            question: "How does the AI quiz generator work?",
            answer: "Our AI analyzes the text content of your uploaded files (PDFs, Word docs, notes) and identifies key concepts to generate multiple-choice, true/false, and short-answer questions."
        },
        {
            question: "Is it free to use?",
            answer: "Yes, we offer a free tier that allows you to explore tracks and generate a limited number of quizzes. Premium features are available for power users."
        },
        {
            question: "Can I track my progress?",
            answer: "Absolutely! Your dashboard provides detailed analytics on your quiz scores, completed lessons, and overall learning progress."
        }
    ];

    return (
        <section dir={dir} className="py-24 bg-(--main-color) relative">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-(--second-color) font-bold uppercase tracking-widest text-sm mb-3">
                        {t.faqSubtitle || "Support"}
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-6">
                        {t.faqTitleMain || "Frequently Asked Questions"}
                    </h1>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-(--bg-color) rounded-2xl border border-white/5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                className="w-full flex justify-between items-center px-8 py-6 focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                <div className="flex items-center gap-4">
                                    <FaQuestionCircle className="text-(--second-color) text-xl flex-shrink-0" />
                                    <span className={`text-lg font-bold text-(--text-color) ${dir === "rtl" ? "text-right" : "text-left"}`}>
                                        {item.question}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    className="text-(--second-color) flex-shrink-0"
                                >
                                    <FaChevronDown />
                                </motion.div>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 pt-2 text-gray-500 leading-relaxed border-t border-white/5">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQsection