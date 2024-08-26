import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
})

const splitText = (text, maxTokens) => {
  const sentences = text.split(/\r?\n/)
  let chunks = []
  let currentChunk = ""

  sentences.forEach((sentence) => {
    if ((currentChunk + sentence).length > maxTokens) {
      chunks.push(currentChunk)
      currentChunk = ""
    }
    currentChunk += sentence + "\n"
  })

  if (currentChunk) chunks.push(currentChunk)
  return chunks
}

const translateText = async (text, targetLanguage) => {
  const chunks = splitText(text, 1500) // Split into chunks of approximately 1500 characters
  let translatedChunks = []

  for (const chunk of chunks) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Translate the following text into ${targetLanguage}:`,
        },
        { role: "user", content: chunk },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    translatedChunks.push(response.choices[0].message.content)
  }

  return translatedChunks.join("\n")
}

export default translateText
