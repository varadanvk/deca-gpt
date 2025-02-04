"use server"

import { generateText } from "ai"
import { openaiConfig } from "../config/openai"
import { decaEvents, performanceIndicators, twentyFirstCenturySkills } from "../data/deca-data"
import type { RoleplayScenario } from "../types/deca"

export async function generateRoleplay(eventId: string) {
  const event = decaEvents.find((e) => e.id === eventId)
  if (!event) throw new Error("Event not found")

  const clusterPIs = performanceIndicators[event.cluster as keyof typeof performanceIndicators] || []

  const prompt = `You are a JSON generator. Output only pure JSON without any explanation, markdown, or code blocks.
  
  Generate a DECA roleplay scenario with these requirements:
  - Event: ${event.name} (${event.id})
  - Cluster: ${event.cluster}
  - Must include all 21st Century Skills: ${twentyFirstCenturySkills.join(", ")}
  - Must use these Performance Indicators: ${clusterPIs.join(", ")}
  
  The scenario should be realistic, challenging, and business-focused.
  
  Return ONLY valid JSON matching this exact structure, nothing else:
  {
    "eventId": "${eventId}",
    "eventName": "${event.name}",
    "cluster": "${event.cluster}",
    "instructionalArea": "string",
    "twentyFirstCenturySkills": ${JSON.stringify(twentyFirstCenturySkills)},
    "performanceIndicators": ${JSON.stringify(clusterPIs)},
    "situation": {
      "role": "string",
      "context": "string",
      "task": "string"
    }
  }`

  try {
    const { text } = await generateText({
      model: openaiConfig("llama-3.3-70b"),
      prompt,
      temperature: 0.7,
      max_tokens: 1000,
    })

    // Clean and validate the response
    const cleanedText = text.replace(/```json|```/g, '').trim()
    
    try {
      const parsed = JSON.parse(cleanedText) as RoleplayScenario
      // Validate required fields
      if (!parsed.eventId || !parsed.situation) {
        throw new Error('Missing required fields in response')
      }
      return parsed
    } catch (parseError) {
      console.error('Invalid JSON response:', cleanedText)
      throw new Error('Failed to parse roleplay scenario')
    }
  } catch (error) {
    console.error('Generation error:', error)
    throw new Error('Failed to generate roleplay scenario')
  }
}

export async function evaluateResponse(eventId: string, scenario: RoleplayScenario, response: string) {
  const prompt = `Evaluate this DECA roleplay response following the official DECA evaluation criteria.
  
  Event: ${scenario.eventName} (${eventId})
  Scenario: ${scenario.situation.context}
  Task: ${scenario.situation.task}
  
  Performance Indicators to evaluate:
  ${scenario.performanceIndicators.join("\n")}
  
  21st Century Skills to evaluate:
  ${scenario.twentyFirstCenturySkills.join("\n")}
  
  Participant's Response:
  ${response}
  
  Provide a detailed evaluation following this format:
  {
    "performanceIndicators": [
      {
        "indicator": "string",
        "score": number (0-14),
        "feedback": "string"
      }
    ],
    "twentyFirstCenturySkills": [
      {
        "skill": "string",
        "score": number (0-6),
        "feedback": "string"
      }
    ],
    "overallImpression": {
      "score": number (0-6),
      "feedback": "string"
    },
    "totalScore": number,
    "generalFeedback": "string"
  }`

  const { text } = await generateText({
    model: openaiConfig("gpt-3.5-turbo"),
    prompt,
  })

  return JSON.parse(text)
}

