// pages/MyQuizzesPage.jsx
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import useAuth from '../hooks/useAuth';

function MyQuizzesPage() {
    const { myQuizzes, fetchMyQuizzes } = useContext(QuizContext);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) fetchMyQuizzes();
    }, [token]);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Quizzes</h1>
            <div className="grid gap-4">
                {myQuizzes.map(quiz => (
                    <div key={quiz._id} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all">
                        <h3 className="text-xl font-semibold mb-2">{quiz.fileName}</h3>
                        <p className="text-gray-600 mb-2">{quiz.questions.length} questions</p>
                        <p className="text-sm text-gray-500 mb-4">Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        <button
                            onClick={() => navigate(`/quiz-review/${quiz._id}`)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Review Quiz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyQuizzesPage;
