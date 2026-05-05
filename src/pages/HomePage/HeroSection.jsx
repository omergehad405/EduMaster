import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations"
import { FaRobot, FaGraduationCap, FaSearch } from 'react-icons/fa'
import { IoSparkles } from "react-icons/io5";
function HeroSection() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const floatingBadges = [
        { icon: <FaRobot />, text: "AI Powered", top: "10%", left: "15%", color: "text-blue-500" },
        { icon: <IoSparkles />, text: "Smart Quizzes", bottom: "15%", left: "10%", color: "text-yellow-500" },
        { icon: <FaGraduationCap />, text: "Study Tracks", top: "20%", right: "12%", color: "text-purple-500" },
    ];

    return (
        <div
            dir={dir}
            className="relative bg-(--bg-color) flex flex-col items-center justify-center overflow-hidden min-h-[90vh] px-6 py-20"
        >
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--second-color) rounded-full blur-[120px]"
                />
            </div>

            {/* Floating Badges (Desktop Only) */}
            {floatingBadges.map((badge, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -15, 0]
                    }}
                    transition={{
                        delay: 1 + idx * 0.2,
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="hidden lg:flex items-center gap-2 bg-(--main-color) border border-white/10 px-4 py-2 rounded-2xl shadow-xl absolute z-20"
                    style={{ top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom }}
                >
                    <span className={badge.color}>{badge.icon}</span>
                    <span className="text-sm font-bold text-(--text-color)">{badge.text}</span>
                </motion.div>
            ))}

            <div className="container mx-auto max-w-5xl relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-(--second-color)/10 border border-(--second-color)/20 px-4 py-2 rounded-full text-(--second-color) font-bold text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--second-color) opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-(--second-color)"></span>
                        </span>
                        {t.heroBadge || "Next-Gen AI Learning Platform"}
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-black text-(--text-color) leading-[1.1] tracking-tight"
                    >
                        {t.heroTitleMain || "Unlock Your Full"} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--second-color) to-purple-500">
                            {t.heroTitleGradient || "Academic Potential"}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t.heroSubtitleNew || "Upload your notes and let our AI transform them into structured learning paths and instant practice quizzes."}
                    </motion.p>

                    {/* Modern Search/AI Mockup */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-2xl mx-auto relative group mt-12"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-(--second-color) to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-(--main-color) rounded-2xl border border-white/10 px-6 py-5 shadow-2xl">
                            <FaSearch className="text-gray-400 mr-4" />
                            <div className="flex-1 text-left text-gray-400 font-medium overflow-hidden whitespace-nowrap border-r-2 border-(--second-color) animate-caret">
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                                    className="inline-block"
                                >
                                    |
                                </motion.span>
                                {language === "ar" ? "اسأل الذكاء الاصطناعي عن أي درس..." : "Ask AI about any lesson..."}
                            </div>
                            <button className="hidden sm:block bg-(--second-color) text-white font-bold py-2 px-6 rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-(--second-color)/30">
                                {t.heroGenerateBtn || "Generate"}
                            </button>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-6 pt-10"
                    >
                        <Link
                            to="/learn"
                            className="bg-(--second-color) text-white font-black py-5 px-12 rounded-2xl text-xl shadow-2xl shadow-(--second-color)/40 hover:bg-(--main-color) hover:text-(--text-color) active:scale-95 transition-all duration-300"
                        >
                            {t.startLearning || "Start Learning"}
                        </Link>
                        <Link
                            to="/test"
                            className="bg-(--main-color) text-(--second-color) border-2 border-(--second-color) font-black py-5 px-12 rounded-2xl text-xl shadow-xl hover:bg-(--second-color) hover:text-white transition-all duration-300"
                        >
                            {t.testYourself || "Test Yourself"}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-(--bg-color) to-transparent z-20" />

            <style>{`
                @keyframes caret {
                    from { border-color: transparent; }
                    to { border-color: var(--second-color); }
                }
                .animate-caret {
                    animation: caret 0.8s step-end infinite;
                }
            `}</style>
        </div>
    )
}

export default HeroSection
