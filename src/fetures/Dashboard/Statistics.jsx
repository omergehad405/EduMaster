import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Statistics = () => {
    const { user, token } = useAuth();
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user) return;

            try {
                // Fetch user with populated progress and enrolled tracks
                const res = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const currentUser = res.data.data.user;

                let totalLessons = 0;
                let completedLessons = 0;

                currentUser.progress.forEach((p) => {
                    totalLessons += p.track?.lessonsCount || 0;
                    completedLessons += p.completedLessons.length;
                });

                const avg = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
                setAverageScore(avg);
            } catch (err) {
                console.error("Error fetching user progress:", err);
            }
        };

        fetchProgress();
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <section className="rounded-xl p-5 bg-(--main-color)">
            <div className="flex items-center justify-between">
                <h1 className="capitalize font-semibold text-lg">Statistic</h1>
                <Link
                    to="statistic"
                    className="bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer"
                >
                    view all
                </Link>
            </div>

            <div className="mt-5">
                <div className="w-[170px] h-[170px] mx-auto rounded-full flex items-center justify-center relative">
                    <svg className="absolute top-0 left-0" width="170" height="170" viewBox="0 0 170 170">
                        <circle cx="85" cy="85" r="78" fill="none" stroke="#C5C5C5" strokeWidth="10" />
                        <circle
                            cx="85"
                            cy="85"
                            r="78"
                            fill="none"
                            stroke="var(--second-color)"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 78}
                            strokeDashoffset={2 * Math.PI * 78 * (1 - averageScore / 100)}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.7s ease", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                        />
                    </svg>
                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden flex items-center justify-center relative bg-(--main-color) z-10">
                        <img
                            src={user.avatar ? `http://localhost:5000${user.avatar}` : "/userImage.jpg"}
                            alt={`${user.username}'s avatar`}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
                <h1 className="flex items-center justify-center gap-1 capitalize font-semibold mt-3 text-xl">
                    welcome, <span className="text-(--second-color) font-bold">{user.username}</span> <span>👋</span>
                </h1>
            </div>

            <div className="flex flex-wrap justify-between mt-6 gap-3">
                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">Tracks Enrolled</div>
                    <div className="font-bold text-2xl text-(--second-color)">{user.enrolledTracks.length}</div>
                </div>

                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">Tracks Completed</div>
                    <div className="font-bold text-2xl text-(--second-color)">{user.completedTracks.length}</div>
                </div>

                <div className="flex-1 min-w-[90px] bg-[#F5F5FB] rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-gray-500 mb-1">Total Progress</div>
                    <div className="font-bold text-2xl text-(--second-color)">{averageScore}%</div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;