import React, { createContext, useState, useContext } from 'react';
import AuthContext from './AuthContext';

export const QuizContext = createContext();

// const API_URL = "https://edumaster-backend-6xy5.onrender.com/api/quizzes";
const API_URL = "https://edumaster-backend-6xy5.onrender.com/api/quizzes";

export const QuizProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const [sourceFile, setSourceFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [fileName, setFileName] = useState(null);     // ✅ NEW: Filename
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [quizId, setQuizId] = useState(null);
    const [myQuizzes, setMyQuizzes] = useState([]);

    // In QuizContext.jsx - Add loaded state
    const [quizzesLoaded, setQuizzesLoaded] = useState(false);

    const fetchMyQuizzes = async () => {
        if (!token || quizzesLoaded) return;  // ✅ Prevent duplicates

        try {
            const res = await fetch(`${API_URL}/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            console.log('📋 Raw quizzes data:', data);

            if (data.status === 'success' && Array.isArray(data.quizzes)) {
                setMyQuizzes(data.quizzes);
            } else {
                setMyQuizzes([]);
            }
        } catch (err) {
            console.error('❌ Failed to fetch user quizzes:', err);
            setMyQuizzes([]);
        } finally {
            setQuizzesLoaded(true);  // ✅ Prevent future calls
        }
    };

    // Helper function
    const extractScore = (description) => {
        const match = description.match(/(\d+)\/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const clearFile = () => {
        setSourceFile(null);
        setFileUrl(null);
        setFileContent(null);
        setFileName(null);
    };

    return (
        <QuizContext.Provider value={{
            sourceFile, setSourceFile,
            fileUrl, setFileUrl,
            fileContent, setFileContent,
            fileName, setFileName,      // ✅ NEW
            generatedQuiz, setGeneratedQuiz,
            quizId, setQuizId,
            myQuizzes, fetchMyQuizzes,
            extractScore,
            clearFile
        }}>
            {children}
        </QuizContext.Provider>
    );
};
