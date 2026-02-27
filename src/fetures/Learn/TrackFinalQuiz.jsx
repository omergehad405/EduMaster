import React, { useEffect, useMemo, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function TrackFinalQuiz({ track, lessons = [], canShow }) {
  const { token, setUser } = useContext(AuthContext);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Build the quiz: prefer explicit track finalQuiz, otherwise collect all lesson quizzes
  const questions = useMemo(() => {
    if (Array.isArray(track?.finalQuiz) && track.finalQuiz.length > 0) {
      return track.finalQuiz;
    }
    const all = [];
    lessons.forEach((lesson) => {
      if (Array.isArray(lesson.quiz) && lesson.quiz.length > 0) {
        lesson.quiz.forEach((q) => all.push(q));
      }
    });
    return all;
  }, [track, lessons]);

  // Reset state when switching track or quiz changes
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  }, [track?._id, questions.length]);

  if (!canShow || !questions.length) return null;

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = async () => {
    if (submitted || loading) return;

    // Check if all questions answered
    if (Object.keys(answers).length !== questions.length) {
      toast.info('Please answer all questions before submitting.');
      return;
    }

    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    setCorrectCount(correct);
    setSubmitted(true);

    // Require all correct to mark track completed
    if (correct === questions.length && token) {
      try {
        setLoading(true);
        const res = await axios.post(
          'http://localhost:5000/api/users/complete-final-quiz',
          {
            trackId: String(track._id),
            answers, // send answers to backend
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data?.completedTracks && res.data?.progress && setUser) {
          setUser((prev) =>
            prev
              ? {
                ...prev,
                completedTracks: res.data.completedTracks,
                progress: res.data.progress,
              }
              : prev
          );
        }

        toast.success('🎉 Congratulations! Track marked as completed.', {
          autoClose: 3000,
        });
      } catch (err) {
        console.error('Final quiz API error:', err?.response?.data || err.message);
        toast.error('Error while marking track as completed.');
      } finally {
        setLoading(false);
      }
    } else if (correct < questions.length) {
      toast.info('Some answers are incorrect. Review and try again.');
    }
  };

  const handleRetry = () => {
    if (loading) return;
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  };

  return (
    <div className="mt-10 w-full bg-gray-900/90 border border-indigo-500/40 rounded-2xl shadow-xl">
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Final Track Quiz</h2>
          <p className="text-xs text-gray-300">
            Test your knowledge on all lessons in this track.
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
          Track quiz
        </span>
      </div>

      <div className="px-6 py-4">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx] !== undefined;
          return (
            <div key={idx} className="mb-4">
              <p className="text-sm font-medium text-gray-100 mb-2">
                Q{idx + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => {
                  const isSelected = answers[idx] === opt;
                  const isCorrect = opt === q.answer;
                  const showResult = submitted;

                  let baseClasses = 'w-full text-left text-sm px-3 py-2 rounded-md border transition-colors';
                  let stateClasses = 'bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700';

                  if (showResult) {
                    if (isCorrect) stateClasses = 'bg-green-900/40 border-green-500 text-green-200';
                    else if (isSelected && !isCorrect) stateClasses = 'bg-red-900/40 border-red-500 text-red-200';
                    else stateClasses = 'bg-gray-800/60 border-gray-700 text-gray-400';
                  } else if (isSelected) {
                    stateClasses = 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500';
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={submitted || loading}
                      onClick={() => handleSelect(idx, opt)}
                      className={`${baseClasses} ${stateClasses} ${submitted || loading ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {!isAnswered && submitted && (
                <p className="mt-1 text-xs text-red-300">
                  You did not answer this question.
                </p>
              )}
            </div>
          );
        })}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-2 px-5 rounded-md transition-colors disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit final quiz'}
            </button>
          ) : (
            <>
              <p className="text-xs text-gray-200">
                You answered <span className="font-semibold">{correctCount}</span> out of <span className="font-semibold">{questions.length}</span> questions correctly.
              </p>
              {correctCount === questions.length ? (
                <p className="text-xs text-green-400 font-semibold">Excellent! Track marked as completed.</p>
              ) : (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="text-xs px-3 py-1.5 rounded-md bg-gray-800 border border-gray-600 text-gray-100 hover:bg-gray-700 transition-colors"
                >
                  Try final quiz again
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackFinalQuiz;