"use client"

import { useState } from "react"
import UploadForm from "../components/UploadForm"
import TranslatedSubtitles from "../components/TranslatedSubtitles"
import LanguageSelector from "../components/LanguageSelector"
import LoadingSpinner from "../components/LoadingSpinner"
import translateText from "../utils/translate"

const Home = () => {
  const [translatedText, setTranslatedText] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (fileContent) => {
    setLoading(true)
    try {
      const translated = await translateText(fileContent, selectedLanguage)
      setTranslatedText(translated)
    } catch (error) {
      console.error("Translation error:", error)
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Subtitle Translation</h1>
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      <UploadForm onSubmit={handleFileUpload} />
      {loading && <LoadingSpinner />}
      {translatedText && (
        <TranslatedSubtitles translatedText={translatedText} />
      )}
    </div>
  )
}

export default Home
