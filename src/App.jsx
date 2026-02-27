import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './fetures/Dashboard/Dashboard'
import TestPage from './fetures/Test/TestPage'
import LearnPage from './fetures/Learn/LearnPage'
import TrackPage from './fetures/Learn/TrackPage'
import Register from './pages/Register/Register'
import Login from './pages/Register/Login'
import Lesson from './fetures/Learn/Lesson'
import CoursesPage from './pages/CoursesPage'
import StatisticsPage from './pages/StatisticsPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* learn pages  */}
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/tracks/:trackId" element={<TrackPage />} />
          <Route path="/tracks/:trackId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/courses" element={<CoursesPage />} />
          {/* test pages  */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* pages  */}
          <Route path="/statistcs" element={<StatisticsPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
