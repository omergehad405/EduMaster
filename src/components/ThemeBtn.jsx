import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeBtn() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )

    useEffect(() => {
        const root = window.document.documentElement

        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    const handleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark")
    }

    return (
        <button 
            onClick={handleTheme} 
            className='cursor-pointer bg-gray-200 dark:bg-gray-800 p-2 rounded-md transition'
        >
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
    )
}

export default ThemeBtn