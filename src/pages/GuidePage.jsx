import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import {
    FaUserPlus, FaSearch, FaCloudUploadAlt, FaBrain,
    FaCheckCircle, FaPlayCircle, FaGraduationCap, FaChartLine,
    FaRobot, FaArrowRight, FaBolt
} from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';

const steps = [
    {
        num: '01',
        icon: <FaUserPlus />,
        color: 'from-blue-500 to-cyan-400',
        shadow: 'shadow-blue-500/30',
        titleEn: 'Create Your Account',
        titleAr: 'أنشئ حسابك',
        descEn: 'Sign up for free in seconds. No credit card needed. Just your email and you are ready to go.',
        descAr: 'سجّل مجانًا في ثوانٍ. لا حاجة لبطاقة ائتمان. فقط بريدك الإلكتروني وأنت جاهز.',
    },
    {
        num: '02',
        icon: <FaSearch />,
        color: 'from-purple-500 to-pink-400',
        shadow: 'shadow-purple-500/30',
        titleEn: 'Browse Learning Tracks',
        titleAr: 'تصفّح مسارات التعلم',
        descEn: 'Explore our structured learning tracks. Pick a subject that matches your level and enroll instantly.',
        descAr: 'استكشف مسارات التعلم المنظمة لدينا. اختر موضوعًا يناسب مستواك وسجّل فيه فورًا.',
    },
    {
        num: '03',
        icon: <FaCloudUploadAlt />,
        color: 'from-orange-500 to-yellow-400',
        shadow: 'shadow-orange-500/30',
        titleEn: 'Upload Your Notes',
        titleAr: 'ارفع ملاحظاتك',
        descEn: 'Upload any PDF, DOCX, or TXT file. Our AI reads your material and prepares it for quiz generation.',
        descAr: 'ارفع أي ملف PDF أو DOCX أو TXT. يقرأ الذكاء الاصطناعي موادك ويجهّزها لإنشاء الاختبارات.',
    },
    {
        num: '04',
        icon: <FaBrain />,
        color: 'from-green-500 to-teal-400',
        shadow: 'shadow-green-500/30',
        titleEn: 'Generate AI Quizzes',
        titleAr: 'أنشئ اختبارات بالذكاء الاصطناعي',
        descEn: 'Let AI build personalized quizzes from your notes — MCQ, True/False, and more. One click away.',
        descAr: 'دع الذكاء الاصطناعي ينشئ اختبارات مخصصة من ملاحظاتك — اختيار متعدد وصح/خطأ والمزيد.',
    },
    {
        num: '05',
        icon: <FaCheckCircle />,
        color: 'from-rose-500 to-red-400',
        shadow: 'shadow-rose-500/30',
        titleEn: 'Review & Track Progress',
        titleAr: 'راجع وتتبّع تقدمك',
        descEn: 'See your results, review wrong answers, and watch your XP grow on the statistics dashboard.',
        descAr: 'اطّلع على نتائجك وراجع الأخطاء وشاهد نمو نقاط خبرتك في لوحة الإحصائيات.',
    },
];

const features = [
    { icon: <FaRobot />, color: 'text-blue-400', titleEn: 'AI Quiz Generator', titleAr: 'منشئ الاختبارات بالذكاء الاصطناعي', descEn: 'Turn any document into smart practice questions instantly.', descAr: 'حوّل أي مستند إلى أسئلة تدريبية ذكية فورًا.' },
    { icon: <FaGraduationCap />, color: 'text-purple-400', titleEn: 'Structured Tracks', titleAr: 'مسارات منظمة', descEn: 'Follow curated learning paths from beginner to advanced.', descAr: 'اتّبع مسارات تعلم منظمة من المبتدئ إلى المتقدم.' },
    { icon: <FaChartLine />, color: 'text-green-400', titleEn: 'Progress Dashboard', titleAr: 'لوحة التقدم', descEn: 'Track your XP, streaks, and completed lessons in real time.', descAr: 'تتبّع نقاط خبرتك وسلاسلك والدروس المكتملة في الوقت الفعلي.' },
    { icon: <FaBolt />, color: 'text-yellow-400', titleEn: 'Adaptive Level Test', titleAr: 'اختبار المستوى التكيفي', descEn: 'Start with an AI-assessed level test to personalize your experience.', descAr: 'ابدأ باختبار مستوى تقييمي بالذكاء الاصطناعي لتخصيص تجربتك.' },
];

export default function GuidePage() {
    const { language } = useLanguage();
    const isAr = language === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    return (
        <div dir={dir} className="min-h-screen bg-(--bg-color) overflow-x-hidden">

            {/* ── Hero ── */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
                        transition={{ duration: 9, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-(--second-color) rounded-full blur-[140px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-(--second-color)/10 border border-(--second-color)/20 px-4 py-2 rounded-full text-(--second-color) font-bold text-sm mb-6 relative z-10"
                >
                    <IoSparkles />
                    {isAr ? 'دليل الاستخدام' : 'Platform Guide'}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-(--text-color) leading-tight relative z-10 mb-6"
                >
                    {isAr ? 'كيف تستخدم' : 'How to Use'} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--second-color) to-purple-500">
                        edu<span className="text-(--second-color)">Master</span>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto relative z-10 mb-10"
                >
                    {isAr
                        ? 'شاهد الفيديو أدناه واتبع الخطوات البسيطة لتبدأ رحلتك التعليمية مع الذكاء الاصطناعي.'
                        : 'Watch the video below and follow the simple steps to start your AI-powered learning journey.'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 relative z-10"
                >
                    <Link
                        to="/register"
                        className="bg-(--second-color) text-white font-black py-4 px-10 rounded-2xl text-lg shadow-2xl shadow-(--second-color)/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                    >
                        {isAr ? 'ابدأ مجانًا' : 'Get Started Free'}
                        <FaArrowRight />
                    </Link>
                    <Link
                        to="/learn"
                        className="bg-(--main-color) text-(--text-color) border-2 border-white/10 font-bold py-4 px-10 rounded-2xl text-lg hover:border-(--second-color)/50 transition-all duration-300"
                    >
                        {isAr ? 'استكشف المسارات' : 'Explore Tracks'}
                    </Link>
                </motion.div>
            </section>

            {/* ── Video Section ── */}
            <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative group"
                >
                    {/* glow border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-(--second-color) to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700" />

                    <div className="relative bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[50vh] md:h-[80vh] flex items-center justify-center">
                        <video
                            className="w-full h-full object-contain"
                            controls
                            controlsList="nodownload"
                        >
                            <source src="/learnPart.mp4" type="video/mp4" />
                            {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
                        </video>
                    </div>
                </motion.div>
            </section>

            {/* ── Step-by-step ── */}
            <section className="px-6 pb-28 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-(--second-color) font-bold uppercase tracking-widest text-sm mb-3">
                        {isAr ? 'خطوة بخطوة' : 'Step by Step'}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-(--text-color) mb-4">
                        {isAr ? '٥ خطوات للنجاح' : '5 Steps to Success'}
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        {isAr
                            ? 'اتبع هذه الخطوات البسيطة لتحقق أقصى استفادة من المنصة.'
                            : 'Follow these simple steps to get the most out of the platform.'}
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Number + icon */}
                            <div className="flex-shrink-0 relative">
                                <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-4xl shadow-2xl ${step.shadow}`}>
                                    {step.icon}
                                </div>
                                <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-(--bg-color) border-2 border-(--second-color) flex items-center justify-center text-xs font-black text-(--second-color)">
                                    {step.num}
                                </div>
                            </div>

                            {/* Text */}
                            <div className={`flex-1 bg-(--main-color) border border-white/10 rounded-3xl p-8 shadow-xl ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                                <h3 className="text-2xl font-black text-(--text-color) mb-3">
                                    {isAr ? step.titleAr : step.titleEn}
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed">
                                    {isAr ? step.descAr : step.descEn}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Key Features ── */}
            <section className="px-6 pb-28 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-(--second-color) font-bold uppercase tracking-widest text-sm mb-3">
                        {isAr ? 'الميزات الرئيسية' : 'Key Features'}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-(--text-color)">
                        {isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need'}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="bg-(--main-color) border border-white/10 rounded-3xl p-7 shadow-xl text-center group cursor-default"
                        >
                            <div className={`text-4xl mb-5 ${f.color} group-hover:scale-110 transition-transform duration-300 inline-block`}>
                                {f.icon}
                            </div>
                            <h4 className="font-black text-(--text-color) text-lg mb-2">
                                {isAr ? f.titleAr : f.titleEn}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {isAr ? f.descAr : f.descEn}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-(--second-color) to-purple-600 rounded-3xl blur opacity-20" />
                    <div className="relative bg-(--main-color) border border-white/10 rounded-3xl p-14 text-center shadow-2xl">
                        <div className="text-5xl mb-5">🚀</div>
                        <h2 className="text-4xl font-black text-(--text-color) mb-4">
                            {isAr ? 'جاهز للبدء؟' : 'Ready to Begin?'}
                        </h2>
                        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                            {isAr
                                ? 'سجّل الآن مجانًا وابدأ رحلتك مع أول مسار تعليمي.'
                                : 'Sign up now for free and kick off your first learning track.'}
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 bg-(--second-color) text-white font-black py-4 px-12 rounded-2xl text-xl shadow-2xl shadow-(--second-color)/40 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            {isAr ? 'ابدأ مجانًا' : 'Start for Free'}
                            <FaArrowRight />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
