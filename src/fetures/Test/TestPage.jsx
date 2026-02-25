import React, { useState } from 'react'
import FileUpload from "./FileUpload"
import AiChatbot from "./AiChatbot"
import Quiz from "./Quiz"

const tabInfo = [
    {
        label: 'Upload File',
        icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        ),
    },
    {
        label: 'Chat & Summary',
        icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v7a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h9" />
                <circle cx="17" cy="5" r="3" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        label: 'Quiz',
        icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 12h4m-4 5h10" />
            </svg>
        ),
    }
];

function TestPage() {
    const [selected, setSelected] = useState(0);

    return (
        <section className="px-0 py-8 md:px-10 lg:px-32">
            {/* Tab Nav */}
            <nav className="w-full flex justify-center">
                <div className="bg-(--main-color) shadow-[0_2px_16px_#a6a9b31a] py-2 px-2 mt-4 rounded-2xl flex gap-1 border border-gray-200 w-full max-w-2xl">
                    {tabInfo.map((tab, idx) => (
                        <button
                            key={tab.label}
                            onClick={() => setSelected(idx)}
                            className={[
                                "flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-[15.5px] transition-all duration-200",
                                selected === idx
                                    ? "bg-gradient-to-tr from-[var(--second-color)] to-blue-400 text-white shadow focus:ring-2 focus:ring-blue-200 scale-105"
                                    : "bg-transparent text-gray-700 hover:bg-blue-50 hover:text-[var(--second-color)]"
                            ].join(' ')}
                            style={{
                                boxShadow: selected === idx ? "0 2px 10px #796af72b" : "none"
                            }}
                        >
                            {tab.icon}
                            <span className="hidden md:inline">{tab.label}</span>
                            <span className="inline md:hidden">{tab.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Content Section - Redesigned */}
            <div className="flex flex-col items-center w-full mt-10">
                <div className="relative w-[95%] lg:w-full max-w-4xl bg-gradient-to-br from-gray-100 to-blue-300 p-0 sm:p-10 md:p-14 min-h-[480px] rounded-[2.1rem] shadow-2xl my-10 flex items-stretch justify-center border border-blue-100 transition-shadow duration-300">
                    {/* Decorative circle */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-200/40 rounded-full z-0 blur-[6px]" />
                    {/* Decorative lines */}
                    <div className="absolute -bottom-10 right-5 w-36 h-10 bg-gradient-to-r from-blue-300/20 to-[var(--second-color)]/5 rounded-full z-0 blur-[5px]" />
                    
                    {/* Content */}
                    <div className="flex-1 z-10 flex items-center justify-center min-h-[350px]">
                        {selected === 0 && (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="font-bold text-[1.6rem] text-blue-800 mb-5 text-center">Upload a PDF or Word Document</h2>
                                <FileUpload />
                            </div>
                        )}
                        {selected === 1 && (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="font-bold text-[1.6rem] text-blue-800 mb-5 text-center">AI Chat & Document Summary</h2>
                                <AiChatbot />
                            </div>
                        )}
                        {selected === 2 && (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="font-bold text-[1.6rem] text-blue-800 mb-5 text-center">Quiz Yourself!</h2>
                                <Quiz />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestPage