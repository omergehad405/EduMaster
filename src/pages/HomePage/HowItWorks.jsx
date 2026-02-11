import React, { useEffect, useRef, useState } from 'react';

const steps = [
    "Choose a learning track",
    "Study lessons",
    "Upload your notes or PDF",
    "Generate quiz",
    "Review results",
];

function HowItWorks() {
    const stepRefs = useRef([]);
    const [visibleSteps, setVisibleSteps] = useState(Array(steps.length).fill(false)); // For desktop and mobile steps visibility
    const [timelineFillHeight, setTimelineFillHeight] = useState(0);

    // Unified scroll detection for all breakpoints
    useEffect(() => {
        function handleScroll() {
            const nextVisible = [...visibleSteps];
            let highestIdx = -1;
            stepRefs.current.forEach((ref, idx) => {
                if (ref && !nextVisible[idx]) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.85) {
                        nextVisible[idx] = true;
                        highestIdx = idx > highestIdx ? idx : highestIdx;
                    }
                } else if (ref && window.innerWidth >= 768 && nextVisible[idx]) {
                    // Already visible, good for preserving effect in desktop
                    if (idx > highestIdx) highestIdx = idx;
                }
            });

            if (window.innerWidth >= 768) {
                // For timeline fill, animate up to the highest visible step
                if (highestIdx > -1) {
                    const stepEl = stepRefs.current[highestIdx];
                    if (stepEl) {
                        const parentRect = stepEl.parentElement.parentElement.getBoundingClientRect();
                        const elRect = stepEl.getBoundingClientRect();
                        const offset = (elRect.top + elRect.height / 2) - parentRect.top;
                        setTimelineFillHeight(offset);
                    }
                }
            }

            setVisibleSteps(nextVisible);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, [visibleSteps]);

    useEffect(() => {
        // Re-run scroll check on resize (responsive: screens could shrink/grow)
        function onResize() {
            setTimeout(() => {
                // force a state change to re-calc step visibility
                setVisibleSteps(prev => [...prev]);
            }, 70);
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <section className="px-4 md:px-20 my-16">
            <h1 className="font-bold uppercase text-center text-3xl border-b-2 border-(--second-color) w-fit mx-auto mb-12">
                how it
                <span className="text-(--second-color) pl-1">works</span>
            </h1>

            {/* Desktop Timeline */}
            <div className="hidden md:block w-full max-w-3xl mx-auto overflow-visible relative">
                {/* Full vertical line background */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-(--second-color)/20 z-0 rounded" />
                {/* Animated timeline fill */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-1 bg-(--second-color) z-10 rounded transition-all duration-700"
                    style={{ height: `${timelineFillHeight}px` }}
                />
                <ul className="relative z-20">
                    {steps.map((step, idx) => {
                        const alignLeft = idx % 2 === 0;
                        return (
                            <li key={idx} className="mb-20 flex items-center w-full relative" style={{ minHeight: '120px' }}>
                                <div className={`w-1/2 flex ${alignLeft ? 'justify-end' : 'justify-start'} pr-6 pl-6`}>
                                    {alignLeft && (
                                        <div
                                            ref={el => stepRefs.current[idx] = el}
                                            className={`
                                                howitworks-stepbox
                                                ${visibleSteps[idx] ? 'howitworks-stepbox-visible' : ''}
                                                bg-(--main-color) shadow-lg border-l-4 border-(--second-color) rounded-lg px-8 py-6 min-w-[210px] max-w-[320px] mr-8 text-right
                                                transition-all duration-700
                                            `}
                                            data-align="left"
                                        >
                                            <span className="font-semibold text-lg text-(--second-color)">
                                                {step}
                                            </span>
                                        </div>
                                    )}
                                    {!alignLeft && <div style={{ minWidth: 0, minHeight: 0 }} />}
                                </div>
                                <div className="flex flex-col items-center z-20 w-0 basis-0">
                                    <span
                                        className={`
                                            flex items-center justify-center w-12 h-12
                                            bg-(--second-color) text-(--main-color) font-bold
                                            rounded-full shadow-md border-4 border-(--main-color) text-xl
                                            transition-transform duration-300
                                            ${visibleSteps[idx] ? 'scale-105' : ''}
                                        `}
                                        style={{
                                            boxShadow: visibleSteps[idx] ? '0 4px 16px rgba(37,99,235,0.18)' : undefined
                                        }}
                                    >
                                        {idx + 1}
                                    </span>
                                    {idx !== steps.length - 1 && (
                                        <div className="w-1 bg-(--second-color)/40 flex-1 mt-0 mb-0" style={{ minHeight: '41px' }} />
                                    )}
                                </div>
                                <div className={`w-1/2 flex ${!alignLeft ? 'justify-start' : 'justify-end'} pl-6 pr-6`}>
                                    {!alignLeft && (
                                        <div
                                            ref={el => stepRefs.current[idx] = el}
                                            className={`
                                                howitworks-stepbox
                                                ${visibleSteps[idx] ? 'howitworks-stepbox-visible' : ''}
                                                bg-(--main-color) shadow-lg border-r-4 border-(--main-color) rounded-lg px-8 py-6 min-w-[210px] max-w-[320px] ml-8 text-left
                                                transition-all duration-700
                                            `}
                                            data-align="right"
                                        >
                                            <span className="font-semibold text-lg text-(--second-color)">
                                                {step}
                                            </span>
                                        </div>
                                    )}
                                    {alignLeft && <div style={{ minWidth: 0, minHeight: 0 }} />}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Mobile Timeline */}
            <ul className="flex flex-col md:hidden gap-8 max-w-xl mx-auto">
                {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 relative">
                        <span
                            ref={el => stepRefs.current[idx] = el}
                            className={`
                                flex items-center justify-center w-10 h-10
                                bg-(--second-color) text-(--main-color) font-bold
                                rounded-full shadow-md border-4 border-(--main-color) text-lg mt-1
                                transition-transform duration-200
                                ${visibleSteps[idx] ? 'scale-105' : ''}
                            `}
                            style={{ transitionDelay: `${idx * 120}ms` }}
                        >
                            {idx + 1}
                        </span>
                        <div className={`
                                ml-1 flex items-center
                                howitworks-stepbox-mobile howitworks-stepbox
                                ${visibleSteps[idx] ? 'howitworks-stepbox-visible' : ''}
                                py-3 px-5 bg-(--main-color)
                                border-l-4 border-(--main-color)
                                border-r-4 border-(--second-color)
                                rounded-lg shadow-lg w-full text-left
                                font-semibold text-(--second-color) text-base
                                transition-all duration-700
                            `}
                            style={{ transitionDelay: `${idx * 120 + 70}ms` }}
                        >
                            {step}
                        </div>
                    </li>
                ))}
            </ul>

            <style>{`
                @media (max-width: 767px) {
                    .howitworks-stepbox {
                        min-width: unset !important;
                        width: 100%;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        text-align: left !important;
                        border-right: 4px solid var(--second-color) !important;
                        border-left: 4px solid var(--main-color) !important;
                        opacity: 0;
                        transform: translateY(40px) scale(0.97) !important;
                    }
                    .howitworks-stepbox-mobile {
                        min-width: 0 !important;
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                        margin: 0;
                    }
                    .howitworks-stepbox-visible {
                        opacity: 1 !important;
                        transform: translateY(0px) scale(1) !important;
                        pointer-events: auto;
                    }
                }
                @media (min-width: 768px) {
                    .howitworks-stepbox[data-align="left"] {
                        opacity: 0;
                        left: -50rem;
                        position: relative;
                        transition-property: opacity, left;
                        transition-duration: 700ms;
                        transition-timing-function: cubic-bezier(0.24,0.93,0.39,0.99);
                        pointer-events: none;
                    }
                    .howitworks-stepbox[data-align="right"] {
                        opacity: 0;
                        left: 50rem;
                        position: relative;
                        transition-property: opacity, left;
                        transition-duration: 700ms;
                        transition-timing-function: cubic-bezier(0.24,0.93,0.39,0.99);
                        pointer-events: none;
                    }
                    .howitworks-stepbox-visible[data-align="left"] {
                        opacity: 1 !important;
                        left: 0 !important;
                        pointer-events: auto;
                    }
                    .howitworks-stepbox-visible[data-align="right"] {
                        opacity: 1 !important;
                        left: 0 !important;
                        pointer-events: auto;
                    }
                }
            `}</style>
        </section>
    );
}

export default HowItWorks;
