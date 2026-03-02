import React from 'react';
import { Link } from 'react-router-dom';

function CTAsection() {
    return (
        <section className="relative md:px-32 my-20 flex flex-col items-center">
            <span className="absolute top-6 right-14 text-yellow-300 text-3xl animate-pulse select-none pointer-events-none">✨</span>
            <span className="absolute bottom-8 left-10 text-pink-400 text-2xl animate-bounce select-none pointer-events-none">★</span>
            <div className="w-full max-w-3xl text-center flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-800 drop-shadow">
                    <span className="text-(--second-color)">Start learning today</span><br className="hidden md:block" />
                    <span className="text-gray-700 font-semibold block mt-2 text-xl md:text-2xl">and test yourself like a <span className="text-(--second-color) font-bold">pro</span>!</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg md:text-xl font-medium">
                    Unlock interactive quizzes, personalized tracks, and gamified challenges designed to make you smarter, faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/test"
                        className="bg-(--second-color) hover:bg-(--main-color) text-(--main-color) hover:text-(--second-color) font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-500"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/learn"
                        className="bg-(--main-color) hover:bg-(--second-color) text-(--second-color) hover:text-(--main-color) font-bold py-3 px-8 rounded-full text-lg transition-all duration-500"
                    >
                        Explore Tracks
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CTAsection;