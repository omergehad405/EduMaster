import { useContext } from "react";
import LearnContext from "../context/LearnContext";

const useLearn = () => {
    const context = useContext(LearnContext);
    if (!context) {
        throw new Error("useLearn must be used within an LearnProvider");
    }
    return context;
};

export default useLearn;