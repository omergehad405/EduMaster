import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const StatisticsPage = () => {
    const { user, token, loading } = useAuth();
    const [averageScore, setAverageScore] = useState(0);
    const [stats, setStats] = useState({
        totalLessons: 0,
        completedLessons: 0,
        enrolledTracks: 0,
        completedTracks: 0,
    });
    const [trackStats, setTrackStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const fetchDetailedProgress = async () => {
            if (!user || !token) return;

            try {
                // Fetch user data
                const res = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const currentUser = res.data.data.user;

                const enrolledTracksIds = currentUser.enrolledTracks || [];
                const userProgress = currentUser.progress || [];

                let totalL = 0;
                let completedL = 0;

                // Load track details for enrolled tracks
                const tracksData = await Promise.all(
                    enrolledTracksIds.map(async (trackId) => {
                        try {
                            const trackRes = await axios.get(
                                `http://localhost:5000/api/tracks/${trackId}`,
                                {
                                    headers: { Authorization: `Bearer ${token}` },
                                }
                            );
                            return trackRes.data.data;
                        } catch (err) {
                            return null;
                        }
                    })
                );

                const validTracksData = tracksData.filter(Boolean);

                const trackStatsCalculated = validTracksData.map((tData) => {
                    const track = tData.track;
                    const lessons = tData.lessons || [];
                    const trackTotalLessons = lessons.length;

                    const progressForTrack = userProgress.find(
                        (p) => String(p.track._id || p.track) === String(track._id)
                    );

                    const completedLessonIds = (progressForTrack?.completedLessons || []).map(String);
                    const completedLessonsCount = completedLessonIds.length;

                    totalL += trackTotalLessons;
                    completedL += completedLessonsCount;

                    const percent = trackTotalLessons ? Math.round((completedLessonsCount / trackTotalLessons) * 100) : 0;

                    return {
                        id: track._id,
                        title: track.title,
                        level: track.level,
                        totalLessons: trackTotalLessons,
                        completedLessons: completedLessonsCount,
                        percent,
                        isComplete: completedLessonsCount === trackTotalLessons && trackTotalLessons > 0
                    };
                });

                setTrackStats(trackStatsCalculated);

                const avg = totalL ? Math.round((completedL / totalL) * 100) : 0;
                setAverageScore(avg);

                setStats({
                    totalLessons: totalL,
                    completedLessons: completedL,
                    enrolledTracks: enrolledTracksIds.length,
                    completedTracks: currentUser.completedTracks?.length || 0,
                });

            } catch (err) {
                console.error("Error fetching user progress:", err);
                toast.error("Failed to load statistics.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetailedProgress();
    }, [user, token]);

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-(--second-color)"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-12 lg:px-20 border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-500 hover:text-(--second-color) transition flex items-center gap-2 mb-2 text-sm font-medium"
                        >
                            &larr; Back to Dashboard
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Your Performance
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Dive deep into your learning journey and track your milestones.
                        </p>
                    </div>
                    {user.avatar ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-md">
                            <img src={`http://localhost:5000${user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-md bg-[#e5e7eb] flex items-center justify-center">
                            <span className="text-2xl">{user.username.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Average Card */}
                    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <h2 className="text-lg font-bold text-gray-700 w-full text-center mb-6 z-10">Overall Progress</h2>
                        <div className="w-[200px] h-[200px] mx-auto rounded-full flex items-center justify-center relative mb-6 z-10">
                            <svg className="absolute top-0 left-0" width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="#F3F4F6" strokeWidth="14" />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    fill="none"
                                    stroke="var(--second-color)"
                                    strokeWidth="14"
                                    strokeDasharray={2 * Math.PI * 90}
                                    strokeDashoffset={2 * Math.PI * 90 * (1 - averageScore / 100)}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 1.5s ease-out", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-4xl font-extrabold text-gray-800">{averageScore}%</span>
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Completed</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center z-10">
                            <h3 className="text-xl font-bold text-gray-800 capitalize">
                                {user.username}
                            </h3>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                </span>
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                                    🔥 {user.streak?.current || 0} Day Streak
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h4 className="text-gray-500 text-sm font-medium">Tracks Enrolled</h4>
                            <div className="text-3xl font-extrabold text-gray-800 mt-1">{stats.enrolledTracks}</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-500 text-sm font-medium">Tracks Completed</h4>
                            <div className="text-3xl font-extrabold text-gray-800 mt-1">{stats.completedTracks}</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h4 className="text-gray-500 text-sm font-medium">Lessons Completed</h4>
                            <div className="flex items-baseline gap-2 mt-1">
                                <div className="text-3xl font-extrabold text-gray-800">{stats.completedLessons}</div>
                                <div className="text-sm font-medium text-gray-400">/ {stats.totalLessons}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute -right-4 -bottom-4 opacity-5 text-orange-500 group-hover:scale-110 transition-transform duration-500">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-4 relative z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-500 text-sm font-medium relative z-10">Total Experience</h4>
                            <div className="text-3xl font-extrabold text-gray-800 mt-1 relative z-10 flex items-baseline gap-1">
                                {user.xp || 0}
                                <span className="text-sm font-normal text-gray-400">XP</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Track Details */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        Track Progress Details
                        <span className="bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">{trackStats.length} Tracks</span>
                    </h2>

                    {trackStats.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No active tracks</h3>
                            <p className="text-gray-500 mb-8 max-w-sm">Enroll in some tracks to see your detailed progress breakdown here. Learning is better when you have a path.</p>
                            <Link to="/learn" className="bg-(--second-color) text-white font-semibold flex items-center gap-2 py-3 px-8 rounded-full hover:shadow-lg hover:-translate-y-1 transition duration-300">
                                <span>Browse Tracks</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {trackStats.map(track => (
                                <div key={track.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="pr-4">
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 block">
                                                {track.level || "Beginner"}
                                            </span>
                                            <h3 className="text-[17px] font-bold text-gray-800 leading-tight">{track.title}</h3>
                                        </div>
                                        {track.isComplete ? (
                                            <span className="bg-emerald-100 text-emerald-700 p-2 rounded-full flex-shrink-0 animate-bounce">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        ) : (
                                            <span className={`text-lg font-bold flex-shrink-0 ${track.percent > 0 ? "text-(--second-color)" : "text-gray-400"}`}>
                                                {track.percent}%
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4 relative drop-shadow-sm">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out relative ${track.isComplete ? 'bg-emerald-500' : 'bg-(--second-color)'}`}
                                            style={{ width: `${track.percent}%` }}
                                        >
                                            {/* Shine effect */}
                                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 ml-[-50%] mr-[50%]" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-gray-500">{track.completedLessons} / {track.totalLessons} Lessons Done</span>
                                        <Link
                                            to={`/tracks/${track.id}`}
                                            className={`flex items-center gap-1 ${track.isComplete ? "text-emerald-600 hover:text-emerald-700" : "text-(--second-color) hover:opacity-80"} transition`}
                                        >
                                            {track.isComplete ? 'Review' : track.percent > 0 ? 'Continue' : 'Start'} &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
