import React, { useState } from 'react'
import axios from 'axios';
import AnalysisResult from './AnalysisResult';

const ResumeUpload = () => {
  const [textData, setTextData] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [result,setResult] = useState(null)

  const handleTextChange = (e) => {
    setTextData(e.target.value)
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!textData || !selectedFile) {
      alert('Please provide both job description and resume file.')
      return
    }
    
    //step 1. create a FormData object
    const formData = new FormData()

    //step 2. append the file to the FormData object, the 'resume' key should match the backend expectation
    formData.append('resume', selectedFile)

    //step 3. append the text data to the FormData object
    formData.append('jobDescription', textData)

    //step 4. send the formData to the backend (this is a placeholder, replace with actual API call)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      setResult(data)
      console.log('Success:', data)
    } catch (error) {
      console.error('Error uploading file:', error)    
    }
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-2xl w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea 
            onChange={handleTextChange} 
            value={textData}
            placeholder="Paste the job description here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
            rows="6"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume
          </label>
          <div className="relative">
            <input 
              onChange={handleFileChange}
              type="file"
              accept=".pdf,.docx,.doc"
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
        >
          Analyze Resume  
        </button>
      </form>

      {result && (
        <div>
          <AnalysisResult result={result}/>
        </div>
      )}

    </div>
  )
}

export default ResumeUpload