import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { QuizContext } from '../../context/QuizContext';
import { useContext } from 'react';

function TypingAnimation() {
  return (
    <span className="inline-flex items-center">
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink" />
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink delay-200" />
      <span className="h-2 w-2 mx-[2px] bg-gray-400 rounded-full inline-block opacity-60 animate-blink delay-400" />
      <style>{`
        @keyframes blink {0%,80%,100% {opacity:0.6;} 40% {opacity:1;}}
        .animate-blink {animation: blink 1.4s infinite both;}
        .delay-200 {animation-delay:0.2s;}
        .delay-400 {animation-delay:0.4s;}
      `}</style>
    </span>
  );
}

function AiChatbot() {
  const { token } = useAuth();
  const { fileUrl, fileContent, fileName, sourceFile } = useContext(QuizContext);
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hello! How can I assist you with your code today?" }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";
  const SITE_KEY = import.meta.env.VITE_SITE_KEY;

  // ✅ DEBUG LOG
  useEffect(() => {
    console.log("🔍 DEBUG CONTEXT:", {
      fileUrl,
      fileName,
      fileContent: fileContent?.substring(0, 200) + '...'
    });
  }, [fileUrl, fileName, fileContent]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((msgs) => [...msgs, { sender: 'user', text: userMessage }]);
    setIsTyping(true);
    setInput('');

    try {
      const formData = new FormData();
      formData.append("message", userMessage);
      if (sourceFile) formData.append("file", sourceFile);

      const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(SITE_KEY ? { "x-site-key": SITE_KEY } : {}),
        "Content-Type": "multipart/form-data",
      };

      const res = await axios.post(`${API_URL}/api/ai/solve`, formData, { headers });

      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: res.data.reply || "No reply from AI" },
      ]);
    } catch (err) {
      console.error("AI Chat error:", err.response?.data || err.message);
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: `Error: ${err.response?.data?.message || "Could not get AI response"}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[480px] border rounded-xl overflow-hidden bg-(--main-color)">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'} gap-2`}>
            <div className={`inline-block px-4 py-2 rounded-2xl max-w-[70%] break-words ${msg.sender === 'user' ? 'bg-(--second-color) text-(--text-color)' : 'bg-(--bg-color) text-(--p-color)'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-row gap-2 text-left">
            <div className="inline-block px-4 py-2 rounded-2xl max-w-[70%] bg-gray-100 text-(--p-color)">
              <TypingAnimation />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex gap-2 p-3 border-t bg-(--bg-color)">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 px-4 py-2 rounded border border-gray-300"
        />
        <button type="submit" disabled={isTyping || !input.trim()} className="px-4 py-2 bg-(--second-color) text-(--text-color) rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default AiChatbot;
