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
        "http://localhost:5000/api/users/enroll",
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
          className="bg-white/70 text-gray-800 rounded-xl shadow p-5 text-lg leading-relaxed font-medium"
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
      <div className="px-8 md:px-20 py-10 flex flex-col gap-8 bg-linear-to-b from-slate-900 via-gray-900 to-gray-800 min-h-screen min-w-[340px]">
        <div className="bg-white/10 p-8 rounded-2xl shadow-2xl border border-blue-100/20 mb-8">
          <h1 className="text-4xl font-bold text-indigo-200 tracking-tight drop-shadow-lg mb-4">
            {currentTrack?.title}
          </h1>
          {currentTrack?.description && (
            <p className="text-lg text-gray-300 mb-4 max-w-2xl">{currentTrack.description}</p>
          )}

          {/* Pref Info */}
          {currentTrack?.prefInfo?.text?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-indigo-100 mb-2 tracking-tight">
                About this Track
              </h2>
              {renderPrefText(currentTrack.prefInfo.text)}
            </div>
          )}
          {currentTrack?.prefInfo?.images?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-indigo-100 mb-2 tracking-tight">
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
                className="bg-linear-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold text-lg rounded-full py-4 px-12 shadow-xl transition-all duration-200 outline-none border-2 border-indigo-400/40 hover:border-indigo-600"
              >
                Enroll Now
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleContinueLearning}
                className="bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-green-600 text-white font-bold text-lg rounded-full py-4 px-12 shadow-xl transition-all duration-200 outline-none border-2 border-green-400/40 hover:border-green-600"
              >
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