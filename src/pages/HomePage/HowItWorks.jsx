import React, { useEffect, useRef, useState } from 'react'

const steps = [
    "Choose a learning track",
    "Study lessons",
    "Upload your notes or PDF",
    "Generate quiz",
    "Review results",
];

function HowItWorks() {
    const stepRefs = useRef([]);
    const timelineRef = useRef();

    const [visibleSteps, setVisibleSteps] = useState(Array(steps.length).fill(false));
    const [fillPercent, setFillPercent] = useState(0);

    useEffect(() => {
        const revealStep = (idx) => {
            setVisibleSteps((prev) => {
                if (prev[idx]) return prev;
                const copy = [...prev];
                copy[idx] = true;
                return copy;
            });
        };

        const handleScroll = () => {
            let lastVisibleIdx = -1;
            stepRefs.current.forEach((ref, idx) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.8) {
                        revealStep(idx);
                        lastVisibleIdx = idx;
                    }
                }
            });

            const percent = lastVisibleIdx < 0
                ? 0
                : ((lastVisibleIdx + 1) / steps.length) * 100;
            setFillPercent(percent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="px-4 md:px-20 my-16">
            <h1 className="font-bold uppercase text-center text-3xl border-b-2 border-(--second-color) w-fit mx-auto mb-12">
                how it
                <span className="text-(--second-color) pl-1">works</span>
            </h1>
            <div className="relative flex justify-center">
                <ul className="relative w-full max-w-3xl mx-auto">
                    {/* Timeline: show only on md and above */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-3 z-0 hidden md:block" ref={timelineRef}>
                        {/* Timeline base (white, rounded) */}
                        <div className="absolute w-full h-full bg-white rounded-full shadow" />
                        {/* Timeline fill (second color, rounded, dynamic height) */}
                        <div className="absolute w-full bg-(--second-color) rounded-full transition-all duration-700"
                            style={{
                                height: `${fillPercent}%`,
                                top: 0,
                                left: 0,
                                zIndex: 2,
                            }} />
                    </div>
                    {steps.map((step, idx) => {
                        const isLeft = idx % 2 === 0;
                        return (
                            <li
                                key={idx}
                                className={`relative mb-14
                                    md:flex md:justify-between md:items-center
                                    flex items-center
                                `}
                                style={{ zIndex: 1 }}
                            >
                                {/* Desktop Layout */}
                                <div className={`w-1/2 hidden md:flex ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                                    {((isLeft && stepRefs.current[idx]) || (!isLeft && stepRefs.current[idx])) && (
                                        <div
                                            ref={el => stepRefs.current[idx] = el}
                                            className={
                                                `howitworks-box
                                                ${visibleSteps[idx] ? 'howitworks-box-visible' : ''} 
                                                py-4 px-8 bg-white 
                                                ${isLeft 
                                                    ? 'border-r-4 border-(--second-color) border-l-4 border-(--main-color) text-right' 
                                                    : 'border-l-4 border-(--main-color) border-r-4 border-(--second-color) text-left'}
                                                rounded-lg shadow-lg min-w-[230px]
                                                transition-all duration-700
                                                `
                                            }
                                            style={{ transitionDelay: `${idx * 170}ms` }}
                                        >
                                            <span className="font-semibold text-lg text-(--second-color)">
                                                {step}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* Timeline number */}
                                <div className="hidden md:flex flex-col items-center z-10">
                                    <span className={`
                                        flex items-center justify-center w-12 h-12 
                                        bg-(--second-color) text-white font-bold
                                        rounded-full shadow-md border-4 border-white text-xl
                                        transition-transform duration-200
                                        ${visibleSteps[idx] ? 'scale-105' : ''}
                                    `}>
                                        {idx + 1}
                                    </span>
                                </div>
                                {/* Mobile Layout */}
                                <div className="flex md:hidden w-full">
                                    <div className="flex items-center w-full">
                                        <span className={`
                                            flex-shrink-0 flex items-center justify-center w-10 h-10 mr-3
                                            bg-(--second-color) text-white font-bold
                                            rounded-full shadow-md border-4 border-white text-lg
                                            transition-transform duration-200
                                            ${visibleSteps[idx] ? 'scale-105' : ''}
                                        `}>
                                            {idx + 1}
                                        </span>
                                        <div
                                            ref={el => stepRefs.current[idx] = el}
                                            className={
                                                `howitworks-box-mobile
                                                howitworks-box
                                                ${visibleSteps[idx] ? 'howitworks-box-visible' : ''}
                                                py-4 px-5 bg-white
                                                border-l-4 border-(--main-color)
                                                border-r-4 border-(--second-color)
                                                rounded-lg shadow-lg w-full text-left
                                                transition-all duration-700
                                                `
                                            }
                                            style={{ transitionDelay: `${idx * 170}ms` }}
                                        >
                                            <span className="font-semibold text-base text-(--second-color)">
                                                {step}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <style>{`
                @media (max-width: 767px) {
                    .howitworks-box {
                        min-width: unset !important;
                        width: 100%;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        text-align: left !important;
                        border-right: 4px solid var(--second-color) !important;
                        border-left: 4px solid var(--main-color) !important;
                    }
                    .howitworks-box-mobile {
                        min-width: 0 !important;
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                        margin: 0;
                    }
                }
                .howitworks-box {
                    opacity: 0;
                    transform: translateY(40px) scale(0.97);
                    transition-property: opacity, transform;
                    transition-timing-function: cubic-bezier(0.24,0.93,0.39,0.99);
                }
                .howitworks-box-visible {
                    opacity: 1 !important;
                    transform: translateY(0px) scale(1) !important;
                }
            `}</style>
        </section>
    );
}

export default HowItWorks