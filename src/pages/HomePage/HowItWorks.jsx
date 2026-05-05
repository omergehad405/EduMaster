import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";
import { FaUserPlus, FaListUl, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

const stepsData = [
    {
        titleKey: "howItWorksStep1Title",
        descKey: "howItWorksStep1Desc",
        defaultTitle: "Sign up for free",
        defaultDesc: "Create your profile and select your preferred learning track to get started.",
        icon: <FaUserPlus />,
        color: "bg-blue-500"
    },
    {
        titleKey: "howItWorksStep2Title",
        descKey: "howItWorksStep2Desc",
        defaultTitle: "Pick your topics",
        defaultDesc: "Choose the lessons or topics you wish to learn from our available catalog.",
        icon: <FaListUl />,
        color: "bg-purple-500"
    },
    {
        titleKey: "howItWorksStep3Title",
        descKey: "howItWorksStep3Desc",
        defaultTitle: "Upload notes or PDFs",
        defaultDesc: "Easily upload your own notes or PDF documents for personalized quizzes.",
        icon: <FaCloudUploadAlt />,
        color: "bg-orange-500"
    },
    {
        titleKey: "howItWorksStep4Title",
        descKey: "howItWorksStep4Desc",
        defaultTitle: "Generate quiz & review",
        defaultDesc: "Automatically generate quizzes based on your uploaded material and review your results.",
        icon: <FaCheckCircle />,
        color: "bg-green-500"
    },
];

function HowItWorks() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <section dir={dir} className="py-24 bg-(--bg-color) relative">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-(--second-color) font-bold uppercase tracking-widest text-sm mb-3">
                        {t.howItWorksSubtitle || "How it works"}
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-6">
                        {t.howItWorksTitle || "Simple 4-Step Learning"}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        {t.howItWorksDescription || "Follow these easy steps to start learning, upload your notes, and generate personalized quizzes!"}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 -z-10" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {stepsData.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-8">
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-20 h-20 rounded-3xl ${step.color} text-white flex items-center justify-center text-3xl shadow-lg relative z-10`}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-(--main-color) border-4 border-(--second-color) flex items-center justify-center font-bold text-(--second-color) z-20">
                                        {idx + 1}
                                    </div>
                                    <div className={`absolute inset-0 ${step.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                                </div>
                                <h3 className="text-xl font-bold text-(--text-color) mb-4">
                                    {t[step.titleKey] || step.defaultTitle}
                                </h3>
                                <p className="text-gray-500 leading-relaxed px-4">
                                    {t[step.descKey] || step.defaultDesc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;