import React from 'react'

const benefits = [
    {
        title: "Learn faster",
        description: "Accelerate your learning journey with interactive experiences designed for your pace.",
        emoji: "🚀"
    },
    {
        title: "Remember more",
        description: "Turn knowledge into lasting memories with engaging, brain-friendly quizzes.",
        emoji: "🧠"
    },
    {
        title: "Practice smarter",
        description: "Spend less time guessing and more time mastering what truly matters.",
        emoji: "🎯"
    },
    {
        title: "No boring exams",
        description: "Goodbye to stress. Hello to fun and inspiring challenges that excite you to keep going.",
        emoji: "😄"
    },
    {
        title: "Personalized quizzes",
        description: "Experience quizzes crafted just for you — because your journey is unique.",
        emoji: "✨"
    },
];

function BenefitsSection() {
    return (
        <section className="px-4 sm:px-16 md:px-20 py-16 bg-(--main-color)">
            <h1 className="font-bold text-3xl md:text-4xl uppercase text-center border-b-2 border-(--second-color) w-fit mx-auto mb-8 tracking-wide">
                why <span className="text-(--second-color)">you'll love it</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
                {benefits.map((benefit, idx) => (
                    <div
                        key={benefit.title}
                        className={`
                            relative
                            flex flex-col items-center
                            bg-gradient-to-br from-(--main-color) via-(--main-color) to-(--second-color)/10
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
                            className="text-4xl md:text-5xl mb-4 drop-shadow font-bold"
                            aria-label={benefit.title}
                        >
                            {benefit.emoji}
                        </span>
                        <h2 className="text-xl md:text-2xl font-extrabold text-(--second-color) text-center mb-2 tracking-tight drop-shadow">
                            {benefit.title}
                        </h2>
                        <p className="text-center text-gray-600 font-medium text-base md:text-lg">
                            {benefit.description}
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