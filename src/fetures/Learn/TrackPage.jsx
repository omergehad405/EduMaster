import React, { useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TracksSidebar from './TracksSidebar';
import useLearn from '../../hooks/useLearn';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import TrackFinalQuiz from './TrackFinalQuiz';

function TrackPage() {
  const { trackId } = useParams();
  const { currentTrack, lessons, fetchTrackById } = useLearn();
  const { user, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (trackId) {
      fetchTrackById(trackId);
    }
  }, [trackId, fetchTrackById]);

  const isEnrolled = user?.enrolledTracks?.some(id => String(id) === String(trackId));

  const allLessonsCompleted = useMemo(
    () => lessons.length > 0 && lessons.every((l) => l.completed),
    [lessons]
  );

  const handleEnroll = async () => {
    if (!trackId || !token) {
      console.error("Missing trackId or token");
      return;
    }

    try {
      const res = await axios.post(
        "https://edumaster-backend-6xy5.onrender.com/api/users/enroll",
        { trackId: String(trackId) }, // convert to string
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.enrolledTracks && res.data?.progress && setUser) {
        setUser(prev => prev ? {
          ...prev,
          enrolledTracks: res.data.enrolledTracks,
          progress: res.data.progress,
        } : prev);
      }
      toast.success('You have enrolled in this track!', { autoClose: 2500 });
      // Redirect to first lesson automatically
      if (lessons.length > 0) {
        navigate(`/tracks/${trackId}/lesson/${lessons[0]._id}`);
      }
    } catch (err) {
      console.error("Enroll API error:", err?.response?.data || err.message);
    }
  };

  const handleContinueLearning = () => {
    if (lessons.length > 0) {
      navigate(`/tracks/${trackId}/lesson/${lessons[0]._id}`);
    }
  };

  const renderPrefText = (textArr) => (
    <div className="grid md:grid-cols-2 gap-5 mb-8">
      {textArr?.map((txt, idx) => (
        <div
          key={idx}
          className="bg-(--bg-color) text-gray-400 rounded-xl shadow p-5 text-lg leading-relaxed font-medium"
        >
          {txt}
        </div>
      ))}
    </div>
  );

  const renderPrefImages = (imgArr) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3 mb-12">
      {imgArr?.map((img, idx) => (
        <div
          key={idx}
          className="rounded-xl shadow-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-300 hover:scale-105 transition-transform duration-200"
        >
          <img
            src={img}
            alt={`Pref visual ${idx + 1}`}
            className="object-cover w-full h-44 md:h-52 lg:h-60 transition-all duration-200 hover:brightness-95"
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <TracksSidebar />
      <div className="px-5 py-10 flex flex-col gap-8 bg-(--bg-color) min-h-screen min-w-[340px]">
        <div className="bg-(--main-color) p-8 rounded-2xl shadow-2xl border border-blue-100/20 mb-8">
          <h1 className="text-4xl font-bold text-(--text-color) tracking-tight drop-shadow-lg mb-4">
            {currentTrack?.title}
          </h1>
          {currentTrack?.description && (
            <p className="text-lg text-(--p-color) mb-4 max-w-2xl">{currentTrack.description}</p>
          )}

          {/* Pref Info */}
          {currentTrack?.prefInfo?.text?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-(--text-color) mb-2 tracking-tight">
                About this Track
              </h2>
              {renderPrefText(currentTrack.prefInfo.text)}
            </div>
          )}
          {currentTrack?.prefInfo?.images?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-(--text-color) mb-2 tracking-tight">
                Visual Highlights
              </h2>
              {renderPrefImages(currentTrack.prefInfo.images)}
            </div>
          )}

          {/* Enroll or Continue Learning Button */}
          {!isEnrolled ? (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleEnroll}
                className="bg-(--second-color) cursor-pointer text-(--text-color) px-8 py-2 rounded-full font-semibold shadow hover:brightness-105 transition disabled:opacity-50"    >
                Enroll Now
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleContinueLearning}
                className="bg-(--second-color) cursor-pointer text-(--text-color) px-8 py-2 rounded-full font-semibold shadow hover:brightness-105 transition disabled:opacity-50"  >
                Continue Learning
              </button>
            </div>
          )}

          {/* Final big quiz for the whole track */}
          {isEnrolled && allLessonsCompleted && (
            <TrackFinalQuiz track={currentTrack} lessons={lessons} canShow />
          )}
        </div>
      </div>
    </>
  );
}

export default TrackPage;