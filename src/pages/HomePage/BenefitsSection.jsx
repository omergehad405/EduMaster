import React from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import translations from "../../utils/translations";

// Use the text in the translation component that relates to this component in this formula: {t.startLearning || "Start Learning"}

const benefitKeys = [
    {
        title: 'benefitsLearnFaster',
        description: 'benefitsLearnFasterDesc',
        emoji: "🚀"
    },
    {
        title: 'benefitsRememberMore',
        description: 'benefitsRememberMoreDesc',
        emoji: "🧠"
    },
    {
        title: 'benefitsPracticeSmarter',
        description: 'benefitsPracticeSmarterDesc',
        emoji: "🎯"
    },
    {
        title: 'benefitsNoBoringExams',
        description: 'benefitsNoBoringExamsDesc',
        emoji: "😄"
    },
    {
        title: 'benefitsPersonalizedQuizzes',
        description: 'benefitsPersonalizedQuizzesDesc',
        emoji: "✨"
    },
];

function BenefitsSection() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <section
            className="px-4 sm:px-16 md:px-20 py-16 bg-(--main-color)"
            dir={dir}
        >
            <h1 className="font-bold text-3xl md:text-4xl uppercase text-center border-b-2 border-(--second-color) w-fit mx-auto mb-8 tracking-wide">
                {t.benefitsTitle
                    ? t.benefitsTitle
                    : <>
                        why <span className="text-(--second-color)">you'll love it</span>
                      </>
                }
            </h1>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
                {benefitKeys.map((benefit, idx) => (
                    <div
                        key={benefit.title}
                        className={`
                            relative
                            flex flex-col items-center
                            bg-linear-to-br from-(--bg-color) via-(--bg-color) to-(--second-color)/10
                            rounded-3xl shadow-xl
                            px-7 py-10 w-[275px] min-h-[250px] transition
                            opacity-0 translate-y-9 animate-fadein
                            animation-delay-${idx * 150}
                            group
                        `}
                        style={{
                            animationDelay: `${idx * 170 + 100}ms`,
                            animationFillMode: 'forwards',
                            animationDuration: '920ms',
                        }}
                    >
                        <span
                            className="text-4xl md:text-5xl mb-4 drop-shadow font-bold "
                            aria-label={t[benefit.title] || benefit.title}
                        >
                            {benefit.emoji}
                        </span>
                        <h2 className="text-xl md:text-2xl font-extrabold text-(--text-color) text-center mb-2 tracking-tight drop-shadow">
                            {t[benefit.title] || benefit.title}
                        </h2>
                        <p className="text-center text-(--p-color) font-medium text-base md:text-lg">
                            {t[benefit.description] || benefit.description}
                        </p>
                        {/* sparkles */}
                        <span className="absolute -top-3 -right-3 text-yellow-300 text-lg animate-bounce select-none pointer-events-none">★</span>
                        <span className="absolute -bottom-3 -left-4 text-pink-400 text-base animate-ping select-none pointer-events-none">♥</span>
                    </div>
                ))}
            </div>
            {/* Fade-in animation style */}
            <style>{`
                @keyframes fadein {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fadein {
                    animation-name: fadein;
                }
            `}</style>
        </section>
    );
}

export default BenefitsSection