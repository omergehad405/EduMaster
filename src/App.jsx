import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './fetures/Dashboard/Dashboard'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<div>Learn Page</div>} />
          <Route path="/test" element={<div>Test Page</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
