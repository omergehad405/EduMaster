import React from 'react'
import { FaPlusCircle, FaFlask, FaBookOpen, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import t from '../../utils/translations'
import { useLanguage } from '../../hooks/useLanguage'
import translations from '../../utils/translations'



// Quick Actions // إجراءات سريعة
function QuickActions() {
    const { language } = useLanguage();
    const t = translations[language] || {};

    const actions = [
        {
            icon: <FaPlusCircle className=" text-xl" />,
            // Upload File // رفع ملف
            label: t.quickActionsUploadNotes || "Upload File",
            to: {
                pathname: "/test",
                state: { infoText: "upload" }
            },
        },
        {
            icon: <FaFlask className=" text-xl" />,
            // Generate Quiz // إنشاء اختبار
            label: t.quickActionsCreateQuiz || "Generate Quiz",
            to: {
                pathname: "/test",
                state: { infoText: "quiz" }
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
            to: "/statistic",
        },
    ]
    return (
        <section className='bg-(--main-color) rounded-xl p-5 shadow'>
            <div className='flex items-center justify-between mb-5'>
                {/* Quick Actions // إجراءات سريعة */}
                <h1 className='capitalize font-semibold text-lg text(--text-color)'>{t.quickActions || "Quick Actions"}</h1>
            </div>
            <div className="flex flex-col gap-3">
                {actions.map((action, idx) => (
                    <Link
                        key={idx}
                        to={action.to}
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