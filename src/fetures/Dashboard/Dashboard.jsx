import React from 'react'
import Statistics from './Statistics'
import UserCourses from './UserCourses'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'

function Dashboard() {
    return (
        <section className='py-10 px-20 flex flex-wrap gap-5'>
            <div className='lg:w-[350px] w-full lg:sticky lg:top-10 h-fit'>
                <Statistics />
            </div>
            <div className='flex-1 min-w-0'>
                <div className='bg-(--dark-color) rounded-xl p-5 grow'><UserCourses /></div>

                <div className='flex flex-wrap lg:gap-5 gap-2'>
                    <div className='mt-10 lg:w-[60%] w-full'><RecentActivity /></div>
                    <div className='mt-10 lg:w-[35%] w-full'><QuickActions /></div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard