import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import TracksSidebar from './TracksSidebar';
import useLearn from "../../hooks/useLearn"
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../utils/translations';

// ─── Skeleton Loader for Tracks ──────────────────
function TrackCardSkeleton({ dir = "ltr" }) {
    return (
        <div className="relative flex flex-col bg-(--main-color) border border-(--second-color)/20 rounded-2xl shadow p-7 pt-9 overflow-hidden animate-pulse min-h-[300px]">
            <div className="absolute top-0 right-0 m-3 rounded-bl-lg px-6 py-2 h-7 w-16 bg-(--second-color)/50" />
            <div className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 bg-gray-200 rounded-xl" />
            </div>
            <div className="h-6 w-40 bg-gray-300 mb-2 rounded" />
            <div className="h-4 w-full mb-1 bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 mb-5 rounded" />
            <div className="mt-auto flex flex-col gap-3">
                <div className="h-10 w-32 bg-(--second-color)/60 rounded-full mx-auto mb-2" />
                <div className="h-4 w-16 bg-gray-200 mx-auto rounded" />
            </div>
            <div className="absolute -z-10 right-[-45px] bottom-[-45px] w-36 h-36 bg-(--second-color)/10 rounded-full blur-2xl"></div>
        </div>
    );
}

function LearnPage() {
    const [search, setSearch] = useState("");
    const { tracks, fetchTracks } = useLearn();
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const { language } = useLanguage();
    const t = translations[language] || {};
    const lang = language;
    const dir = lang === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Fetch tracks and set loading state
    useEffect(() => {
        setLoading(true);
        fetchTracks().finally(() => setLoading(false));
        // ^ handles both resolved and rejected
    }, [fetchTracks]);

    // Filtering logic (search)
    useEffect(() => {
        if (!search.trim()) {
            setFilteredTracks(tracks);
        } else {
            const filterBySearch = tracks.filter(course =>
                (course?.title || "").toLowerCase().includes(search.toLowerCase())
            );
            setFilteredTracks(filterBySearch);
        }
    }, [tracks, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is handled by useEffect on search state
    };

    // Helper for track.level translations
    const getTrackLevelTranslation = (level) => {
        if (!level) return "";
        const key = `features${level.charAt(0).toUpperCase() + level.slice(1)}`;
        return t[key] || level;
    };

    return (
        <>
            <TracksSidebar />
            <div className='py-30 bg-(--bg-color) w-full min-h-[250px] text-(--main-color) flex flex-col gap-5 items-center justify-center'>
                <h1 className='font-bold text-5xl text-center text-(--text-color)'>
                    {t.learnPageTitle || "Learn"}
                </h1>
                <p className='text-(--p-color)'>
                    {t.learnPageSubtitle || "Your Personalized Learning Dashboard"}
                </p>
                <form className='flex items-center' onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t.learnSearchPlaceholder || 'search for courses, e.g. HTML'}
                        className={`${dir === "rtl" ? "rounded-r-full" : "rounded-l-full"} focus:outline-none bg-(--main-color)  text-(--text-color) py-2 p-5 w-[350px]`}
                        dir={dir}
                    />
                    <button
                        type="submit"
                        className={`${dir === "rtl" ? "rounded-l-full" : "rounded-r-full"} bg-(--second-color) text-(--text-color) p-3  cursor-pointer`}
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            <div className="py-5 px-4 bg-(--bg-color)">
                {loading ? (
                    // Animated skeleton loaders
                    <div className="w-full mx-auto grid gap-10">
                        {[...Array(4)].map((_, idx) => (
                            <TrackCardSkeleton key={idx} dir={dir} />
                        ))}
                    </div>
                ) : filteredTracks.length === 0 ? (
                    <p className="text-gray-500 text-center text-4xl mt-8 font-semibold">
                        {t.learnPageNoTracks || "there is no tracks yet."}
                    </p>
                ) : (
                    <div className="w-full mx-auto grid gap-10 ">
                        {filteredTracks.map((track) => (
                            <div
                                key={track._id}
                                className="relative flex flex-col bg-(--main-color) border border-(--second-color)/20 rounded-2xl shadow hover:shadow-xl group p-7 pt-9 overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 m-3 rounded-bl-lg px-4 py-1 text-xs bg-(--second-color)/90 text-(--text-color) font-bold z-10 shadow">
                                    {track.level ? (
                                        getTrackLevelTranslation(track.level)
                                    ) : (
                                        t.coursesGoToTrack || 'Track'
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    {track.thumbnail ? (
                                        <img 
                                            src={track.thumbnail} 
                                            alt={track.title} 
                                            className="w-20 h-20 object-cover rounded-xl drop-shadow bg-gray-200"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-leanier-to-br from-(--second-color) to-indigo-400/70 rounded-xl flex items-center justify-center text-white text-2xl font-bold drop-shadow">
                                            {track.title[0]}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-(--text-color) mb-2 group-hover:text-(--second-color) transition-colors duration-150 truncate">
                                    {track.title}
                                </h2>
                                <p className="text-(--p-color) text-sm mb-6 line-clamp-3 min-h-[44px]">
                                    {track.description || t.coursesDescription || "Expand your knowledge and skills in this track."}
                                </p>
                                <div className="mt-auto flex flex-col gap-3">
                                    <Link
                                        to={`/tracks/${track._id}`}
                                        className="flex items-center justify-center gap-2 bg-(--second-color) hover:bg-(--second-color)/80 text-white rounded-full font-semibold px-6 py-2 transition-colors duration-150 shadow-md hover:shadow-lg"
                                        dir={dir}
                                    >
                                        {t.startLearning || "Start Learning"}
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </Link>
                                    {track.lessonsCount ? (
                                        <span className="text-xs text-(--p-color) text-center">
                                            {track.lessonsCount} {t.coursesLessons || "lessons"}
                                        </span>
                                    ) : null}
                                </div>
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