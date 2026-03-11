import React from "react";
import { useNavigate } from "react-router-dom";
import useLearn from "../../hooks/useLearn";

function LessonsSidebar({ trackId, unlockedLessonId }) {
  const { lessons, loading } = useLearn();
  const navigate = useNavigate();

  if (loading) return <p className="text-(--p-color)">Loading lessons...</p>;

  const handleLessonClick = (lesson, isLocked) => {
    if (isLocked || !trackId) return;
    navigate(`/tracks/${trackId}/lesson/${lesson._id}`);
  };

  return (
    <div className="bg-(--main-color) lg:w-64 w-full p-5 flex flex-wrap items-center lg:flex-col gap-2">
      {lessons.length === 0 ? (
        <p className="text-(--p-color)">No lessons available.</p>
      ) : (
        lessons.map((lesson) => {
          const isLocked = lesson.locked && lesson._id !== unlockedLessonId;

          return (
            <div
              key={lesson._id}
              onClick={() => handleLessonClick(lesson, isLocked)}
              className={`w-[200px] h-[50px] py-2 px-3 rounded-md flex justify-between items-center cursor-pointer 
                ${isLocked
                  ? "bg-gray-700 text-(--p-color) cursor-not-allowed"
                  : "bg-blue-500 text-(--text-color) hover:bg-white hover:text-blue-500"
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