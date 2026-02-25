import React from 'react'

function AboutUs() {
    return (
        <section className='flex items-center lg:justify-center justify-between gap-20 pl-10 pr-20 py-20 pt-5 bg-(--main-color) relative'>
            <img src="./aboutUs.jpg" alt="about us image" className='hidden md:block ' />

            <div className='mt-10 w-[500px]'>
                <h1 className='font-bold uppercase text-left text-3xl border-b-2 w-fit'>about<span className='text-(--second-color) pl-1'>us</span></h1>
                <p className='text-gray-500 text-lg my-5'>This platform helps students learn through structured tracks and test themselves using AI-generated questions from any uploaded file (PDF, Word, text, or slides).</p>

                <ul className='flex flex-col gap-1 ml-5'>
                    <li className='text-(--second-color) font-semibold text-lg list-disc'>Learning Tracks</li>
                    <li className='text-(--second-color) font-semibold text-lg list-disc'>AI Quiz Generator</li>
                    <li className='text-(--second-color) font-semibold text-lg list-disc'>Progress Tracking</li>
                </ul>
            </div>
        </section>
    )
}

export default AboutUs
