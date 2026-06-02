import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBookOpen } from 'react-icons/fa'
import { GiBookshelf } from "react-icons/gi";
import { MdQuiz, MdDashboard } from "react-icons/md";
import { useLanguage } from '../hooks/useLanguage';
import translations from '../utils/translations';

function Footer() {
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <footer className="bg-(--main-color) pt-24 pb-12 px-6 md:px-20 border-t border-white/5" dir={dir}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Column 1: Brand */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-bold text-3xl text-(--text-color) uppercase tracking-tighter">
                            edu<span className="text-(--second-color)">Master</span>
                        </span>
                    </Link>
                    <p className="text-gray-500 leading-relaxed font-medium">
                        {language === "ar" 
                            ? "منصة تعليمية متطورة تهدف إلى تمكين الطلاب من خلال مسارات تعليمية منظمة واختبارات ذكية تعتمد على الذكاء الاصطناعي." 
                            : "Empowering learners through AI-driven personalized study tracks and intelligent quiz generation."}
                    </p>
                    <div className="flex items-center gap-4">
                        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                            <a 
                                key={idx} 
                                href="#" 
                                className="w-10 h-10 rounded-xl bg-gray-50/5 flex items-center justify-center text-gray-500 hover:bg-(--second-color) hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div>
                    <h4 className="text-(--text-color) font-bold text-xl mb-8">{t.footerQuickLinks || "Explore"}</h4>
                    <nav className="flex flex-col gap-4">
                        {[
                            { to: "/", icon: <FaHome />, label: t.menuHome || 'Home' },
                            { to: "/guide", icon: <FaBookOpen />, label: t.guideLink || 'How to Use' },
                            { to: "/dashboard", icon: <MdDashboard />, label: t.menuDashboard || 'Dashboard' },
                            { to: "/learn", icon: <GiBookshelf />, label: t.ctaExploreTracks || "View Tracks" },
                            { to: "/test", icon: <MdQuiz />, label: t.testYourself || "Test Yourself" }
                        ].map((link, idx) => (
                            <Link 
                                key={idx} 
                                to={link.to} 
                                className="text-gray-500 hover:text-(--second-color) flex items-center gap-3 transition-colors group"
                            >
                                <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Column 3: Quote */}
                <div>
                    <h4 className="text-(--text-color) font-bold text-xl mb-8">{t.footerInspiration || "Inspiration"}</h4>
                    <div className="space-y-4">
                        <q className="italic text-gray-500 leading-relaxed block" lang={language}>
                            {language === "ar"
                                ? '«التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.»'
                                : '"Education is the most powerful weapon which you can use to change the world."'}
                        </q>
                        <span className="block text-sm font-bold text-(--second-color)">
                            {language === "ar" ? "— نيلسون مانديلا" : "— Nelson Mandela"}
                        </span>
                    </div>
                </div>

                {/* Column 4: Newsletter/CTA */}
                <div>
                    <h4 className="text-(--text-color) font-bold text-xl mb-8">{t.footerNewsletter || "Stay Updated"}</h4>
                    <p className="text-gray-500 mb-6 text-sm">
                        {language === "ar" 
                            ? "اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات." 
                            : "Subscribe to our newsletter for the latest tracks and features."}
                    </p>
                    <div className="flex items-center gap-2">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="bg-gray-50/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-(--second-color) w-full text-(--text-color)"
                        />
                        <button className="bg-(--second-color) text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-(--second-color)/20">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} eduMaster. {t.footerAllRightsReserved || "All rights reserved."}</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-(--second-color) transition-colors">{t.privacyPolicy || "Privacy Policy"}</a>
                    <a href="#" className="hover:text-(--second-color) transition-colors">{t.termsOfService || "Terms of Service"}</a>
                </div>
            </div>
        </footer>
    )
}

const FaArrowRight = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
);

export default Footer