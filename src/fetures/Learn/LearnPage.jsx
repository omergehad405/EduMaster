// src/pages/tracks/LearnPage.jsx
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import TracksSidebar from './TracksSidebar';
import useLearn from "../../hooks/useLearn"

function LearnPage() {
    const [search, setSearch] = useState("");
    const { tracks, fetchTracks } = useLearn();
    const [result, setResult] = useState([]);

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
            <div className='py-50 bg-(--dark-color) w-full min-h-[250px] text-(--main-color) flex flex-col gap-5 items-center justify-center'>
                <h1 className='font-bold text-5xl text-center'>Welcome to Your <br /> Learning Path</h1>
                <p className='text-gray-300'>Master new skills, explore interesting lessons, and track your progress as you learn.</p>
                <form className='flex items-center' onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='search for courses, e.g. HTML'
                        className='focus:outline-none bg-white rounded-l-full text-black py-2 p-5 w-[350px]'
                    />
                    <button
                        type="submit"
                        className='bg-(--second-color) p-3 rounded-r-full cursor-pointer'
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            <div className="">
                {result.length === 0 ? (
                    <p className="text-gray-500 text-center text-5xl mt-5">No courses added yet.</p>
                ) : (
                    <div className="w-full flex flex-col">
                        {result.map((track, idx) => {
                            const colorClasses = ["bg-blue-200", "bg-green-200"];
                            const cardColor = colorClasses[idx % colorClasses.length];
                            return (
                                <div
                                    key={track._id}
                                    className={`h-[400px] flex flex-col items-center justify-center rounded-xl shadow-lg py-8 px-6 ${cardColor} transition-all duration-200`}
                                >
                                    <span className="text-5xl font-bold text-black mb-4 drop-shadow">
                                        {track.title}
                                    </span>
                                    <Link
                                        to={`/tracks/${track._id}`}
                                        className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-2 rounded-full shadow transition-colors duration-200 border-2 border-blue-300"
                                        style={{ letterSpacing: "1.5px" }}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default LearnPage