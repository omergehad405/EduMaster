import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

// Helper: returns true if user has finished all lessons in this track
function allLessonsCompleted(course) {
    return course.completedLessons === course.totalLessons && course.totalLessons > 0;
}

function UserCourses() {
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
                const res = await axios.get(`http://localhost:5000/api/users/me`, {
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

                // Fetch track details (with lessons) for each enrolled track
                const tracksData = await Promise.all(
                    enrolledTracks.map(async (trackId) => {
                        const trackRes = await axios.get(`http://localhost:5000/api/tracks/${trackId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        return trackRes.data.data;
                    })
                );

                // Gather course progress for each track, plus completion state
                const coursesData = tracksData.map((trackData) => {
                    const track = trackData.track;
                    const lessons = trackData.lessons || [];

                    const progressForTrack = userProgress.find(
                        (p) => String(p.track) === String(track._id)
                    );
                    const completedLessonIds = (progressForTrack?.completedLessons || []).map(String);
                    const completedLessonsCount = completedLessonIds.length;

                    // Find the first incomplete lesson (for continue button)
                    let currentLessonId = null;
                    if (lessons.length > 0) {
                        const firstIncomplete = lessons.find(
                            (lesson) => !completedLessonIds.includes(String(lesson._id))
                        );

                        if (firstIncomplete) {
                            currentLessonId = firstIncomplete._id;
                        } else {
                            // All lessons completed, set to last lesson
                            currentLessonId = lessons[lessons.length - 1]._id;
                        }
                    }

                    // Is the track in completedTracks?
                    const isTrackCompleted = userCompletedTracks.includes(String(track._id));
                    // Is the user finished all lessons for this track (but maybe not marked as complete)
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
                        // For additional display if needed
                    };
                });

                // Filter: show only un-finished tracks (not in completedTracks)
                setCourses(coursesData.filter(course => !course.isTrackCompleted));
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
                <p className="text-gray-500 mb-3">You have not started any unfinished tracks yet.</p>
                <Link
                    to="/learn"
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
                <h1 className='capitalize font-semibold text-lg text-white'>My Unfinished Courses</h1>
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

                    let actionButton = null;

                    if (course.currentLessonId && !course.allLessonsDone) {
                        // Not finished all lessons, can continue learning (go to first incomplete lesson)
                        actionButton = (
                            <button
                                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-500 transition"
                                onClick={() => {
                                    toast.info("Opening lesson...", { autoClose: 1200 });
                                    navigate(`/tracks/${course.id}/lesson/${course.currentLessonId}`);
                                }}
                            >
                                Continue Learning
                            </button>
                        );
                    } else if (course.allLessonsDone && !course.isTrackCompleted) {
                        // All lessons done, but track not marked as completed: do the final quiz (i.e., navigate to the track page)
                        actionButton = (
                            <button
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500 transition"
                                onClick={() => {
                                    toast.info("Take final quiz to complete track!", { autoClose: 1800 });
                                    navigate(`/tracks/${course.id}`);
                                }}
                            >
                                Take Final Quiz
                            </button>
                        );
                    } else {
                        actionButton = (
                            <button
                                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-full cursor-not-allowed"
                                disabled
                            >
                                No lessons available
                            </button>
                        );
                    } return (
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
                            {actionButton}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default UserCourses;