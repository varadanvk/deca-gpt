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
  
  Event: ${event.name} (${event.id})
  Cluster: ${event.cluster}
  Must include all 21st Century Skills: ${twentyFirstCenturySkills.join(", ")}
  Must use these Performance Indicators: ${clusterPIs.sort(() => 0.5 - Math.random()).slice(0, event.numPIs).join(", ")}
  
  The scenario should closely follow this format:
  
  1. **EVENT SITUATION**  
     - Describe the participant’s role in relation to the business.  
     - Introduce the company, its industry, and key operations.  
  
  2. **BUSINESS CONTEXT**  
     - Explain the competitive environment, current challenges, and goals.  
     - Highlight a recent change, trend, or business issue that requires attention.  
  
  3. **MARKET INSIGHT & CHALLENGE**  
     - Provide at least one relevant statistic, consumer trend, or financial insight to support the challenge.  
     - Clearly outline why the company needs to act.  
  
  4. **TASK & ROLE-PLAY SETUP**  
     - Clearly state the task the participant must complete.  
     - Frame the scenario as a business meeting or role-play interaction with a stakeholder (e.g., CEO, business partner, client).  
     - Specify that the participant will present ideas and answer follow-up questions.  

  Here is an example scenario (your output should be similar in length, format, and amount of detail):
  "You are to assume the role of the owner of EDUCATION PLUS, a new store located in a city with a large school district that sells classroom supplies, arts and crafts supplies and décor. Your business partner (judge) wants you to determine how to get more online customer reviews.
EDUCATION PLUS sells a wide variety of merchandise in store and online for classroom and homeschool educators, daycare providers and parents. There are no other physical stores in the area that sell this type of merchandise. The store opened last month with sales that exceeded expectations. Online sales have also been successful but have not surpassed goals.
Your business partner (judge) read that 87% of consumers say their purchasing decision making is influenced by real customer reviews. In addition, 56% of consumers report they would not buy a product at all without checking online customer reviews and ratings. Your business partner (judge) feels that EDUCATION PLUS would benefit from having online reviews and ratings of the business and its products.
Your business partner (judge) has asked you to determine how to get both online and in-person customers to leave online reviews of products and the store.
You will present your ideas to your business partner (judge) in a role-play to take place in the business partner’s (judge’s) office. The business partner (judge) will begin the role-play by greeting you and asking to hear your ideas. After you have presented your ideas and have answered the business partner’s (judge’s) questions, the business partner (judge) will conclude the role-play by thanking you for your work."
  
  Return ONLY valid JSON in this exact structure, nothing else: 
  {
    "eventId": "${event.id}",
    "eventName": "${event.name}",
    "cluster": "${event.cluster}",
    "instructionalArea": "string",
    "twentyFirstCenturySkills": ${JSON.stringify(twentyFirstCenturySkills)},
    "performanceIndicators": ${JSON.stringify(clusterPIs.sort(() => 0.5 - Math.random()).slice(0, event.numPIs))},
    "situation": "string"
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

