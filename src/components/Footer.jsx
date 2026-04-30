import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { GiBookshelf } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { useLanguage } from '../hooks/useLanguage';
import translations from '../utils/translations';

function Footer() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <footer className="bg-(--bg-color) py-10 px-6 text-(--main-color) shadow-inner" dir={dir}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 flex-wrap">
                {/* Left: Logo and Name */}
                <div className="flex flex-col items-start mb-6 md:mb-0">
                    <div className="flex items-center mb-2">
                        <span className="font-bold text-2xl text-(--text-color) uppercase">edu
                            <span className="text-(--second-color)">Master</span>
                        </span>
                        <img src="./logo.jpg" alt="logo" className="w-10 h-10 mr-2 rounded-full object-cover" />
                    </div>
                    <p className="text-md text-(--p-color) font-semibold mt-2">
                        {/* This could also be translated if you add a key */}
                        {language === "ar" ? "تمكين المتعلمين من أجل المستقبل" : "Empowering learners for the future"}
                    </p>
                </div>
                {/* Middle: Fast Links */}
                <div className="flex flex-col items-center mb-6 md:mb-0">
                    <h4 className="font-bold text-2xl mb-3 text-(--second-color)">
                        {t.footerFollowUs || t.footerSupport || "Quick Links"}
                    </h4>
                    <nav className="flex flex-col gap-2">
                        <Link to="/" className="text-(--text-color) flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <FaHome />{t.menuHome || 'Home'}
                        </Link>
                        <Link to="/dashboard" className="text-(--text-color) flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <MdDashboard />{t.menuDashboard || 'Dashboard'}
                        </Link>
                        <Link to="/learn" className="text-(--text-color) flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <GiBookshelf />{t.ctaExploreTracks || "View Tracks"}
                        </Link>
                        <Link to="/test" className="text-(--text-color) flex items-center gap-2 relative left-0 hover:left-[5px] transition-all duration-300">
                            <MdQuiz />{t.testYourself || "Test Yourself"}
                        </Link>
                    </nav>
                </div>
                {/* Right: Quote and CTA */}
                <div className="flex flex-col max-w-xs">
                    <q className="italic text-sm leading-relaxed mb-3 text-gray-500" lang={language}>
                        {language === "ar"
                            ? '«التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.»'
                            : '"Education is the most powerful weapon which you can use to change the world."'}
                    </q>
                    <span className="block text-xs mb-5 text-gray-400 text-right">
                        {language === "ar" ? "— نيلسون مانديلا" : "— Nelson Mandela"}
                    </span>
                    <Link
                        to="/learn"
                        className="bg-(--second-color) hover:bg-(--text-color) text-(--text-color) hover:text-(--second-color) transition-all font-bold py-2 px-6 rounded shadow capitalize text-sm text-center"
                    >
                        {t.startLearning || "Start Learning"}
                    </Link>
                </div>
            </div>
            <div className="mt-10 border-t border-(--main-color)/10 pt-6 text-center text-xs text-gray-300">
                &copy; {new Date().getFullYear()} eduMaster. {t.footerAllRightsReserved || "All rights reserved."}
            </div>
        </footer>
    )
}

export default Footer