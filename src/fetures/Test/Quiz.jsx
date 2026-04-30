import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../utils/translations';

const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

const Quiz = () => {
  const {
    generatedQuiz,
    fileUrl,
    quizId,
    fileName,
    sourceFile,
    clearFile,
    setGeneratedQuiz,
    setQuizId
  } = useContext(QuizContext);
  const { token } = useAuth();
  const navigate = useNavigate();
  const questions = generatedQuiz;
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // State
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  // ✅ NEW: Separate loading states for different actions
  const [regenerating, setRegenerating] = useState(false);
  const [newQuizLoading, setNewQuizLoading] = useState(false);

  // Reset quiz when new questions loaded
  useEffect(() => {
    if (Array.isArray(generatedQuiz) && generatedQuiz.length > 0) {
      setAnswers(Array(generatedQuiz.length).fill(null));
      setCurrent(0);
      setSubmitted(false);
      setScore(0);
      setError('');
      setSaved(false);
    }
  }, [generatedQuiz]);

  const handleChoose = (idx) => {
    if (submitted) return;
    setAnswers(prev => prev.map((v, i) => i === current ? idx : v));
  };

  const submitQuiz = async () => {
    console.log('🚀 SUBMITTING QUIZ:', {
      hasToken: !!token,
      questionsCount: questions?.length,
      quizId: quizId,
      fileName
    });

    if (!token || !questions || questions.length === 0 || !quizId) {
      setError(`Quiz not ready: ${!token ? 'No token' : !quizId ? 'No quizId' : 'No questions'}`);
      return;
    }

    setLoading(true);
    setSubmitted(true);
    setError('');
    setSaved(false);

    try {
      // Format answers for backend
      const formattedAnswers = answers.map((ans, idx) => ({
        questionIndex: idx,
        selectedAnswer: ans !== null ? questions[idx].options[ans] : null
      }));

      const response = await axios.post(`${API_URL}/api/quizzes/submit`, {
        quizId,
        answers: formattedAnswers,
        questions,
        fileName: fileName || 'Document Quiz'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setScore(response.data.score);
      setSaved(true);

      // SAVE TO LOCALSTORAGE FOR REVIEW FALLBACK
      try {
        localStorage.setItem(`quiz_${quizId}`, JSON.stringify({
          fileName: fileName || 'Document Quiz',
          score: response.data.score,
          totalQuestions: questions.length,
          questions,
          answers: formattedAnswers.map((ans, idx) => ({
            questionIndex: ans.questionIndex,
            selectedAnswer: ans.selectedAnswer,
            isCorrect: questions[idx].options.indexOf(questions[idx].correctAnswer) === answers[idx]
          }))
        }));
      } catch (e) {
        console.log('LocalStorage save failed');
      }

      console.log('✅ Quiz submitted & SAVED:', response.data);
    } catch (err) {
      console.error('❌ Submit failed:', err);

      // Fallback local scoring
      const correctIndexes = questions.map(q => q.options.indexOf(q.correctAnswer));
      const userScore = answers.filter((ans, i) => ans === correctIndexes[i]).filter(Boolean).length;
      setScore(userScore);
      setError(err.response?.data?.message || 'Using local scoring');
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuiz = async () => {
    // ✅ LOADER FOR NEW QUIZ
    setNewQuizLoading(true);

    try {
      clearFile();
      setGeneratedQuiz([]);
      setQuizId(null);
      navigate('/test');
    } catch (error) {
      console.error('Error starting new quiz:', error);
    } finally {
      setNewQuizLoading(false);
    }
  };

  const prevQ = () => setCurrent(c => Math.max(0, c - 1));
  const nextQ = () => setCurrent(c => Math.min(questions.length - 1, c + 1));

  const getProgress = () => {
    const answered = answers.filter(Boolean).length;
    return `${answered}/${questions.length}`;
  };

  const getOptionClass = (idx) => {
    if (!submitted) {
      return answers[current] === idx ? 'bg-(--second-color) text-(--text-color) border-(--second-color)' : 'bg-(--bg-color) hover:bg-gray-800';
    }

    const correctIdx = questions[current]?.options.indexOf(questions[current]?.correctAnswer);
    if (idx === correctIdx) {
      return 'bg-green-500 text-(--text-color)';
    }
    if (answers[current] === idx && idx !== correctIdx) {
      return 'bg-red-500 text-(--text-color)';
    }
    return 'bg-(--text-color)';
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" dir={dir}>
        <div className="text-(--p-color) mb-4">📄</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.quizNoQuizLoaded || 'No Quiz Loaded'}</h3>
        <p className="text-(--p-color)">{t.quizUploadFileFirst || 'Upload a file first to generate questions'}</p>
      </div>
    );
  }

  const regenerateQuiz = async () => {
    if (!fileUrl || !token) return;

    // ✅ LOADER FOR REGENERATE
    setRegenerating(true);

    try {
      const formData = new FormData();
      formData.append("file", sourceFile);
      formData.append("type", "mcq");
      formData.append("time", 30);
      formData.append("count", questions.length);

      const res = await axios.post(`${API_URL}/api/quizzes/generate`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setGeneratedQuiz(res.data.questions);
      setQuizId(res.data.quizId);

      setAnswers(Array(res.data.questions.length).fill(null));
      setCurrent(0);
      setSubmitted(false);
      setSaved(false);

    } catch (err) {
      console.error("Failed to regenerate quiz", err);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-5 w-full max-w-2xl mx-auto bg-(--main-color) rounded-3xl shadow-2xl" dir={dir}>
      {!submitted ? (
        <>
          {/* Header */}
          <div className="text-center">
            <div className="text-sm text-(--p-color) mb-1">{getProgress()}</div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-(--text-color)">
                {t.quizQuestion || 'Question'} {current + 1} {t.quizOf || 'of'} {questions.length}
              </h2>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Question */}
          <div className="bg-(--bg-color) p-6 rounded-2xl border-2">
            <div className="text-lg font-semibold text-(--text-color) leading-relaxed">
              {questions[current].question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2 " dir={dir}>
            {questions[current].options.map((choice, idx) => (
              <button
                key={idx}
                className={`cursor-pointer w-full p-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md ${getOptionClass(idx)}`}
                onClick={() => handleChoose(idx)}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-left text-(--text-color)">{choice}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t" dir={dir}>
            <button
              onClick={prevQ}
              disabled={current === 0}
              className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:text-(--p-color) text-(--text-color) disabled:bg-gray-600 bg-(--second-color) cursor-pointer"
            >
              {t.quizPrevious || 'Previous'}
            </button>

            <div className="flex-1 text-center text-sm text-(--p-color)">
              {current + 1 < questions.length ? t.quizAnswerToContinue || 'Answer to continue' : t.quizReviewAll || 'Review all answers'}
            </div>

            {current < questions.length - 1 ? (
              <button
                onClick={nextQ}
                disabled={answers[current] === null}
                className="px-6 py-2 disabled:bg-gray-600 bg-(--second-color) text-(--text-color) rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
              >
                {t.quizNext || 'Next'}
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={answers[current] === null || loading}
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin inline-block mr-3">⏳</span>
                    {t.quizSubmitting || 'Submitting...'}
                  </>
                ) : (
                  t.quizSubmit || 'Submit Quiz'
                )}
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results & Review */
        <div className="text-center animate-fadeIn">
          {/* Review Answers */}
          <div className="p-6 bg-(--bg-color) rounded-2xl shadow-lg border-2 border-(--second-color)">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <h4 className="text-2xl font-black text-(--text-color)">
                🎯 {t.quizReviewAnswers || 'Quiz Results'}
              </h4>
              <div className="text-2xl font-black text-(--second-color)">
                {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </div>
            </div>
            
            {saved && (
              <div className="mb-6 p-2 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold inline-block px-4">
                ✅ {t.quizSaved || 'Saved to My Quizzes'}
              </div>
            )}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const correctIdx = q.options.indexOf(q.correctAnswer);
                const isCorrect = userAns === correctIdx;
                return (
                  <div key={idx} className={`p-5 rounded-2xl border-2 text-left ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="font-bold mb-2 text-black">
                      Q{idx + 1}: {q.question}
                    </div>
                    <div className="text-sm mb-2">
                      <span className="text-gray-500">{t.quizYourAnswer || 'Your answer'}:</span>{' '}
                      <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                        {userAns !== null ? q.options[userAns] : t.quizNotAnswered || 'Not answered'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-green-700 mb-2 font-semibold">
                        {t.quizCorrectAnswer || 'Correct'}: {q.correctAnswer}
                      </div>
                    )}
                    {q.explanation && (
                      <div className="text-xs bg-blue-50 p-3 rounded-xl mt-2 text-blue-800 border border-blue-100 italic">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8" dir={dir}>
            <button
              onClick={regenerateQuiz}
              disabled={regenerating}
              className="flex-1 px-6 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              {regenerating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t.quizGenerating || 'Generating...'}
                </>
              ) : (
                <>✨ {t.quizTakeAgain || 'Take Quiz Again'}</>
              )}
            </button>
            <button
              onClick={handleNewQuiz}
              disabled={newQuizLoading}
              className="flex-1 px-6 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              {newQuizLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t.quizLoading || 'Loading...'}
                </>
              ) : (
                <>📥 {t.quizNewQuiz || 'New Quiz'}</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
