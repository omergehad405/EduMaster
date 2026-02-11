import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const UserCoursesData = [

];

function UserCourses() {
    return (
        <section className=''>
            <div className='flex items-center justify-between'>
                <h1 className='capitalize text-(--main-color) font-semibold text-2xl'>your courses</h1>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center  rounded-full gap-1 bg-(--main-color)'>
                        <button className='text-sm bg-(--main-color) p-2 rounded-l-full rounded-r-none hover:bg-gray-300 transition-all duration-500 cursor-pointer'><IoIosArrowBack /></button>
                        <span className='text-sm'>|</span>
                        <button className='text-sm bg-(--main-color) p-2 rounded-r-full rounded-l-none hover:bg-gray-300 transition-all duration-500 cursor-pointer'><IoIosArrowForward /></button>
                    </div>
                    <Link to="/courses" className='bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer '>view all</Link>
                </div>
            </div>

            <div className='flex items-center justify-center flex-wrap gap-5 mt-10'>
                {UserCoursesData.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center py-10">
                        <p className="text-gray-500 text-lg mb-3">You have not started any courses yet.</p>
                        <Link
                            to="/courses"
                            className="bg-(--second-color) hover:bg-(--main-color) text-(--main-color) hover:text-(--second-color) transition-colors duration-300 rounded-full py-2 px-6 font-semibold text-sm"
                        >
                            Start Learning
                        </Link>
                    </div>
                ) : (
                    UserCoursesData.map((course) => (
                        <div key={course.id} className='bg-(--main-color) rounded-lg p-5 w-full lg:w-[300px]'>
                            <h1 className='font-bold text-3xl capitalize'>{course.courseName}</h1>
                            <div className='flex items-center gap-2 mt-2'>
                                <span className='capitalize text-sm font-semibold bg-(--second-color) px-2 py-1 rounded-full text-(--main-color)'>{course.courseLevel}</span>
                                <span className='capitalize text-sm font-semibold bg-(--second-color) px-2 py-1 rounded-full text-(--main-color)'>{course.finish} / {course.courseLength} classes</span>
                            </div>

                            {course.courseLength === 0 ? (
                                <div className="flex flex-col items-center mt-8">
                                    <p className="text-gray-500 text-base mb-2">You have not started any courses yet.</p>
                                    <Link
                                        to="/courses"
                                        className="bg-(--second-color) hover:bg-(--main-color) text-(--main-color) hover:text-(--second-color) transition-colors duration-300 rounded-full py-2 px-5 font-semibold text-sm"
                                    >
                                        Start Learning
                                    </Link>
                                </div>
                            ) : (
                                <div className='mt-10'>
                                    <div className='flex items-center gap-3'>
                                        <span className='font-bold text-2xl'>
                                            {Math.round((course.finish / course.courseLength) * 100)}%
                                        </span>
                                        <span>completed</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${Math.round((course.finish / course.courseLength) * 100)}%`,
                                                backgroundColor: "var(--second-color)",
                                                transition: "width 0.5s"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default UserCourses