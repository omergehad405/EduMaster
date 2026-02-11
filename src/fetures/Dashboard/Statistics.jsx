import React from 'react'
import { Link } from 'react-router-dom'

function Statistics() {
    // Gather average score as a number for the progress-circle
    const averageScore = 50; // percent

    return (
        <section className=' rounded-xl p-5 bg-(--main-color)'>
            <div className='flex items-center justify-between'>
                <h1 className='capitalize font-semibold text-lg '>statistic</h1>

                <Link to="statistic" className='bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer '>view all</Link>
            </div>

            <div className='mt-5'>
                <div className="w-[170px] h-[170px] mx-auto rounded-full flex items-center justify-center relative">
                    {/* Circular progress around profile */}
                    <svg
                        className="absolute top-0 left-0"
                        width="170"
                        height="170"
                        viewBox="0 0 170 170"
                    >
                        {/* Background circle */}
                        <circle
                            cx="85"
                            cy="85"
                            r="78"
                            fill="none"
                            stroke="#C5C5C5"
                            strokeWidth="10"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="85"
                            cy="85"
                            r="78"
                            fill="none"
                            stroke="var(--second-color)"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 78}
                            strokeDashoffset={2 * Math.PI * 78 * (1 - averageScore / 100)}
                            strokeLinecap="round"
                            style={{
                                transition: 'stroke-dashoffset 0.7s ease',
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%'
                            }}
                        />
                    </svg>
                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden flex items-center justify-center relative bg-(--main-color) z-10">
                        <img src="userImage.jpg" alt="user_image" className='w-full h-full object-cover rounded-full' />
                    </div>
                </div>
                <h1 className='flex items-center justify-center gap-1 capitalize font-semibold mt-3 text-xl'>
                    welcome, <span className='text-(--second-color) font-bold'>Omar</span> <span className="">👋</span>
                </h1>
            </div>

            <div className="flex flex-wrap justify-between mt-6 gap-3">
                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">Tracks Completed</div>
                    <div className="font-bold text-2xl text-(--second-color)">3</div>
                </div>
                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">Quizzes Taken</div>
                    <div className="font-bold text-2xl text-(--second-color)">7</div>
                </div>
                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">total progress</div>
                    <div className="font-bold text-2xl text-(--second-color)">{averageScore}%</div>
                </div>
            </div>
        </section>
    )
}

export default Statistics