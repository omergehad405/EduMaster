import React from 'react'
import { FaPlusCircle, FaFlask, FaBookOpen, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const actions = [
    {
        icon: <FaPlusCircle className=" text-xl" />,
        label: "Upload File",
        to: "/upload",
    },
    {
        icon: <FaFlask className=" text-xl" />,
        label: "Generate Quiz",
        to: "/quiz/generate",
    },
    {
        icon: <FaBookOpen className=" text-xl" />,
        label: "Resume Course",
        to: "/courses",
    },
    {
        icon: <FaChartBar className=" text-xl" />,
        label: "View Detailed Statistics",
        to: "/statistic",
    },
]

function QuickActions() {
    return (
        <section className='bg-(--main-color) rounded-xl p-5 shadow'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg'>Quick Actions</h1>
            </div>
            <div className="flex flex-col gap-3">
                {actions.map((action, idx) => (
                    <Link
                        key={idx}
                        to={action.to}
                        className="flex items-center gap-4 bg-gray-50 hover:bg-(--second-color) text-black hover:text-(--main-color) transition-colors p-3 rounded-lg shadow-sm border border-gray-100 cursor-pointer"
                    >
                        <div className='text-(--second-color) '>{action.icon}</div>
                        <span className="font-medium text-gray-800 text-sm">{action.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default QuickActions