import React from 'react'
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations"

function OurFeatures() {
    const { language } = useLanguage();
    const t = translations[language] || {};

    return (
        <section className='px-20 py-10 bg-(--bg-color)'>
            <h1 className='font-bold uppercase mx-auto text-center text-3xl border-b-2 w-fit'>
                {t.ourFeaturesTitle
                    ? t.ourFeaturesTitle.split(' ').map((word, i) =>
                        i === 1
                            ? <span key={i} className='text-(--second-color) pl-1'>{word}</span>
                            : <span key={i}>{word} </span>
                      )
                    : <>our<span className='text-(--second-color) pl-1'>Features</span></>
                }
            </h1>
            <div className="flex flex-wrap flex-row gap-8 mt-10 justify-center w-full">
                {/* Box 1 */}
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--text-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>01</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>
                            {t.featuresStructuredLearningTracks || "Structured Learning Tracks"}
                        </h1>
                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>{t.featuresBeginner || "Beginner"}</li>
                            <li className='list-disc'>{t.featuresIntermediate || "Intermediate"}</li>
                            <li className='list-disc'>{t.featuresAdvanced || "Advanced"}</li>
                        </ul>
                    </div>
                </div>
                {/* Box 2 */}
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--text-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>02</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>
                            {t.featuresUploadAnyFile || "Upload Any File"}
                        </h1>
                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>{t.featuresInstantQuiz || "Instant Quiz"}</li>
                            <li className='list-disc'>{t.featuresUploadFormats || "Upload PDF, DOCX, TXT"}</li>
                            <li className='list-disc'>{t.featuresAIGeneratedQuestions || "AI generates MCQs, True/False, Short answers."}</li>
                        </ul>
                    </div>
                </div>
                {/* Box 3 */}
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--text-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>03</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>
                            {t.featuresSmartFeedback || "Smart Feedback"}
                        </h1>
                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>{t.featuresSeeScore || "See score"}</li>
                            <li className='list-disc'>{t.featuresSeeCorrectAnswers || "See correct answers"}</li>
                            <li className='list-disc'>{t.featuresTrackWeakTopics || "Track weak topics"}</li>
                        </ul>
                    </div>
                </div>
                {/* Box 4 */}
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--text-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>04</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>
                            {t.featuresProgressDashboard || "Progress Dashboard"}
                        </h1>
                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>{t.featuresCoursesCompleted || "Courses completed"}</li>
                            <li className='list-disc'>{t.featuresQuizScores || "Quiz scores"}</li>
                            <li className='list-disc'>{t.featuresLearningStreak || "Learning streak"}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurFeatures