import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import translations from '../utils/translations';

function getCurrentLang() {
    const stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;
    return 'en';
}

const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

const Loader = ({ text = "Loading..." }) => (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-color)">
        <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-10 w-10 text-(--second-color)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-gray-300 text-lg font-medium">{text}</p>
        </div>
    </div>
);

const MyQuizzesPage = () => {
    const lang = getCurrentLang();
    const t = translations[lang] || translations.en;
    const navigate = useNavigate();
    const { token } = useAuth();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyQuizzes = async () => {
            if (!token) {
                setError('Please login first');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`${API_URL}/api/quizzes/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setQuizzes(res.data.quizzes || []);
            } catch (err) {
                setError('Failed to load quizzes');
                setQuizzes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyQuizzes();
    }, [token]);

    // Function to review quiz
    const handleReviewQuiz = (quiz) => {
        if (quiz.quizId) {
            return navigate(`/quiz-review/${quiz.quizId}`);
        }
        const quizStringId = quiz._id?.toString();
        if (quizStringId) {
            return navigate(`/quiz-review/${quizStringId}`);
        }
        alert('Cannot review - missing quiz ID');
    };

    // Function to retake quiz
    const handleRetakeQuiz = (quiz) => {
        navigate(`/test?file=${encodeURIComponent(quiz.fileName || 'Document Quiz')}`);
    };

    // Loader while fetching data
    if (loading) {
        return (
            <Loader text="Loading your quizzes..." />
        );
    }

    return (
        <div className="bg-(--bg-color) min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-txt mb-4 text-(--text-color)">📚 My Quizzes</h1>
                    <p className="text-(--p-color) text-lg max-w-2xl mx-auto">
                        Review your past performance and retake quizzes
                    </p>
                </div>

                {error && !quizzes.length ? (
                    <div className="text-center py-16">
                        <div className="text-error text-4xl mb-6">📭</div>
                        <h2 className="text-2xl font-bold text-txt mb-4">No Quizzes Yet</h2>
                        <p className="text-(--p-color) mb-8 max-w-md mx-auto">
                            {error || "You haven't completed any quizzes yet."}
                        </p>
                        <div className="space-y-3 max-w-sm mx-auto">
                            <button
                                onClick={() => navigate('/test')}
                                className="w-full py-3 px-6 bg-primary text-bgcard rounded font-medium text-base hover:bg-primary-dark transition flex items-center justify-center gap-2"
                            >
                                🎯 Take First Quiz
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 px-6 bg-accent text-bgcard rounded font-medium text-base hover:bg-accent-dark transition"
                            >
                                🔄 Refresh
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        {quizzes.length > 0 && (
                            <div className="bg-(--main-color) p-6 border border-line rounded-lg mb-8">
                                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-(--text-color)">
                                            {quizzes.length}
                                        </div>
                                        <div className="text-xs text-(--p-color) uppercase tracking-wide">Total Quizzes</div>
                                    </div>
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-(--text-color) text-2xl font-bold text-success">
                                            {Math.round(quizzes.reduce((acc, q) => acc + (q.score || 0), 0) / quizzes.reduce((acc, q) => acc + (q.totalQuestions || 0), 0) * 100) || 0}%
                                        </div>
                                        <div className="text-xs text-(--p-color) uppercase tracking-wide">Avg Accuracy</div>
                                    </div>
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-(--text-color) text-2xl font-bold text-accent">
                                            {quizzes.filter(q => (q.percentage || 0) >= 80).length}
                                        </div>
                                        <div className="text-xs text-(--p-color) uppercase tracking-wide">Perfect Scores</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quizzes List */}
                        <div className="grid gap-4 bg-(--main-color)">
                            {quizzes.map((quiz, idx) => (
                                <div
                                    key={quiz._id?.toString() || idx}
                                    className="bg-(--main-color) border border-line rounded-lg p-6 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Quiz Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-12 h-12 rounded-lg text-primary font-bold text-lg flex items-center justify-center">
                                                    📄
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-xl text-(--text-color) truncate pr-4  transition">
                                                        {quiz.fileName || 'Document Quiz'}
                                                    </h3>
                                                    <p className="text-sm text-(--p-color)">
                                                        {quiz.description || `${quiz.score || 0}/${quiz.totalQuestions || 0} (${quiz.percentage || 0}%)`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="text-right md:text-left">
                                            <div className="text-xs text-(--p-color) mb-1">
                                                {quiz.createdAt ?
                                                    new Date(quiz.createdAt).toLocaleDateString() :
                                                    'Recent'
                                                }
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                                            <button
                                                onClick={() => handleReviewQuiz(quiz)}
                                                className="flex-1 px-4 py-2 cursor-pointer bg-(--bg-color) text-(--text-color) rounded font-medium text-sm hover:bg-primary-dark transition flex items-center justify-center gap-2"
                                                title="Review your answers"
                                            >
                                                👁️ Review
                                            </button>
                                            <button
                                                onClick={() => handleRetakeQuiz(quiz)}
                                                className="flex-1 px-4 py-2 cursor-pointer bg-(--bg-color) text-(--text-color) rounded font-medium text-sm hover:bg-accent-dark transition flex items-center justify-center gap-2"
                                                title="Take this quiz again"
                                            >
                                                🔄 Retake
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {quizzes.length === 0 && !loading && !error && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-6">📭</div>
                                <h2 className="text-2xl font-bold text-txt mb-4">No Quizzes Completed</h2>
                                <p className="text-(--p-color) mb-8">Start your first quiz to see your progress here!</p>
                                <button
                                    onClick={() => navigate('/test')}
                                    className="px-8 py-3 bg-primary text-bgcard rounded-xl font-bold text-lg hover:bg-primary-dark transition shadow-lg"
                                >
                                    🎯 Start Quiz
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyQuizzesPage;
