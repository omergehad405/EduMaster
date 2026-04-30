import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";

// use the text in the translation component that relates to this component in this formula: {t.startLearning || "Start Learning"}

// Extract the text in this component and put it into comments under the component with their translation in Arabic beside them

const stepsData = [
    {
        titleKey: "howItWorksStep1Title",
        descKey: "howItWorksStep1Desc",
        defaultTitle: "Sign up for free",
        defaultDesc: "Create your profile and select your preferred learning track to get started.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11c1.104 0 2-.896 2-2V7a4 4 0 10-8 0v2c0 1.104.896 2 2 2h4zm-4 6a4 4 0 008 0V11a4 4 0 00-8 0v6z" /></svg>
        ),
    },
    {
        titleKey: "howItWorksStep2Title",
        descKey: "howItWorksStep2Desc",
        defaultTitle: "Pick your topics",
        defaultDesc: "Choose the lessons or topics you wish to learn from our available catalog.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4V20" /><rect width="20" height="8" x="2" y="4" rx="2" /><rect width="4" height="4" x="2" y="16" rx="1" /></svg>
        ),
    },
    {
        titleKey: "howItWorksStep3Title",
        descKey: "howItWorksStep3Desc",
        defaultTitle: "Upload notes or PDFs",
        defaultDesc: "Easily upload your own notes or PDF documents for personalized quizzes.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
        ),
    },
    {
        titleKey: "howItWorksStep4Title",
        descKey: "howItWorksStep4Desc",
        defaultTitle: "Generate quiz & review",
        defaultDesc: "Automatically generate quizzes based on your uploaded material and review your results.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
        ),
    },
];

function HowItWorks() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <section className="px-4 md:px-20 py-10 bg-(--bg-color)" dir={dir}>
            <h1 className="font-bold uppercase text-center text-3xl border-b-2 border-(--second-color) w-fit mx-auto mb-6 text-(--text-color)">
                {(t.howItWorksTitle || "How it")}
                <span className="text-(--second-color) pl-1">{t.howItWorksTitle2 || ""}</span>
            </h1>
            <p className="mb-12 text-center text-(--p-color) text-lg max-w-2xl mx-auto">
                {t.howItWorksSubtitle || "Follow these 4 easy steps to start learning, upload your notes, and generate personalized quizzes!"}
            </p>

            <div className="hidden md:flex flex-wrap justify-center gap-8 lg:bg-(--second-color) md:bg-(--main-color) px-0 pt-10 pb-20 rounded-md relative" style={{ boxShadow: '0 6px 28px 0 rgba(0,0,0,.09)' }}>
                {/* Overlay for white background "cards" */}
                <div className="absolute left-0 bottom-0 w-full h-1/2 lg:bg-white md:bg-(--main-color)  rounded-b-md pointer-events-none z-0" />
                <div className="flex flex-wrap gap-8 w-full justify-center z-10 relative">
                    {stepsData.map((step, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col items-center bg-(--bg-color) rounded-lg shadow-xl px-6 py-8 w-62 min-h-[280px] transition-transform duration-300 hover:-translate-y-1`}
                            style={{
                                boxShadow: "0 2px 12px rgb(30 41 76 / 10%), 0 1.5px 6px rgba(80, 94, 153, 0.10)",
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <div className={`flex items-center justify-center rounded-full bg-white border-4 border-(--second-color) w-14 h-14 shadow-lg -mt-12 mb-2`}>
                                <span className="font-bold text-(--second-color) text-xl">{idx + 1}</span>
                            </div>
                            {step.icon}
                            <h3 className="font-bold text-base mb-2 text-(--text-color) text-center">
                                {t[step.titleKey] || step.defaultTitle}
                            </h3>
                            <p className="text-gray-500 text-sm text-center">
                                {t[step.descKey] || step.defaultDesc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MOBILE STYLE */}
            <ul className="flex flex-col md:hidden gap-8 max-w-xl mx-auto mt-10">
                {stepsData.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-3 relative">
                        <span
                            className={`
                                flex items-center justify-center w-10 h-10
                                bg-(--text-color) text-(--main-color) font-bold
                                rounded-full shadow-md border-4 border-(--main-color) text-lg mt-1`}
                        >
                            {idx + 1}
                        </span>
                        <div className={`
                            ml-1 flex flex-col items-start howitworks-stepbox-mobile py-3 px-5 bg-(--main-color)
                            border-l-4 border-(--main-color)
                            border-r-4 border-(--second-color)
                            rounded-lg shadow-lg w-full text-left
                            font-semibold text-(--second-color) text-base
                            `}
                        >
                            <div className="font-bold text-(--text-color) mb-2">
                                {t[step.titleKey] || step.defaultTitle}
                            </div>
                            <div className="text-(--p-color) text-sm">
                                {t[step.descKey] || step.defaultDesc}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <style>{`
                @media (max-width: 767px) {
                    .howitworks-stepbox-mobile {
                        min-width: 0 !important;
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                        margin: 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default HowItWorks;

/*
Text and their Arabic translations:

How it works                 - كيف تعمل المنصة
Follow these 4 easy steps... - اتبع هذه الخطوات الأربع السهلة لتبدأ التعلم، ارفع ملاحظاتك، وولد اختبارات شخصية!

Step 1: Sign up for free                   - سجل مجانًا
Step 1 desc: Create your profile...        - أنشئ ملفك الشخصي واختر مسارك المفضل لتبدأ.

Step 2: Pick your topics                   - اختر مواضيعك
Step 2 desc: Choose the lessons...         - اختر الدروس أو المواضيع التي ترغب في تعلمها من الكتالوج المتاح.

Step 3: Upload notes or PDFs               - ارفع ملاحظاتك أو ملفات PDF
Step 3 desc: Easily upload your own notes  - ارفع بسهولة ملاحظاتك أو مستندات PDF لأسئلة واختبارات شخصية.

Step 4: Generate quiz & review             - أنشئ اختبارك وراجع النتائج
Step 4 desc: Automatically generate...     - أنشئ اختبارات تلقائياً من موادك المرفوعة وراجع نتائجك.
*/