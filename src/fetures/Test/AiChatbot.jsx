import React, { useRef, useEffect, useState } from 'react';

// Dummy file context summary and suggested questions for demonstration
const fileContextSummary = `
This file implements an AI Chatbot interface with a two-column layout. 
The left area is for chat conversations; the right for file context summary and suggested questions.
`;

const suggestedQuestions = [
  "How can I refactor this function?",
  "What does this code do?",
  "Explain the error in this file.",
];

function TypingAnimation() {
  // Use Tailwind for the dots animation
  return (
    <span className="inline-flex items-center">
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink" />
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink delay-200" />
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink delay-400" />
      <style>
        {`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.6; }
          40% { opacity: 1; }
        }
        .animate-blink { animation: blink 1.4s infinite both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}
      </style>
    </span>
  );
}

function AiChatbot() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! How can I assist you with your code today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((msgs) => [
      ...msgs,
      { sender: 'user', text: input.trim() }
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: "This is a dummy AI response to: " + input.trim() }
      ]);
      setIsTyping(false);
    }, 1200);

    setInput('');
  };

  const handleSuggestedQuestion = (q) => {
    setInput(q);
  };

  return (
    <div className="
      flex flex-col
      w-full
      max-w-2xl
      mx-auto
      min-h-[340px]
      h-[480px]
      bg-[--main-color]
      border border-gray-200
      rounded-xl
      shadow
      overflow-hidden
      sm:flex-row
      sm:h-[480px]
      sm:min-h-[340px]
      xs:h-auto
      xs:min-h-[340px]
      "
      style={{ height: undefined }} // allow CSS to override height on small screens
    >
      {/* Left: Chat Conversation */}
      <div className="
        flex flex-col
        bg-(--main-color)
        border-b border-gray-200
        overflow-auto
        xs:border-b-0
        sm:border-b-0 sm:border-r
        sm:flex-2
        flex-1
        min-h-[220px]
        sm:min-h-0
      ">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'} gap-2`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-[85vw] sm:max-w-[70%] break-words ${msg.sender === 'user'
                    ? 'bg-(--second-color) text-(--main-color)'
                    : 'bg-gray-100 text-gray-900'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-row gap-2 text-left">
              <div className="inline-block px-4 py-2 rounded-2xl max-w-[85vw] sm:max-w-[70%] bg-gray-100 text-gray-900">
                <TypingAnimation />
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 flex gap-2"
        >
          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 text-[#777] bg-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--second-color) min-w-0"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className={`transition px-4 sm:px-5 py-2 rounded-2xl text-base font-semibold ${isTyping || !input.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-(--second-color) text-(--main-color) hover:bg-(--second-color) cursor-pointer'
              }`}
          >
            Send
          </button>
        </form>
      </div>

      {/* Right: File context & Suggested questions */}
      <div className="
        flex-1
        bg-gray-50
        px-4 pt-4 pb-3
        sm:px-5 sm:pt-6 sm:pb-4
        flex flex-col gap-6 sm:gap-8
        min-w-0 overflow-auto
      ">
        {/* File Context Summary */}
        <div className="mb-1 sm:mb-2">
          <h3 className="text-base font-semibold mb-2 text-gray-900">File Context Summary</h3>
          <pre className="bg-gray-100 p-2 sm:p-3 rounded text-[14px] sm:text-[15px] text-slate-600 whitespace-pre-wrap font-sans m-0">
            {fileContextSummary}
          </pre>
        </div>
        {/* Suggested Questions */}
        <div>
          <h3 className="text-base font-semibold mb-2 text-gray-900">Suggested Questions</h3>
          <div className="flex flex-col gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                className="transition text-left bg-(--main-color) border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2 cursor-pointer text-[14px] sm:text-[15px] text-slate-700 hover:bg-gray-100 active:bg-blue-50"
                onClick={() => handleSuggestedQuestion(q)}
                type="button"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
        @media (max-width: 639px) {
          .sm\\:flex-row {
            flex-direction: column !important;
          }
          .sm\\:min-h-\\[340px\\], .sm\\:h-\\[480px\\] {
            min-height: 0 !important;
            height: auto !important;
          }
          .sm\\:border-r {
            border-right-width: 0 !important;
          }
        }
        @media (max-width: 440px) {
          .px-4, .sm\\:px-5 {padding-left: 8px; padding-right: 8px;}
          .p-4, .sm\\:p-5 {padding: 10px;}
          .sm\\:p-4 {padding: 10px;}
        }
        `}
      </style>
    </div>
  );
}

export default AiChatbot