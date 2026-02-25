import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { GiBookshelf } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

function Footer() {
    return (
        <footer className="bg-(--main-color) py-10 px-6 text-(--main-color) mt-10 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 flex-wrap">
                {/* Left: Logo and Name */}
                <div className="flex flex-col items-start mb-6 md:mb-0">
                    <div className="flex items-center mb-2">
                        <span className="font-bold text-2xl text-black uppercase">edu
                            <span className="text-(--second-color)">Master</span>
                        </span>
                        <img src="/logo.jpg" alt="logo" className="w-10 h-10 mr-2 rounded-full bg-(--main-color) object-cover" />

                    </div>
                    <p className="text-md text-gray-500 font-semibold mt-2">Empowering learners for the future</p>
                </div>
                {/* Middle: Fast Links */}
                <div className="flex flex-col items-center mb-6 md:mb-0">
                    <h4 className="font-bold text-2xl mb-3 text-(--second-color)">Quick Links</h4>
                    <nav className="flex flex-col gap-2">
                        <Link to="/" className="text-black flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <FaHome /> Home
                        </Link>
                        <Link to="/dashboard" className="text-black flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <MdDashboard /> Dashboard
                        </Link>
                        <Link to="/learn" className="text-black flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <GiBookshelf /> View Tracks
                        </Link>
                        <Link to="/test" className="text-black flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <MdQuiz /> Test Yourself
                        </Link>
                    </nav>
                </div>
                {/* Right: Quote and CTA */}
                <div className="flex flex-col items-end max-w-xs">
                    <q className="italic text-sm leading-relaxed mb-3 text-gray-500">
                        "Education is the most powerful weapon which you can use to change the world."
                    </q>
                    <span className="block text-xs mb-5 text-gray-400">— Nelson Mandela</span>
                    <Link
                        to="/learn"
                        className="bg-(--second-color) hover:bg-(--main-color) text-(--main-color) hover:text-(--second-color) transition-all font-bold py-2 px-6 rounded shadow capitalize text-sm text-center"
                    >
                        Start Learning Now
                    </Link>
                </div>
            </div>
            {/* Optional: bottom copyright */}
            <div className="mt-10 border-t border-(--main-color)/10 pt-6 text-center text-xs text-gray-300">
                &copy; {new Date().getFullYear()} eduMaster. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer