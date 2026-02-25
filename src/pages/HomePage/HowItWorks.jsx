import React from 'react';

// Example steps and (optional) icons/images - you can replace the icon/image import below with your own if needed
const steps = [
    {
        title: "Sign up for free",
        desc: "Create your profile and select your preferred learning track to get started.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-[var(--second-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11c1.104 0 2-.896 2-2V7a4 4 0 10-8 0v2c0 1.104.896 2 2 2h4zm-4 6a4 4 0 008 0V11a4 4 0 00-8 0v6z" /></svg>
        ),
    },
    {
        title: "Pick your topics",
        desc: "Choose the lessons or topics you wish to learn from our available catalog.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-[var(--second-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4V20" /><rect width="20" height="8" x="2" y="4" rx="2" /><rect width="4" height="4" x="2" y="16" rx="1" /></svg>
        ),
    },
    {
        title: "Upload notes or PDFs",
        desc: "Easily upload your own notes or PDF documents for personalized quizzes.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-[var(--second-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
        ),
    },
    {
        title: "Generate quiz & review",
        desc: "Automatically generate quizzes based on your uploaded material and review your results.",
        icon: (
            <svg className="w-12 h-12 mx-auto mb-2 text-[var(--second-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
        ),
    },
];

function HowItWorks() {
    return (
        <section className="px-4 md:px-20 my-16">
            <h1 className="font-bold uppercase text-center text-3xl border-b-2 border-[var(--second-color)] w-fit mx-auto mb-6">
                How it
                <span className="text-[var(--second-color)] pl-1">works</span>
            </h1>
            <p className="mb-12 text-center text-gray-500 text-lg max-w-2xl mx-auto">
                Follow these 4 easy steps to start learning, upload your notes, and generate personalized quizzes!
            </p>

            <div className="hidden md:flex flex-wrap justify-center items-stretch gap-8 bg-gradient-to-b from-[#6658ea] to-[#7c67ff] px-0 pt-10 pb-20 rounded-md relative" style={{ boxShadow: '0 6px 28px 0 rgba(0,0,0,.09)' }}>
                {/* Overlay for white background "cards" */}
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white rounded-b-md pointer-events-none z-0" />
                <div className="flex flex-wrap gap-8 w-full justify-center z-10 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col items-center bg-white rounded-lg shadow-xl px-6 py-8 w-72 min-h-[280px] transition-transform duration-300 hover:-translate-y-1`}
                            style={{
                                boxShadow: "0 2px 12px rgb(30 41 76 / 10%), 0 1.5px 6px rgba(80, 94, 153, 0.10)",
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <div className={`flex items-center justify-center rounded-full bg-white border-4 border-[var(--second-color)] w-14 h-14 shadow-lg -mt-12 mb-2`}>
                                <span className="font-bold text-[var(--second-color)] text-xl">{idx + 1}</span>
                            </div>
                            {/* Icon if you want, or replace with img */}
                            {step.icon}
                            <h3 className="font-bold text-base mb-2 text-gray-900 text-center">{step.title}</h3>
                            <p className="text-gray-500 text-sm text-center">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MOBILE STYLE */}
            <ul className="flex flex-col md:hidden gap-8 max-w-xl mx-auto mt-10">
                {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 relative">
                        <span
                            className={`
                                flex items-center justify-center w-10 h-10
                                bg-[var(--second-color)] text-[var(--main-color)] font-bold
                                rounded-full shadow-md border-4 border-[var(--main-color)] text-lg mt-1`}
                        >
                            {idx + 1}
                        </span>
                        <div className={`
                            ml-1 flex flex-col items-start howitworks-stepbox-mobile py-3 px-5 bg-[var(--main-color)]
                            border-l-4 border-[var(--main-color)]
                            border-r-4 border-[var(--second-color)]
                            rounded-lg shadow-lg w-full text-left
                            font-semibold text-[var(--second-color)] text-base
                            `}
                        >
                            <div className="font-bold text-gray-900 mb-2">{step.title}</div>
                            <div className="text-gray-500 text-sm">{step.desc}</div>
                        </div>
                    </li>
                ))}
            </ul>

            <style>{`
                @media (max-width: 767px) {
                    .howitworks-stepbox-mobile {
                        min-width: 0 !important;
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                        margin: 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default HowItWorks;
