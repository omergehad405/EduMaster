import React, { useState, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';

const QuizGenerator = () => {
    const { setGeneratedQuiz, setQuizId, sourceFile, fileName } = useContext(QuizContext);
    const { token } = useAuth();

    const [type, setType] = useState('mcq');
    const [time, setTime] = useState(30);
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!sourceFile) {
            setError('Please upload a file first using the sidebar');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('file', sourceFile);
        formData.append('type', type);
        formData.append('time', time);
        formData.append('count', count);

        try {
            const response = await axios.post(
                `${API_URL}/api/quizzes/generate`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update QuizContext (your existing states)
            setGeneratedQuiz(response.data.questions);
            setQuizId(response.data.quizId);

            setSuccess(true);
            setError('');

            // Visual feedback
            setTimeout(() => {
                alert(`✅ Success! ${response.data.questions.length} ${type.toUpperCase()} questions generated!\n\nGo to "Take Quiz" tab to start!`);
            }, 500);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate quiz. Try again.');
            console.error('Quiz generation failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-8 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl shadow-2xl border-4 border-white shadow-emerald-100">
            <div className="text-center mb-8">
                <div className="text-4xl mb-3">🎯</div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Quiz Generator
                </h2>
                <p className="text-gray-600 mt-2">Create quizzes from your uploaded document</p>
            </div>

            {/* File Status */}
            {!sourceFile ? (
                <div className="p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-center">
                    <div className="text-2xl mb-3">📤</div>
                    <p className="text-lg font-semibold text-yellow-800 mb-2">
                        No file uploaded
                    </p>
                    <p className="text-yellow-700">
                        Upload a PDF using the sidebar first
                    </p>
                </div>
            ) : (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl mb-6 text-center">
                    <div className="text-xl mb-2">✅ Ready!</div>
                    <p className="font-semibold text-green-800">{fileName || 'Document'}</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-xl mb-6">
                    <p className="text-red-700 font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl mb-6 text-center">
                    <div className="text-2xl mb-3">✨ Quiz Generated!</div>
                    <p className="text-emerald-800 font-bold text-lg mb-4">
                        {count} {type.toUpperCase()} questions ready
                    </p>
                    <p className="text-emerald-700">
                        Switch to <strong>"Take Quiz"</strong> tab now!
                    </p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleGenerate} className="space-y-6" disabled={loading || !sourceFile}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quiz Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            📋 Question Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={loading}
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:opacity-50"
                        >
                            <option value="mcq">Multiple Choice (4 options)</option>
                            <option value="tf">True/False (2 options)</option>
                            <option value="mixed">Mixed MCQ + T/F</option>
                        </select>
                    </div>

                    {/* Number of Questions */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            🔢 Questions (1-20)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value))))}
                            disabled={loading}
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Time Limit */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        ⏱️ Time Limit (minutes)
                    </label>
                    <input
                        type="number"
                        min="5"
                        max="60"
                        value={time}
                        onChange={(e) => setTime(Math.max(5, Math.min(60, parseInt(e.target.value))))}
                        disabled={loading}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:opacity-50"
                    />
                </div>

                {/* Generate Button */}
                <button
                    type="submit"
                    disabled={loading || !sourceFile}
                    className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-blue-600 text-white p-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="animate-spin inline-block mr-3">⚡</span>
                            Generating {count} {type.toUpperCase()} Questions...
                        </>
                    ) : (
                        `✨ Generate ${count} ${type.toUpperCase()} Questions`
                    )}
                </button>
            </form>
        </div>
    );
};

export default QuizGenerator;
