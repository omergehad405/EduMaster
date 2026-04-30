import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function UserCourses() {
    const { user, token, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !token) return;

            try {
                const res = await axios.get(`https://edumaster-backend-6xy5.onrender.com/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = res.data.data.user;

                const enrolledTracks = userData.enrolledTracks || [];
                const userProgress = userData.progress || [];
                const userCompletedTracks = (userData.completedTracks || []).map(String);

                if (enrolledTracks.length === 0) {
                    setCourses([]);
                    return;
                }

                const tracksData = await Promise.all(
                    enrolledTracks.map(async (trackId) => {
                        const trackRes = await axios.get(`https://edumaster-backend-6xy5.onrender.com/api/tracks/${trackId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        return trackRes.data.data;
                    })
                );

                const coursesData = tracksData.map((trackData) => {
                    const track = trackData.track;
                    const lessons = trackData.lessons || [];

                    const progressForTrack = userProgress.find(
                        (p) => String(p.track) === String(track._id)
                    );
                    const completedLessonIds = (progressForTrack?.completedLessons || []).map(String);
                    const completedLessonsCount = completedLessonIds.length;

                    let currentLessonId = null;
                    if (lessons.length > 0) {
                        const firstIncomplete = lessons.find(
                            (lesson) => !completedLessonIds.includes(String(lesson._id))
                        );

                        if (firstIncomplete) {
                            currentLessonId = firstIncomplete._id;
                        } else {
                            currentLessonId = lessons[lessons.length - 1]._id;
                        }
                    }

                    const isTrackCompleted = userCompletedTracks.includes(String(track._id));
                    const allLessonsDone = lessons.length > 0 && completedLessonsCount === lessons.length;

                    return {
                        id: track._id,
                        name: track.title,
                        level: track.level,
                        totalLessons: track.lessonsCount,
                        completedLessons: completedLessonsCount,
                        currentLessonId,
                        isTrackCompleted,
                        allLessonsDone,
                    };
                });

                setCourses(coursesData.filter(course => !course.isTrackCompleted));
            } catch (err) {
                console.error("Error fetching courses:", err.response?.data || err.message);
            }
        };

        fetchCourses();
    }, [user, token]);

    // Use translations from translations.js for all user-visible text.
    if (loading) return (
        <p className="text-(--p-color)">
            {t("userCoursesLoading") || t("learnLoading") || "Loading courses..."}
        </p>
    );

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-(--main-color) rounded-xl">
                <p className="text-gray-500 mb-3">
                    {t("userCoursesNoTrack") /* You have not started any learning tracks yet. */}
                </p>
                <Link
                    to="/learn"
                    className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-500"
                >
                    {t("startLearning")}
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-(--main-color) rounded-xl p-5 shadow">
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg text-(--text-color)'>
                    {t("userCoursesMyTracks") /* My Tracks */}
                </h1>
                <Link
                    to="/courses"
                    className='bg-(--bg-color) text-(--text-color) rounded-full py-1 px-5 text-sm capitalize cursor-pointer'
                >
                    {t("userCoursesViewAll") /* View All */}
                </Link>
            </div>
            <div className="flex flex-wrap gap-5 ">
                {courses.map((course) => {
                    const progressPercent = course.totalLessons
                        ? Math.round((course.completedLessons / course.totalLessons) * 100)
                        : 0;

                    let actionButton = null;

                    if (course.currentLessonId && !course.allLessonsDone) {
                        actionButton = (
                            <button
                                className="mt-4 bg-(--second-color) text-(--p-color) cursor-pointer py-2 px-4 rounded-full"
                                onClick={() => {
                                    toast.info(t("lessonOpening") || "Opening lesson...", { autoClose: 1200 });
                                    navigate(`/tracks/${course.id}/lesson/${course.currentLessonId}`);
                                }}
                            >
                                {t("userCoursesContinue")}
                            </button>
                        );
                    } else if (course.allLessonsDone && !course.isTrackCompleted) {
                        actionButton = (
                            <button
                                className="mt-4 bg-(--second-color) text-(--p-color) py-2 px-4 rounded-full transition"
                                onClick={() => {
                                    toast.info(t("userCoursesTakeFinalQuizNotice") || t("trackFinalQuizDesc"), { autoClose: 1800 });
                                    navigate(`/tracks/${course.id}`);
                                }}
                            >
                                {t("userCoursesTakeFinalQuiz") || t("trackFinalQuizTitle") || "Take Final Quiz"}
                            </button>
                        );
                    } else {
                        actionButton = (
                            <button
                                className="mt-4 bg-gray-500 text-(--text-color) py-2 px-4 rounded-full cursor-not-allowed"
                                disabled
                            >
                                {t("lessonsNoAvailable")}
                            </button>
                        );
                    }
                    return (
                        <div
                            key={course.id}
                            className="bg-(--bg-color) p-5 rounded-lg w-full sm:w-[300px] mx-auto"
                        >
                            <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
                            <div className="flex gap-2 mb-3 ">
                                <span className="bg-gray-600 text-(--p-color) px-2 py-1 rounded-full text-sm">{course.level}</span>
                                <span className="bg-gray-600 text-(--p-color) px-2 py-1 rounded-full text-sm">
                                    {course.completedLessons} / {course.totalLessons} {t("userCoursesClasses")}
                                </span>
                            </div>
                            <div className="w-full bg-gray-600 h-3 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-(--second-color) rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                            <p className="mt-2 text-sm">
                                {progressPercent}% {t("userCoursesCompletedProgress") || t("statisticsCompleted")}
                            </p>
                            {actionButton}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default UserCourses;
