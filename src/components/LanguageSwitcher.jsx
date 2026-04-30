import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        className='cursor-pointer bg-gray-200 dark:bg-gray-800 p-1 rounded-md transition text-white uppercase'
        onClick={() => language == "en" ? changeLanguage("ar") : changeLanguage("en")}
      >
        {language === "en" ? "en" : "ar"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
