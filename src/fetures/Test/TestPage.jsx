import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FileUpload from './FileUpload';
import AiChatbot from './AiChatbot';
import QuizGenerator from './QuizGenerator';
import Quiz from './Quiz';
import LevelAssessment from './LevelAssessment';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";
import { QuizContext } from '../../context/QuizContext';

function TestPage() {
    const { generatedQuiz, showAssessment, setShowAssessment, clearFile } = useContext(QuizContext);
    const location = useLocation();
    const [selected, setSelected] = useState(() => {
        if (location.state?.tab === "quiz") return 1;
        if (location.state?.tab === "chat") return 0;
        return 0;
    });

    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const tabInfo = [
        { label: t.testTabChat || 'Chat & Summary', disabled: false },
        { label: t.testTabGenerator || 'Quiz Generator', disabled: false },
        { label: t.testTabTakeQuiz || 'Take Quiz', disabled: !generatedQuiz || generatedQuiz.length === 0 },
    ];

    useEffect(() => {
        if (location.state?.tab === "quiz") setSelected(1);
        else if (location.state?.tab === "chat") setSelected(0);
    }, [location.state]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <section className="w-full min-h-screen bg-(--bg-color) px-0 md:px-4 lg:px-10 py-10 flex justify-center">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
                {/* Sidebar FileUpload */}
                <aside className="w-full lg:w-[310px] shrink-0 mb-8 md:mb-0" dir={dir}>
                    <div className="bg-(--main-color) rounded-2xl shadow-xl p-6 sticky top-10 flex flex-col items-center">
                        <h2 className="font-bold text-xl text-(--text-color) mb-4 text-center">
                            📤 {t.testUploadDoc || "Upload Document"}
                        </h2>
                        <FileUpload />
                        <div className="mt-5 text-xs text-gray-400 text-center">
                            {t.testPowersAI || "Powers AI Chat + Quiz Generator"}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full ">
                    <div className="bg-(--bg-color) rounded-2xl shadow-2xl border border-gray-100 px-0 md:px-6 py-8 min-h-[560px] flex flex-col items-center justify-center">
                        {showAssessment ? (
                            <LevelAssessment 
                                onComplete={() => {
                                    setShowAssessment(false);
                                    setSelected(0); // Move to Chat tab after assessment
                                }}
                                onCancel={() => {
                                    setShowAssessment(false);
                                    clearFile(); // Reset file if assessment cancelled
                                }}
                            />
                        ) : (
                            <>
                                {/* Tabs */}
                                <nav className="w-full flex justify-center mb-8 bg-(--main-color)" dir={dir}>
                                    <div className="flex  shadow-inner py-2 px-2 rounded-xl gap-1 w-full max-w-4xl">
                                        {tabInfo.map((tab, idx) => (
                                            <button
                                                key={tab.label}
                                                onClick={() => !tab.disabled && setSelected(idx)}
                                                disabled={tab.disabled}
                                                title={tab.disabled ? (t.testTabTakeQuizDisabled || "Generate a quiz first to unlock this tab") : ""}
                                                className={`flex-1 py-3 rounded-lg font-semibold text-base transition-all duration-200
                                                    ${selected === idx
                                                        ? 'bg-(--second-color) text-(--text-color) shadow-lg scale-105'
                                                        : tab.disabled
                                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                                                            : 'bg-transparent text-(--text-color) hover:bg-(--second-color) cursor-pointer'
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </nav>

                                {/* Tab Content */}
                                <div className="flex flex-col items-center w-full flex-1 bg-(--bg-color)" dir={dir}>
                                    {/* Tab 1: AI Chat */}
                                    {selected === 0 && (
                                        <section className="w-full max-w-4xl animate-fadeIn">
                                            <h2 className="font-extrabold text-2xl text-(--text-color) mb-6 text-center drop-shadow">
                                                🤖 {t.testAIChatTitle || "AI Chat & Document Summary"}
                                            </h2>
                                            <AiChatbot />
                                        </section>
                                    )}

                                    {/* Tab 2: Quiz Generator */}
                                    {selected === 1 && (
                                        <section className="w-full max-w-2xl animate-fadeIn">
                                            <h2 className="font-extrabold text-2xl text-(--text-color) mb-6 text-center drop-shadow">
                                                🎯 {t.testQuizGenTitle || "Quiz Generator"}
                                            </h2>
                                            <QuizGenerator setSelected={setSelected} />
                                        </section>
                                    )}

                                    {/* Tab 3: Take Quiz */}
                                    {selected === 2 && (
                                        <section className="w-full max-w-3xl animate-fadeIn">
                                            <h2 className="font-extrabold text-2xl text-(--text-color) mb-6 text-center drop-shadow">
                                                📝 {t.testTakeQuizTitle || "Take Your Quiz"}
                                            </h2>
                                            <Quiz />
                                        </section>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </section>
    );
}

export default TestPage;
