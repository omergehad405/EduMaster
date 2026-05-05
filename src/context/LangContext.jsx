// LangContext.jsx
import React, { createContext, useState, useEffect } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Run only in browser
        try {
            const saved = localStorage.getItem("lang");
            if (saved) setLanguage(saved);
        } catch { }
        setIsReady(true);
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        try {
            localStorage.setItem("lang", lang);
        } catch { }
    };

    if (!isReady) {
        return null;
    }

    return (
        <LangContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LangContext.Provider>
    );
};

export default LangContext;
