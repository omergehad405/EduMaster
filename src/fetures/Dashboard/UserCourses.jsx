// src/pages/user/UserCourses.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function UserCourses() {
    const { user, token, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !token) return;

            try {
                // جلب بيانات كاملة للـ user
                const res = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = res.data.data.user;

                // تأكد من enrolledTracks
                const enrolledTracks = userData.enrolledTracks || [];
                const userProgress = userData.progress || [];

                if (enrolledTracks.length === 0) {
                    setCourses([]);
                    return;
                }

                // جلب تفاصيل كل track (مع الدروس)
                const tracksData = await Promise.all(
                    enrolledTracks.map(async (trackId) => {
                        const trackRes = await axios.get(`http://localhost:5000/api/tracks/${trackId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        return trackRes.data.data;
                    })
                );

                // دمج progress لكل track
                const coursesData = tracksData.map((trackData) => {
                    const track = trackData.track;
                    const lessons = trackData.lessons || [];

                    const progressForTrack = userProgress.find(
                        (p) => String(p.track) === String(track._id)
                    );
                    const completedLessonIds = (progressForTrack?.completedLessons || []).map(String);
                    const completedLessonsCount = completedLessonIds.length;

                    // تحديد الدرس الحالي الذي يتوقف عنده المستخدم
                    let currentLessonId = null;
                    if (lessons.length > 0) {
                        const firstIncomplete = lessons.find(
                            (lesson) => !completedLessonIds.includes(String(lesson._id))
                        );

                        if (firstIncomplete) {
                            currentLessonId = firstIncomplete._id;
                        } else {
                            // كل الدروس مكتملة -> نرجع لآخر درس
                            currentLessonId = lessons[lessons.length - 1]._id;
                        }
                    }

                    return {
                        id: track._id,
                        name: track.title,
                        level: track.level,
                        totalLessons: track.lessonsCount,
                        completedLessons: completedLessonsCount,
                        currentLessonId,
                    };
                });

                setCourses(coursesData);
            } catch (err) {
                console.error("Error fetching courses:", err.response?.data || err.message);
            }
        };

        fetchCourses();
    }, [user, token]);

    if (loading) return <p>Loading courses...</p>;

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <p className="text-gray-500 mb-3">You have not started any courses yet.</p>
                <Link
                    to="/courses"
                    className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-500"
                >
                    Start Learning
                </Link>
            </div>
        );
    }

    return (
        <section>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg text-white'>My Courses</h1>
                <Link
                    to="/courses"
                    className='bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer'
                >
                    View All
                </Link>
            </div>
            <div className="flex flex-wrap gap-5 ">
                {courses.map((course) => {
                    const progressPercent = course.totalLessons
                        ? Math.round((course.completedLessons / course.totalLessons) * 100)
                        : 0;

                    return (
                        <div
                            key={course.id}
                            className="bg-(--main-color) p-5 rounded-lg w-full sm:w-[300px] mx-auto"
                        >
                            <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
                            <div className="flex gap-2 mb-3">
                                <span className="bg-(--second-color) text-(--main-color) px-2 py-1 rounded-full text-sm">{course.level}</span>
                                <span className="bg-(--second-color) text-(--main-color) px-2 py-1 rounded-full text-sm">
                                    {course.completedLessons} / {course.totalLessons} classes
                                </span>
                            </div>
                            <div className="w-full bg-gray-600 h-3 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                            <p className="mt-2 text-sm">{progressPercent}% completed</p>
                            {course.currentLessonId ? (
                                <button
                                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-500 transition"
                                    onClick={() =>
                                        navigate(`/tracks/${course.id}/lesson/${course.currentLessonId}`)
                                    }
                                >
                                    Continue Learning
                                </button>
                            ) : (
                                <button
                                    className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    No lessons available
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default UserCourses;