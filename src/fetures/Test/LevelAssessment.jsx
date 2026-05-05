import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";

const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

function LevelAssessment({ onComplete, onCancel }) {
    const { sourceFile, setUserLevel, setShowAssessment } = useContext(QuizContext);
    const { token } = useAuth();
    const { language } = useLanguage();
    const t = translations[language] || {};
    const dir = language === "ar" ? "rtl" : "ltr";

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState('intro'); // intro, testing, result
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [determinedLevel, setDeterminedLevel] = useState(null);

    const startAssessment = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", sourceFile);

            const res = await axios.post(`${API_URL}/api/quizzes/assessment`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                setQuestions(res.data.questions);
                setCurrentStep('testing');
            }
        } catch (err) {
            console.error("❌ Assessment error:", err);
            alert("Failed to generate assessment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (option) => {
        const newAnswers = [...answers, { 
            difficulty: questions[currentIndex].difficulty, 
            isCorrect: option === questions[currentIndex].correctAnswer 
        }];
        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            calculateLevel(newAnswers);
        }
    };

    const calculateLevel = (finalAnswers) => {
        const stats = {
            easy: { correct: 0, total: 0 },
            medium: { correct: 0, total: 0 },
            hard: { correct: 0, total: 0 }
        };

        finalAnswers.forEach(ans => {
            stats[ans.difficulty].total++;
            if (ans.isCorrect) stats[ans.difficulty].correct++;
        });

        const percentages = {
            easy: (stats.easy.correct / stats.easy.total) || 0,
            medium: (stats.medium.correct / stats.medium.total) || 0,
            hard: (stats.hard.correct / stats.hard.total) || 0
        };

        // Level Determination Logic
        let level = 'easy';
        if (percentages.hard >= 0.6) level = 'hard';
        else if (percentages.medium >= 0.6) level = 'medium';
        
        setDeterminedLevel(level);
        setUserLevel(level);
        setCurrentStep('result');
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-10 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--second-color)"></div>
            <p className="text-(--text-color) font-medium">{language === 'ar' ? 'جاري إنشاء أسئلة التقييم...' : 'Generating Assessment Questions...'}</p>
        </div>
    );

    if (currentStep === 'intro') return (
        <div className="bg-(--main-color) p-8 rounded-2xl shadow-xl text-center space-y-6 animate-fadeIn" dir={dir}>
            <h2 className="text-2xl font-bold text-(--text-color)">🚀 {t.assessmentTitle || "Level Assessment"}</h2>
            <p className="text-gray-400 max-w-md mx-auto">
                {t.assessmentDesc || "To adapt the platform to your skills, please take this 15-question mandatory test (5 Easy, 5 Medium, 5 Difficult)."}
            </p>
            <div className="flex gap-4 justify-center">
                <button 
                    onClick={startAssessment}
                    className="bg-(--second-color) text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform"
                >
                    {t.assessmentStart || "Start Test"}
                </button>
                <button 
                    onClick={onCancel}
                    className="border border-gray-300 text-gray-400 py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    {t.assessmentCancel || "Cancel"}
                </button>
            </div>
        </div>
    );

    if (currentStep === 'testing') {
        const q = questions[currentIndex];
        const progress = ((currentIndex + 1) / questions.length) * 100;

        return (
            <div className="w-full max-w-2xl bg-(--main-color) p-8 rounded-2xl shadow-xl animate-fadeIn" dir={dir}>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-(--second-color) uppercase tracking-widest">
                        {t[`level${q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}`] || q.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">
                        {language === 'ar' ? `السؤال ${currentIndex + 1} من ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
                    </span>
                </div>
                
                <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
                    <div 
                        className="bg-(--second-color) h-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <h3 className="text-xl font-bold text-(--text-color) mb-8">
                    {q.question}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {q.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(opt)}
                            className="text-left p-4 rounded-xl border border-gray-100 hover:border-(--second-color) hover:bg-(--second-color)/5 transition-all text-(--text-color) font-medium"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (currentStep === 'result') return (
        <div className="bg-(--main-color) p-10 rounded-2xl shadow-2xl text-center space-y-6 animate-bounceIn" dir={dir}>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-black text-(--text-color)">
                {t.assessmentComplete || "Assessment Complete!"}
            </h2>
            <div className="py-4">
                <p className="text-gray-400 mb-2">{t.yourDeterminedLevel || "Your Determined Level:"}</p>
                <span className="text-4xl font-black text-(--second-color) uppercase tracking-tighter">
                    {t[`level${determinedLevel.charAt(0).toUpperCase() + determinedLevel.slice(1)}`] || determinedLevel}
                </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                {t.levelAdjustDesc || "All future quizzes and AI explanations for this session will be adapted to your level."}
            </p>
            <button 
                onClick={() => {
                    setShowAssessment(false);
                    onComplete();
                }}
                className="w-full bg-(--second-color) text-white font-bold py-4 rounded-xl shadow-lg shadow-(--second-color)/30 hover:scale-105 transition-transform"
            >
                {t.assessmentContinue || "Continue to Dashboard"}
            </button>
        </div>
    );

    return null;
}

export default LevelAssessment;
