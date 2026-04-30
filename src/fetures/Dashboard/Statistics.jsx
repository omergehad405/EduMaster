import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Statistics = ({ t }) => {
    const { user, token } = useAuth();
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user) return;

            try {
                const res = await axios.get(`https://edumaster-backend-6xy5.onrender.com/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
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
    }, [user, token]);

    if (!user) return <div>Loading...</div>;

    return (
        <section className="rounded-xl p-5 bg-(--main-color)">
            <div className="flex items-center justify-between">
                <h1 className="capitalize font-semibold text-lg text-(--text-color)">
                    {t.dashboardStatsTitle || "Your Stats"}
                </h1>
                <Link
                    to="/statistcs"
                    className="bg-(--bg-color) hover:bg-(--second-color) text-(--text-color) hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer"
                >
                    {t.startLearning || "Start Learning"}
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
                            style={{
                                transition: "stroke-dashoffset 0.7s ease",
                                transform: "rotate(-90deg)",
                                transformOrigin: "50% 50%"
                            }}
                        />
                    </svg>
                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden flex items-center justify-center relative bg-(--main-color) z-10">
                        <img
                            src={user.avatar ? `https://edumaster-backend-6xy5.onrender.com${user.avatar}` : "/userImage.jpg"}
                            alt={`${user.username}'s avatar`}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
                <h1 className="flex items-center justify-center gap-1 capitalize font-semibold mt-3 text-xl text-(--text-color)">
                    {t.dashboardWelcomeMessage || "Welcome back,"} <span className="text-(--second-color) font-bold">{user.username}</span> <span>👋</span>
                </h1>
            </div>

            <div className="flex flex-wrap justify-between mt-6 gap-3">
                <div className="flex-1 min-w-[90px] bg-(--bg-color) rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-(--p-color) mb-1">
                        {t.statisticsTotalExperience || "Total XP"}
                    </div>
                    <div className="font-bold text-2xl text-(--second-color)">{user.xp || 0}</div>
                </div>

                <div className="flex-1 min-w-[90px] bg-(--bg-color) rounded-xl text-center py-4 shadow flex flex-col items-center justify-center">
                    <div className="text-xs text-(--p-color) mb-1 flex items-center gap-1">
                        {t.statisticsCurrentStreak || "Current Streak"} 🔥
                    </div>
                    <div className="font-bold text-2xl text-orange-500">
                        {user.streak?.current || 0} {t.statisticsDayStreak || "Days"}
                    </div>
                </div>

                <div className="flex-1 min-w-[90px] bg-(--bg-color) rounded-xl text-center py-4 shadow">
                    <div className="text-xs text-(--p-color) mb-1">
                        {t.statisticsOverallProgress || "Total Progress"}
                    </div>
                    <div className="font-bold text-2xl text-(--second-color)">{averageScore}%</div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;