import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';

const Quiz = () => {
  const { generatedQuiz, fileUrl, quizId } = useContext(QuizContext);
  const { token } = useAuth();
  const questions = generatedQuiz || [];
  
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset quiz when new questions loaded
  useEffect(() => {
    if (Array.isArray(generatedQuiz) && generatedQuiz.length > 0) {
      setAnswers(Array(generatedQuiz.length).fill(null));
      setCurrent(0);
      setSubmitted(false);
      setScore(0);
      setError('');
    }
  }, [generatedQuiz]);

  const handleChoose = (idx) => {
    if (submitted) return;
    setAnswers(prev => prev.map((v, i) => (i === current ? idx : v)));
  };

  const submitQuiz = async () => {
    if (!token || !questions.length || !quizId) {
      setError('Quiz not ready. Please generate first.');
      return;
    }

    setLoading(true);
    setSubmitted(true);
    setError('');

    try {
      const formattedAnswers = answers.map((ans, idx) => ({
        questionIndex: idx,
        selectedAnswer: ans !== null ? questions[idx].options[ans] : null
      }));

      const response = await axios.post(
        'http://localhost:5000/api/quizzes/submit',
        {
          quizId,
          answers: formattedAnswers
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Calculate score correctly
      const correctIndexes = questions.map(q => q.options.indexOf(q.correctAnswer));
      const userScore = answers.filter((ans, i) => ans === correctIndexes[i]).filter(Boolean).length;
      
      setScore(userScore);
      
      console.log('✅ Quiz submitted:', response.data);
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      setError(err.response?.data?.message || 'Failed to submit quiz');
      setSubmitted(false); // Allow retry
    } finally {
      setLoading(false);
    }
  };

  const prevQ = () => setCurrent(c => Math.max(0, c - 1));
  const nextQ = () => setCurrent(c => Math.min(questions.length - 1, c + 1));

  const getProgress = () => {
    const answered = answers.filter(Boolean).length;
    return `${answered}/${questions.length} answered`;
  };

  const getOptionClass = (idx) => {
    if (!submitted) {
      return answers[current] === idx ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100";
    }
    
    const correctIdx = questions[current]?.options.indexOf(questions[current]?.correctAnswer);
    if (idx === correctIdx) return "bg-green-500 text-white";
    if (answers[current] === idx && idx !== correctIdx) return "bg-red-500 text-white";
    return "bg-white";
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-500 mb-4">📄</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Quiz Loaded</h3>
        <p className="text-gray-500">Upload a file first to generate questions</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">{getProgress()}</div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800">
            Question {current + 1} of {questions.length}
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
      {!submitted && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-blue-500">
            <div className="text-lg font-semibold text-gray-800 leading-relaxed">
              {questions[current].question}
            </div>
            {questions[current].explanation && (
              <div className="mt-2 text-xs text-gray-500 italic">
                Hint: {questions[current].explanation}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
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
                <span>{choice}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={prevQ}
              disabled={current === 0}
              className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
            >
              Previous
            </button>
            
            <div className="flex-1 text-center text-sm text-gray-600">
              {current + 1 === questions.length ? "Review all answers" : "Answer to continue"}
            </div>
            
            {current < questions.length - 1 ? (
              <button
                onClick={nextQ}
                disabled={answers[current] == null}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={answers[current] == null || loading}
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : `Submit Quiz (${getProgress()})`}
              </button>
            )}
          </div>
        </>
      )}

      {/* Results */}
      {submitted && (
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl shadow-2xl border">
            <div className="w-20 h-20 rounded-2xl bg-green-500 flex flex-col items-center justify-center text-white shadow-lg">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm">{questions.length}</div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
              <p className="text-4xl font-black text-green-500 mb-4">
                {Math.round((score / questions.length) * 100)}%
              </p>
              <p className="text-gray-600">
                You got <span className="font-semibold text-green-600">{score}</span> out of{' '}
                <span className="font-semibold">{questions.length}</span> correct
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Review your answers:</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const correctIdx = q.options.indexOf(q.correctAnswer);
                const isCorrect = userAns === correctIdx;
                return (
                  <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="font-medium mb-1">Q{idx + 1}: {q.question}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Your answer: <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {userAns !== null ? q.options[userAns] : 'Not answered'}
                      </span>
                      {` | Correct: ${q.correctAnswer}`}
                    </div>
                    {q.explanation && (
                      <div className="text-xs bg-blue-50 p-2 rounded text-blue-800">
                        💡 {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrent(0);
            }}
            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600"
          >
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
