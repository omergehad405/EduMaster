import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

function RecentActivity() {
    const { user, token } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentActivity = async () => {
            if (!user) return;

            try {
                // Fetch full user data from backend
                const res = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = res.data.data.user;

                // Sort activities by timestamp descending & get last 5
                const recentActivities = (userData.activity || [])
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 5);

                setActivities(recentActivities);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recent activity:", err);
                setLoading(false);
            }
        };

        fetchRecentActivity();
    }, [user, token]);

    if (loading) return <p>Loading recent activity...</p>;

    return (
        <section className='bg-(--main-color) rounded-xl p-5 shadow'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='capitalize font-semibold text-lg'>Recent Activity</h1>
                <Link
                    to="/statistic"
                    className='bg-[#eee] hover:bg-(--second-color) text-black hover:text-(--main-color) transition-all duration-300 rounded-full py-1 px-5 text-sm capitalize cursor-pointer'
                >
                    View All
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {activities.length === 0 ? (
                    <p className="text-gray-500 text-sm">No recent activity yet.</p>
                ) : (
                    activities.map((activity, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100"
                        >
                            <div className="flex-1">
                                <div className="text-gray-800 text-sm">{activity.description}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default RecentActivity;