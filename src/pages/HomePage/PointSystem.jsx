import React from 'react';

const PointSystem = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Earn XP as You Learn! 🚀
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our platform rewards your effort with points. Climb the ranks and build an unstoppable daily streak!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Core XP Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transform transition hover:-translate-y-2 hover:shadow-xl">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Basics</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-600">Enter a Lesson</span>
                                <span className="font-bold text-blue-600">+5 XP</span>
                            </li>
                            <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-600">Finish a Lesson</span>
                                <span className="font-bold text-blue-600">+20 XP</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium">Complete Track</span>
                                <span className="font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">+100 XP</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quizzes XP Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transform transition hover:-translate-y-2 hover:shadow-xl">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                            🧠
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Knowledge</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-600">Pass Lesson Quiz</span>
                                <span className="font-bold text-purple-600">+15 XP</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium">Pass Final Track Quiz</span>
                                <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">+30 XP</span>
                            </li>
                        </ul>
                    </div>

                    {/* Streaks XP Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 transform transition hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10 z-0"></div>
                        <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6 text-2xl relative z-10">
                            🔥
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">Daily Streaks</h3>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex items-center justify-between border-b border-orange-50 pb-2">
                                <span className="text-gray-600">Daily Login</span>
                                <span className="font-bold text-orange-500">+5 XP</span>
                            </li>
                            <li className="flex items-center justify-between border-b border-orange-50 pb-2">
                                <span className="text-gray-600">7 Days Streak</span>
                                <span className="font-bold text-orange-500">+20 Bonus</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600 font-bold">30 Days Streak</span>
                                <span className="font-bold text-white bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1 rounded-full">+100 Bonus</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 text-center bg-blue-50 py-4 px-8 rounded-full inline-block mx-auto max-w-fit">
                    <p className="text-blue-800 font-medium flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Daily Cap: You can earn a maximum of 200 XP per day. Stay consistent!
                    </p>
                </div>

            </div>
        </section>
    );
};

export default PointSystem;
