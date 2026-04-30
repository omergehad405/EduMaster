// src/pages/learn/TracksSidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import useLearn from '../../hooks/useLearn';
import { useLanguage } from '../../hooks/useLanguage';

function TracksSidebar() {
    const { tracks } = useLearn();
    const { language } = useLanguage();
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <div className='bg-(--main-color) flex items-center gap-5 w-full px-5' dir={dir}>
            {tracks.map((track) => (
                <NavLink
                    to={`/tracks/${track._id}`}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-(--second-color) text-(--text-color) py-1 px-2 rounded-md"
                            : "text-(--text-color) py-1 px-2 rounded-md hover:bg-(--second-color)"
                    }
                    key={track._id}
                >
                    {track.title}
                </NavLink>
            ))}
        </div >
    )
}

export default TracksSidebar