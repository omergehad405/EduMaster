import React, { useEffect, useState } from 'react';

function getRandomQuestions(questions, num = 4) {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num);
}

function LessonQuiz({ lessonId, questions, onComplete, onNext, completed = false, t }) {
  const numQuestions = Math.min(4, questions.length);

  const [selectedQuestions, setSelectedQuestions] = useState(() =>
    getRandomQuestions(questions, numQuestions)
  );
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  // `passed` is ONLY reset when the lessonId changes, not when questions refresh
  const [passed, setPassed] = useState(false);

  // Full reset only when the lesson changes
  useEffect(() => {
    setSelectedQuestions(getRandomQuestions(questions, numQuestions));
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
    setPassed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  // When questions refresh (e.g. after fetchTrackById), resample ONLY if not already passed
  useEffect(() => {
    if (!passed && !completed) {
      setSelectedQuestions(getRandomQuestions(questions, numQuestions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const handleSelect = (qIndex, option) => {
    if (completed || submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (completed || submitted) return;
    let correct = 0;
    selectedQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    setCorrectCount(correct);
    setSubmitted(true);
    if (correct === selectedQuestions.length) {
      setPassed(true);
      onComplete();
    }
  };

  const handleRetry = () => {
    if (completed) return;
    setSelectedQuestions(getRandomQuestions(questions, numQuestions));
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  };

  const allAnswered =
    Object.keys(answers).length === selectedQuestions.length &&
    selectedQuestions.length > 0;

  // The quiz is "done successfully" if it was just passed OR already completed
  const isSuccess = passed || completed;

  return (
    <div className="w-full bg-(--main-color) rounded-xl mb-8 shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-(--bg-color) flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--text-color)">
          {t.lessonQuizTitle || 'Lesson Quiz'}
        </h2>
        <span className="text-xs px-2 py-1 rounded-full bg-(--bg-color) text-(--p-color) border border-(--p-color)">
          {isSuccess
            ? t.quizCompleted || 'Completed'
            : t.lessonQuizInProgress || 'In progress'}
        </span>
      </div>

      <div className="px-5 py-4">
        {/* Questions */}
        {selectedQuestions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <p className="text-sm font-medium text-(--text-color) mb-2">
              Q{idx + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[idx] === opt;
                const isCorrect = opt === q.answer;
                const showResult = submitted || completed;

                let baseClasses =
                  'w-full text-left text-sm px-3 py-2 rounded-md border transition-colors';
                let stateClasses =
                  'bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700';

                if (showResult) {
                  if (isCorrect) {
                    stateClasses = 'bg-green-700 border-green-500 text-green-200';
                  } else if (isSelected && !isCorrect) {
                    stateClasses = 'bg-red-700 border-red-500 text-red-200';
                  } else {
                    stateClasses = 'bg-(--bg-color) border-gray-700 text-gray-400';
                  }
                } else if (isSelected) {
                  stateClasses =
                    'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500';
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isSuccess || submitted}
                    onClick={() => handleSelect(idx, opt)}
                    className={`${baseClasses} ${stateClasses} ${
                      isSuccess || submitted ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── Bottom action area ── */}
        {/* 1. Quiz passed → persistent "Next Lesson" button */}
        {isSuccess && onNext && (
          <button
            type="button"
            onClick={onNext}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            {t.lessonPageNextLesson || 'Next Lesson'} →
          </button>
        )}

        {/* 2. Not yet submitted → Submit button */}
        {!submitted && !isSuccess && (
          <button
            onClick={handleSubmit}
            className={`mt-2 w-full bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2 rounded-md transition-colors ${
              !allAnswered ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            disabled={!allAnswered}
          >
            {t.lessonQuizSubmit || 'Submit quiz'}
          </button>
        )}

        {/* ── Results feedback ── */}
        {(submitted || completed) && (
          <div className="mt-3 text-xs text-gray-200 space-y-2">
            <p>
              {t.lessonQuizAnswered || 'You answered'}{' '}
              <span className="font-semibold">{correctCount}</span>{' '}
              {t.lessonQuizOutOf || 'out of'}{' '}
              <span className="font-semibold">{selectedQuestions.length}</span>{' '}
              {t.lessonQuizCorrectly || 'questions correctly.'}
            </p>
            {isSuccess ? (
              <p className="text-green-400 font-semibold">
                {t.lessonQuizAllCorrect ||
                  'All answers are correct. Next lesson is unlocked ✔'}
              </p>
            ) : (
              <>
                <p className="text-red-400 font-semibold">
                  {t.lessonQuizReviewTryAgain ||
                    'Correct answers are highlighted in green. Review them and try again.'}
                </p>
                {!completed && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 border border-gray-600 text-gray-100 text-xs font-medium hover:bg-gray-700 transition-colors"
                  >
                    {t.lessonQuizTryAgain || 'Try again'}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonQuiz;
