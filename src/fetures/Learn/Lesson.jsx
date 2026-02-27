import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLearn from '../../hooks/useLearn';
import AuthContext from '../../context/AuthContext';
import LessonsSidebar from './LessonsSidebar';
import LessonQuiz from './LessonQuiz';
import { toast } from 'react-toastify';
import axios from 'axios';

function Lesson() {
  const { trackId, lessonId } = useParams();
  const { lessons, fetchTrackById, loading } = useLearn();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockNextLessonId, setUnlockNextLessonId] = useState(null);

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

  // Call enter-lesson API to award 5 XP
  useEffect(() => {
    const markLessonEntered = async () => {
      if (!lessonId || !token) return;
      try {
        await axios.post(
          "http://localhost:5000/api/users/enter-lesson",
          { lessonId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        // silently ignore if user already entered
      }
    };
    markLessonEntered();
  }, [lessonId, token]);

  useEffect(() => {
    setQuizCompleted(false);
  }, [lessonId]);

  const currentIndex = lessons.findIndex(l => l._id === lessonId);
  const lesson = currentIndex !== -1 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  if (!lesson) {
    return <div className="text-white p-10">Loading lesson...</div>;
  }

  const goToLesson = (lesson) => {
    if (!lesson) return;
    toast.info('Opening lesson...', { autoClose: 1200 });
    navigate(`/tracks/${trackId}/lesson/${lesson._id}`);
  };

  const handleQuizComplete = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/complete-quiz",
        { lessonId: lesson._id, trackId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.nextLessonId) {
        setUnlockNextLessonId(res.data.nextLessonId);
        toast.success("Great job! A new lesson is unlocked 🎉", {
          autoClose: 2500,
        });
      }

      setQuizCompleted(true);
      fetchTrackById(trackId);
    } catch (err) {
      console.error(err);
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
            alt=""
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
    <div className="flex flex-col md:flex-row gap-8 bg-gray-900 min-h-screen">
      <LessonsSidebar trackId={trackId} unlockedLessonId={unlockNextLessonId} />

      <div className="flex-1 px-8 py-10 text-gray-200">

        <div className="h-2 bg-gray-700 w-full mb-5">
          <div className="h-2 bg-indigo-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-between mb-5">
          <button
            disabled={!prevLesson}
            onClick={() => goToLesson(prevLesson)}
            className={`px-4 py-2 rounded ${prevLesson ? 'bg-indigo-500' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            Previous
          </button>

          <button
            disabled={!quizCompleted || !nextLesson}
            onClick={() => goToLesson(nextLesson)}
            className={`px-4 py-2 rounded ${quizCompleted && nextLesson ? 'bg-indigo-500' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        {lesson.videoUrl && (
          <video controls className="w-full max-h-[500px] mb-6 rounded-lg">
            <source src={lesson.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Structured Content Rendering */}
        <div>
          {lesson.content.map((block, index) => renderBlock(block, index))}
        </div>

        {lesson.quiz && lesson.quiz.length > 0 && (
          <LessonQuiz
            lessonId={lesson._id}
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
            completed={quizCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default Lesson;