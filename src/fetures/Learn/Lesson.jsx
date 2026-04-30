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


const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

/* ─── Inject keyframes once ─────────────────────────────────────────────────── */
const SKELETON_STYLES = `
  @keyframes skeletonShimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes progressPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.55; }
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 0%,
      rgba(255,255,255,0.13) 40%,
      rgba(255,255,255,0.04) 80%
    );
    background-size: 600px 100%;
    animation: skeletonShimmer 1.6s ease-in-out infinite;
    border-radius: 6px;
  }

  /* sidebar skeleton items */
  .skeleton-sidebar-item {
    height: 40px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  /* lesson content skeleton blocks */
  .lesson-enter { animation: fadeIn 0.45s ease both; }

  .block-heading  { animation: fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both; }
  .block-text     { animation: fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both; }
  .block-code     { animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }

  .progress-loading {
    animation: progressPulse 1.4s ease-in-out infinite;
  }

  .btn-nav {
    transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
  }
  .btn-nav:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(99,102,241,0.4);
  }
  .btn-nav:not(:disabled):active {
    transform: translateY(0);
  }
`;

function injectSkeletonStyles() {
  if (document.getElementById('lesson-skeleton-styles')) return;
  const el = document.createElement('style');
  el.id = 'lesson-skeleton-styles';
  el.textContent = SKELETON_STYLES;
  document.head.appendChild(el);
}

/* ─── Helper: extract YouTube video ID ──────────────────────────────────────── */
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // Standard: https://www.youtube.com/watch?v=VIDEO_ID
    if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
    // Short: https://youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    // Embed: https://www.youtube.com/embed/VIDEO_ID
    if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/embed/')[1];
  } catch {
    return null;
  }
  return null;
}

/* ─── Sidebar Skeleton ───────────────────────────────────────────────────────── */
function SidebarSkeleton() {
  return (
    <div
      className="lesson-enter"
      style={{
        width: '260px',
        minWidth: '220px',
        padding: '24px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        minHeight: '100vh',
      }}
    >
      {/* Header label */}
      <div className="skeleton" style={{ height: 14, width: '55%', marginBottom: 24 }} />

      {/* Lesson items */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="skeleton skeleton-sidebar-item"
          style={{
            animationDelay: `${i * 0.07}s`,
            width: `${78 + (i % 3) * 8}%`,
            opacity: 1 - i * 0.07,
          }}
        />
      ))}

      {/* Divider */}
      <div className="skeleton" style={{ height: 1, width: '100%', margin: '20px 0' }} />

      {/* More items */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`b${i}`}
          className="skeleton skeleton-sidebar-item"
          style={{
            animationDelay: `${(i + 8) * 0.07}s`,
            width: `${65 + (i % 2) * 15}%`,
            opacity: 0.5 - i * 0.06,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Lesson Content Skeleton ────────────────────────────────────────────────── */
function LessonContentSkeleton() {
  return (
    <div className="lesson-enter flex-1 px-8 py-10">
      {/* Progress bar placeholder */}
      <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 28 }}>
        <div
          className="progress-loading"
          style={{ height: '100%', width: '35%', background: 'rgba(99,102,241,0.35)', borderRadius: 4 }}
        />
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <div className="skeleton" style={{ height: 38, width: 130, borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 38, width: 130, borderRadius: 8, animationDelay: '0.1s' }} />
      </div>

      {/* Title */}
      <div className="skeleton" style={{ height: 36, width: '55%', marginBottom: 24 }} />

      {/* Video placeholder */}
      <div className="skeleton" style={{ height: 420, width: '100%', borderRadius: 12, marginBottom: 32 }} />

      {/* Content blocks */}
      {[
        { type: 'heading', w: '40%', h: 28, mt: 24 },
        { type: 'text', w: '100%', h: 14, mt: 10 },
        { type: 'text', w: '92%', h: 14, mt: 8 },
        { type: 'text', w: '85%', h: 14, mt: 8 },
        { type: 'code', w: '100%', h: 120, mt: 20 },
        { type: 'heading', w: '35%', h: 28, mt: 28 },
        { type: 'text', w: '100%', h: 14, mt: 10 },
        { type: 'text', w: '88%', h: 14, mt: 8 },
        { type: 'code', w: '100%', h: 90, mt: 20 },
        { type: 'text', w: '72%', h: 14, mt: 8 },
      ].map((block, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: block.h,
            width: block.w,
            marginTop: block.mt,
            borderRadius: block.type === 'code' ? 10 : 5,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Lesson Component ──────────────────────────────────────────────────── */
function Lesson() {
  const { trackId, lessonId } = useParams();
  const { lessons, fetchTrackById } = useLearn();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockNextLessonId, setUnlockNextLessonId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // New state for quiz visibility
  const [quizStarted, setQuizStarted] = useState(false);

  const { language } = useLanguage();
  const t = translations[language] || {};
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  /* inject styles once */
  useEffect(() => { injectSkeletonStyles(); }, []);

  /* scroll progress */
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

  /* fetch track */
  useEffect(() => {
    if (trackId) {
      setIsLoading(true);
      fetchTrackById(trackId);
    }
  }, [trackId, fetchTrackById]);

  /* mark lesson as entered */
  useEffect(() => {
    const markLessonEntered = async () => {
      if (!lessonId || !token) return;
      try {
        await axios.post(
          `${API_URL}/api/users/enter-lesson`,
          { lessonId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch { /* silent */ }
    };
    markLessonEntered();
  }, [lessonId, token]);

  /* reset quiz + show skeleton briefly when lesson changes */
  useEffect(() => {
    setQuizCompleted(false);
    setIsLoading(true);
    setQuizStarted(false); // Reset quiz start on lesson change
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [lessonId]);

  /* derive lesson data */
  const currentIndex = lessons.findIndex(l => l._id === lessonId);
  const lesson = currentIndex !== -1 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  /* once lessons are loaded, allow rendering */
  useEffect(() => {
    if (lesson) setIsLoading(false);
  }, [lesson]);

  const goToLesson = (l) => {
    if (!l) return;
    toast.info(t.lessonOpening || 'Opening lesson...', { autoClose: 1200 });
    navigate(`/tracks/${trackId}/lesson/${l._id}`);
  };

  const handleQuizComplete = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/users/complete-quiz`,
        { lessonId: lesson._id, trackId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.nextLessonId) {
        setUnlockNextLessonId(res.data.nextLessonId);
        toast.success(t.lessonQuizUnlocked || 'Great job! A new lesson is unlocked 🎉', { autoClose: 2500 });
      }
      setQuizCompleted(true);
      fetchTrackById(trackId);
    } catch {
      toast.error(t.lessonQuizCompleteError || 'An error occurred. Please try again.');
    }
  };

  /* ── block renderers with staggered entrance ── */
  const renderBlock = (block, index) => {
    const delay = `${0.05 + index * 0.045}s`;

    switch (block.type) {
      case 'heading':
        return (
          <h2
            key={index}
            className="block-heading text-2xl font-semibold mt-6 mb-3 text-(--text-color)"
            style={{ animationDelay: delay }}
          >
            {block.value}
          </h2>
        );
      case 'text':
        return (
          <p
            key={index}
            className="block-text mb-4 leading-7 text-(--p-color)"
            style={{ animationDelay: delay }}
          >
            {block.value}
          </p>
        );
      case 'image':
        return (
          <img
            key={index}
            src={block.value}
            alt={t.lessonImageAlt || ''}
            className="block-text my-4 rounded-lg"
            style={{ animationDelay: delay }}
          />
        );
      case 'code':
        return (
          <pre
            key={index}
            className="block-code my-4 overflow-x-auto bg-(--main-color) text-(--text-color)"
            style={{
              animationDelay: delay,
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 10,
              padding: '18px 20px',
              fontSize: '0.86rem',
              lineHeight: 1.65,
            }}
          >
            <code>{block.value}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  /* ── Loading state ── */
  if (isLoading || !lesson) {
    return (
      <div className="flex lg:flex-row flex-col gap-0 bg-(--bg-color) min-h-screen" dir={dir}>
        <SidebarSkeleton />
        <LessonContentSkeleton />
      </div>
    );
  }

  /* ── Extract YouTube ID ── */
  const youtubeId = getYouTubeId(lesson.videoUrl);

  /* ── Loaded state ── */
  return (
    <div className="flex lg:flex-row flex-col gap-8 bg-(--bg-color) min-h-screen" dir={dir}>
      <LessonsSidebar trackId={trackId} unlockedLessonId={unlockNextLessonId} />

      <div className="lesson-enter flex-1 px-8 py-10 text-gray-200 relative">

        {/* ── Scroll progress bar ── */}
        <div className="fixed left-0 top-0 w-full z-30">
          <div className="h-2 w-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-2 transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                boxShadow: '0 0 8px rgba(99,102,241,0.6)',
              }}
            />
          </div>
        </div>
        <div className="h-2 mb-5" />

        {/* ── Nav buttons ── */}
        <div
          className="flex justify-between mb-6"
          style={{ animation: 'fadeUp 0.4s ease both', animationDelay: '0.05s' }}
        >
          <button
            disabled={!prevLesson}
            onClick={() => goToLesson(prevLesson)}
            className="btn-nav px-5 py-2 rounded-lg text-sm font-medium"
            style={{
              background: prevLesson ? '#4f46e5' : 'rgba(255,255,255,0.06)',
              color: prevLesson ? '#fff' : 'rgba(255,255,255,0.3)',
              cursor: prevLesson ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            ← {t.lessonPagePrevLesson || 'Previous Lesson'}
          </button>
          <button
            disabled={!quizCompleted || !nextLesson}
            onClick={() => goToLesson(nextLesson)}
            className="btn-nav px-5 py-2 rounded-lg text-sm font-medium"
            style={{
              background: quizCompleted && nextLesson ? '#4f46e5' : 'rgba(255,255,255,0.06)',
              color: quizCompleted && nextLesson ? '#fff' : 'rgba(255,255,255,0.3)',
              cursor: quizCompleted && nextLesson ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            {t.lessonPageNextLesson || 'Next Lesson'} →
          </button>
        </div>

        {/* ── Title ── */}
        <h1
          className="text-3xl font-bold mb-6 text-(--text-color)"
          style={{
            animation: 'fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both',
            animationDelay: '0.1s',
          }}
        >
          {lesson.title}
        </h1>

        {/* ── YouTube Video Embed ── */}
        {youtubeId && (
          <div
            style={{
              animation: 'fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both',
              animationDelay: '0.15s',
              marginBottom: 24,
            }}
          >
            <iframe
              key={youtubeId}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={lesson.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full rounded-xl"
              style={{
                height: 420,
                border: '1px solid rgba(99,102,241,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                borderRadius: 12,
              }}
            />
          </div>
        )}

        {/* ── Content blocks ── */}
        <div>
          {lesson.content.map((block, index) => renderBlock(block, index))}
        </div>

        {/* ── Quiz ── */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <div
            style={{
              animation: 'fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both',
              animationDelay: `${0.1 + lesson.content.length * 0.04}s`,
            }}
          >
            {!quizStarted ? (
              <button
                className="btn-nav px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 mt-8"
                style={{ fontSize: "1.125rem", marginBottom: 8 }}
                onClick={() => setQuizStarted(true)}
              >
                {t.startQuiz || "Start Quiz"}
              </button>
            ) : (
              <LessonQuiz
                lessonId={lesson._id}
                questions={lesson.quiz}
                onComplete={handleQuizComplete}
                completed={quizCompleted}
                t={t}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson;