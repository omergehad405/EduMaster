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
            <div
                className='py-30 bg-(--bg-color) w-full min-h-[250px] text-(--main-color) flex flex-col gap-5 items-center justify-center'
                style={{
                    backgroundImage: "url('/learningBg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
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

            <div className="px-4 bg-gradient-to-tr from-(--main-color)/30 via-(--bg-color) to-indigo-100/60 min-h-[350px] animate-fadein">
                {loading ? (
                    // Animated skeleton loaders
                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
                        {[...Array(4)].map((_, idx) => (
                            <TrackCardSkeleton key={idx} dir={dir} />
                        ))}
                    </div>
                ) : filteredTracks.length === 0 ? (
                    <p className="text-gray-500 text-center text-4xl mt-8 font-semibold animate-pulse">
                        {t.learnPageNoTracks || "there is no tracks yet."}
                    </p>
                ) : (
                    <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10">
                        {filteredTracks.map((track, i) => (
                            <div
                                key={track._id}
                                className="relative flex flex-col border border-(--second-color)/40 rounded-3xl shadow-xl hover:scale-[1.03] hover:shadow-2xl group p-7 pt-9 overflow-hidden transition-all duration-300 ease-out hover:border-(--second-color) animate-fadeinUp"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="absolute top-0 right-0 m-3 rounded-bl-2xl px-5 py-2 text-xs font-bold bg-(--second-color)  text-white shadow-lg z-10 bounce-in">
                                    {track.level ? (
                                        getTrackLevelTranslation(track.level)
                                    ) : (
                                        t.coursesGoToTrack || 'Track'
                                    )}
                                </div>
                                <div className="flex items-center justify-center mb-5">
                                    {track.thumbnail ? (
                                        <div className="relative">
                                            <img 
                                                src={track.thumbnail} 
                                                alt={track.title} 
                                                className="w-20 h-20 object-cover rounded-xl shadow-lg ring-4 ring-(--second-color)/30 animate-popin"
                                            />
                                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 bg-gradient-to-br from-(--second-color) to-indigo-400/80 rounded-xl flex items-center justify-center text-white text-3xl font-black drop-shadow animate-popin">
                                            {track.title[0]}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-(--text-color) mb-1 group-hover:text-(--second-color) transition-all duration-150 tracking-wide text-center drop-shadow">
                                    {track.title}
                                </h2>
                                <p className="text-(--p-color) text-sm mb-6 line-clamp-3 min-h-[44px] italic text-center animate-fadein">
                                    {track.description || t.coursesDescription || "Expand your knowledge and skills in this track."}
                                </p>
                                <div className="mt-auto flex flex-col gap-2">
                                    <Link
                                        to={`/tracks/${track._id}`}
                                        className="flex items-center justify-center gap-2 bg-(--second-color) text-white rounded-full font-extrabold px-8 py-2 transition duration-150 shadow-lg hover:shadow-xl ring-2 ring-fuchsia-200/20 hover:ring-4 hover:ring-fuchsia-300/30 animate-pulse-on-hover"
                                        dir={dir}
                                    >
                                        <span className="tracking-wide">{t.startLearning || "Start Learning"}</span>
                                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </Link>
                                    {track.lessonsCount ? (
                                        <span className="text-xs text-black/50 text-center bg-white/75 px-3 py-0.5 rounded-full mt-1 animate-bounce inline-block ring-1 ring-(--second-color)/10">
                                            {track.lessonsCount} {t.coursesLessons || "lessons"}
                                        </span>
                                    ) : null}
                                </div>
                                <div className="absolute -z-10 right-[-50px] bottom-[-40px] w-52 h-52 rounded-full blur-2xl opacity-80 pulse-bg"></div>
                                {/* Decorative confetti flare */}
                                <div className="absolute -left-10 -top-10 w-24 h-24 bg-gradient-radial from-fuchsia-400/30 to-transparent rounded-full blur-2xl animate-confetti"></div>
                            </div>
                        ))}
                    </div>
                )}
                <style>
                    {`
                        @keyframes fadeinUp {
                            from{ opacity:0; transform:translateY(30px);}
                            to{ opacity:1; transform:translateY(0);}
                        }
                        .animate-fadeinUp {
                            animation: fadeinUp 0.7s cubic-bezier(.28,.84,.42,1) both;
                        }
                        @keyframes fadein {
                            from{ opacity:0 }
                            to{ opacity:1 }
                        }
                        .animate-fadein { animation:fadein 1s both;}
                        @keyframes popin { from{transform:scale(.6);opacity:0;} to{transform:scale(1);opacity:1;} }
                        .animate-popin { animation:popin 0.6s cubic-bezier(.38,1.42,.5,1) both;}

                        @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
                        .animate-bounce { animation:bounce 1.3s infinite both;}
                        .animate-bounce-on-hover:hover { animation:bounce .6s both; }
                        .pulse-bg { animation:fadein 2s, bounce 3s infinite alternate;}
                        @keyframes confetti { 0%, 100% { opacity: 0.5; transform: scale(.6) rotate(-6deg);} 50% {opacity: 1; transform: scale(1.2) rotate(7deg);} }
                        .animate-confetti { animation: confetti 3s infinite alternate; }
                    `}
                </style>
            </div>
   
        </>
    )
}

export default LearnPage