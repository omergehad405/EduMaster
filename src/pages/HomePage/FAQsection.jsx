import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const faqData = [
    {
        question: "What is this platform?",
        answer:
            "This platform helps you learn through structured learning tracks and test yourself using AI-generated quizzes from your own study files.",
    },
    {
        question: "Is this platform free to use?",
        answer:
            "Yes, this is a graduation project demo. In the future, premium features can be added like advanced analytics and personalized learning plans.",
    },
    {
        question: "Who is this platform for?",
        answer:
            "Students, self-learners, and anyone preparing for exams or improving skills.",
    },
    {
        question: "What are learning tracks?",
        answer:
            "Learning tracks are structured learning paths that guide you from beginner to advanced levels in specific topics like programming, math, or languages.",
    },
    {
        question: "Can I learn without uploading files?",
        answer:
            "Yes. You can follow tracks and lessons normally without using the AI quiz feature.",
    },
    {
        question: "Can I track my learning progress?",
        answer:
            "Yes. Your progress, completed lessons, and quiz scores are displayed in your dashboard.",
    },
    {
        question: "What file types can I upload?",
        answer:
            "You can upload PDF, DOCX, TXT, and other supported file formats.",
    },
    {
        question: "How does the quiz generation work?",
        answer:
            "The system analyzes your uploaded file and automatically generates questions such as multiple choice, true/false, and short-answer questions.",
    },
    {
        question: "Are the questions accurate?",
        answer:
            "The AI generates questions based on your content, but they may not be perfect. The goal is to help you practice and review.",
    },
    {
        question: "Can I regenerate questions?",
        answer:
            "Yes. You can regenerate quizzes to get different questions from the same file.",
    },
    {
        question: "How can I see my quiz results?",
        answer:
            "After finishing a quiz, you will see your score, correct answers, and mistakes.",
    },
    {
        question: "Is my progress saved?",
        answer:
            "Yes. Your learning progress and quiz history are stored in your account.",
    },
    {
        question: "Can I retake quizzes?",
        answer:
            "Yes. You can retake quizzes anytime for practice.",
    },
    {
        question: "Will there be a mobile app?",
        answer:
            "In the future, a mobile version is planned to make learning accessible anywhere.",
    },
];

function FAQsection() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = idx => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-16 px-4 md:px-0 my-12 bg-(--main-color) rounded-xl shadow-[0_6px_40px_0_rgba(0,0,0,0.10)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-(--second-color) mb-10">
                <span className='text-black'>Frequently</span> Asked Questions
            </h2>
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {faqData.map((item, idx) => (
                    <div
                        key={item.question}
                        className="border border-gray-100 rounded-lg overflow-hidden shadow-sm transition-all duration-200"
                    >
                        <button
                            className={`w-full flex justify-between items-center px-6 py-4 bg-gray-50 focus:outline-none transition-colors ${openIndex === idx ? 'bg-(--second-color)/10' : 'hover:bg-gray-100'}`}
                            onClick={() => handleToggle(idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-content-${idx}`}
                        >
                            <span className="text-lg font-semibold text-gray-800 text-left">{item.question}</span>
                            <span className="ml-4 text-(--second-color)">
                                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </button>
                        <div
                            id={`faq-content-${idx}`}
                            className={`px-6 pb-4 text-gray-600 text-base leading-relaxed transition-all duration-300 ${openIndex === idx
                                ? 'max-h-[300px] opacity-100 pointer-events-auto'
                                : 'max-h-0 opacity-0 pointer-events-none'
                                }`}
                            style={{
                                overflow: 'hidden',
                            }}
                        >
                            {openIndex === idx && (
                                <div>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FAQsection