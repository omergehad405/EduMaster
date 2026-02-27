import React from "react";
import { useNavigate } from "react-router-dom";
import useLearn from "../../hooks/useLearn";

function LessonsSidebar({ trackId, unlockedLessonId }) {
  const { lessons, loading } = useLearn();
  const navigate = useNavigate();

  if (loading) return <p className="text-gray-400">Loading lessons...</p>;

  const handleLessonClick = (lesson, isLocked) => {
    if (isLocked || !trackId) return;
    navigate(`/tracks/${trackId}/lesson/${lesson._id}`);
  };

  return (
    <div className="bg-gray-800 w-64 p-5 flex flex-col gap-2">
      {lessons.length === 0 ? (
        <p className="text-gray-400">No lessons available.</p>
      ) : (
        lessons.map((lesson) => {
          const isLocked = lesson.locked && lesson._id !== unlockedLessonId;

          return (
            <div
              key={lesson._id}
              onClick={() => handleLessonClick(lesson, isLocked)}
              className={`py-2 px-3 rounded-md flex justify-between items-center cursor-pointer 
                ${
                  isLocked
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-white hover:text-blue-500"
                }`}
            >
              <span>{lesson.title}</span>
              {lesson.completed && <span>✔</span>}
            </div>
          );
        })
      )}
    </div>
  );
}

export default LessonsSidebar;