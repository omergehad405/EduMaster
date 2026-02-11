import React from 'react'
import { FaCheckCircle, FaBrain, FaUpload, FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const activities = [
    {
        message: <>Completed <span className="font-semibold">“JavaScript Basics – Lesson 5”</span></>,
        time: "2 hours ago",
    },
    {
        message: <>Scored <span className="font-semibold">85%</span> on <span className="font-semibold">React Quiz</span></>,
        time: "4 hours ago",
    },
    {
        message: <>Uploaded <span className="font-semibold">“Data Structures Notes.pdf”</span></>,
        time: "Yesterday",
    },
    {
        message: <>Completed <span className="font-semibold">HTML Track</span></>,
        time: "2 days ago",
    },
]

function RecentActivity() {
    return (
        <section className='bg-(--main-color) rounded-xl p-5 shadow'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg '>Recent Activity</h1>

                <Link to="statistic" className='bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer '>view all</Link>
            </div>
            <div className="flex flex-col gap-3">
                {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex-1">
                            <div className="text-gray-800 text-sm">{activity.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RecentActivity