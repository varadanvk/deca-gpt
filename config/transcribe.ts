import { createOpenAI } from "@ai-sdk/openai"

//TODO: Use the openai package and not the ai sdk package for simplicity's sake (also I dont think STT is implemented in the ai sdk package)

export const transcribeConfig = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
})

console.log(transcribeConfig)