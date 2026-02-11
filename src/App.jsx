import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './fetures/Dashboard/Dashboard'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />                    {/* OUTSIDE Routes */}
      <main className="flex-1">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other missing routes */}
          <Route path="/learn" element={<div>Learn Page</div>} />
          <Route path="/test" element={<div>Test Page</div>} />
        </Routes>
      </main>
      <Footer />                     {/* OUTSIDE Routes */}
    </div>
  )
}

export default App
