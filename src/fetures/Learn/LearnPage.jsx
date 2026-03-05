// src/pages/tracks/LearnPage.jsx
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import TracksSidebar from './TracksSidebar';
import useLearn from "../../hooks/useLearn"

function LearnPage() {
    const [search, setSearch] = useState("");
    const { tracks, fetchTracks } = useLearn();
    const [result, setResult] = useState([]);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        fetchTracks();
    }, [fetchTracks]);

    useEffect(() => {
        setResult(tracks);
    }, [tracks]);

    const handleSearch = (e) => {
        e.preventDefault()
        const filterdCourses = tracks.filter(course =>
            course.title.toLowerCase().includes(search.toLowerCase())
        )
        setResult(filterdCourses)
    }

    return (
        <>
            <TracksSidebar />
            <div className='py-30 bg-(--bg-color) w-full min-h-[250px] text-(--main-color) flex flex-col gap-5 items-center justify-center'>
                <h1 className='font-bold text-5xl text-center text-(--text-color)'>Welcome to Your <br /> Learning Path</h1>
                <p className='text-(--p-color)'>Master new skills, explore interesting lessons, and track your progress as you learn.</p>
                <form className='flex items-center' onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='search for courses, e.g. HTML'
                        className='focus:outline-none bg-(--main-color) rounded-l-full text-(--text-color) py-2 p-5 w-[350px]'
                    />
                    <button
                        type="submit"
                        className='bg-(--second-color) text-(--text-color) p-3 rounded-r-full cursor-pointer'
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            <div className="py-5 px-4 bg-(--bg-color)">
                {result.length === 0 ? (
                    <p className="text-gray-500 text-center text-4xl mt-8 font-semibold">
                        No courses added yet.
                    </p>
                ) : (
                    <div className="w-full mx-auto grid gap-10 ">
                        {result.map((track) => (
                            <div
                                key={track._id}
                                className="relative flex flex-col bg-(--main-color) border border-(--second-color)/20 rounded-2xl shadow hover:shadow-xl group p-7 pt-9 overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 m-3 rounded-bl-lg px-4 py-1 text-xs bg-(--second-color)/90 text-(--text-color) font-bold z-10 shadow">
                                    {track.level ? track.level : "Track"}
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-leanier-to-br from-(--second-color) to-indigo-400/70 rounded-xl flex items-center justify-center text-white text-2xl font-bold drop-shadow">
                                        {track.title[0]}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-(--text-color) mb-2 group-hover:text-(--second-color) transition-colors duration-150 truncate">
                                    {track.title}
                                </h2>
                                <p className="text-(--p-color) text-sm mb-6 line-clamp-3 min-h-[44px]">
                                    {track.description || "Expand your knowledge and skills in this track."}
                                </p>
                                <div className="mt-auto flex flex-col gap-3">
                                    <Link
                                        to={`/tracks/${track._id}`}
                                        className="flex items-center justify-center gap-2 bg-(--second-color) hover:bg-(--second-color)/80 text-white rounded-full font-semibold px-6 py-2 transition-colors duration-150 shadow-md hover:shadow-lg"
                                    >
                                        Learn More
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </Link>
                                    {track.lessonsCount ? (
                                        <span className="text-xs text-(--p-color) text-center">
                                            {track.lessonsCount} lessons
                                        </span>
                                    ) : null}
                                </div>
                                {/* Decorative Modern Accent */}
                                <div className="absolute -z-10 right-[-45px] bottom-[-45px] w-36 h-36 bg-(--second-color)/15 rounded-full blur-2xl"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default LearnPage