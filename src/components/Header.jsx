import React, { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { FaHome } from 'react-icons/fa'
import { GiBookshelf } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { FaXmark } from 'react-icons/fa6';
import { MdDashboardCustomize } from "react-icons/md";
import { GiNotebook } from "react-icons/gi"; // Added icon for "My Courses"
import useAuth from '../hooks/useAuth';

function Header() {
    const { user, logout } = useAuth()
    const [mood, setMood] = useState("dark")
    const [lang, setLang] = useState("ar")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();

    const handleMood = () => {
        setMood(mood === "dark" ? "light" : "dark")
    }
    const handleLang = () => {
        setLang(lang === "ar" ? "en" : "ar")
    }

    // FIX: handleLogOut used for logout button as recommended, and used in both desktop and mobile
    const handleLogOut = () => {
        logout();
        navigate("/")
    }

    // List of sidebar links
    const sidebarLinks = [
        {
            label: 'Home',
            to: '/',
            icon: <FaHome />,
            exact: true
        },
        {
            label: 'Dashboard',
            to: '/dashboard',
            icon: <MdDashboardCustomize />,
            exact: false
        },
        {
            label: 'View tracks',
            to: '/learn',
            icon: <GiBookshelf />,
            exact: false
        },
        // Added "My Courses" link here
        {
            label: 'My Courses',
            to: '/courses',
            icon: <GiNotebook />,
            exact: false
        },
        {
            label: 'Test your self',
            to: '/test',
            icon: <MdQuiz />,
            exact: false
        }
    ];

    // Helper to check if a link is active
    const isLinkActive = (link) => {
        if (link.exact)
            return location.pathname === link.to;
        return location.pathname.startsWith(link.to);
    }

    return (
        <header className={`py-5 bg-(--main-color) relative transition-all duration-500 ${sidebarOpen ? 'md:pl-[250px] pl-0' : ''} px-20`}>
            {/* Opaque overlay when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    style={{ top: 0 }}
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Desktop Header */}
            <div className='hidden md:flex items-center justify-between w-full'>
                <div className='flex items-center gap-3 '>
                    <Link to="/" className='capitalize font-bold text-2xl'>edu<span className='text-(--second-color)'>Master</span></Link>
                    <div className='flex items-center gap-3'>
                        <button onClick={handleMood} className='cursor-pointer bg-[#eee] p-2 rounded-md'>
                            {mood === "dark" ? (<FaMoon />) : (<FaSun />)}
                        </button>
                        <button onClick={handleLang} className='cursor-pointer bg-[#eee] py-1 px-2 rounded-md font-semibold capitalize'>
                            {lang === "ar" ? "ar" : "en"}
                        </button>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    {!user && (
                        <Link to="/register" className='rounded-sm hidden md:block bg-(--second-color) text-(--main-color) hover:bg-(--main-color) hover:text-(--second-color) font-bold py-2 px-5 cursor-pointer border border-[--second-color] transition-all duration-500 capitalize'>
                            signUp
                        </Link>
                    )}
                    <button className='cursor-pointer' onClick={() => setSidebarOpen(true)}>
                        <IoMenu className='text-2xl' />
                    </button>
                </div>

                {/* sidebar  */}
                <div className={`bg-(--main-color) fixed top-0 right-0 h-screen z-40 flex flex-col justify-between shadow-lg transition-all duration-500 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} w-[250px]`}>
                    <div className='p-5 relative h-full flex flex-col justify-between'>
                        <button className='absolute right-5 text-xl cursor-pointer top-0 z-50' onClick={() => setSidebarOpen(false)}><FaXmark /></button>
                        <div>
                            <div className='flex items-center justify-center mb-4'>
                                <Link to="/" className='capitalize font-bold text-2xl'>edu<span className='text-(--second-color)'>Master</span></Link>
                                <img className={`hidden w-[50px]`} src='logo.jpg' alt='logo' />
                            </div>
                            <div className='flex flex-col gap-3 mt-5'>
                                {sidebarLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className={`
                                            capitalize flex items-center gap-2 font-bold cursor-pointer rounded-lg px-3 py-2 transition-all duration-300
                                            ${isLinkActive(link)
                                                ? "bg-(--second-color) text-(--main-color)"
                                                : "hover:bg-(--second-color)/80 hover:text-(--main-color) text-gray-800"}
                                        `}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Logout button at the bottom */}
                        <div className="w-full mt-auto">
                            <button onClick={handleLogOut} className="w-full bg-red-600 hover:bg-red-700 text-(--main-color) font-bold py-2 px-4 rounded transition-all duration-300 capitalize">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='flex md:hidden items-center justify-between w-full'>
                <div className='flex items-center justify-between w-full gap-3 '>
                    <Link to="/" className='capitalize font-bold text-2xl'>edu<span className='text-(--second-color)'>Master</span></Link>
                    <div className='flex items-center gap-3'>
                        <button onClick={handleMood} className='cursor-pointer bg-[#eee] p-2 rounded-md'>
                            {mood === "dark" ? (<FaMoon />) : (<FaSun />)}
                        </button>
                        <button onClick={handleLang} className='cursor-pointer bg-[#eee] py-1 px-2 rounded-md font-semibold capitalize'>
                            {lang === "ar" ? "ar" : "en"}
                        </button>
                        <button className='cursor-pointer' onClick={() => setSidebarOpen(true)}>
                            <IoMenu className='text-2xl' />
                        </button>
                    </div>
                </div>
                {/* Mobile Sidebar */}
                <div className={`bg-(--main-color) fixed top-0 right-0 h-screen z-40 flex flex-col justify-between shadow-lg transition-all duration-500 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} w-[250px]`}>
                    <div className='p-5 relative h-full flex flex-col justify-between'>
                        <button className='absolute right-5 text-xl cursor-pointer top-0 z-50' onClick={() => setSidebarOpen(false)}><FaXmark /></button>
                        <div>
                            <div className='flex items-center justify-center mb-4'>
                                <Link to="/" className='capitalize font-bold text-2xl'>edu<span className='text-(--second-color)'>Master</span></Link>
                                <img className={`hidden w-[50px]`} src='logo.jpg' alt='logo' />
                            </div>
                            <div className='flex flex-col gap-3 mt-5'>
                                {sidebarLinks.map((link, idx) => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className={`
                                            capitalize flex items-center gap-2 font-bold cursor-pointer rounded-lg px-3 py-2 transition-all duration-300
                                            ${isLinkActive(link)
                                                ? "bg-(--second-color) text-(--main-color)"
                                                : "hover:bg-(--second-color)/80 hover:text-(--main-color) text-gray-800"}
                                        `}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {/* Logout button at the bottom */}
                        <div className="w-full mt-auto">
                            <button onClick={handleLogOut} className="w-full bg-red-600 hover:bg-red-700 text-(--main-color) font-bold py-2 px-4 rounded transition-all duration-300 capitalize">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                {/* Opaque overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-30"
                        style={{ top: 0 }}
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
            </div>
        </header>
    )
}

export default Header