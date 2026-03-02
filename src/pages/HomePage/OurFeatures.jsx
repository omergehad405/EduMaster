import React from 'react'

function OurFeatures() {
    return (
        <section className='px-20 my-10'>
            <h1 className='font-bold uppercase text-left text-3xl border-b-2 w-fit'>our<span className='text-(--second-color) pl-1'>Features</span></h1>
            <div className="flex flex-wrap flex-row gap-8 mt-10 justify-center w-full">
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--main-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>01</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>Structured Learning Tracks</h1>

                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>Beginner</li>
                            <li className='list-disc'>Intermediate</li>
                            <li className='list-disc'>Advanced</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--main-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>02</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>Upload Any File</h1>

                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>Instant Quiz</li>
                            <li className='list-disc'>Upload PDF, DOCX, TXT</li>
                            <li className='list-disc'>AI generates MCQs, True/False, Short answers.</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--main-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>03</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>Smart Feedback</h1>

                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>See score</li>
                            <li className='list-disc'>See correct answers</li>
                            <li className='list-disc'>Track weak topics</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-(--main-color) relative p-5 w-[280px] min-h-[400px] shadow-xl'>
                    <div className="absolute top-0 right-10 w-[50px] h-[80px] text-2xl bg-(--second-color) text-(--main-color) font-bold flex items-center justify-center
                        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:border-x-25 before:border-x-transparent before:border-b-20 before:border-b-(--main-color) before:w-0 before:h-0">
                        <span>04</span>
                    </div>
                    <div className='border border-gray-300 w-full h-full p-5 pt-20'>
                        <h1 className='text-(--second-color) font-bold text-2xl text-center'>Progress Dashboard</h1>

                        <ul className='flex flex-col gap-2 mt-5 font-semibold ml-7 text-sm'>
                            <li className='list-disc'>Courses completed</li>
                            <li className='list-disc'>Quiz scores</li>
                            <li className='list-disc'>Learning streak</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurFeatures