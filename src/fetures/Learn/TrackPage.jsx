import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TracksSidebar from './TracksSidebar';
import useLearn from '../../hooks/useLearn';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import TrackFinalQuiz from './TrackFinalQuiz';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";

/* ─── keyframes injected once ─────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0   rgba(var(--second-rgb, 99,102,241), 0.55); }
    70%  { box-shadow: 0 0 0 12px rgba(var(--second-rgb, 99,102,241), 0);   }
    100% { box-shadow: 0 0 0 0   rgba(var(--second-rgb, 99,102,241), 0);    }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0);    }
    50%       { transform: translateY(-6px); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes gradientShift {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }

  /* ── entrance animations with staggered delays ── */
  .anim-fade-up          { animation: fadeUp   0.6s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-fade-in          { animation: fadeIn   0.5s ease both; }
  .anim-scale-in         { animation: scaleIn  0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-slide-right      { animation: slideRight 0.5s cubic-bezier(.22,.68,0,1.2) both; }

  .delay-100 { animation-delay: 0.10s; }
  .delay-200 { animation-delay: 0.20s; }
  .delay-300 { animation-delay: 0.30s; }
  .delay-400 { animation-delay: 0.40s; }
  .delay-500 { animation-delay: 0.50s; }
  .delay-600 { animation-delay: 0.60s; }
  .delay-700 { animation-delay: 0.70s; }

  /* ── shimmer skeleton ── */
  .shimmer {
    background: linear-gradient(90deg,
      rgba(255,255,255,0.05) 0%,
      rgba(255,255,255,0.18) 50%,
      rgba(255,255,255,0.05) 100%
    );
    background-size: 400px 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 0.75rem;
  }

  /* ── animated loading dots ── */
  .loading-dots {
    display: flex;
    gap: 0.8em;
    align-items: center;
    justify-content: center;
    margin-top: 2.2em;
    margin-bottom: 2.2em;
  }
  .loading-dots .dot {
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    background: var(--second-color, #6366f1);
    animation: dot-bounce 1.2s infinite both;
  }
  .loading-dots .dot:nth-child(2) { animation-delay: .2s; }
  .loading-dots .dot:nth-child(3) { animation-delay: .4s; }
  @keyframes dot-bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-1em);}
  }

  /* ── enroll / continue button ── */
  .btn-enroll {
    animation: pulse-ring 2s ease-out infinite;
    transition: transform 0.18s ease, filter 0.18s ease;
  }
  .btn-enroll:hover {
    transform: scale(1.06);
    filter: brightness(1.12);
    animation: none;
  }
  .btn-enroll:active { transform: scale(0.97); }

  /* ── image card hover ── */
  .img-card {
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.3s ease;
    will-change: transform;
  }
  .img-card:hover {
    transform: scale(1.06) translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
    z-index: 2;
  }

  /* ── pref text card – scroll-triggered slide-in ── */
  @keyframes slideFromLeft {
    from { opacity: 0; transform: translateX(-70px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes slideFromRight {
    from { opacity: 0; transform: translateX(70px); }
    to   { opacity: 1; transform: translateX(0);    }
  }

  .pref-card {
    opacity: 0;
    transform: translateX(-70px);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .pref-card.from-right {
    transform: translateX(70px);
  }
  .pref-card.visible.from-left {
    animation: slideFromLeft 0.65s cubic-bezier(.22,.68,0,1.2) forwards;
  }
  .pref-card.visible.from-right {
    animation: slideFromRight 0.65s cubic-bezier(.22,.68,0,1.2) forwards;
  }
  .pref-card.visible:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 28px rgba(0,0,0,0.18);
  }

  /* ── animated gradient header ── */
  .gradient-header {
    background: linear-gradient(270deg,
      var(--second-color, #6366f1),
      var(--main-color,   #1e293b),
      var(--second-color, #6366f1)
    );
    background-size: 300% 300%;
    animation: gradientShift 8s ease infinite;
  }

  /* ── floating icon decoration ── */
  .float-icon { animation: float 3.5s ease-in-out infinite; }

  /* ── section header underline grow ── */
  .section-heading {
    position: relative;
    display: inline-block;
  }
  .section-heading::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 3px;
    border-radius: 99px;
    background: var(--second-color, #6366f1);
    transition: width 0.45s cubic-bezier(.22,.68,0,1.2);
  }
  .section-heading:hover::after { width: 100%; }

  /* ── quiz reveal ── */
  .quiz-reveal {
    animation: scaleIn 0.7s cubic-bezier(.22,.68,0,1.2) 0.3s both;
  }
`;

function injectStyles() {
  if (document.getElementById('track-page-anim-styles')) return;
  const el = document.createElement('style');
  el.id = 'track-page-anim-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── Skeleton loader ──────────────────────────────────────────────────────── */
function TrackSkeleton() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="anim-fade-in px-5 py-10 min-h-screen" style={{ background: 'var(--bg-color)' }}>
      <div className="rounded-2xl p-8" style={{ background: 'var(--main-color)' }}>
        {/* loading animation */}
        <div className="loading-dots" role="status" aria-label="Loading">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* title */}
        <div className="shimmer h-10 w-3/4 mx-auto mb-6" />
        {/* description */}
        <div className="shimmer h-5 w-full mb-2" />
        <div className="shimmer h-5 w-5/6 mb-8" />
        {/* cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shimmer h-24 anim-scale-in" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
        {/* images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shimmer h-44 anim-fade-up" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        {/* button */}
        <div className="flex justify-center">
          <div className="shimmer h-11 w-44 rounded-full anim-fade-in" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */
function TrackPage() {
  const { trackId } = useParams();
  const { currentTrack, lessons, fetchTrackById } = useLearn();
  const { user, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || {};
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // --- add loading state for fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always scroll to top after reload (mount or trackId change)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [trackId]);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (trackId) {
      setLoading(true);
      // fetchTrackById can be sync or async, so wrap in a Promise
      Promise.resolve(fetchTrackById(trackId))
        .catch(() => {}) // error handling is inside useLearn()
        .finally(() => {
          if (mounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [trackId, fetchTrackById]);

  const isEnrolled = user?.enrolledTracks?.some(id => String(id) === String(trackId));

  const allLessonsCompleted = useMemo(
    () => lessons.length > 0 && lessons.every(l => l.completed),
    [lessons]
  );

  /* ── handlers ── */
  const handleEnroll = async () => {
    if (!trackId || !token) return;
    try {
      const res = await axios.post(
        'https://edumaster-backend-6xy5.onrender.com/api/users/enroll',
        { trackId: String(trackId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.enrolledTracks && res.data?.progress && setUser) {
        setUser(prev => prev ? {
          ...prev,
          enrolledTracks: res.data.enrolledTracks,
          progress: res.data.progress,
        } : prev);
      }
      toast.success(t.trackEnrolledSuccess || 'You have enrolled in this track!', { autoClose: 2500 });
      if (lessons.length > 0) navigate(`/tracks/${trackId}/lesson/${lessons[0]._id}`);
    } catch (err) {
      console.error('Enroll API error:', err?.response?.data || err.message);
    }
  };

  const handleContinueLearning = () => {
    if (lessons.length > 0) navigate(`/tracks/${trackId}/lesson/${lessons[0]._id}`);
  };

  /* ── scroll-observer for pref text cards ── */
  const prefTextRef = useRef(null);
  useEffect(() => {
    const container = prefTextRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.pref-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [currentTrack]);

  /* ── sub-renderers ── */
  const renderPrefText = (textArr) => (
    <div
      ref={prefTextRef}
      className="flex flex-col gap-5 mb-8"
    >
      {textArr?.map((txt, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`pref-card ${isLeft ? 'from-left' : 'from-right'} rounded-xl shadow p-5 text-lg leading-relaxed font-medium`}
            style={{
              background: 'var(--bg-color)',
              color: 'var(--p-color)',
              animationDelay: `${idx * 0.07}s`,
              borderLeft: isLeft ? '4px solid var(--second-color, #6366f1)' : 'none',
              borderRight: !isLeft ? '4px solid var(--second-color, #6366f1)' : 'none',
              alignSelf: isLeft ? 'flex-start' : 'flex-end',
              width: '92%',
            }}
          >
            {txt}
          </div>
        );
      })}
    </div>
  );

  const renderPrefImages = (imgArr) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3 mb-12">
      {imgArr?.map((img, idx) => (
        <div
          key={idx}
          className="img-card anim-scale-in rounded-xl shadow-lg overflow-hidden"
          style={{
            animationDelay: `${0.1 + idx * 0.07}s`,
            background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
          }}
        >
          <img
            src={img}
            alt={`Pref visual ${idx + 1}`}
            className="object-cover w-full h-44 md:h-52 lg:h-60"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  // -- Loading state: show sidebar and skeleton if loading or not currentTrack
  if (loading || !currentTrack) {
    return (
      <>
        <TracksSidebar />
        <TrackSkeleton />
      </>
    );
  }

  return (
    <>
      <TracksSidebar />
      <div
        className="px-5 py-10 flex flex-col gap-8 min-h-screen min-w-[340px]"
        style={{ background: 'var(--bg-color)' }}
        dir={dir}
      >
        {/* ── hero card ── */}
        <div
          className="anim-scale-in rounded-2xl shadow-2xl border p-8 mb-8"
          style={{
            background: 'var(--main-color)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* floating decoration */}
          <div
            className="float-icon anim-fade-in delay-200 text-5xl text-center mb-2 select-none"
            style={{ opacity: 0.25 }}
          >
            🎓
          </div>

          {/* title */}
          <h1
            className="anim-fade-up delay-100 text-4xl text-center font-bold tracking-tight drop-shadow-lg mb-4"
            style={{ color: 'var(--text-color)' }}
          >
            {currentTrack?.title}
          </h1>

          {/* description */}
          {currentTrack?.description && (
            <p
              className="anim-fade-up delay-200 text-lg mb-6 text-center"
              style={{ color: 'var(--p-color)' }}
            >
              {currentTrack.description}
            </p>
          )}

          {/* divider */}
          <div
            className="anim-fade-in delay-300 mx-auto mb-8 rounded-full"
            style={{
              height: '2px',
              width: '60%',
              background: 'linear-gradient(90deg, transparent, var(--second-color, #6366f1), transparent)',
            }}
          />

          {/* About section */}
          {currentTrack?.prefInfo?.text?.length > 0 && (
            <div className="anim-fade-up delay-300 mb-2">
              <h2
                className="section-heading text-2xl font-semibold mb-4 tracking-tight"
                style={{ color: 'var(--text-color)' }}
              >
                {t.trackAboutTrack || 'About this Track'}
              </h2>
              {renderPrefText(currentTrack.prefInfo.text)}
            </div>
          )}

          {/* Visual Highlights */}
          {currentTrack?.prefInfo?.images?.length > 0 && (
            <div className="anim-fade-up delay-400">
              <h2
                className="section-heading text-2xl font-semibold mb-4 tracking-tight"
                style={{ color: 'var(--text-color)' }}
              >
                {t.trackVisualHighlights || 'Visual Highlights'}
              </h2>
              {renderPrefImages(currentTrack.prefInfo.images)}
            </div>
          )}

          {/* CTA button */}
          <div className="anim-fade-up delay-500 w-full flex justify-center mt-6">
            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                className="btn-enroll px-10 py-3 rounded-full font-semibold text-base shadow-lg cursor-pointer"
                style={{
                  background: 'var(--second-color)',
                  color: 'var(--text-color)',
                }}
              >
                {t.trackEnrollNow || 'Enroll Now'}
              </button>
            ) : (
              <button
                onClick={handleContinueLearning}
                className="btn-enroll px-10 py-3 rounded-full font-semibold text-base shadow-lg cursor-pointer"
                style={{
                  background: 'var(--second-color)',
                  color: 'var(--text-color)',
                }}
              >
                {t.dashboardContinueLearning || 'Continue Learning'}
              </button>
            )}
          </div>

          {/* Final quiz reveal */}
          {isEnrolled && allLessonsCompleted && (
            <div className="quiz-reveal mt-8">
              <TrackFinalQuiz track={currentTrack} lessons={lessons} canShow />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TrackPage;