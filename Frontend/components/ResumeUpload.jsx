import React from 'react'

const ResumeUpload = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md max-w-2xl w-full">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
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
            type="file"
            accept=".pdf,.docx,.doc"
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
          />
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md">
        Analyze Resume
      </button>
    </div>
  )
}

export default ResumeUpload