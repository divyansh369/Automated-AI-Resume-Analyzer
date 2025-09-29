import { useState } from 'react'
import './App.css'
import ResumeUpload from '../components/ResumeUpload.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Resume Analyzer</h1>
      <ResumeUpload />
    </div>
  )
}

export default App