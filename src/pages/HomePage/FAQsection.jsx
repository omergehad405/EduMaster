import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useLanguage } from '../../hooks/useLanguage'
import translations from '../../utils/translations'


function FAQsection() {
    const [openIndex, setOpenIndex] = useState(null);
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    const faqData = t.faqQuestions || [];

    return (
        <section
            className="py-16 px-4 md:px-0 bg-(--main-color)  shadow-[0_6px_40px_0_rgba(0,0,0,0.10)]"
            dir={dir}
        >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-(--second-color) mb-10">
                <span className='text-(--text-color)'>
                    {t.faqTitle || "Frequently"}
                </span>{" "}
                {language === "ar"
                    ? ""
                    : "Asked Questions"}
                {language === "ar"
                    ? ""
                    : ""}
            </h2>
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {faqData.map((item, idx) => (
                    <div
                        key={item.question}
                        className="border border-gray-100 rounded-lg overflow-hidden shadow-sm transition-all duration-200"
                    >
                        <button
                            className={`w-full flex justify-between items-center px-6 py-4 bg-(--bg-color) focus:outline-none transition-colors ${openIndex === idx ? 'bg-(--second-color)/10' : 'hover:bg-(--main-color)'}`}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-content-${idx}`}
                        >
                            <span className="text-lg font-semibold text-(--text-color) text-left">
                                {item.question}
                            </span>
                            <span className="ml-4 text-(--text-color)">
                                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </button>
                        <div
                            id={`faq-content-${idx}`}
                            className={`px-6 py-4 text-(--p-color) text-base leading-relaxed transition-all duration-300 ${openIndex === idx
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