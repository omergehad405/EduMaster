import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileUpload from './FileUpload';
import AiChatbot from './AiChatbot';
import Quiz from './Quiz';

const tabInfo = [
    { label: 'Chat & Summary' },
    { label: 'Quiz' },
];

function TestPage() {
    const [selected, setSelected] = useState(0);
    const location = useLocation();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 px-0 md:px-4 lg:px-10 py-10 flex justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-7xl gap-8">
                {/* Sidebar FileUpload */}
                <aside className="w-full md:w-[310px] flex-shrink-0 mb-8 md:mb-0">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-10 flex flex-col items-center">
                        <h2 className="font-bold text-xl text-(--second-color) mb-4 text-center">
                            Upload a PDF or Word Document
                        </h2>
                        <FileUpload />
                        {/* You might want to add a divider or helper text here */}
                        <div className="mt-5 text-xs text-gray-400 text-center">Your uploaded file powers the AI and quiz!</div>
                    </div>
                </aside>

                {/* Main Content (Chat & Quiz) */}
                <main className="flex-1 w-full">
                    {/* Page Card + Tabs */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 px-0 md:px-6 py-8 min-h-[560px] flex flex-col">
                        <nav className="w-full flex justify-center mb-8">
                            <div className="flex bg-gray-50 shadow-inner py-2 px-2 rounded-xl gap-1 w-full max-w-xl">
                                {tabInfo.map((tab, idx) => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setSelected(idx)}
                                        className={`flex-1 py-3 rounded-lg font-semibold text-base transition-all duration-200
                                            ${selected === idx
                                                ? 'bg-(--second-color) text-white shadow-lg scale-105'
                                                : 'bg-transparent text-(--second-color) hover:bg-blue-100'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* Main Tab Content */}
                        <div className="flex flex-col items-center w-full flex-1">
                            {selected === 0 && (
                                <section className="flex flex-col items-center w-full animate-fadeIn">
                                    <h2 className="font-extrabold text-2xl text-(--second-color) mb-4 text-center drop-shadow">
                                        AI Chat & Document Summary
                                    </h2>
                                    <div className="w-full max-w-3xl">
                                        <AiChatbot />
                                    </div>
                                </section>
                            )}

                            {selected === 1 && (
                                <section className="flex flex-col items-center w-full animate-fadeIn">
                                    <h2 className="font-extrabold text-2xl text-(--second-color) mb-4 text-center drop-shadow">
                                        Quiz Yourself!
                                    </h2>
                                    <div className="w-full max-w-3xl">
                                        <Quiz />
                                    </div>
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