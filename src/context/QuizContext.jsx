import React, { createContext, useState, useContext } from 'react';
import AuthContext from './AuthContext';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const [sourceFile, setSourceFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [fileName, setFileName] = useState(null);     // ✅ NEW: Filename
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [quizId, setQuizId] = useState(null);
    const [myQuizzes, setMyQuizzes] = useState([]);

    const fetchMyQuizzes = async () => {
        if (!token) return;
        try {
            const res = await fetch('https://edumaster-backend-6xy5.onrender.com/api/quizzes/my', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.status === 'success') setMyQuizzes(data.quizzes);
        } catch (err) {
            console.error('Failed to fetch user quizzes', err);
        }
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
            clearFile
        }}>
            {children}
        </QuizContext.Provider>
    );
};
