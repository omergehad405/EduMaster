// src/pages/learn/TracksSidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import useLearn from '../../hooks/useLearn';

function TracksSidebar() {
    const { tracks } = useLearn();

    return (
        <div className='bg-(--dark-color) flex items-center gap-5 w-full px-5'>
            {tracks.map((track) => (
                <NavLink
                    to={`/tracks/${track._id}`}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-(--second-color) text-(--main-color) py-1 px-2 rounded-md"
                            : "text-(--main-color) py-1 px-2 rounded-md"
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