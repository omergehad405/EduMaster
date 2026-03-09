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

const API_URL = "https://edumaster-backend-6xy5.onrender.com";

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

                console.log('📋 Raw quizzes:', res.data.quizzes); // DEBUG
                setQuizzes(res.data.quizzes || []);
            } catch (err) {
                console.error('Failed to fetch quizzes:', err);
                setError('Failed to load quizzes');
                setQuizzes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyQuizzes();
    }, [token]);

    // ✅ FIXED: Convert ObjectId to string + Debug logging
    const handleReviewQuiz = (quiz) => {
        console.log('🔍 CLICKED QUIZ:', quiz); // DEBUG

        // ✅ PRIORITY 1: quizId from Quiz.jsx submit
        if (quiz.quizId) {
            console.log('✅ Using quizId:', quiz.quizId);
            return navigate(`/quiz-review/${quiz.quizId}`);
        }

        // ✅ PRIORITY 2: Convert MongoDB ObjectId to string
        const quizStringId = quiz._id?.toString();
        if (quizStringId) {
            console.log('✅ Using _id:', quizStringId);
            return navigate(`/quiz-review/${quizStringId}`);
        }

        console.error('❌ NO VALID ID FOUND:', quiz);
        alert('Cannot review - missing quiz ID');
    };

    const handleRetakeQuiz = (quiz) => {
        navigate(`/test?file=${encodeURIComponent(quiz.fileName || 'Document Quiz')}`);
    };

    if (loading) {
        return (
            <div className="quizreview-bg min-h-screen flex items-center justify-center">
                <div className="quizreview-box text-center p-8 bg-bgcard rounded border max-w-md mx-4 w-full">
                    <div className="loader mx-auto mb-4" />
                    <p className="font-medium mb-1">Loading your quizzes...</p>
                    <p className="text-xs text-txtmuted">Fetching completed quizzes</p>
                </div>
            </div>
        );
    }

    return (
        <div className="quizreview-bg min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-txt mb-4">📚 My Quizzes</h1>
                    <p className="text-txtmuted text-lg max-w-2xl mx-auto">
                        Review your past performance and retake quizzes
                    </p>
                </div>

                {error && !quizzes.length ? (
                    <div className="text-center py-16">
                        <div className="text-error text-4xl mb-6">📭</div>
                        <h2 className="text-2xl font-bold text-txt mb-4">No Quizzes Yet</h2>
                        <p className="text-txtmuted mb-8 max-w-md mx-auto">
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
                            <div className="bg-bgcard p-6 border border-line rounded-lg mb-8">
                                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-primary">
                                            {quizzes.length}
                                        </div>
                                        <div className="text-xs text-txtmuted uppercase tracking-wide">Total Quizzes</div>
                                    </div>
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-success">
                                            {Math.round(quizzes.reduce((acc, q) => acc + (q.score || 0), 0) / quizzes.reduce((acc, q) => acc + (q.totalQuestions || 0), 0) * 100) || 0}%
                                        </div>
                                        <div className="text-xs text-txtmuted uppercase tracking-wide">Avg Accuracy</div>
                                    </div>
                                    <div className="text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-accent">
                                            {quizzes.filter(q => (q.percentage || 0) >= 80).length}
                                        </div>
                                        <div className="text-xs text-txtmuted uppercase tracking-wide">Perfect Scores</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quizzes List */}
                        <div className="grid gap-4">
                            {quizzes.map((quiz, idx) => (
                                <div
                                    key={quiz._id?.toString() || idx}
                                    className="bg-bgcard border border-line rounded-lg p-6 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Quiz Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary text-primary font-bold text-lg flex items-center justify-center">
                                                    📄
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-xl text-txt truncate pr-4 group-hover:text-primary transition">
                                                        {quiz.fileName || 'Document Quiz'}
                                                    </h3>
                                                    <p className="text-sm text-txtmuted">
                                                        {quiz.description || `${quiz.score || 0}/${quiz.totalQuestions || 0} (${quiz.percentage || 0}%)`}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Score Badge */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${(quiz.percentage || 0) >= 80 ? 'bg-success text-success-content' :
                                                    (quiz.percentage || 0) >= 60 ? 'bg-accent text-accent-content' :
                                                        'bg-error text-error-content'
                                                    }`}>
                                                    {quiz.score || 0}/{quiz.totalQuestions || 0} ({quiz.percentage || 0}%)
                                                </div>
                                                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="text-right md:text-left">
                                            <div className="text-xs text-txtmuted mb-1">
                                                {quiz.createdAt ?
                                                    new Date(quiz.createdAt).toLocaleDateString() :
                                                    'Recent'
                                                }
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                                            <button
                                                onClick={() => handleReviewQuiz(quiz)}  // ✅ PASS FULL QUIZ OBJECT
                                                className="flex-1 px-4 py-2 bg-primary text-bgcard rounded font-medium text-sm hover:bg-primary-dark transition flex items-center justify-center gap-2"
                                                title="Review your answers"
                                            >
                                                👁️ Review
                                            </button>
                                            <button
                                                onClick={() => handleRetakeQuiz(quiz)}
                                                className="flex-1 px-4 py-2 bg-accent text-bgcard rounded font-medium text-sm hover:bg-accent-dark transition flex items-center justify-center gap-2"
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
                                <p className="text-txtmuted mb-8">Start your first quiz to see your progress here!</p>
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
