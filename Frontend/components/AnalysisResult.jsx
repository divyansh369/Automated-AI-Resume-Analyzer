import React from 'react'

const AnalysisResult = ({ result }) => {
  const {
    filename,
    total_unique_words_count,
    missing_words,
    match_percentage,
    list_of_matched_words,
    list_of_missing_words
  } = result || {}

  // Determine color based on match percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMatchBgColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-100'
    if (percentage >= 50) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="w-full mt-8 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <p className="text-sm text-gray-500 mt-1">Resume: {filename}</p>
      </div>

      {/* Match Percentage Card */}
      <div className={`${getMatchBgColor(match_percentage)} rounded-lg p-6 border-l-4 ${match_percentage >= 75 ? 'border-green-600' : match_percentage >= 50 ? 'border-yellow-600' : 'border-red-600'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Match Score</p>
            <p className={`text-4xl font-bold ${getMatchColor(match_percentage)} mt-2`}>
              {match_percentage}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Keywords</p>
            <p className="text-2xl font-semibold text-gray-800">{total_unique_words_count}</p>
          </div>
        </div>
      </div>

      {/* Matched Keywords */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Matched Keywords ({list_of_matched_words?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-2">
          {list_of_matched_words && list_of_matched_words.length > 0 ? (
            list_of_matched_words.map((word, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No matched keywords found</p>
          )}
        </div>
      </div>

      {/* Missing Keywords */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Missing Keywords ({list_of_missing_words ?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-2">
          {list_of_missing_words && list_of_missing_words.length > 0 ? (
            list_of_missing_words.map((word, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">All keywords matched!</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {list_of_missing_words && list_of_missing_words.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Recommendations</h3>
          <p className="text-sm text-blue-800">
            Consider adding these missing keywords to your resume to improve your match score. 
            Focus on the most relevant ones based on your actual experience.
          </p>
        </div>
      )}
    </div>
  )
}

export default AnalysisResult