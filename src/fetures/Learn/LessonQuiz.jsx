import React, { useEffect, useState } from 'react';

function getRandomQuestions(questions, num = 4) {
  const arr = [...questions];
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num);
}

function LessonQuiz({ lessonId, questions, onComplete, completed = false, t }) {
  const numQuestions = Math.min(4, questions.length);
  const [selectedQuestions, setSelectedQuestions] = useState(() =>
    getRandomQuestions(questions, numQuestions)
  );
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // When lesson changes, select new questions and reset state
  useEffect(() => {
    setSelectedQuestions(getRandomQuestions(questions, numQuestions));
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  }, [lessonId, questions]);

  const handleSelect = (qIndex, option) => {
    if (completed) return;
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
      onComplete(); // unlock lesson
    }
  };

  const handleRetry = () => {
    if (completed) return;
    setSelectedQuestions(getRandomQuestions(questions, numQuestions));
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  };

  // Determine if all questions have an answer
  const allAnswered = Object.keys(answers).length === selectedQuestions.length && selectedQuestions.length > 0;

  return (
    <div
      className={`w-full bg-(--main-color) rounded-xl mb-8 shadow-lg`}
    >
      <div className="px-5 py-4 border-b bg-(--bg-color) flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--text-color)">
          {t.lessonQuizTitle || 'Lesson Quiz'}
        </h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${completed
            ? 'bg-(--bg-color) text-(--p-color) border border-(--p-color)'
            : 'bg-(--bg-color) text-(--p-color) border border-(--p-color)'
            }`}
        >
          {completed
            ? t.quizCompleted || 'Completed'
            : t.lessonQuizInProgress || 'In progress'}
        </span>
      </div>

      <div className="px-5 py-4">
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
                    stateClasses =
                      'bg-green-700 border-green-500 text-green-200';
                  } else if (isSelected && !isCorrect) {
                    stateClasses =
                      'bg-red-700 border-red-500 text-red-200';
                  } else {
                    stateClasses =
                      'bg-(--bg-color) border-gray-700 text-gray-400';
                  }
                } else if (isSelected) {
                  stateClasses =
                    'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500';
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={completed || submitted}
                    onClick={() => handleSelect(idx, opt)}
                    className={`${baseClasses} ${stateClasses} ${completed || submitted
                      ? 'cursor-default'
                      : 'cursor-pointer'
                      }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted && !completed && (
          <button
            onClick={handleSubmit}
            className={`mt-2 w-full bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2 rounded-md transition-colors ${!allAnswered ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!allAnswered}
          >
            {t.lessonQuizSubmit || 'Submit quiz'}
          </button>
        )}

        {(submitted || completed) && (
          <div className="mt-3 text-xs text-gray-200 space-y-2">
            <p>
              {t.lessonQuizAnswered || 'You answered'}{' '}
              <span className="font-semibold">{correctCount}</span>{' '}
              {t.lessonQuizOutOf || 'out of'}{' '}
              <span className="font-semibold">{selectedQuestions.length}</span>{' '}
              {t.lessonQuizCorrectly || 'questions correctly.'}
            </p>
            {correctCount === selectedQuestions.length ? (
              <p className="text-green-400 font-semibold">
                {t.lessonQuizAllCorrect ||
                  'All answers are correct. Next lesson is unlocked \u2714'}
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
