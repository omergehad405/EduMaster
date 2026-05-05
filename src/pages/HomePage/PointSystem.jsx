import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";
import { FaBullseye, FaBrain, FaFire } from 'react-icons/fa';

const PointSystem = () => {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const pointCards = [
        {
            title: t.pointSystemLearningBasics || "Learning Basics",
            icon: <FaBullseye />,
            color: "blue",
            items: [
                { label: t.pointSystemEnterLesson || "Enter a Lesson", xp: "+5 XP" },
                { label: t.pointSystemFinishLesson || "Finish a Lesson", xp: "+20 XP" },
                { label: t.pointSystemCompleteTrack || "Complete Track", xp: "+100 XP", highlight: true }
            ]
        },
        {
            title: t.pointSystemTestingKnowledge || "Testing Knowledge",
            icon: <FaBrain />,
            color: "purple",
            items: [
                { label: t.pointSystemPassLessonQuiz || "Pass Lesson Quiz", xp: "+15 XP" },
                { label: t.pointSystemPassFinalTrackQuiz || "Pass Final Track Quiz", xp: "+30 XP", highlight: true }
            ]
        },
        {
            title: t.pointSystemDailyStreaks || "Daily Streaks",
            icon: <FaFire />,
            color: "orange",
            items: [
                { label: t.pointSystemDailyLogin || "Daily Login", xp: "+5 XP" },
                { label: t.pointSystem7DaysStreak || "7 Days Streak", xp: "+20 Bonus" },
                { label: t.pointSystem30DaysStreak || "30 Days Streak", xp: "+100 Bonus", highlight: true }
            ]
        }
    ];

    const getColors = (color) => {
        const colors = {
            blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
            orange: "bg-orange-500/10 text-orange-500 border-orange-500/20"
        };
        return colors[color];
    };

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
                        {t.pointSystemGamification || "Gamified Learning"}
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-6">
                        {t.pointSystemTitle || "Earn XP as You Learn!"}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        {t.pointSystemSubtitle || "Our platform rewards your effort with points. Climb the ranks and build an unstoppable daily streak!"}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pointCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-(--main-color) rounded-[2.5rem] p-10 border border-white/5 shadow-xl hover:shadow-(--second-color)/5 transition-all duration-300"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${getColors(card.color)} flex items-center justify-center text-3xl mb-8`}>
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-(--text-color) mb-8">
                                {card.title}
                            </h3>
                            <div className="space-y-6">
                                {card.items.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <span className="text-gray-500 font-medium group-hover:text-(--text-color) transition-colors">
                                            {item.label}
                                        </span>
                                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.highlight ? 'bg-(--second-color) text-white' : 'text-(--second-color) bg-(--second-color)/10'}`}>
                                            {item.xp}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 bg-(--main-color) px-8 py-4 rounded-full border border-white/5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-(--second-color) animate-ping" />
                        <p className="text-gray-500 font-medium">
                            {t.pointSystemDailyCap || "Daily Cap: You can earn a maximum of 200 XP per day. Stay consistent!"}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PointSystem;