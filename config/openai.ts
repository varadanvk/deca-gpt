import { createOpenAI } from "@ai-sdk/openai"

if (!process.env.CEREBRAS_API_KEY) {
  throw new Error("Missing CEREBRAS_API_KEY environment variable")
}

export const openaiConfig = createOpenAI({
  apiKey: process.env.CEREBRAS_API_KEY,
  baseURL: "https://api.cerebras.ai/v1",
  compatibility: "strict",
})

