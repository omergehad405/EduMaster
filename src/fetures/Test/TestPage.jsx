import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileUpload from './FileUpload';
import AiChatbot from './AiChatbot';
import QuizGenerator from './QuizGenerator';
import Quiz from './Quiz';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";

function TestPage() {
    const [selected, setSelected] = useState(0);
    const location = useLocation();

    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const tabInfo = [
        { label: t.testTabChat || 'Chat & Summary' },
        { label: t.testTabGenerator || 'Quiz Generator' },
        { label: t.testTabTakeQuiz || 'Take Quiz' },
    ];

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
                    <div className="bg-(--bg-color) rounded-2xl shadow-2xl border border-gray-100 px-0 md:px-6 py-8 min-h-[560px] flex flex-col">

                        {/* Tabs */}
                        <nav className="w-full flex justify-center mb-8 bg-(--main-color)" dir={dir}>
                            <div className="flex  shadow-inner py-2 px-2 rounded-xl gap-1 w-full max-w-4xl">
                                {tabInfo.map((tab, idx) => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setSelected(idx)}
                                        className={`flex-1 py-3 rounded-lg font-semibold text-base transition-all duration-200
                                            ${selected === idx
                                                ? 'bg-(--second-color) text-(--text-color) shadow-lg scale-105'
                                                : 'bg-transparent text-(--text-color) hover:bg-(--second-color)'
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
                                    <QuizGenerator />
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
                    </div>
                </main>
            </div>
        </section>
    );
}

export default TestPage;
