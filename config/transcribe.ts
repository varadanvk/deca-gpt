import OpenAI from "openai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable")
}

export const transcribeConfig = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

console.log(transcribeConfig)