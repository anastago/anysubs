// components/TranslatedSubtitles.js
import React from "react"

const TranslatedSubtitles = ({ translatedText }) => {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Translated Subtitles</h2>
      <pre className="whitespace-pre-wrap">{translatedText}</pre>
    </div>
  )
}

export default TranslatedSubtitles
