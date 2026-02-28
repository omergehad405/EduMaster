import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const QuizReviewPage = () => {
    const { quizId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedAttempt, setSelectedAttempt] = useState(0);

    // Fetch quiz details + attempts
    useEffect(() => {
        const fetchQuizData = async () => {
            if (!token || !quizId) return;

            setLoading(true);
            try {
                // Get quiz details
                const quizRes = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Get attempts for this quiz
                const attemptsRes = await axios.get(`http://localhost:5000/api/quizzes/${quizId}/attempts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setQuiz(quizRes.data.data);
                setAttempts(attemptsRes.data.data || []);
                setSelectedAttempt(attemptsRes.data.data.length - 1); // Latest attempt
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load quiz');
                console.error('Quiz review error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [quizId, token]);

    const getAttemptScore = (attempt) => {
        const correct = attempt.answers.filter(ans => ans.isCorrect).length;
        return `${correct}/${attempt.total}`;
    };

    const getPercentage = (attempt) => {
        return Math.round((attempt.score / attempt.total) * 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading quiz review...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/my-quizzes')}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                    >
                        Back to My Quizzes
                    </button>
                </div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Quiz not found</h2>
                    <button
                        onClick={() => navigate('/my-quizzes')}
                        className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
                    >
                        Go to My Quizzes
                    </button>
                </div>
            </div>
        );
    }

    const currentAttempt = attempts[selectedAttempt];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <button
                        onClick={() => navigate('/my-quizzes')}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
                    >
                        ← Back to My Quizzes
                    </button>
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            {quiz.fileName}
                        </h1>
                        <p className="text-gray-600 text-lg">Review your performance</p>
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 bg-blue-50 rounded-2xl">
                                <div className="text-3xl font-bold text-blue-600">{quiz.questions.length}</div>
                                <div className="text-sm text-gray-600">Questions</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-2xl">
                                <div className="text-3xl font-bold text-green-600">
                                    {attempts.length > 0 ? `${attempts[0].score}/${attempts[0].total}` : '0'}
                                </div>
                                <div className="text-sm text-gray-600">Best Score</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-2xl">
                                <div className="text-3xl font-bold text-purple-600">{attempts.length}</div>
                                <div className="text-sm text-gray-600">Attempts</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attempts Selector */}
                {attempts.length > 1 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4">Select Attempt to Review:</h3>
                        <div className="flex flex-wrap gap-3">
                            {attempts.map((attempt, idx) => (
                                <button
                                    key={attempt._id}
                                    onClick={() => setSelectedAttempt(idx)}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedAttempt === idx
                                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    Attempt {idx + 1} - {getAttemptScore(attempt)} ({getPercentage(attempt)}%)
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Attempt Review */}
                {currentAttempt ? (
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Attempt {selectedAttempt + 1} Review
                            </h2>
                            <div className="text-right">
                                <div className="text-4xl font-black text-green-500">{currentAttempt.score}</div>
                                <div className="text-lg text-gray-600">{currentAttempt.total} questions</div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {getPercentage(currentAttempt)}%
                                </div>
                            </div>
                        </div>

                        {/* Questions Review */}
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                            {quiz.questions.map((question, qIdx) => {
                                const userAnswer = currentAttempt.answers.find(a => a.questionIndex === qIdx);
                                const correctIdx = question.options.indexOf(question.correctAnswer);
                                const isCorrect = userAnswer?.isCorrect || false;

                                return (
                                    <div key={qIdx} className={`p-6 rounded-2xl border-4 transition-all ${isCorrect
                                        ? 'bg-green-50 border-green-200 shadow-green-100'
                                        : 'bg-red-50 border-red-200 shadow-red-100'
                                        }`}>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white font-bold text-lg flex items-center justify-center mt-1">
                                                Q{qIdx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 mb-2">{question.question}</h4>

                                                {/* Options with feedback */}
                                                <div className="space-y-2">
                                                    {question.options.map((option, optIdx) => {
                                                        const isUserSelected = userAnswer?.selectedAnswer === option;
                                                        const isCorrectAnswer = optIdx === correctIdx;
                                                        let statusClass = '';

                                                        if (isUserSelected && isCorrectAnswer) {
                                                            statusClass = 'bg-green-500 text-white';
                                                        } else if (isUserSelected && !isCorrectAnswer) {
                                                            statusClass = 'bg-red-500 text-white';
                                                        } else if (isCorrectAnswer) {
                                                            statusClass = 'bg-green-100 border-2 border-green-300';
                                                        }

                                                        return (
                                                            <div key={optIdx} className={`p-3 rounded-xl border flex items-center gap-3 ${statusClass}`}>
                                                                <span className="w-6 h-6 rounded-full border-2 font-bold flex items-center justify-center flex-shrink-0">
                                                                    {String.fromCharCode(65 + optIdx)}
                                                                </span>
                                                                <span className={`font-medium ${isUserSelected ? 'font-bold' : ''}`}>
                                                                    {option}
                                                                </span>
                                                                {isUserSelected && (
                                                                    <span className="ml-auto text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                                        Your Answer
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Explanation */}
                                                {question.explanation && (
                                                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
                                                        <p className="text-sm text-blue-900 font-medium">💡 Explanation:</p>
                                                        <p className="text-sm text-blue-800 mt-1">{question.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No attempts yet</h3>
                        <p className="text-gray-600 mb-8">Take the quiz first to see your results here!</p>
                        <button
                            onClick={() => navigate('/test')}
                            className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 shadow-lg"
                        >
                            Take Quiz Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizReviewPage;
