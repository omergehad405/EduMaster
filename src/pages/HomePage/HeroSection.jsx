import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations"

function HeroSection() {
    const [animateText, setAnimateText] = useState(false)
    const [animateImg, setAnimateImg] = useState(false)
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        // Stagger the animations for a smoother feel
        setTimeout(() => setAnimateText(true), 100)
        setTimeout(() => setAnimateImg(true), 300)
    }, [])

    return (
        <div
            dir={dir}
            className={`${dir === "rtl" ? "rtl" : "ltr"} bg-(--bg-color) flex items-center lg:justify-center justify-between relative overflow-hidden lg:h-[90vh] h-[70vh]`}
        >
            <div
                className={`
                    w-[500px]px - 20
                    transition-all duration-1000
                    ${animateText ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'}
                `}
            >
                <h1 className='text-(--text-color) font-bold text-4xl'>
                    {/* Use translated and highlighted segments for the hero title */}
                    {t.heroTitle ? (
                        <>
                            {t.heroTitle.split(/(بذكاء|Smarter|نفسك|Yourself|أي موضوع|Any Topic)/).map((part, idx) => {
                                // Highlight if it's one of the keywords
                                if (
                                    part === (t.heroSmarter || "Smarter") ||
                                    part === (t.heroYourself || "Yourself") ||
                                    part === (t.heroAnyTopic || "Any Topic") ||
                                    part === "بذكاء" ||
                                    part === "نفسك" ||
                                    part === "أي موضوع" ||
                                    part === "Smarter" ||
                                    part === "Yourself" ||
                                    part === "Any Topic"
                                ) {
                                    return (
                                        <span key={idx} className="text-(--second-color)">
                                            {part}
                                        </span>
                                    )
                                }
                                return <React.Fragment key={idx}>{part}</React.Fragment>
                            })}
                        </>
                    ) : (
                        <>
                            Learn <span className='text-(--second-color)'>Smarter</span>, Test <span className='text-(--second-color)'>Yourself</span>, Master <span className='text-(--second-color)'>Any Topic</span>.
                        </>
                    )}
                </h1>
                <p className='text-md text-gray-500 my-5'>
                    {t.heroSubtitle || "AI-powered learning tracks + instant quizzes from your own files."}
                </p>
                <div className='flex items-center gap-10'>
                    <Link
                        to="learn"
                        className='rounded-sm bg-(--second-color) text-(--main-color) hover:bg-(--main-color) hover:text-(--second-color) font-bold py-2 px-5 cursor-pointer border border-[--second-color] transition-all duration-500'
                    >
                        {t.startLearning || "Start Learning"}
                    </Link>
                    <Link
                        to="test"
                        className='rounded-sm bg-(--second-color) text-(--main-color) hover:bg-(--main-color) hover:text-(--second-color) font-bold py-2 px-5 cursor-pointer border border-[--second-color] transition-all duration-500'
                    >
                        {t.testYourself || "Test Yourself"}
                    </Link>
                </div>
            </div>
            <img
                src="./heroImage.png"
                alt="heroImage"
                className={`
                    hidden md:block w-[450px]
                    transition-all duration-1000
                    ${animateImg ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}
                `}
            />
        </div>
    )
}

export default HeroSection
