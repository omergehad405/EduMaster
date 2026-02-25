import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLearn from '../../hooks/useLearn';
import AuthContext from '../../context/AuthContext';
import LessonsSidebar from './LessonsSidebar';
import LessonQuiz from './LessonQuiz';
import axios from 'axios';

function Lesson() {
  const { trackId, lessonId } = useParams();
  const { lessons, fetchTrackById, loading } = useLearn();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockNextLessonId, setUnlockNextLessonId] = useState(null);

  // Scroll progress (informational only)
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

  // Ensure lessons for this track are loaded when navigating directly
  useEffect(() => {
    if (trackId) {
      fetchTrackById(trackId);
    }
  }, [trackId, fetchTrackById]);

  const currentIndex = lessons.findIndex(l => l._id === lessonId);
  const lesson = currentIndex !== -1 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex !== -1 && currentIndex < lessons.length - 1
    ? lessons[currentIndex + 1]
    : null;

  if (loading || !lesson) {
    return (
      <div className="flex flex-col md:flex-row gap-8 bg-gray-900 min-h-screen">
        <LessonsSidebar trackId={trackId} unlockedLessonId={unlockNextLessonId} />
        <div className="flex-1 px-8 py-10 text-gray-300">
          {loading || lessons.length === 0
            ? 'Loading lesson...'
            : 'Lesson not found.'}
        </div>
      </div>
    );
  }

  const goToLesson = (lesson) => {
    if (!lesson) return;
    navigate(`/tracks/${trackId}/lesson/${lesson._id}`);
  };

  // Handle quiz completion
  const handleQuizComplete = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/complete-quiz",
        { lessonId: lesson._id, trackId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.nextLessonId) {
        setUnlockNextLessonId(res.data.nextLessonId);
      }

      setQuizCompleted(true);
      fetchTrackById(trackId); // refresh progress
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-gray-900 min-h-screen">
      <LessonsSidebar trackId={trackId} unlockedLessonId={unlockNextLessonId} />
      <div className="flex-1 px-8 py-10 text-gray-200">

        {/* Progress bar */}
        <div className="h-2 bg-gray-700 w-full mb-5">
          <div className="h-2 bg-indigo-500" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Navigation top */}
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

        <h1 className="text-3xl font-semibold mb-4">{lesson.title}</h1>
        {lesson.videoUrl && (
          <video controls className="w-full max-h-[500px] mb-5">
            <source src={lesson.videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="mb-5" dangerouslySetInnerHTML={{ __html: lesson.content }} />

        {/* Quiz always visible until completed */}
        {lesson.quiz && lesson.quiz.length > 0 && !quizCompleted && (
          <LessonQuiz
            lessonId={lesson._id}
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
          />
        )}

        {/* Navigation bottom */}
        <div className="flex justify-between mt-10">
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

        {!quizCompleted && nextLesson && (
          <span className="text-gray-400 mt-5 block">
            Next lesson locked until quiz is passed 🔒
          </span>
        )}
      </div>
    </div>
  );
}

export default Lesson;