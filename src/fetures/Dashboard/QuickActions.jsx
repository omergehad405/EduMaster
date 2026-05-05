import React from 'react'
import { FaPlusCircle, FaFlask, FaBookOpen, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'



// Quick Actions // إجراءات سريعة
function QuickActions({ t }) {

    const actions = [
        {
            icon: <FaPlusCircle className=" text-xl" />,
            // Upload File // رفع ملف
            label: t.quickActionsUploadNotes || "Upload File",
            to: {
                pathname: "/test",
                state: { tab: "chat" }
            },
        },
        {
            icon: <FaFlask className=" text-xl" />,
            // Generate Quiz // إنشاء اختبار
            label: t.quickActionsCreateQuiz || "Generate Quiz",
            to: {
                pathname: "/test",
                state: { tab: "quiz" }
            },
        },
        {
            icon: <FaBookOpen className=" text-xl" />,
            // Resume Course // استكمال الدورة
            label: t.quickActionsStartLearning || "Resume Course",
            to: "/courses",
        },
        {
            icon: <FaChartBar className=" text-xl" />,
            // View Detailed Statistics // عرض الإحصائيات التفصيلية
            label: t.quickActionsViewDashboard || "View Detailed Statistics",
            to: "/statistcs",
        },
    ]
    return (
        <section className='bg-(--main-color) rounded-xl p-5 shadow'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg text-(--text-color)'>{t.quickActionsTitle || "Quick Actions"}</h1>
            </div>
            <div className="flex flex-col gap-3">
                {actions.map((action, idx) => (
                    <Link
                        key={idx}
                        to={typeof action.to === 'string' ? action.to : action.to.pathname}
                        state={typeof action.to === 'object' ? action.to.state : undefined}
                        className="flex items-center gap-4 bg-(--bg-color) hover:bg-(--main-color) transition-colors p-3 rounded-lg shadow-sm border border-gray-100 cursor-pointer"
                    >
                        <div className='text-(--second-color) '>{action.icon}</div>
                        <span className="font-medium text-(--p-color) text-sm">{action.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default QuickActions