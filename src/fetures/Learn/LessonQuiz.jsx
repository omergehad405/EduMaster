import React, { useState } from 'react';

function LessonQuiz({ lessonId, questions, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSelect = (qIndex, option) => {
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
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

  return (
    <div className="bg-gray-800 p-6 rounded-md mb-5">
      <h2 className="text-2xl font-semibold mb-4 text-white">Quiz</h2>
      {questions.map((q, idx) => (
        <div key={idx} className="mb-4">
          <p className="text-white mb-2">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(idx, opt)}
                className={`px-4 py-2 rounded text-left ${answers[idx] === opt ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-200'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white py-2 px-5 rounded"
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="mt-4 text-white">
          <p>You answered {correctCount} out of {questions.length} questions correctly.</p>
          {correctCount === questions.length ? (
            <p className="text-green-400 font-semibold mt-2">Congratulations! Next lesson is now unlocked ✔</p>
          ) : (
            <p className="text-red-400 font-semibold mt-2">You need to answer all correctly to unlock next lesson.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LessonQuiz;
