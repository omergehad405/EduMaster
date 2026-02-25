import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function CoursesPage() {
    const { user, token, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

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
                    const completedLessonIds = (
                        progressForTrack?.completedLessons || []
                    ).map(String);
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

                    const progressPercent = track.lessonsCount
                        ? Math.round(
                            (completedLessonsCount / track.lessonsCount) * 100
                        )
                        : 0;

                    return {
                        id: track._id,
                        name: track.title,
                        level: track.level,
                        totalLessons: track.lessonsCount,
                        completedLessons: completedLessonsCount,
                        currentLessonId,
                        progressPercent,
                    };
                });

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
                                                ? "Track completed"
                                                : "In progress"}
                                        </span>
                                    </div>

                                    {course.currentLessonId ? (
                                        <button
                                            className="w-full bg-white text-indigo-600 font-semibold py-2.5 rounded-full hover:bg-blue-50 transition"
                                            onClick={() =>
                                                navigate(
                                                    `/tracks/${course.id}/lesson/${course.currentLessonId}`
                                                )
                                            }
                                        >
                                            Continue Learning
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full bg-white/40 text-white font-semibold py-2.5 rounded-full cursor-not-allowed"
                                            disabled
                                        >
                                            No lessons available
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

