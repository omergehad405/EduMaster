import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import translations from "../utils/translations";

const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

function getLang() {
    if (typeof window === "undefined") return "en";
    const lang =
        (localStorage.getItem("lang") ||
            navigator.language?.split('-')[0] ||
            "en");
    return ["ar", "en"].includes(lang) ? lang : "en";
}
const lang = getLang();
const t = translations[lang] || translations.en;

function CoursesPage() {
    const { user, token, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !token) return;
            setFetching(true);
            try {
                const res = await axios.get(`${API_URL}/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = res.data.data.user;
                const enrolledTracks = userData.enrolledTracks || [];
                const userProgress = userData.progress || [];
                const userCompletedTracks = (userData.completedTracks || []).map(String);

                if (enrolledTracks.length === 0) {
                    setCourses([]);
                    setFetching(false);
                    return;
                }

                const tracksData = (
                    await Promise.allSettled(
                        enrolledTracks.map(async (trackId) => {
                            const trackRes = await axios.get(
                                `${API_URL}/api/tracks/${trackId}`,
                                { headers: { Authorization: `Bearer ${token}` } }
                            );
                            return trackRes.data.data;
                        })
                    )
                )
                    .filter((result) => result.status === "fulfilled")
                    .map((result) => result.value);

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
                        currentLessonId = firstIncomplete ? firstIncomplete._id : lessons[lessons.length - 1]._id;
                    }

                    const totalLessons = lessons.length;
                    const progressPercent = totalLessons
                        ? Math.round((completedLessonsCount / totalLessons) * 100)
                        : 0;

                    const allLessonsDone = totalLessons > 0 && completedLessonsCount === totalLessons;
                    const isTrackCompleted = userCompletedTracks.includes(String(track._id));

                    return {
                        id: track._id,
                        name: track.title,
                        level: track.level,
                        totalLessons,
                        completedLessons: completedLessonsCount,
                        currentLessonId,
                        progressPercent,
                        allLessonsDone,
                        isTrackCompleted,
                    };
                });

                setCourses(coursesData);
                setFetching(false);
            } catch (err) {
                console.error(
                    "Error fetching courses:",
                    err?.response?.data || err.message
                );
                setFetching(false);
            }
        };

        fetchCourses();
    }, [user, token]);

    // Show loader during fetching user or fetching courses
    if (loading || fetching) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-(--bg-color)">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-10 w-10 text-(--second-color)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <p className="text-gray-300 text-lg font-medium">
                        {t.coursesLoading || "Loading your courses..."}
                    </p>
                </div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-(--dark-color) text-(--main-color)">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--text-color)">
                    {t.coursesNoCourses || "You have no courses yet"}
                </h1>
                <p className="text-(--p-color) mb-6 text-center max-w-md">
                    {t.coursesDescription || "Explore tracks and start your first learning journey now."}
                </p>
                <Link
                    to="/learn"
                    className="bg-(--second-color) text-(--main-color) font-semibold py-2 px-8 rounded-full hover:opacity-90 transition"
                >
                    {t.coursesBrowse || "Browse Tracks"}
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-(--bg-color) min-h-screen py-10 px-4 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-(--text-color) mb-3">
                        {t.coursesMyCourses || "Your Courses"}
                    </h1>
                    <p className="text-(--p-color) max-w-2xl">
                        {t.coursesContinueDesc ||
                            "Continue where you left off, or review completed lessons to strengthen your knowledge."}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="relative overflow-hidden rounded-2xl bg-(--main-color) text-(--text-color) shadow-xl flex flex-col"
                        >
                            <div className="relative p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs uppercase tracking-wide bg-gray-600 px-3 py-1 rounded-full">
                                        {t[`coursesLevel_${(course.level || '').toLowerCase()}`] || course.level}
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {course.completedLessons}/{course.totalLessons} {t.coursesLessons || "lessons"}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                                <p className="text-sm text-blue-100 mb-4">
                                    {t.coursesMomentumText ||
                                        "Keep your momentum and move step by step towards completing this track."}
                                </p>

                                <div className="mt-auto">
                                    <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-(--second-color) rounded-full transition-all duration-300"
                                            style={{ width: `${course.progressPercent}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-(--p-color) mb-4">
                                        <span>
                                            {course.progressPercent}% {t.coursesProgress || "completed"}
                                        </span>
                                        <span>
                                            {course.completedLessons === course.totalLessons
                                                ? (
                                                    course.isTrackCompleted
                                                        ? (t.coursesCompletedCourse || "Track completed")
                                                        : (t.coursesFinalQuizRequired || "Final quiz required")
                                                )
                                                : (t.coursesInProgress || "In progress")}
                                        </span>
                                    </div>

                                    {!course.isTrackCompleted && course.allLessonsDone ? (
                                        <button
                                            className="w-full bg-yellow-300 text-black font-semibold py-2.5 rounded-full hover:bg-yellow-200 transition"
                                            onClick={() => {
                                                toast.info(t.coursesGoToFinalQuizToast || "Go to final quiz...", { autoClose: 1200 });
                                                navigate(`/tracks/${course.id}`);
                                            }}
                                        >
                                            {t.coursesTakeFinalQuiz || "Take Final Quiz"}
                                        </button>
                                    ) : course.currentLessonId && !course.allLessonsDone ? (
                                        <button
                                            className="w-full bg-(--second-color) text-(--p-color) font-semibold py-2.5 rounded-full hover:text-(--text-color) transition cursor-pointer"
                                            onClick={() => {
                                                toast.info(t.coursesOpenLessonToast || "Opening lesson...", { autoClose: 1200 });
                                                navigate(
                                                    `/tracks/${course.id}/lesson/${course.currentLessonId}`
                                                );
                                            }}
                                        >
                                            {t.coursesContinueCourse || t.startLearning || "Continue Learning"}
                                        </button>
                                    ) : course.isTrackCompleted ? (
                                        <button
                                            className="w-full bg-emerald-700 text-white font-semibold py-2.5 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            {t.coursesCompletedCourse || "Track Completed"}
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full bg-white/40 text-white font-semibold py-2.5 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            {t.coursesNoLessonsAvailable || "No lessons available"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoursesPage;