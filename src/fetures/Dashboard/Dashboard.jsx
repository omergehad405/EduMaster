import React, { useEffect } from 'react'
import Statistics from './Statistics'
import UserCourses from './UserCourses'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import { useLocation } from 'react-router-dom'
import translations from '../../utils/translations'

function getLanguage() {
    // Try to get language from localStorage, or fallback to browser, or default 'en'
    return (
        localStorage.getItem('lang') ||
        navigator.language?.slice(0, 2) ||
        'en'
    )
}

function Dashboard() {
    const location = useLocation();
    const lang = getLanguage();
    const t = translations[lang] || translations['en'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <section className='py-10 lg:px-20 px-10 flex flex-wrap lg:flex-row flex-col gap-5 bg-(--bg-color)'>
            <div className='lg:w-[350px] w-full lg:sticky lg:top-10 h-fit'>
                <Statistics t={t} />
            </div>
            <div className='flex-1 min-w-0'>
                <div className='bg-(--dark-color) rounded-xl p-5 grow '>
                    {/* Pass t prop for translation if needed */}
                    <UserCourses t={t} />
                </div>
                <div className='flex flex-wrap lg:gap-5 gap-2'>
                    <div className='mt-10 lg:w-[60%] w-full'><RecentActivity t={t} /></div>
                    <div className='mt-10 lg:w-[35%] w-full'><QuickActions t={t} /></div>
                </div>

            </div>
        </section>
    )
}

export default Dashboard