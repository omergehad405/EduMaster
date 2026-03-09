import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../utils/translations';

const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

const Quiz = () => {
  const { generatedQuiz, fileUrl, quizId, fileName, clearFile, setGeneratedQuiz, setQuizId } = useContext(QuizContext);
  const { token } = useAuth();
  const navigate = useNavigate();
  const questions = generatedQuiz;
  const language = useLanguage();
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
    if (!token || !questions.length || !quizId) {
      setError('Quiz not ready.');
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

      // ✅ SEND QUESTIONS + FILENAME FOR BACKEND SCORING/SAVING
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

      // ✅ SAVE TO LOCALSTORAGE FOR REVIEW FALLBACK
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

  const handleNewQuiz = () => {
    clearFile();
    setGeneratedQuiz([]);
    setQuizId(null);
    navigate('/quiz-generator'); // Or your quiz generator route
  };

  const prevQ = () => setCurrent(c => Math.max(0, c - 1));
  const nextQ = () => setCurrent(c => Math.min(questions.length - 1, c + 1));

  const getProgress = () => {
    const answered = answers.filter(Boolean).length;
    return `${answered}/${questions.length}`;
  };

  const getOptionClass = (idx) => {
    if (!submitted) {
      return answers[current] === idx ? 'bg-blue-500 text-white border-blue-500' : 'bg-white hover:bg-gray-100';
    }

    const correctIdx = questions[current]?.options.indexOf(questions[current]?.correctAnswer);
    if (idx === correctIdx) {
      return 'bg-green-500 text-white';
    }
    if (answers[current] === idx && idx !== correctIdx) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white';
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" dir={dir}>
        <div className="text-gray-500 mb-4">📄</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.quizNoQuizLoaded || 'No Quiz Loaded'}</h3>
        <p className="text-gray-500">{t.quizUploadFileFirst || 'Upload a file first to generate questions'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-5 w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl" dir={dir}>
      {/* Header */}
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">{getProgress()}</div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-gray-800">
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
      {!submitted ? (
        <div className="bg-gray-50 p-6 rounded-2xl border-2">
          <div className="text-lg font-semibold text-gray-800 leading-relaxed">
            {questions[current].question}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl shadow-2xl border">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h3>
          <p className="text-4xl font-black text-green-600 mb-6">{score}/{questions.length}</p>
        </div>
      )}

      {/* Options */}
      <div className="space-y-2" dir={dir}>
        {questions[current].options.map((choice, idx) => (
          <button
            key={idx}
            className={`w-full p-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md ${getOptionClass(idx)}`}
            onClick={() => handleChoose(idx)}
            disabled={submitted}
          >
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-left">{choice}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      {!submitted ? (
        <div className="flex justify-between items-center pt-4 border-t" dir={dir}>
          <button
            onClick={prevQ}
            disabled={current === 0}
            className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            {t.quizPrevious || 'Previous'}
          </button>

          <div className="flex-1 text-center text-sm text-gray-500">
            {current + 1 < questions.length ? t.quizAnswerToContinue || 'Answer to continue' : t.quizReviewAll || 'Review all answers'}
          </div>

          {current < questions.length - 1 ? (
            <button
              onClick={nextQ}
              disabled={answers[current] === null}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-600"
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
      ) : (
        /* Results */
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl shadow-2xl border">
            <div className="w-20 h-20 rounded-2xl bg-green-500 flex flex-col items-center justify-center text-white shadow-lg">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">{questions.length}</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.quizCompleted || 'Quiz Completed!'}</h3>
          <p className="text-4xl font-black text-green-500 mb-4">
            {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600">
            {t.quizYouGot || 'You got'} <span className="font-semibold text-green-600">{score}</span>{' '}
            {t.quizOutOf || 'out of'} <span className="font-semibold">{questions.length}</span>{' '}
            {t.quizCorrect || 'correct'}
          </p>

          {saved && (
            <div className="mt-2 p-2 bg-emerald-100 text-emerald-800 text-sm rounded-full font-semibold">
              {t.quizSaved || 'Quiz saved to My Quizzes!'}
            </div>
          )}

          {/* Review Answers */}
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
            <h4 className="text-lg font-semibold mb-4">{t.quizReviewAnswers || 'Review your answers'}</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const correctIdx = q.options.indexOf(q.correctAnswer);
                const isCorrect = userAns === correctIdx;
                return (
                  <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="font-medium mb-1">
                      Q{idx + 1}: {q.question}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {t.quizYourAnswer || 'Your answer'}: <span className={isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                        {userAns !== null ? q.options[userAns] : t.quizNotAnswered || 'Not answered'}
                      </span>
                    </div>
                    <div className="text-sm">
                      {t.quizCorrectAnswer || 'Correct'}: <strong>{q.correctAnswer}</strong>
                    </div>
                    {q.explanation && (
                      <div className="text-xs bg-blue-50 p-2 rounded mt-2 text-blue-800">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* NEW BUTTONS */}
          <div className="flex gap-4 mt-8" dir={dir}>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrent(0);
                setSaved(false);
              }}
              className="flex-1 px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600"
            >
              {t.quizTakeAgain || 'Take Quiz Again'}
            </button>
            <button
              onClick={handleNewQuiz}
              className="flex-1 px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600"
            >
              {t.quizNewQuiz || 'New Quiz'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
