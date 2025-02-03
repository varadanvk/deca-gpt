"use server"

import { generateText } from "ai"
import { openaiConfig } from "../config/openai"
import { decaEvents, performanceIndicators, twentyFirstCenturySkills } from "../data/deca-data"
import type { RoleplayScenario } from "../types/deca"

export async function generateRoleplay(eventId: string) {
  const event = decaEvents.find((e) => e.id === eventId)
  if (!event) throw new Error("Event not found")

  const clusterPIs = performanceIndicators[event.cluster as keyof typeof performanceIndicators] || []

  const prompt = `Create a DECA roleplay scenario for ${event.name} (${event.id}) in the ${event.cluster} cluster.
  Format the response as a detailed roleplay scenario following this exact structure:
  
  1. Event details should include:
     - Event ID and name
     - Career cluster
     - Instructional area
  
  2. Include these exact 21st Century Skills:
  ${twentyFirstCenturySkills.join("\n")}
  
  3. Use these performance indicators for ${event.cluster}:
  ${clusterPIs.join("\n")}
  
  4. Create a detailed scenario that includes:
     - The participant's role (e.g., owner, manager, consultant)
     - Business context and background
     - Specific task or problem to solve
  
  Format as JSON matching the RoleplayScenario type.
  Make the scenario realistic, challenging, and relevant to current business trends.`

  const { text } = await generateText({
    model: openaiConfig("gpt-3.5-turbo"),
    prompt,
  })

  return JSON.parse(text) as RoleplayScenario
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

