import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

function CoursesPage() {
    const { user, token, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const [completedTracks, setCompletedTracks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !token) return;

            try {
                const res = await axios.get("http://localhost:5000/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = res.data.data.user;
                const enrolledTracks = userData.enrolledTracks || [];
                const userProgress = userData.progress || [];
                const userCompletedTracks = (userData.completedTracks || []).map(String);
                setCompletedTracks(userCompletedTracks);

                if (enrolledTracks.length === 0) {
                    setCourses([]);
                    return;
                }

                const tracksData = await Promise.all(
                    enrolledTracks.map(async (trackId) => {
                        const trackRes = await axios.get(
                            `http://localhost:5000/api/tracks/${trackId}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
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
                        currentLessonId = firstIncomplete ? firstIncomplete._id : lessons[lessons.length - 1]._id;
                    }

                    const totalLessons = lessons.length; // <-- use real lessons length
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

                // optionally filter only unfinished tracks
                setCourses(coursesData.filter(course => course.completedLessons < course.totalLessons || !course.isTrackCompleted));

                setCourses(coursesData);
            } catch (err) {
                console.error(
                    "Error fetching courses:",
                    err.response?.data || err.message
                );
            }
        };

        fetchCourses();
    }, [user, token]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-(--dark-color)">
                <p className="text-gray-300 text-lg">Loading your courses...</p>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-(--dark-color) text-(--main-color)">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    You have no courses yet
                </h1>
                <p className="text-gray-300 mb-6 text-center max-w-md">
                    Explore tracks and start your first learning journey now.
                </p>
                <Link
                    to="/learn"
                    className="bg-(--second-color) text-(--main-color) font-semibold py-2 px-8 rounded-full hover:opacity-90 transition"
                >
                    Browse Tracks
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-(--dark-color) min-h-screen py-10 px-4 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-(--main-color) mb-3">
                        Your Courses
                    </h1>
                    <p className="text-gray-300 max-w-2xl">
                        Continue where you left off, or review completed lessons to
                        strengthen your knowledge.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="relative overflow-hidden rounded-2xl bg-(--second-color) text-white shadow-xl flex flex-col"
                        >
                            <div className="relative p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">
                                        {course.level}
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {course.completedLessons}/{course.totalLessons} lessons
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                                <p className="text-sm text-blue-100 mb-4">
                                    Keep your momentum and move step by step towards completing
                                    this track.
                                </p>

                                <div className="mt-auto">
                                    <div className="w-full bg-blue-900/60 h-2 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                                            style={{ width: `${course.progressPercent}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-blue-100 mb-4">
                                        <span>{course.progressPercent}% completed</span>
                                        <span>
                                            {course.completedLessons === course.totalLessons
                                                ? (course.isTrackCompleted ? "Track completed" : "Final quiz required")
                                                : "In progress"}
                                        </span>
                                    </div>

                                    {/* --- Main Button Logic --- */}
                                    {!course.isTrackCompleted && course.allLessonsDone ? (
                                        // The user isn't done with the final quiz yet, but has finished all lessons
                                        <button
                                            className="w-full bg-yellow-300 text-black font-semibold py-2.5 rounded-full hover:bg-yellow-200 transition"
                                            onClick={() => {
                                                toast.info("Go to final quiz...", { autoClose: 1200 });
                                                navigate(`/tracks/${course.id}`);
                                            }}
                                        >
                                            Take Final Quiz
                                        </button>
                                    ) : course.currentLessonId && !course.allLessonsDone ? (
                                        // Not finished all lessons, can continue learning
                                        <button
                                            className="w-full bg-white text-indigo-600 font-semibold py-2.5 rounded-full hover:bg-blue-50 transition"
                                            onClick={() => {
                                                toast.info("Opening lesson...", { autoClose: 1200 });
                                                navigate(
                                                    `/tracks/${course.id}/lesson/${course.currentLessonId}`
                                                );
                                            }}
                                        >
                                            Continue Learning
                                        </button>
                                    ) : course.isTrackCompleted ? (
                                        <button
                                            className="w-full bg-emerald-700 text-white font-semibold py-2.5 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            Track Completed
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full bg-white/40 text-white font-semibold py-2.5 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            No lessons available
                                        </button>
                                    )}
                                    {/* --- End Main Button Logic --- */}
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

