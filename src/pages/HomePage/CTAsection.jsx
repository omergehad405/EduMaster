import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../utils/translations';

function CTAsection() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <section className="relative md:px-32 py-10 flex flex-col items-center bg-(--bg-color)" dir={dir}>
            <span className="absolute top-6 right-14 text-yellow-300 text-3xl animate-pulse select-none pointer-events-none">✨</span>
            <span className="absolute bottom-8 left-10 text-pink-400 text-2xl animate-bounce select-none pointer-events-none">★</span>
            <div className="w-full max-w-3xl text-center flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-800 drop-shadow">
                    <span className="text-(--text-color)">
                        {t.startLearning || "Start learning today"}
                    </span>
                    <br className="hidden md:block" />
                    <span className="text-(--p-color) font-semibold block mt-2 text-xl md:text-2xl">
                        {t.testYourself
                            ? <>
                                {t.testYourself} {language === "ar" ? "مثل المحترفين!" : "like a "}
                                {language !== "ar" && <span className="text-(--text-color) font-bold px-1">pro</span>}
                                {language !== "ar" && "!"}
                                {language === "ar" && <span className="text-(--text-color) font-bold px-1">محترف</span>}!
                            </>
                            : <>and test yourself like a <span className="text-(--text-color) font-bold px-1">pro</span>!</>
                        }
                    </span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg md:text-xl font-medium">
                    {t.ctaDescription || "Unlock interactive quizzes, personalized tracks, and gamified challenges designed to make you smarter, faster."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/test"
                        className="bg-(--second-color) hover:bg-(--text-color) text-(--text-color) hover:text-(--second-color) font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-500"
                    >
                        {t.startLearning || "Get Started"}
                    </Link>
                    <Link
                        to="/learn"
                        className="bg-(--text-color) hover:bg-(--second-color) text-(--second-color) hover:text-(--text-color) font-bold py-3 px-8 rounded-full text-lg transition-all duration-500"
                    >
                        {t.ctaExploreTracks || "Explore Tracks"}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CTAsection;