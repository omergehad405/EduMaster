import { useContext } from "react";
import LanguageContext from "../context/LangContext";
export const useLanguage = () => {
    const context = useContext(LanguageContext);

    return context;
};

