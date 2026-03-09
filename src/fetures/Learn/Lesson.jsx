import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLearn from '../../hooks/useLearn';
import AuthContext from '../../context/AuthContext';
import LessonsSidebar from './LessonsSidebar';
import LessonQuiz from './LessonQuiz';
import { toast } from 'react-toastify';
import axios from 'axios';
import translations from '../../utils/translations';
import { useLanguage } from '../../hooks/useLanguage';

function Lesson() {
  const { trackId, lessonId } = useParams();
  const { lessons, fetchTrackById } = useLearn();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockNextLessonId, setUnlockNextLessonId] = useState(null);

  const { language } = useLanguage();
  const t = translations[language] || {};
  const dir = language === "ar" ? "rtl" : "ltr";

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.min((scrollTop / docHeight) * 100, 100);
    setProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (trackId) {
      fetchTrackById(trackId);
    }
  }, [trackId, fetchTrackById]);

  useEffect(() => {
    const markLessonEntered = async () => {
      if (!lessonId || !token) return;
      try {
        await axios.post(
          "https://edumaster-backend-6xy5.onrender.com/api/users/enter-lesson",
          { lessonId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
      }
    };
    markLessonEntered();
  }, [lessonId, token]);

  useEffect(() => {
    setQuizCompleted(false);
    // eslint-disable-next-line
  }, [lessonId]);

  const currentIndex = lessons.findIndex(l => l._id === lessonId);
  const lesson = currentIndex !== -1 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  if (!lesson) {
    return <div className="text-white p-10">{t.lessonLoading || "Loading lesson..."}</div>;
  }

  const goToLesson = (lesson) => {
    if (!lesson) return;
    toast.info(t.lessonOpening || 'Opening lesson...', { autoClose: 1200 });
    navigate(`/tracks/${trackId}/lesson/${lesson._id}`);
  };

  const handleQuizComplete = async () => {
    try {
      const res = await axios.post(
        "https://edumaster-backend-6xy5.onrender.com/api/users/complete-quiz",
        { lessonId: lesson._id, trackId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.nextLessonId) {
        setUnlockNextLessonId(res.data.nextLessonId);
        toast.success(
          t.lessonQuizUnlocked || "Great job! A new lesson is unlocked 🎉",
          { autoClose: 2500 }
        );
      }

      setQuizCompleted(true);
      fetchTrackById(trackId);
    } catch {
      toast.error(t.lessonQuizCompleteError || "An error occurred. Please try again.");
    }
  };

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {block.value}
          </h2>
        );
      case "text":
        return (
          <p key={index} className="mb-4 leading-7 text-gray-300">
            {block.value}
          </p>
        );
      case "image":
        return (
          <img
            key={index}
            src={block.value}
            alt={t.lessonImageAlt || ""}
            className="my-4 rounded-lg"
          />
        );
      case "code":
        return (
          <pre key={index} className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
            <code>{block.value}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex lg:flex-row flex-col gap-8 bg-gray-900 min-h-screen" dir={dir}>
      <LessonsSidebar trackId={trackId} unlockedLessonId={unlockNextLessonId} />
      <div className="flex-1 px-8 py-10 text-gray-200 relative">
        <div className="fixed left-0 top-0 w-full z-30">
          <div className="h-2 bg-gray-700 w-full">
            <div
              className="h-2 bg-indigo-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="h-2 mb-5" />
        <div className="flex justify-between mb-5">
          <button
            disabled={!prevLesson}
            onClick={() => goToLesson(prevLesson)}
            className={`px-4 py-2 rounded ${prevLesson ? 'bg-indigo-500' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            {t.lessonPagePrevLesson || "Previous Lesson"}
          </button>
          <button
            disabled={!quizCompleted || !nextLesson}
            onClick={() => goToLesson(nextLesson)}
            className={`px-4 py-2 rounded ${quizCompleted && nextLesson ? 'bg-indigo-500' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            {t.lessonPageNextLesson || "Next Lesson"}
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
        {lesson.videoUrl && (
          <video controls className="w-full max-h-[500px] mb-6 rounded-lg">
            <source src={lesson.videoUrl} type="video/mp4" />
          </video>
        )}
        <div>
          {lesson.content.map((block, index) => renderBlock(block, index))}
        </div>
        {lesson.quiz && lesson.quiz.length > 0 && (
          <LessonQuiz
            lessonId={lesson._id}
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
            completed={quizCompleted}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

export default Lesson;