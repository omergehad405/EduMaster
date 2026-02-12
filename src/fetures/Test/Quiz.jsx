import React, { useState, useEffect } from 'react';

// Demo questions pool
const QUESTION_POOL = [
  // ... same questions as before
  {
    text: 'What is the purpose of the useState hook?',
    choices: [
      'To perform side effects in components',
      'To manage local state in functional components',
      'To fetch data from APIs',
      'To memoize values'
    ],
    answer: 1,
    type: 'mcq',
    explain: 'useState provides local state management in functional components.',
  },
  {
    text: 'JSX stands for JavaScript XML.',
    choices: ['True', 'False'],
    answer: 0,
    type: 'tf',
    explain: 'JSX is a syntax extension for JavaScript, standing for JavaScript XML.',
  },
  {
    text: 'Which prop is used to pass data from parent to child in React?',
    choices: [
      'state',
      'setState',
      'props',
      'data'
    ],
    answer: 2,
    type: 'mcq',
    explain: 'props is the mechanism used to pass data to children in React.',
  },
  {
    text: 'React can only be used for web apps.',
    choices: ['True', 'False'],
    answer: 1,
    type: 'tf',
    explain: 'React Native is used to build mobile apps; React isn’t limited to web apps.',
  },
  {
    text: 'What does useEffect allow you to perform in components?',
    choices: [
      'Perform DOM mutations',
      'Run side effects',
      'Return JSX',
      'Control component state'
    ],
    answer: 1,
    type: 'mcq',
    explain: 'useEffect lets you perform side effects (like fetching, manipulating DOM, etc).',
  },
  {
    text: 'React components must start with a lowercase letter.',
    choices: ['True', 'False'],
    answer: 1,
    type: 'tf',
    explain: 'React components must start with an uppercase letter.',
  },
  {
    text: 'What is the virtual DOM?',
    choices: [
      'A direct copy of the real DOM',
      'A lightweight copy of the real DOM kept in memory',
      'A server rendered DOM',
      'None of the above'
    ],
    answer: 1,
    type: 'mcq',
    explain: 'The virtual DOM is a lightweight copy React uses to optimize updates.',
  },
  {
    text: 'setState is synchronous.',
    choices: ['True', 'False'],
    answer: 1,
    type: 'tf',
    explain: 'setState is asynchronous.',
  },
  {
    text: 'Which hook is used to handle side effects in a component?',
    choices: [
      'useRef',
      'useCallback',
      'useEffect',
      'useState',
    ],
    answer: 2,
    type: 'mcq',
    explain: 'useEffect is the React hook for handling side effects.',
  },
  {
    text: 'Keys help React identify which items have changed in a list.',
    choices: ['True', 'False'],
    answer: 0,
    type: 'tf',
    explain: 'When rendering lists, keys help React track changes for efficient updates.',
  },
  {
    text: 'Mixing is not a question type.',
    choices: ['True', 'False'],
    answer: 0,
    type: 'tf',
    explain: 'Mix means a random mix of MCQ and True/False, not a question about mixing.',
  },
  {
    text: 'What is the correct file extension for React components containing JSX?',
    choices: [
      '.jsx',
      '.js',
      '.tsx',
      '.html'
    ],
    answer: 0,
    type: 'mcq',
    explain: '.jsx is appropriate for React components with JSX, but .js is also accepted.',
  },
  {
    text: 'React requires Babel to be used.',
    choices: ['True', 'False'],
    answer: 1,
    type: 'tf',
    explain: 'Babel is not required, but it is useful for transpiling JSX and modern JS.',
  },
  {
    text: 'Which of the following is a valid React component definition?',
    choices: [
      'function MyComponent() { return <div />; }',
      'let MyComponent = () => <div />;',
      'class MyComponent extends React.Component {}',
      'All of the above',
    ],
    answer: 3,
    type: 'mcq',
    explain: 'All of those are valid component definitions in React.',
  },
  {
    text: 'React can render server-side.',
    choices: ['True', 'False'],
    answer: 0,
    type: 'tf',
    explain: 'With tools like Next.js, React can render components on the server.',
  },
];

// Helper functions
function shuffleArr(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuiz({ num, type }) {
  let pool = [...QUESTION_POOL];
  if (type === 'mcq') {
    pool = pool.filter(q => q.type === 'mcq');
  } else if (type === 'tf') {
    pool = pool.filter(q => q.type === 'tf');
  }
  pool = shuffleArr(pool);

  if (num > pool.length) num = pool.length;
  return pool.slice(0, num);
}

const QUIZ_TITLE = "React Skills Quiz";

// Responsive helper for dynamic style
const useWindowSize = () => {
  const isClient = typeof window === "object";
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    if (!isClient) return;
    function handleResize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);
  return size;
};

const Quiz = () => {
  const [startup, setStartup] = useState(true);
  const [examTime, setExamTime] = useState(60); // seconds
  const [numQuestions, setNumQuestions] = useState(5);
  const [type, setType] = useState('mix'); // 'mcq', 'tf', 'mix'

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  // Responsive helpers
  const [width] = useWindowSize();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;

  // For restart/retry
  function startQuiz() {
    let quizQs;
    if (type === 'mix') {
      quizQs = shuffleArr(QUESTION_POOL).slice(0, numQuestions);
    } else {
      quizQs = generateQuiz({ num: numQuestions, type });
    }
    setQuestions(quizQs);
    setAnswers(Array(quizQs.length).fill(null));
    setCurrent(0);
    setSubmitted(false);
    setTimer(examTime);
    setStartup(false);
    setTimerActive(true);
  }

  useEffect(() => {
    if (!timerActive || submitted || startup) return;
    if (timer <= 0) {
      setSubmitted(true);
      setTimerActive(false);
      return;
    }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerActive, timer, submitted, startup]);

  const score = submitted
    ? answers.filter((ans, idx) => ans === questions[idx]?.answer).length
    : 0;
  const percent = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const handleChoose = idx => {
    if (submitted) return;
    setAnswers(ans => ans.map((v, i) => (i === current ? idx : v)));
  };
  const prevQ = () => setCurrent(c => Math.max(0, c - 1));
  const nextQ = () => setCurrent(c => Math.min(questions.length - 1, c + 1));
  const submitQuiz = () => {
    setSubmitted(true);
    setTimerActive(false);
  };
  const restartQuiz = () => {
    setStartup(true);
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setTimer(60);
    setTimerActive(false);
    setSubmitted(false);
    setExamTime(60);
    setNumQuestions(5);
    setType('mix');
  };

  function choiceBg(idx) {
    if (!submitted) return answers[current] === idx ? "#5272f2" : "var(--main-color)";
    if (idx === questions[current].answer) return '#2ecc709e';
    if (answers[current] === idx) return '#fd654797';
    return "var(--main-color)";
  }
  function choiceBd(idx) {
    if (!submitted) return answers[current] === idx ? "#5272f2" : "#e1e8f0";
    if (idx === questions[current].answer) return '#27ae608c';
    if (answers[current] === idx) return '#fd654797';
    return "#e1e8f0";
  }
  function choiceColor(idx) {
    if (!submitted) return answers[current] === idx ? "#fff" : "#333";
    if (idx === questions[current].answer) return '#247c42';
    if (answers[current] === idx) return '#c03221';
    return "#69727d";
  }

  return (
    <div
      className={`flex flex-col items-center rounded-[15px] shadow-lg bg-main-color`}
      style={{
        background: 'var(--main-color)',
        width: isMobile ? '100%' : isTablet ? '96%' : '90%',
        padding: isMobile ? '18px 6px' : isTablet ? '32px 18px' : '32px 32px',
        minHeight: submitted ? (isMobile ? 220 : 420) : (isMobile ? 180 : 380),
        boxSizing: 'border-box',
        margin: isMobile ? 0 : 'auto'
      }}
    >
      {/* Startup Section */}
      {startup && (
        <>
          <h2
            className="mt-0 font-bold text-[#31425e]"
            style={{
              fontSize: isMobile ? 19 : isTablet ? 22 : 25,
              textAlign: "center"
            }}
          >{QUIZ_TITLE}</h2>
          <p
            className="text-center text-[#777] mb-6"
            style={{
              fontSize: isMobile ? 13.5 : 15.5,
              marginBottom: isMobile ? 14 : 36,
              marginTop: isMobile ? 5 : undefined
            }}
          >
            Set the test settings according to your level.
          </p>
          <div
            className={`flex flex-wrap items-center justify-evenly w-full`}
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 12 : 0
            }}
          >
            <div className="mb-5.5" style={{ width: isMobile ? '100%' : 220 }}>
              <label className="font-medium text-[#444] mr-1.5" style={{ fontSize: isMobile ? 14 : 15 }}>
                Exam Time:
              </label>
              <select
                value={examTime}
                onChange={e => setExamTime(Number(e.target.value))}
                className="rounded-[7px] px-3 py-2 ml-2 text-[15px] border-2"
                style={{
                  background: "var(--main-color)",
                  color: "black",
                  borderColor: "var(--main-corlo)",
                  fontWeight: 500,
                  width: isMobile ? 148 : undefined,
                  fontSize: isMobile ? 14 : 15
                }}
              >
                <option value={30} style={{ background: "var(--main-color)", color: "black" }}>30 seconds</option>
                <option value={60} style={{ background: "var(--main-color)", color: "black" }}>1 minute</option>
                <option value={120} style={{ background: "var(--main-color)", color: "black" }}>2 minutes</option>
                <option value={300} style={{ background: "var(--main-color)", color: "black" }}>5 minutes</option>
              </select>
            </div>
            <div className="mb-5.5" style={{ width: isMobile ? '100%' : 220 }}>
              <label className="font-medium text-[#444] mr-1.5" style={{ fontSize: isMobile ? 14 : 15 }}>
                Number of Questions:
              </label>
              <select
                value={numQuestions}
                onChange={e => setNumQuestions(Number(e.target.value))}
                className="rounded-[7px] px-3 py-2 ml-2 text-[15px] border-2"
                style={{
                  background: "var(--main-color)",
                  color: "black",
                  borderColor: "var(--main-corlo)",
                  fontWeight: 500,
                  width: isMobile ? 98 : undefined,
                  fontSize: isMobile ? 14 : 15
                }}
              >
                <option value={5} style={{ background: "var(--main-color)", color: "black" }}>5</option>
                <option value={10} style={{ background: "var(--main-color)", color: "black" }}>10</option>
                <option value={15} style={{ background: "var(--main-color)", color: "black" }}>15</option>
              </select>
            </div>
            <div className="mb-5.5" style={{ width: isMobile ? '100%' : 220 }}>
              <label className="font-medium text-[#444] mr-1.5" style={{ fontSize: isMobile ? 14 : 15 }}>
                Question Type:
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="rounded-[7px] px-3 py-2 ml-2 text-[15px] border-2"
                style={{
                  background: "var(--main-color)",
                  color: "black",
                  borderColor: "var(--main-corlo)",
                  fontWeight: 500,
                  width: isMobile ? 117 : undefined,
                  fontSize: isMobile ? 14 : 15
                }}
              >
                <option value="mcq" style={{ background: "var(--main-color)", color: "black" }}>MCQ</option>
                <option value="tf" style={{ background: "var(--main-color)", color: "black" }}>True/False</option>
                <option value="mix" style={{ background: "var(--main-color)", color: "black" }}>Mix</option>
              </select>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="bg-[#5272f2] text-white border-none rounded-[7px] font-semibold cursor-pointer mt-2 tracking-[0.7px] shadow-[0_2px_10px_#b8c3ef19]"
            style={{
              background: '#5272f2', color: '#fff',
              fontSize: isMobile ? 15 : 17,
              padding: isMobile ? '9px 18px' : '10px 38px'
            }}
          >
            Start Quiz
          </button>
        </>
      )}

      {/* Quiz Section */}
      {!startup && !submitted && questions.length > 0 && (
        <>
          {/* Timer + Counter */}
          <div
            className="w-full flex justify-between items-center mb-3"
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 6 : 0
            }}
          >
            <div
              className="font-semibold"
              style={{
                color: timer < 16 ? "#f06855" : "#6d7993",
                fontSize: isMobile ? 14 : 15.5,
                marginBottom: isMobile ? 4 : undefined,
                marginRight: isMobile ? 0 : 8
              }}>
              ⏰ {timer}s
            </div>
            <div
              className="bg-[#edf0fc] rounded-[6px] px-[13px] py-[3.5px] font-medium text-[#3a495e]"
              style={{
                fontSize: isMobile ? 13.5 : 15.5,
                marginLeft: isMobile ? 0 : 8
              }}>
              {current + 1} / {questions.length}
            </div>
          </div>
          <div
            className="font-semibold text-center mb-4 mt-1"
            style={{
              minHeight: isMobile ? 20 : 32,
              fontSize: isMobile ? 15.3 : 19.4,
              color: "#253355"
            }}
          >
            {questions[current].text}
          </div>
          <div
            className={`w-full flex justify-center`}
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              gap: questions[current].type === 'mcq'
                ? (isMobile ? 10 : 18)
                : (isMobile ? 20 : 34),
              marginBottom: isMobile ? 16 : 27,
              alignItems: isMobile ? 'stretch' : 'center'
            }}
          >
            {questions[current].choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoose(idx)}
                className={`rounded-[10px] font-medium outline-none user-select-none transition-all`}
                style={{
                  minWidth: isMobile ? 'unset' : (questions[current].type === 'mcq' ? 134 : 110),
                  maxWidth: isMobile ? '100%' : 230,
                  background: choiceBg(idx),
                  color: choiceColor(idx),
                  border: '2px solid ' + choiceBd(idx),
                  padding: questions[current].type === 'mcq'
                    ? (isMobile ? '10px 6px' : '11px 3px')
                    : (isMobile ? '12px 6px' : '16px 3px'),
                  fontWeight: answers[current] === idx ? 700 : 500,
                  boxShadow: answers[current] === idx ? '0 2px 10px #5272f22e' : '',
                  marginBottom: 0,
                  cursor: submitted ? 'default' : 'pointer',
                  fontSize: isMobile ? 14 : 16.7,
                  width: isMobile ? '100%' : undefined,
                  marginTop: isMobile && idx > 0 ? 8 : 0
                }}
                onMouseOver={e => {
                  if (!submitted && answers[current] !== idx) e.currentTarget.style.background = "#f3f5f8";
                }}
                onMouseOut={e => {
                  if (!submitted && answers[current] !== idx) e.currentTarget.style.background = "var(--main-color)";
                }}
                disabled={submitted}
              >
                {choice}
              </button>
            ))}
          </div>
          <div
            className="w-full flex justify-between gap-[13px] mt-1"
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 7 : 13,
            }}
          >
            <button
              onClick={prevQ}
              disabled={current === 0}
              className="bg-[#edf0fc] text-[#5272f2] border-none rounded-[8px] font-semibold transition-colors"
              style={{
                fontSize: isMobile ? 14 : 16,
                padding: isMobile ? '9px 13px' : '10px 28px',
                opacity: current === 0 ? 0.48 : 1,
                cursor: current === 0 ? 'not-allowed' : 'pointer',
                width: isMobile ? '100%' : undefined,
              }}
            >
              Previous
            </button>
            {(current < questions.length - 1) && (
              <button
                onClick={nextQ}
                disabled={answers[current] == null}
                className="bg-[#5272f2] text-white border-none rounded-[8px] font-semibold transition-colors"
                style={{
                  fontSize: isMobile ? 14 : 16,
                  padding: isMobile ? '9px 13px' : '10px 34px',
                  opacity: answers[current] == null ? 0.53 : 1,
                  cursor: answers[current] == null ? 'not-allowed' : 'pointer',
                  width: isMobile ? '100%' : undefined,
                }}
              >
                Next
              </button>
            )}
            {current === questions.length - 1 && (
              <button
                onClick={submitQuiz}
                disabled={answers[current] == null}
                className="bg-[#14b143] text-white border-none rounded-[8px] font-bold transition-colors"
                style={{
                  fontSize: isMobile ? 14 : 16,
                  padding: isMobile ? '9px 13px' : '10px 34px',
                  opacity: answers[current] == null ? 0.55 : 1,
                  cursor: answers[current] == null ? 'not-allowed' : 'pointer',
                  width: isMobile ? '100%' : undefined,
                }}
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}

      {/* Results & Review Section */}
      {submitted && (
        <>
          {/* Score summary */}
          <div className="w-full flex flex-col items-center justify-center mb-3.5">
            <div
              className="mb-2 relative flex items-center justify-center"
              style={{
                width: isMobile ? 66 : 98,
                height: isMobile ? 66 : 98
              }}
            >
              <svg width={isMobile ? 66 : 98} height={isMobile ? 66 : 98}>
                <circle
                  cx={isMobile ? 33 : 49}
                  cy={isMobile ? 33 : 49}
                  r={isMobile ? 29 : 44}
                  stroke="#e4e7ee"
                  strokeWidth={isMobile ? 6 : 9}
                  fill="none"
                />
                <circle
                  cx={isMobile ? 33 : 49}
                  cy={isMobile ? 33 : 49}
                  r={isMobile ? 29 : 44}
                  stroke="#5272f2"
                  strokeWidth={isMobile ? 6 : 9}
                  fill="none"
                  strokeDasharray={2 * Math.PI * (isMobile ? 29 : 44)}
                  strokeDashoffset={2 * Math.PI * (isMobile ? 29 : 44) * (1 - percent / 100)}
                  style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.45,0.05,0.67,1)' }}
                />
                <text x={isMobile ? "33" : "49"} y={isMobile ? "39" : "58"} textAnchor="middle" fontSize={isMobile ? "22" : "33"} fontWeight="bold" fill="#5272f2">
                  {score}
                </text>
              </svg>
            </div>
            <div className="font-bold text-[#2e3f59] mb-0.5"
              style={{ fontSize: isMobile ? 16 : 20 }}>
              Quiz Complete!
            </div>
            <div className="mb-1.5 text-[#606f81]"
              style={{ fontSize: isMobile ? 13 : 15 }}>
              You scored <b>{score}</b> out of <b>{questions.length}</b> ({percent}%)
            </div>
          </div>

          {/* Review Answers */}
          <div
            className="w-full"
            style={{
              marginTop: isMobile ? 8 : 15,
              height: isMobile ? '34vh' : '50vh',
              overflow: 'auto',
              paddingBottom: isMobile ? 6 : undefined
            }}
          >
            {questions.map((q, idx) => {
              const userAns = answers[idx];
              const isCorrect = userAns === q.answer;
              return (
                <div
                  key={idx}
                  className="my-4 rounded-[9px] shadow-[0_1.5px_7px_var(--shadow)]"
                  style={{
                    padding: isMobile ? 10 : 15,
                    background: '#f6f9ff',
                    border: '2px solid ' + (isCorrect ? "#19bb53b1" : "#f36c678b"),
                    boxShadow: isCorrect ? '0 1.5px 7px #19bb531e' : '0 1.5px 7px #f36c671a'
                  }}
                >
                  <div className="font-medium mb-0.5"
                    style={{
                      color: isCorrect ? "#23ad44" : "#dc3636",
                      fontWeight: 505,
                      fontSize: isMobile ? 13 : 16
                    }}>
                    Q{idx + 1}: {q.text}
                  </div>
                  <div
                    className="flex flex-wrap gap-[7px] mt-1 mb-2"
                    style={{ fontSize: isMobile ? 12 : 15 }}
                  >
                    {q.choices.map((choice, cidx) => {
                      let boxStyle = {
                        background: 'var(--main-color)',
                        border: '1.5px solid #c3d4ef6e',
                        color: '#344462',
                        borderRadius: 7,
                        padding: isMobile ? '2px 7px' : '3.5px 13px',
                        fontWeight: 505,
                        fontSize: isMobile ? 12 : 15,
                        marginRight: isMobile ? 4 : 7,
                        marginBottom: isMobile ? 1.5 : 2,
                        display: 'inline-block'
                      };
                      if (cidx === q.answer) {
                        boxStyle = {
                          ...boxStyle, background: '#dbf9e6',
                          border: '1.5px solid #2ecc70',
                          color: '#1e884e',
                          fontWeight: 800
                        }
                      }
                      if (userAns === cidx && userAns !== q.answer) {
                        boxStyle = {
                          ...boxStyle, background: "#fff1ee",
                          border: '1.5px solid #fd6547',
                          color: "#c03221",
                        }
                      }
                      return (
                        <span key={cidx} style={boxStyle}>
                          {choice}
                          {cidx === q.answer && (
                            <span style={{ fontWeight: 800, marginLeft: 5, color: '#1e884e' }}>
                              ✔
                            </span>
                          )}
                          {userAns === cidx && userAns !== q.answer && (
                            <span style={{ fontWeight: 800, marginLeft: 5, color: "#c03221" }}>
                              ✘
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <div className="rounded-[5px] font-medium mb-[-2px] text-[#953402]"
                    style={{
                      background: '#fffce8',
                      padding: isMobile ? "7px 4px" : "6.5px 11px",
                      fontSize: isMobile ? 11.5 : 14,
                      marginTop: isMobile ? 3 : 0
                    }}>
                    <b>Why?</b> {q.explain}
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={restartQuiz}
            className="mt-6 bg-[#5272f2] text-white border-none rounded-[7px] font-[650] cursor-pointer shadow-[0_2px_8px_#4472f212] opacity-97"
            style={{
              fontSize: isMobile ? 14.3 : 17,
              padding: isMobile ? '8px 0' : '10px 39px',
              width: isMobile ? '100%' : undefined
            }}
          >
            Retake Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;