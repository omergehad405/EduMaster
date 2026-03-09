import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import translations from '../utils/translations';

function getCurrentLang() {
    const stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;
    return 'en';
}

const API_URL = "https://edumaster-backend-6xy5.onrender.com";

const QuizReviewPage = () => {
    const lang = getCurrentLang();
    const t = translations[lang] || translations.en;
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizReview = async () => {
            // ✅ FAILSAFE: Block undefined/empty quizId
            if (!quizId || quizId === 'undefined') {
                console.error('🚫 Invalid quizId:', quizId);
                setError('Invalid quiz ID');
                setLoading(false);
                return;
            }

            console.log('🔄 Fetching quiz:', quizId);

            if (!token) {
                setError('Please login first');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}/api/quizzes/completed/${quizId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const quizData = res.data;
                console.log('✅ Backend quiz data:', quizData);

                setCurrentQuiz({
                    fileName: quizData.fileName || quizData.title || 'Document Quiz',
                    score: quizData.score || quizData.totalScore || 0,
                    totalQuestions: quizData.questions?.length || quizData.totalQuestions || 0,
                    percentage: quizData.percentage || quizData.accuracy || 0,
                    description: quizData.description || `${quizData.score || 0}/${quizData.questions?.length || 0}`
                });

                setQuizQuestions(quizData.questions || []);

                const transformedAnswers = (quizData.userAnswers || []).map(ans => ({
                    questionIndex: ans.questionIndex || ans.index || 0,
                    selectedAnswer: ans.selectedAnswer || ans.answer || null,
                    isCorrect: ans.isCorrect !== undefined ? ans.isCorrect : null
                }));
                setUserAnswers(transformedAnswers);
                setError('');

            } catch (err) {
                console.error('❌ Backend failed:', err.response?.data || err.message);

                // ✅ LocalStorage fallback
                const fallbackData = getFallbackQuizData(quizId);
                if (fallbackData) {
                    setCurrentQuiz(fallbackData.quiz);
                    setQuizQuestions(fallbackData.questions);
                    setUserAnswers(fallbackData.answers);
                    setError('Using cached data ⚠️');
                } else {
                    // ✅ Demo fallback
                    setCurrentQuiz({
                        fileName: 'Recent Quiz',
                        score: 7,
                        totalQuestions: 10,
                        percentage: 70,
                        description: '7/10 (70%)'
                    });
                    const demoQuestions = generateDemoQuestions(10);
                    setQuizQuestions(demoQuestions);
                    setUserAnswers(generateMockAnswers(demoQuestions, 7));
                    setError('Showing demo - backend unavailable');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuizReview();
    }, [quizId, token]);

    const getFallbackQuizData = (quizId) => {
        try {
            const recentQuiz = localStorage.getItem(`quiz_${quizId}`);
            if (recentQuiz) {
                const parsed = JSON.parse(recentQuiz);
                return {
                    quiz: {
                        fileName: parsed.fileName || 'Recent Quiz',
                        score: parsed.score || 0,
                        totalQuestions: parsed.questions?.length || 0,
                        percentage: Math.round((parsed.score / parsed.questions?.length) * 100) || 0
                    },
                    questions: parsed.questions || [],
                    answers: parsed.answers || []
                };
            }
        } catch (e) {
            console.log('No cached quiz data');
        }
        return null;
    };

    const generateDemoQuestions = (count) => {
        const subjects = ['React', 'JavaScript', 'Node.js', 'MongoDB', 'CSS', 'HTML'];
        return Array.from({ length: count }, (_, i) => ({
            question: `What is the ${['primary', 'main', 'best'][i % 3]} feature of ${subjects[i % subjects.length]}?`,
            options: [
                `Feature ${String.fromCharCode(65 + i)} - Incorrect`,
                `Feature ${String.fromCharCode(66 + i)} - Correct`,
                `Feature ${String.fromCharCode(67 + i)} - Incorrect`,
                `Feature ${String.fromCharCode(68 + i)} - Incorrect`
            ],
            correctAnswer: `Feature ${String.fromCharCode(66 + i)} - Correct`,
            explanation: `This feature provides the most value in ${subjects[i % subjects.length]} development.`
        }));
    };

    const generateMockAnswers = (questions, correctCount) => {
        return questions.map((q, i) => {
            const isCorrect = i < correctCount;
            const correctIdx = q.options.indexOf(q.correctAnswer);
            return {
                questionIndex: i,
                selectedAnswer: isCorrect ? q.correctAnswer : q.options[0],
                isCorrect: isCorrect
            };
        });
    };

    if (loading) {
        return (
            <div className="quizreview-bg min-h-screen flex items-center justify-center">
                <div className="quizreview-box text-center p-8 bg-bgcard rounded border max-w-md mx-4 w-full">
                    <div className="w-20 h-20 border-4 border-primary border-t-primary-content rounded-full animate-spin mx-auto mb-8" />
                    <p className="font-bold text-xl text-txt mb-2">Loading quiz results...</p>
                    <p className="text-sm text-txtmuted">Quiz ID: {quizId?.slice(-6) || '----'}</p>
                </div>
            </div>
        );
    }

    if (error && !currentQuiz) {
        return (
            <div className="quizreview-bg min-h-screen flex flex-col items-center justify-center py-12 px-4">
                <div className="quizreview-box text-center p-12 border-8 border-error/20 max-w-md w-full">
                    <div className="text-error text-7xl mb-8">⚠️</div>
                    <h2 className="text-3xl font-bold text-txt mb-6">Quiz Not Found</h2>
                    <p className="text-txtmuted mb-8 text-lg">{error}</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/my-quizzes')}
                            className="w-full py-4 px-6 bg-primary text-bgcard rounded-xl font-bold text-lg hover:bg-primary-dark transition shadow-lg flex items-center justify-center gap-2"
                        >
                            📋 Go to My Quizzes
                        </button>
                        <button
                            onClick={() => navigate('/test')}
                            className="w-full py-4 px-6 bg-accent text-bgcard rounded-xl font-bold text-lg hover:bg-accent-dark transition shadow-lg flex items-center justify-center gap-2"
                        >
                            🎯 Take New Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quizreview-bg min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <button
                        onClick={() => navigate('/my-quizzes')}
                        className="inline-flex items-center gap-3 bg-bgcard shadow-lg px-8 py-4 rounded-xl font-bold text-lg text-txt hover:shadow-xl hover:-translate-y-1 transition-all mb-10 border border-line"
                    >
                        <span className="text-2xl">←</span>
                        Back to My Quizzes
                    </button>

                    <div className="bg-bgcard p-8 border border-line rounded-xl">
                        <h1 className="text-4xl font-bold text-txt mb-6">
                            {currentQuiz?.fileName || 'Quiz Review'}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            <div className="text-center min-w-[120px]">
                                <div className="text-3xl font-bold text-primary mb-2">{quizQuestions.length}</div>
                                <div className="text-xs text-txtmuted uppercase tracking-wide">Questions</div>
                            </div>
                            <div className="text-center min-w-[120px]">
                                <div className="text-3xl font-bold text-success mb-2">
                                    {currentQuiz?.score}/{quizQuestions.length}
                                </div>
                                <div className="text-xs text-txtmuted uppercase tracking-wide">Your Score</div>
                            </div>
                            <div className="text-center min-w-[120px]">
                                <div className="text-3xl font-bold text-accent mb-2">{currentQuiz?.percentage}%</div>
                                <div className="text-xs text-txtmuted uppercase tracking-wide">Accuracy</div>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-6 p-4 bg-accent/20 border border-accent/50 rounded-xl text-accent-content text-sm">
                                ⚠️ {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Questions Review */}
                <div className="grid gap-6">
                    {quizQuestions.map((question, qIdx) => {
                        const userAnswer = userAnswers.find(a => a.questionIndex === qIdx);
                        const correctIdx = question.options.indexOf(question.correctAnswer);
                        const isCorrect = userAnswer?.isCorrect || (userAnswer?.selectedAnswer === question.correctAnswer);

                        return (
                            <div key={qIdx} className={`bg-bgcard border border-line rounded-xl p-8 hover:shadow-lg transition-all group ${isCorrect ? 'border-success/50 bg-success/5' : 'border-error/50 bg-error/5'
                                }`}>
                                {/* Question Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl font-bold text-2xl flex items-center justify-center shadow-lg ${isCorrect
                                        ? 'bg-success text-success-content'
                                        : 'bg-error text-error-content'
                                        }`}>
                                        Q{qIdx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-txt leading-relaxed mb-2">
                                            {question.question}
                                        </h3>
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="grid gap-3 mb-6">
                                    {question.options.map((option, optIdx) => {
                                        const isUserSelected = userAnswer?.selectedAnswer === option;
                                        const isCorrectAnswer = optIdx === correctIdx;
                                        let status = '';

                                        if (isUserSelected && isCorrectAnswer) {
                                            status = '✅ YOURS ✓ CORRECT';
                                        } else if (isUserSelected && !isCorrectAnswer) {
                                            status = '❌ YOURS ✗ WRONG';
                                        } else if (!isUserSelected && isCorrectAnswer) {
                                            status = '✅ CORRECT ANSWER';
                                        }

                                        return (
                                            <div key={optIdx} className={`p-4 rounded-xl border-2 flex items-center gap-4 group transition-all ${isUserSelected && isCorrectAnswer
                                                ? 'bg-success/20 border-success shadow-success/20 shadow-lg'
                                                : isUserSelected && !isCorrectAnswer
                                                    ? 'bg-error/20 border-error shadow-error/20 shadow-lg'
                                                    : isCorrectAnswer
                                                        ? 'bg-success/10 border-success/50 hover:bg-success/20'
                                                        : 'border-line hover:border-primary/50 hover:bg-primary/5'
                                                }`}>
                                                <span className="w-10 h-10 rounded-xl bg-card text-txt font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    {String.fromCharCode(65 + optIdx)}
                                                </span>
                                                <span className={`flex-1 font-medium ${isUserSelected ? 'font-bold' : ''}`}>
                                                    {option}
                                                </span>
                                                {status && (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCorrectAnswer ? 'bg-success text-success-content' : 'bg-error text-error-content'
                                                        }`}>
                                                        {status}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Explanation */}
                                {question.explanation && (
                                    <div className="p-6 bg-primary/10 border-l-8 border-primary rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl mt-1">💡</div>
                                            <div>
                                                <div className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                                                    Explanation
                                                </div>
                                                <p className="text-primary-content/90 leading-relaxed">{question.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Back Button */}
                <div className="text-center mt-20">
                    <button
                        onClick={() => navigate('/my-quizzes')}
                        className="px-12 py-5 bg-primary text-bgcard text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                    >
                        ← Back to My Quizzes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizReviewPage;
