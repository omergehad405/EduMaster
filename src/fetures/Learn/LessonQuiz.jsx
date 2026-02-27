import React, { useEffect, useState } from 'react';

function LessonQuiz({ lessonId, questions, onComplete, completed = false }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Reset quiz state when lesson changes (or when reopened for a new user)
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  }, [lessonId]);

  const handleSelect = (qIndex, option) => {
    if (completed) return;
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (completed || submitted) return;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    setCorrectCount(correct);
    setSubmitted(true);
    if (correct === questions.length) {
      onComplete(); // unlock lesson
    }
  };

  const handleRetry = () => {
    if (completed) return;
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
  };

  return (
    <div
      className={`w-full bg-gray-900/80 backdrop-blur-sm border rounded-xl mb-8 shadow-lg ${completed ? 'border-green-500' : 'border-gray-700'
        }`}
    >
      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Lesson Quiz
        </h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${completed
              ? 'bg-green-500/10 text-green-400 border border-green-500/40'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/40'
            }`}
        >
          {completed ? 'Completed' : 'In progress'}
        </span>
      </div>

      <div className="px-5 py-4">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <p className="text-sm font-medium text-gray-100 mb-2">
              Q{idx + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[idx] === opt;
                const isCorrect = opt === q.answer;
                const showResult = submitted || completed;

                let baseClasses =
                  'w-full text-left text-sm px-3 py-2 rounded-md border transition-colors';
                let stateClasses = 'bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700';

                if (showResult) {
                  if (isCorrect) {
                    stateClasses =
                      'bg-green-900/40 border-green-500 text-green-200';
                  } else if (isSelected && !isCorrect) {
                    stateClasses =
                      'bg-red-900/40 border-red-500 text-red-200';
                  } else {
                    stateClasses =
                      'bg-gray-800/60 border-gray-700 text-gray-400';
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
                    className={`${baseClasses} ${stateClasses} ${completed || submitted ? 'cursor-default' : 'cursor-pointer'
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
            className="mt-2 w-full bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2 rounded-md transition-colors"
          >
            Submit quiz
          </button>
        )}

        {(submitted || completed) && (
          <div className="mt-3 text-xs text-gray-200 space-y-2">
            <p>
              You answered <span className="font-semibold">{correctCount}</span> out of{' '}
              <span className="font-semibold">{questions.length}</span> questions correctly.
            </p>
            {correctCount === questions.length ? (
              <p className="text-green-400 font-semibold">
                All answers are correct. Next lesson is unlocked ✔
              </p>
            ) : (
              <>
                <p className="text-red-400 font-semibold">
                  Correct answers are highlighted in green. Review them and try again.
                </p>
                {!completed && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 border border-gray-600 text-gray-100 text-xs font-medium hover:bg-gray-700 transition-colors"
                  >
                    Try again
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
