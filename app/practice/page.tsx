"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, Square, ArrowRight, Play, Pause, Clock, MessageCircle, Send } from "lucide-react"

// Complete DECA events data
// Complete DECA events data with number of Performance Indicators (numPIs)
const decaEvents = [
  // Principles of Business Administration Events (10 min prep, 10 min presentation, 4 PIs, 0–18 each, 4 skills, 0–7 each)
  { 
    id: "PBM", 
    name: "Principles of Business Management and Administration", 
    cluster: "Principles of Business Administration Events", 
    prepTime: 10, 
    presentationTime: 10, 
    numPIs: 4,
    piPoints: 18,
    centurySkills: {
      numSkills: 4,
      skillPoints: 7,
      skills: [
        "Reason effectively and use systems thinking",
        "Communicate clearly",
        "Show evidence of creativity",
        "Overall impression and responses to the judge’s questions"
      ]
    }
  },
  { id: "PEN", name: "Principles of Entrepreneurship", cluster: "Principles of Business Administration Events", prepTime: 10, presentationTime: 10, numPIs: 4, piPoints: 18,
    centurySkills: { numSkills: 4, skillPoints: 7, skills: ["Reason effectively and use systems thinking","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "PFN", name: "Principles of Finance", cluster: "Principles of Business Administration Events", prepTime: 10, presentationTime: 10, numPIs: 4, piPoints: 18,
    centurySkills: { numSkills: 4, skillPoints: 7, skills: ["Reason effectively and use systems thinking","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "PHT", name: "Principles of Hospitality and Tourism", cluster: "Principles of Business Administration Events", prepTime: 10, presentationTime: 10, numPIs: 4, piPoints: 18,
    centurySkills: { numSkills: 4, skillPoints: 7, skills: ["Reason effectively and use systems thinking","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "PMK", name: "Principles of Marketing", cluster: "Principles of Business Administration Events", prepTime: 10, presentationTime: 10, numPIs: 4, piPoints: 18,
    centurySkills: { numSkills: 4, skillPoints: 7, skills: ["Reason effectively and use systems thinking","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},

  // Team Decision Making Events (30 min prep, 15 min presentation, 7 PIs, 0–14 each, 5 skills, 0–6 each)
  { id: "BLTDM", name: "Business Law and Ethics", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "BTDM", name: "Buying and Merchandising", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "ETDM", name: "Entrepreneurship", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "FTDM", name: "Financial Services", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "HTDM", name: "Hospitality Services", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "MTDM", name: "Marketing Management", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "STDM", name: "Sports and Entertainment Marketing", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "TTDM", name: "Travel and Tourism", cluster: "Team Decision Making Events", prepTime: 30, presentationTime: 15, numPIs: 7, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},

  // Individual Series Events (10 min prep, 10 min presentation, 5 PIs, 0–14 each, 5 skills, 0–6 each)
  { id: "ACT", name: "Accounting Applications", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "AAM", name: "Apparel and Accessories Marketing", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "ASM", name: "Automotive Services Marketing", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "BFS", name: "Business Finance", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "BSM", name: "Business Services Marketing", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "ENT", name: "Entrepreneurship", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "FMS", name: "Food Marketing", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "HLM", name: "Hotel and Lodging Management", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "HRM", name: "Human Resources Management", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "MCS", name: "Marketing Communications", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "QSRM", name: "Quick Serve Restaurant Management", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "RFSM", name: "Restaurant and Food Service Management", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "RMS", name: "Retail Merchandising", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},
  { id: "SEM", name: "Sports and Entertainment Marketing", cluster: "Individual Series Events", prepTime: 10, presentationTime: 10, numPIs: 5, piPoints: 14,
    centurySkills: { numSkills: 5, skillPoints: 6, skills: ["Reason effectively and use systems thinking","Make judgments and decisions, and solve problems","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }},

  // Personal Financial Literacy Event (10 min prep, 10 min presentation, 3 PIs, 0–18 each, 4 skills, 0–7 each)
  { id: "PFL", name: "Personal Financial Literacy", cluster: "Personal Financial Literacy Event", prepTime: 10, presentationTime: 10, numPIs: 3, piPoints: 18,
    centurySkills: { numSkills: 4, skillPoints: 7, skills: ["Reason effectively and use systems thinking","Communicate clearly","Show evidence of creativity","Overall impression and responses to the judge’s questions"] }}
];



const getPerformanceIndicatorsFile = (eventId: string): string => {
  const baCore = ["PBM", "PEN", "PFN", "PHT", "PMK"]
  const baMgmt = ["BLTDM", "HRM"]
  const ent = ["ENT", "ETDM"]  // Removed duplicate PEN
  const fin = ["ACT", "BFS", "FTDM"]  // Removed non-existent FCE
  const ht = ["PHT", "HTDM", "HLM", "QSRM", "RFSM", "TTDM"]  // Fixed event IDs
  const mark = ["AAM", "ASM", "BSM", "BTDM", "FMS", "MCS", "MTDM", "RMS", "SEM", "STDM"]  // Cleaned up
  const pfl = ["PFL"]  // Personal Financial Literacy
  
  if (baCore.includes(eventId)) return "output-ba-core-definitions.json"
  if (baMgmt.includes(eventId)) return "output-ba-mgmt-definitions.json"
  if (ent.includes(eventId)) return "output-ent-definitions.json"
  if (fin.includes(eventId)) return "output-fin-definitions.json"
  if (ht.includes(eventId)) return "output-ht-definitions.json"
  if (mark.includes(eventId)) return "output-mark-definitions.json"
  if (pfl.includes(eventId)) return "output-pfl-definitions.json"
  
  return "output-ba-core-definitions.json"
}


// Load event scenario from file
// Load event scenario from file
// Load event scenario from public files using fetch

// NEW: Load ALL performance indicators from JSON file for intelligent selection
const loadAllPerformanceIndicators = async (eventId: string): Promise<PI[]> => {
  try {
    const fileName = getPerformanceIndicatorsFile(eventId)
    console.log(`Loading ALL PIs from: /data/${fileName}`)
    
    const response = await fetch(`/data/${fileName}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: PI[] = await response.json()
    console.log(`Loaded ${data.length} total PIs from JSON file`)
    
    // Filter PIs that include this eventId in their event array
    const eventPIs = data.filter((pi: PI) => 
      pi.event && Array.isArray(pi.event) && pi.event.includes(eventId)
    )
    
    console.log(`Found ${eventPIs.length} PIs applicable to event ${eventId}`)
    
    if (eventPIs.length === 0) {
      console.warn(`No PIs found for event ${eventId} in file ${fileName}`)
      return []
    }

    return eventPIs
    
  } catch (error) {
    console.error("Error loading all performance indicators:", error)
    return []
  }
}


// NEW: Use LLM to intelligently select the most relevant PIs based on scenario
// NEW: Use LLM to intelligently select the most relevant PIs based on scenario with randomization
const selectMostRelevantPIs = async (
  eventScenario: string, 
  eventName: string,
  allPIs: PI[], 
  numPIsNeeded: number,
  attemptNumber: number = 0
): Promise<string[]> => {
  try {
    console.log(`Using LLM to select ${numPIsNeeded} most relevant PIs from ${allPIs.length} candidates (attempt ${attemptNumber + 1})`)
    
    // Shuffle PIs to ensure variety across attempts
    const shuffledPIs = [...allPIs].sort(() => Math.random() - 0.5)
    
    const piList = shuffledPIs.map((pi, index) => 
      `${index + 1}. ${pi.name}\n   Definition: ${pi.definition}\n   Category: ${pi.category}`
    ).join('\n\n')

    // Add variety instruction based on attempt number
const varietyInstruction = attemptNumber > 0 
? `\n\nIMPORTANT: This is attempt ${attemptNumber + 1} for this event. Select DIFFERENT performance indicators than you might have chosen before to provide variety in practice scenarios.` 
: ""

const prompt = `You are an expert DECA competition designer. Given this roleplay scenario and list of available performance indicators, select the ${numPIsNeeded} MOST RELEVANT performance indicators for this specific scenario.

EVENT: ${eventName}

SCENARIO:
${eventScenario}

AVAILABLE PERFORMANCE INDICATORS (${shuffledPIs.length} total):
${piList}

Your task:
1. Analyze the scenario to understand what business skills/knowledge areas it tests
2. Select the ${numPIsNeeded} performance indicators that are MOST directly relevant to this scenario
3. Choose PIs that would allow a student to demonstrate the key competencies needed for this roleplay
4. Prioritize PIs that align with the scenario's business context and challenges
5. Ensure variety - don't always pick the most obvious choices${varietyInstruction}

Return ONLY a JSON array of the exact PI names (not numbers), like this:
["Performance Indicator Name 1", "Performance Indicator Name 2", "Performance Indicator Name 3"]

IMPORTANT: Return only the JSON array with no additional text or formatting.`

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'system',
            content: 'You are an expert DECA competition designer. Always return only valid JSON arrays of performance indicator names. Provide variety in your selections.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7 + (attemptNumber * 0.1) // Increase temperature for more variety on retries
      })
    })

    if (!response.ok) {
      throw new Error(`LLM API request failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No content returned from LLM')
    }

    console.log('LLM response for PI selection:', content)

    // Parse the JSON response
    try {
      const selectedPINames = JSON.parse(content.trim())
      
      if (!Array.isArray(selectedPINames)) {
        throw new Error('LLM response is not an array')
      }

      console.log(`LLM selected ${selectedPINames.length} PIs:`, selectedPINames)
      return selectedPINames.slice(0, numPIsNeeded) // Ensure we don't exceed the limit
      
    } catch (parseError) {
      console.error('Error parsing LLM response:', parseError)
      throw new Error('Failed to parse LLM response as JSON')
    }

  } catch (error) {
    console.error('Error in LLM PI selection:', error)
    
    // Fallback: return random selection of PI names
    console.log('Using randomized fallback PI selection')
    const shuffledPIs = [...allPIs].sort(() => Math.random() - 0.5)
    return shuffledPIs.slice(0, numPIsNeeded).map(pi => pi.name)
  }
}



const loadEventScenario = async (eventId: string): Promise<string> => {
  try {
    const filePath = `/roleplay-data/${eventId} Event.txt`
    console.log('Attempting to load scenario from:', filePath)
    const response = await fetch(filePath)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const fileContent = await response.text()
    console.log('Successfully loaded scenario for:', eventId)
    return fileContent
  } catch (error) {
    console.error('Error loading event file:', error)
    console.error('Attempted file path:', `/roleplay-data/${eventId} Event.txt`)
  }
  
  // Fallback to mock scenario if file loading fails
  console.warn('Using fallback scenario for event:', eventId)
  return `You are to assume the role of a business professional in a dynamic competitive environment. You have been tasked with analyzing a complex business situation and presenting strategic recommendations to senior leadership. Your presentation should demonstrate strong analytical thinking, clear communication, and practical business acumen.`
}

// Load judge scenario from file
const loadJudgeScenario = async (eventId: string): Promise<string> => {
  try {
    const filePath = `/roleplay-data/${eventId} Judge.txt`
    console.log('Attempting to load judge scenario from:', filePath)
    const response = await fetch(filePath)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const fileContent = await response.text()
    console.log('Successfully loaded judge scenario for:', eventId)
    return fileContent
  } catch (error) {
    console.error('Error loading judge file:', error)
    console.error('Attempted file path:', `/roleplay-data/${eventId} Judge.txt`)
  }
  
  // Fallback to generic judge role if file loading fails
  console.warn('Using fallback judge role for event:', eventId)
  return `You are an experienced DECA judge evaluating this roleplay scenario. You should ask probing questions to test the participant's knowledge and provide constructive feedback based on their demonstration of the performance indicators.`
}


// Define PI interface
interface PI {
  id: number;
  code: string;
  name: string;
  definition: string;
  cluster: string;
  category: string;
  level: string;
  event: string[];
}


// Load performance indicators from JSON file
// Fixed loadPerformanceIndicators function
const loadPerformanceIndicators = async (eventId: string): Promise<string[]> => {
  try {
    const fileName = getPerformanceIndicatorsFile(eventId)
    const response = await fetch(`/data/${fileName}`)

    if (!response.ok) {
      throw new Error(`Failed to load performance indicators for ${eventId}`)
    }

    const data = await response.json()

    const selectedEvent = decaEvents.find(e => e.id === eventId)
    const numPIs = selectedEvent?.numPIs || 5

    const eventPIs = data.filter(
      (pi: any) => pi.event && Array.isArray(pi.event) && pi.event.includes(eventId)
    )

    return eventPIs.slice(0, numPIs).map((pi: any) => pi.name)
  } catch (error) {
    console.error("Error loading performance indicators:", error)
  }

  return [
    "Analyze business situations effectively",
    "Develop strategic recommendations",
    "Present findings clearly and persuasively",
    "Consider ethical implications in decision making",
    "Evaluate implementation feasibility",
  ]
}


// Alternative approach using fetch (since you're also using fetch elsewhere)
const loadPerformanceIndicatorsFetch = async (eventId: string): Promise<string[]> => {
  try {
    const fileName = getPerformanceIndicatorsFile(eventId)
    const response = await fetch(`/data/${fileName}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json() // Array of PI objects

    // Find the selected event to get its numPIs value
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    const numPIs = selectedEvent?.numPIs || 5

    // Filter PIs that include this eventId in their event array
    const eventPIs = data.filter((pi: any) => 
      pi.event && Array.isArray(pi.event) && pi.event.includes(eventId)
    )

    console.log(`Found ${eventPIs.length} PIs for event ${eventId}`)

    if (eventPIs.length === 0) {
      console.warn(`No PIs found for event ${eventId} in file ${fileName}`)
      return [
        "Analyze business situations effectively",
        "Develop strategic recommendations", 
        "Present findings clearly and persuasively"
      ].slice(0, numPIs)
    }

    // Take the correct number and extract the name field
    const indicators = eventPIs
      .slice(0, numPIs) // Get the right number of PIs
      .map((pi: any) => pi.name) // Extract the name field

    return indicators
  } catch (error) {
    console.error("Error loading performance indicators:", error)
    
    // Return fallback
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    const numPIs = selectedEvent?.numPIs || 5
    
    return [
      "Analyze business situations effectively",
      "Develop strategic recommendations", 
      "Present findings clearly and persuasively",
      "Consider ethical implications in decision making",
      "Evaluate implementation feasibility"
    ].slice(0, numPIs)
  }
}



// Helper: Ask GPT to select the most relevant PIs
const selectRelevantPIs = async (
  eventScenario: string,
  candidatePIs: string[],
  numPIs: number
): Promise<string[]> => {
  const prompt = `You are an expert DECA competition designer. 
Given the following roleplay scenario and a list of possible performance indicators, 
choose the ${numPIs} most relevant performance indicators. 

Scenario:
${eventScenario}

Candidate Performance Indicators:
${candidatePIs.map((pi, i) => `${i + 1}. ${pi}`).join("\n")}

Output ONLY a JSON array of the selected performance indicators, no extra text. Example:
["PI1", "PI2", "PI3", "PI4"]
`

const response = await fetch("/api/roleplay", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama-4-maverick-17b-128e-instruct",
    messages: [{ role: "user", content: "Hello from Next.js" }],
  }),
})

const result = await response.json()
console.log("AI Result:", result)


  if (!response.ok) throw new Error(`PI selection failed: ${response.status}`)

  const data = await response.json()
  const content = data.choices[0]?.message?.content
  try {
    return JSON.parse(content)
  } catch (e) {
    console.error("Error parsing PI selection:", e, content)
    return candidatePIs.slice(0, numPIs) // fallback
  }
}



// Generate random business context for scenario variety
const generateRandomBusinessContext = (eventId: string) => {
  const restaurantContexts = [
    {
      companyName: "Coastal Eats", industry: "fast-casual dining", location: "Marina District, San Francisco",
      size: "12 employees (3 full-time managers, 9 part-time staff)", roleTitle: "Operations Manager",
      judgeRole: "Regional Director", challengeTheme: "implementing sustainable packaging solutions while maintaining cost efficiency"
    },
    {
      companyName: "Urban Bistro Group", industry: "restaurant management", location: "Downtown Portland",
      size: "25 employees across 2 locations", roleTitle: "District Manager", 
      judgeRole: "Vice President of Operations", challengeTheme: "developing a mobile ordering system to compete with major chains"
    },
    {
      companyName: "Valley Fresh Kitchen", industry: "health-focused quick service", location: "Palo Alto, California",
      size: "18 employees (4 managers, 14 associates)", roleTitle: "General Manager",
      judgeRole: "Franchise Owner", challengeTheme: "launching a corporate catering program targeting tech companies"
    },
    {
      companyName: "Heritage Grill", industry: "family dining", location: "Austin, Texas",
      size: "32 employees", roleTitle: "Assistant Manager",
      judgeRole: "Operating Partner", challengeTheme: "integrating AI-powered inventory management to reduce food waste"
    },
    {
      companyName: "Metro Food Hub", industry: "food service management", location: "Chicago, Illinois",
      size: "45 employees across 3 concepts", roleTitle: "Brand Manager",
      judgeRole: "Chief Operating Officer", challengeTheme: "developing a loyalty program that increases customer retention by 25%"
    }
  ];

  const retailContexts = [
    {
      companyName: "Nexus Retail Solutions", industry: "specialty retail", location: "Minneapolis, Minnesota",
      size: "35 employees across 2 stores", roleTitle: "Store Operations Manager",
      judgeRole: "Regional Vice President", challengeTheme: "implementing omnichannel shopping experience with buy-online-pickup-in-store"
    },
    {
      companyName: "Summit Outdoor Gear", industry: "outdoor recreation retail", location: "Denver, Colorado",
      size: "28 employees", roleTitle: "Merchandising Manager",
      judgeRole: "Store Owner", challengeTheme: "developing exclusive private label products to differentiate from big-box competitors"
    },
    {
      companyName: "Catalyst Fashion", industry: "apparel retail", location: "Nashville, Tennessee", 
      size: "22 employees", roleTitle: "Visual Merchandising Coordinator",
      judgeRole: "District Manager", challengeTheme: "creating sustainable fashion initiative targeting Gen Z consumers"
    }
  ];

  const businessContexts = [
    {
      companyName: "Pinnacle Marketing Group", industry: "digital marketing", location: "Atlanta, Georgia",
      size: "40 employees", roleTitle: "Account Manager",
      judgeRole: "Client Services Director", challengeTheme: "developing data-driven marketing strategy for B2B clients in competitive markets"
    },
    {
      companyName: "Meridian Financial Services", industry: "financial planning", location: "Phoenix, Arizona",
      size: "15 financial advisors", roleTitle: "Associate Advisor",
      judgeRole: "Managing Partner", challengeTheme: "launching digital-first advisory services for millennial clients"
    },
    {
      companyName: "Velocity Logistics", industry: "supply chain management", location: "Cincinnati, Ohio",
      size: "55 employees", roleTitle: "Operations Analyst",
      judgeRole: "Operations Director", challengeTheme: "optimizing last-mile delivery during peak seasonal demand"
    }
  ];

  // Select appropriate context pool based on event
  let contextPool;
  if (eventId.includes('QSRM') || eventId.includes('RFSM') || eventId.includes('FMS')) {
    contextPool = restaurantContexts;
  } else if (eventId.includes('RMS') || eventId.includes('AAM') || eventId.includes('BSM')) {
    contextPool = retailContexts;
  } else {
    contextPool = businessContexts;
  }

  // Add some cross-pollination for variety (20% chance to use different context type)
  if (Math.random() < 0.2) {
    const allContexts = [...restaurantContexts, ...retailContexts, ...businessContexts];
    contextPool = allContexts;
  }

  const randomIndex = Math.floor(Math.random() * contextPool.length);
  return contextPool[randomIndex];
};

// Word count validation function
const validateScenarioLength = (scenario: string): { isValid: boolean; wordCount: number; minWords: number; maxWords: number } => {
  const wordCount = scenario.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minWords = 300;
  const maxWords = 500;
  
  return {
    isValid: wordCount >= minWords && wordCount <= maxWords,
    wordCount,
    minWords,
    maxWords
  };
};


// Debugged generateRoleplayScenario function
const generateRoleplayScenario = async (
  eventId: string,
  eventName: string,
  eventScenario: string,
  retryCount: number = 0
): Promise<any> => {
  console.log(`Starting roleplay generation for ${eventId} (attempt ${retryCount + 1})`)

  try {
    // Step 1: Load ALL available PIs for this event
    console.log(`Loading all available PIs for ${eventId}...`)
    const allPIs = await loadAllPerformanceIndicators(eventId)

    if (!allPIs || allPIs.length === 0) {
      throw new Error(`No performance indicators loaded for ${eventId}`)
    }

    console.log(`Loaded ${allPIs.length} available PIs for analysis`)

    // Step 2: Use LLM to intelligently select the most relevant PIs
    const selectedEvent = decaEvents.find(e => e.id === eventId) // ✅ FIXED: use eventId parameter
    const numPIsNeeded = selectedEvent?.numPIs || 5

    console.log(`Using LLM to select ${numPIsNeeded} most relevant PIs...`)
    const selectedPIs = await selectMostRelevantPIs(eventScenario, eventName, allPIs, numPIsNeeded, retryCount)

    if (!selectedPIs || selectedPIs.length === 0) {
      throw new Error(`LLM failed to select relevant PIs for ${eventId}`)
    }

    console.log(`LLM selected these PIs:`, selectedPIs)

    // Step 3: Generate random business context for variety
    const businessContext = generateRandomBusinessContext(eventId)
    
    // Step 4: Create variety seed based on attempt count and time
    const varietySeed = Date.now() + (retryCount * 1000) + Math.random() * 10000

const prompt = `You are a DECA competition scenario writer. (DO NOT INCLUDE Performance Indicators OR ANY CODES IN THE FORMAT LIKE THIS(EC:013) in the actual Roleplay Scenario)(note for formatting: add linespace formatting where needed to signify new paragraph)

CRITICAL VARIETY REQUIREMENTS:
- Use these specific business details: ${JSON.stringify(businessContext)}
- Create a scenario that is FUNDAMENTALLY DIFFERENT from typical examples
- Use creative business challenges that go beyond basic HR/social media issues
- Incorporate modern business trends and realistic contemporary challenges
- Variety Seed: ${varietySeed} (use this to ensure uniqueness)

FORMATTING REQUIREMENTS:
- If the example prompts have bullet points to convey a list, make sure this generated roleplay also has a list and points with new lines and bullets listed starting like this " - "
- Use proper paragraph spacing and line breaks for readability
- The scenario MUST be between 300-500 words

EVENT: ${eventName} (${eventId})

SELECTED PERFORMANCE INDICATORS (must be directly testable in scenario):
${selectedPIs.map((pi, i) => `${i + 1}. ${pi}`).join('\n')}

BUSINESS CONTEXT TO USE:
- Company: ${businessContext.companyName}
- Industry: ${businessContext.industry}
- Location: ${businessContext.location}
- Size: ${businessContext.size}
- Current Challenge Theme: ${businessContext.challengeTheme}

SCENARIO VARIETY REQUIREMENTS:
${retryCount > 0 ? `This is attempt ${retryCount + 1} - create something COMPLETELY different from previous attempts.` : ''}
- Avoid overused scenarios (social media policy violations, basic customer complaints)
- Use contemporary business challenges (sustainability, digital transformation, supply chain, etc.)
- Create realistic but engaging business situations
- Make the challenge directly require the selected performance indicators

Return ONLY valid JSON with this exact structure:
{
  "eventName": "${eventName}",
  "cluster": "${selectedEvent?.cluster || 'Business Event Category'}",
  "instructionalArea": "Business Area",
  "twentyFirstCenturySkills": ["Skill1", "Skill2", "Skill3", "Skill4"],
  "performanceIndicators": ["PI1", "PI2", "PI3", "PI4", "PI5"],
  "situation": "A DECA-style roleplay scenario between 300-500 words that directly relates to the selected performance indicators. The situation must follow this format:

You are to assume the role of a [job/professional role relevant to ${eventName}] at [company/organization relevant to ${eventName}]. 
You are meeting with [the judge's role, e.g., a client, supervisor, coworker, or new employee] to discuss [a realistic business challenge that requires the selected performance indicators].

The judge will begin the roleplay by asking you about [the challenge]. 
You must respond by addressing the judge's concerns and explaining your ideas clearly and professionally. 
Be sure to demonstrate your knowledge of the instructional area and cover the assigned performance indicators during your explanation. 
The judge may ask follow-up questions, which you should answer in detail.

After you have explained your recommendations and answered the judge's questions, the judge will conclude the roleplay by thanking you for your work."
}

AVOID these overused scenarios:
- Social media policy violations
- Basic customer service complaints  
- Simple menu additions
- Generic employee handbook violations
- Standard disciplinary meetings

FOCUS on contemporary business challenges like:
- Digital transformation initiatives
- Sustainability and ESG compliance
- Supply chain disruptions
- Market expansion strategies
- Technology integration
- Competitive positioning
- Strategic partnerships
- Innovation management

CRITICAL REQUIREMENTS:
- Use EXACTLY the performance indicators provided above
- Make the scenario specifically designed to test those PIs
- Ensure the business challenge naturally requires those competencies
- WORD COUNT: The scenario MUST be 300-500 words`

    console.log(`Generating unique roleplay scenario with business context...`)

    const response = await fetch('/api/openai', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [
          {
            role: "system",
            content: "You are a DECA competition designer specializing in creating unique, contemporary business scenarios. Always use the provided business context exactly. Focus on modern business challenges and avoid overused scenarios."
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.9 + (retryCount * 0.1), // Higher temperature for more variety
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API request failed: ${response.status}`, errorText)
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Roleplay generation API response:", data)

    const content = data.choices?.[0]?.message?.content
    if (!content) {
      throw new Error("No content returned from API")
    }

    // Parse JSON response
// Parse JSON response
let roleplay = null
let attemptCount = 0
const maxAttempts = 3

while (!roleplay && attemptCount < maxAttempts) {
  try {
    const jsonContent = content.trim()
    const match = jsonContent.match(/\{[\s\S]*\}/)
    
    if (match) {
      roleplay = JSON.parse(match[0])
      
      // Validate word count
      if (roleplay && roleplay.situation) {
        const validation = validateScenarioLength(roleplay.situation)
        
        if (!validation.isValid) {
          console.log(`Scenario word count (${validation.wordCount}) is outside range ${validation.minWords}-${validation.maxWords}. Retrying...`)
          
          // If word count is invalid, try to regenerate
          const adjustmentPrompt = `The previous scenario was ${validation.wordCount} words, but it needs to be between ${validation.minWords}-${validation.maxWords} words. 
          
          ${validation.wordCount < validation.minWords ? 
            'Please EXPAND the scenario with more specific details, context, and business requirements.' : 
            'Please CONDENSE the scenario while keeping all essential elements.'
          }
          
          Maintain the same business context and performance indicators, but adjust the length appropriately.`
          
          const adjustmentResponse = await fetch('/api/openai', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "gpt-4.1-nano",
              messages: [
                {
                  role: "system",
                  content: "You are a DECA competition designer. Adjust scenario length while maintaining quality and requirements."
                },
                { role: "user", content: `${prompt}\n\nADJUSTMENT NEEDED: ${adjustmentPrompt}` }
              ],
              max_tokens: 1500,
              temperature: 0.7,
            }),
          })
          
          if (adjustmentResponse.ok) {
            const adjustmentData = await adjustmentResponse.json()
            const adjustmentContent = adjustmentData.choices?.[0]?.message?.content
            
            if (adjustmentContent) {
              const adjustmentMatch = adjustmentContent.match(/\{[\s\S]*\}/)
              if (adjustmentMatch) {
                const adjustedRoleplay = JSON.parse(adjustmentMatch[0])
                const newValidation = validateScenarioLength(adjustedRoleplay.situation)
                
                if (newValidation.isValid) {
                  console.log(`Word count adjustment successful: ${newValidation.wordCount} words`)
                  roleplay = adjustedRoleplay
                  break
                } else {
                  console.log(`Word count adjustment failed: ${newValidation.wordCount} words`)
                }
              }
            }
          }
          
          // If adjustment failed, continue with original but log warning
          if (!roleplay || !validateScenarioLength(roleplay.situation).isValid) {
            console.warn(`Using scenario with ${validation.wordCount} words (outside target range)`)
            // Keep the original roleplay even if word count is off
          }
        } else {
          console.log(`Scenario word count validation passed: ${validation.wordCount} words`)
        }
      }
      break
    }
  } catch (parseError) {
    console.error(`Parse attempt ${attemptCount + 1} failed:`, parseError)
    attemptCount++
    
    if (attemptCount >= maxAttempts) {
      throw new Error("Failed to parse JSON after multiple attempts")
    }
  }
}

if (!roleplay) {
  throw new Error("Failed to parse JSON from API response")
}


    // Validate and ensure we use the LLM-selected PIs
    roleplay.performanceIndicators = selectedPIs.slice(0, numPIsNeeded)
    roleplay.eventName = eventName
    roleplay.cluster = selectedEvent?.cluster || roleplay.cluster
    
    if (!Array.isArray(roleplay.twentyFirstCenturySkills)) {
      roleplay.twentyFirstCenturySkills = selectedEvent?.centurySkills?.skills || [
        "Critical thinking",
        "Communication", 
        "Problem solving",
        "Leadership"
      ]
    }

const finalValidation = validateScenarioLength(roleplay.situation)
    console.log(`Successfully generated unique roleplay for ${eventId} (${finalValidation.wordCount} words)`)
    return roleplay



  } catch (error) {
    console.error(`Error generating roleplay scenario for ${eventId}:`, error)

    if (retryCount < 1) {
      console.log(`Retrying generation (attempt ${retryCount + 2})`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return await generateRoleplayScenario(eventId, eventName, eventScenario, retryCount + 1)
    }

    // Fallback with random context
    console.log('Using enhanced fallback scenario generation')
    const businessContext = generateRandomBusinessContext(eventId)
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    
    try {
      const allPIs = await loadAllPerformanceIndicators(eventId)
      const fallbackPIs = allPIs.length > 0 
        ? allPIs.slice(0, selectedEvent?.numPIs || 5).map(pi => pi.name)
        : [
            "Analyze business situations effectively",
            "Develop strategic recommendations", 
            "Present findings clearly and persuasively"
          ].slice(0, selectedEvent?.numPIs || 5)

      return {
        eventName,
        cluster: selectedEvent?.cluster || "Individual Series Events",
        instructionalArea: "Business Operations",
        twentyFirstCenturySkills: selectedEvent?.centurySkills?.skills || ["Critical thinking", "Communication", "Problem solving", "Leadership"],
        performanceIndicators: fallbackPIs,
        situation: `You are to assume the role of ${businessContext.roleTitle} at ${businessContext.companyName}, ${businessContext.industry} located in ${businessContext.location}. You are meeting with the ${businessContext.judgeRole} (judge) to discuss ${businessContext.challengeTheme}. The company has ${businessContext.size} and faces unique challenges in today's competitive market. Present your analysis and strategic recommendations for addressing this business opportunity.`
      }
    } catch (fallbackError) {
      console.error('Even enhanced fallback failed:', fallbackError)
      const selectedEvent = decaEvents.find(e => e.id === eventId)
      return {
        eventName,
        cluster: selectedEvent?.cluster || "Individual Series Events", 
        instructionalArea: "Business Operations",
        twentyFirstCenturySkills: selectedEvent?.centurySkills?.skills || ["Critical thinking", "Communication", "Problem solving", "Leadership"],
        performanceIndicators: [
          "Analyze business situations effectively",
          "Develop strategic recommendations",
          "Present findings clearly and persuasively"
        ].slice(0, selectedEvent?.numPIs || 5),
        situation: `You are to assume the role of a business professional. You are meeting with a supervisor (judge) to discuss recommendations for a business challenge. Present your analysis clearly and professionally.`
      }
    }
  }
}


function groupEventsByCluster(events: typeof decaEvents) {
  return events.reduce(
    (acc: Record<string, typeof decaEvents[number][]>, event) => {
      const cluster = event.cluster
      if (!acc[cluster]) {
        acc[cluster] = []
      }
      acc[cluster].push(event)
      return acc
    },
    {},
  )
}

// Fixed audio recording hook with presentation time limit
function useAudioRecorder(selectedEventId: string) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []
      
      // Get presentation time limit for this event
      const selectedEvent = decaEvents.find(e => e.id === selectedEventId)
      const maxRecordingTime = selectedEvent ? selectedEvent.presentationTime * 60 : 600 // Default 10 minutes
      
      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }
      
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      setDuration(0)
      
      const interval = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1
          
          // Check if we've reached the presentation time limit
          if (newDuration >= maxRecordingTime) {
            // Stop recording automatically
            recorder.stop()
            setIsRecording(false)
            setShowTimeUpModal(true)
            clearInterval(interval)
            return maxRecordingTime
          }
          
          return newDuration
        })
      }, 1000)
      setDurationInterval(interval)
    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Could not access microphone. Please ensure microphone permissions are granted.')
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
      setIsRecording(false)
      if (durationInterval) {
        clearInterval(durationInterval)
        setDurationInterval(null)
      }
    }
  }
  
  const togglePlayback = () => {
    if (!audioUrl) return
    
    if (!audioElement) {
      const audio = new Audio(audioUrl)
      audio.onended = () => setIsPlaying(false)
      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration || 0)
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime || 0)
      }
      setAudioElement(audio)
      audio.play()
      setIsPlaying(true)
    } else {
      if (isPlaying) {
        audioElement.pause()
        setIsPlaying(false)
      } else {
        audioElement.play()
        setIsPlaying(true)
      }
    }
  }

  const seekTo = (time: number) => {
    if (audioElement && !isNaN(time) && isFinite(time)) {
      audioElement.currentTime = Math.max(0, Math.min(time, audioDuration))
      setCurrentTime(audioElement.currentTime)
    }
  }

  const closeTimeUpModal = () => {
    setShowTimeUpModal(false)
  }
  
  return {
    isRecording,
    audioUrl,
    audioBlob,
    duration,
    isPlaying,
    currentTime,
    audioDuration,
    showTimeUpModal,
    startRecording,
    stopRecording,
    togglePlayback,
    seekTo,
    closeTimeUpModal
  }
}

// OpenAI API functions
// Fixed transcription function - use your API endpoint
// OpenAI Whisper transcription function
/* 
 * SETUP INSTRUCTIONS FOR TRANSCRIPTION:
 * 
 * Option 1 - Direct API Call (Browser-based, less secure):
 * Add NEXT_PUBLIC_OPENAI_API_KEY to your .env.local file
 * 
 * Option 2 - API Route (Recommended, more secure):
 * 1. Add OPENAI_API_KEY to your .env.local file (without NEXT_PUBLIC_)
 * 2. Create pages/api/transcribe.js with the server-side code
 * 
 * Option 3 - Alternative Services:
 * You can also use Deepgram, AssemblyAI, or other transcription services
 */

// OpenAI Whisper transcription function
const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')
    formData.append('model', 'whisper-1')
    formData.append('language', 'en')
    formData.append('response_format', 'text')
    
    console.log('Transcribing audio with OpenAI Whisper...')
    
    // Try API route first (recommended approach)
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const transcription = await response.text()
        console.log('Transcription successful via API route:', transcription.substring(0, 100) + '...')
        return transcription.trim()
      }
    } catch (apiError) {
      console.warn('API route failed, trying direct call:', apiError)
    }
    
    // Fallback - return empty string or throw error
    throw new Error('Transcription service unavailable')
    
  } catch (error) {
    console.error('Error transcribing audio:', error)
    return "Transcription unavailable - please check your audio recording and try again."
  }
}
    // Fallback to direct API call (requires NEXT_PUBLIC_OPENAI_API_KEY)
// ULTRA-STRICT VERSION - Starts with 0s and only awards points for explicit evidence
const generateAIFeedback = async (transcript: string, roleplay: any, eventId: string, attemptNumber: number = 0, judgeContext?: string): Promise<any> => {
  try {
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    if (!selectedEvent) throw new Error("Event not found")

    // Calculate word count for automatic penalties
    const wordCount = transcript.trim().split(/\s+/).filter(word => word.length > 0).length
    console.log(`Balanced grading mode: Word count: ${wordCount}, transcript: "${transcript}"`)

    // Count inappropriate words
    const inappropriateWords = ['fuck', 'shit', 'damn', 'hell', 'ass', 'bitch', 'crap']
    const badWordCount = inappropriateWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      return count + (transcript.match(regex) || []).length
    }, 0)

const judgeContextSection = judgeContext ? `
JUDGE ROLE CONTEXT:
${judgeContext}

As the judge, you should evaluate based on how well the participant addressed the specific business scenario and questions that would be asked in this roleplay context.
` : '';

    const prompt = `You are a constructive DECA judge providing balanced, educational feedback to help students improve.

GRADING PHILOSOPHY:
- Give credit for effort and partial understanding
- Provide constructive feedback that encourages improvement
- Award points for basic attempts and clear effort
- Be encouraging while identifying areas for growth
- Focus on what students did well AND what they can improve

${judgeContextSection}

EVENT: ${roleplay.eventName}
PERFORMANCE INDICATORS: ${roleplay.performanceIndicators.join(', ')}
21ST CENTURY SKILLS: ${roleplay.twentyFirstCenturySkills.join(', ')}

ROLEPLAY SCENARIO:
${roleplay.situation}

TRANSCRIPT TO EVALUATE (${wordCount} words):
"${transcript}"

SCORING APPROACH:
- Award partial credit for basic understanding and effort
- Give 30-50% of points for basic attempts that show understanding
- Give 60-80% for solid responses with examples
- Reserve 90%+ for exceptional responses with depth and expertise
- Consider the learning context - this is practice, not final assessment

MINIMUM SCORING GUIDELINES:
- If student addresses the topic: minimum 20% of available points
- If student shows basic understanding: minimum 40% of available points
- If student provides examples or applications: 60%+ of available points

Return ONLY valid JSON:
{
  "performanceIndicators": [
    {
      "indicator": "exact PI name",
      "score": number_between_0_and_${selectedEvent.piPoints},
      "feedback": "[Encouraging feedback highlighting what they did well and specific suggestions for improvement]"
    }
  ],
  "twentyFirstCenturySkills": [
    {
      "skill": "exact skill name", 
      "score": number_between_0_and_${selectedEvent.centurySkills.skillPoints},
      "feedback": "[Positive feedback with constructive suggestions]"
    }
  ],
  "overallImpression": {
    "score": number_between_0_and_${selectedEvent.centurySkills.skillPoints},
    "feedback": "[Encouraging overall assessment with specific next steps]"
  },
  "generalFeedback": "[Balanced feedback highlighting strengths and growth opportunities]"
}`

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'system',
            content: `You are a constructive DECA judge. Give credit for effort and provide encouraging, educational feedback. Focus on helping students improve while recognizing their attempts.`
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2500,
        temperature: 0.3,
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Feedback API request failed: ${response.status}`, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    let feedbackData
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error("No JSON found in feedback response")
      
      feedbackData = JSON.parse(jsonMatch[0])

      // Apply reasonable minimum scores for effort
      feedbackData.performanceIndicators.forEach((pi: any) => {
        // Ensure minimum score of 20% if any relevant content is present
        if (pi.score < Math.floor(selectedEvent.piPoints * 0.2) && wordCount > 10) {
          pi.score = Math.floor(selectedEvent.piPoints * 0.2)
        }
      })

      feedbackData.twentyFirstCenturySkills.forEach((skill: any) => {
        // Ensure minimum score of 20% if any relevant content is present
        if (skill.score < Math.floor(selectedEvent.centurySkills.skillPoints * 0.2) && wordCount > 10) {
          skill.score = Math.floor(selectedEvent.centurySkills.skillPoints * 0.2)
        }
      })

      // Apply only severe length penalties
      let penaltyMultiplier = 1.0
      if (wordCount < 20) {
        penaltyMultiplier = 0.3 // 30% for very short responses
      } else if (wordCount < 50) {
        penaltyMultiplier = 0.6 // 60% for short responses
      }

      if (penaltyMultiplier < 1.0) {
        feedbackData.performanceIndicators.forEach((pi: any) => {
          pi.score = Math.floor(pi.score * penaltyMultiplier)
        })
        feedbackData.twentyFirstCenturySkills.forEach((skill: any) => {
          skill.score = Math.floor(skill.score * penaltyMultiplier)
        })
        feedbackData.overallImpression.score = Math.floor(feedbackData.overallImpression.score * penaltyMultiplier)
      }

      // Calculate totals
      const piTotal = feedbackData.performanceIndicators.reduce((sum: number, pi: any) => sum + pi.score, 0)
      const skillTotal = feedbackData.twentyFirstCenturySkills.reduce((sum: number, skill: any) => sum + skill.score, 0)
      const overallTotal = feedbackData.overallImpression.score
      
      const totalPossible = 
        selectedEvent.numPIs * selectedEvent.piPoints +
        selectedEvent.centurySkills.numSkills * selectedEvent.centurySkills.skillPoints +
        selectedEvent.centurySkills.skillPoints

      // Apply bad word penalty to total
      let totalScore = piTotal + skillTotal + overallTotal - (badWordCount * 5)
      totalScore = Math.max(0, totalScore)

      const percentageScore = Math.round((totalScore / totalPossible) * 100)

      return {
        ...feedbackData,
        totalScore: percentageScore,
        rawTotal: totalScore,
        totalPossible: totalPossible,
        penaltiesApplied: {
          wordCountPenalty: penaltyMultiplier < 1.0,
          badWordPenalty: badWordCount > 0,
          badWordCount: badWordCount
        }
      }

    } catch (parseError) {
      console.error('Error parsing AI feedback:', parseError, "Content:", content)
      throw new Error('Failed to parse AI feedback response')
    }

  } catch (error) {
    console.error('Error generating AI feedback:', error)
    
    // Balanced fallback with reasonable scores
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    if (!selectedEvent) throw new Error("Event not found")

    const wordCount = transcript.trim().split(/\s+/).filter(word => word.length > 0).length
    const baseScore = wordCount > 10 ? Math.floor(selectedEvent.piPoints * 0.3) : 1

    const piScores = roleplay.performanceIndicators.map((indicator: string) => ({
      indicator,
      score: baseScore,
      feedback: `You attempted to address "${indicator}" which shows good effort. To improve, try providing more specific examples and connecting your ideas more directly to the business scenario.`
    }))

    const skillScores = roleplay.twentyFirstCenturySkills.map((skill: string) => ({
      skill,
      score: Math.floor(selectedEvent.centurySkills.skillPoints * 0.3),
      feedback: `Your response showed some elements of "${skill}". Consider expanding your explanation with more detailed reasoning and examples.`
    }))

    const totalPossible = 
      selectedEvent.numPIs * selectedEvent.piPoints +
      selectedEvent.centurySkills.numSkills * selectedEvent.centurySkills.skillPoints +
      selectedEvent.centurySkills.skillPoints

    const estimatedTotal = (piScores.length * baseScore) + (skillScores.length * Math.floor(selectedEvent.centurySkills.skillPoints * 0.3)) + Math.floor(selectedEvent.centurySkills.skillPoints * 0.3)
    const percentageScore = Math.round((estimatedTotal / totalPossible) * 100)

    return {
      totalScore: percentageScore,
      performanceIndicators: piScores,
      twentyFirstCenturySkills: skillScores,
      overallImpression: {
        score: Math.floor(selectedEvent.centurySkills.skillPoints * 0.3),
        feedback: `You made a good attempt at the roleplay scenario. Focus on providing more detailed explanations and specific examples to strengthen your response.`
      },
      generalFeedback: `Your ${wordCount}-word response shows effort and understanding of the topic. To improve your score, try expanding your answers with specific examples, detailed explanations, and clearer connections to the business scenario.`,
      rawTotal: estimatedTotal,
      totalPossible: totalPossible,
      penaltiesApplied: {
        wordCountPenalty: wordCount < 50,
        badWordPenalty: false,
        badWordCount: 0
      }
    }
  }
}

// Fixed chat message function - use your API endpoint
const sendChatMessage = async (messages: Array<{role: 'user' | 'assistant', content: string}>, context: string): Promise<string> => {
  try {
const systemPrompt = `You are an expert DECA judge and coach providing personalized feedback on roleplay performances. You should take on the role characteristics described in the judge context when appropriate.

Context: ${context}

Your role is to:
1. Act as the judge character from the scenario when discussing the roleplay
2. Analyze the student's presentation based on DECA performance indicators
3. Provide specific, actionable feedback for improvement
4. Answer questions about their performance from the judge's perspective
5. Offer coaching advice for future competitions
6. Be encouraging but honest about areas needing improvement

When discussing the roleplay, respond as if you were the actual judge character (owner, manager, etc.) who would have been asking the questions and evaluating the presentation. Keep responses concise but insightful, focusing on specific aspects of their performance.`
const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      console.error(`Chat API request failed: ${response.status}`)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your question right now. Please try again."
    
  } catch (error) {
    console.error('Chat API error:', error)
    return "I'm experiencing some technical difficulties. Please try asking your question again."
  }
}

export default function DECAPracticePage() {
  const [step, setStep] = useState(1)
  const [selectedEventId, setSelectedEventId] = useState("")
  const [roleplay, setRoleplay] = useState<any>(null)
  const [feedback, setFeedback] = useState<any>(null)
  const { isRecording, audioUrl, audioBlob, duration, isPlaying, currentTime, audioDuration, showTimeUpModal, startRecording, stopRecording, togglePlayback, seekTo, closeTimeUpModal } = useAudioRecorder(selectedEventId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState("")
  const [showPreparation, setShowPreparation] = useState(false)
  const [preparationStep, setPreparationStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Timer states
// Timer states
const [prepTimeLeft, setPrepTimeLeft] = useState(0)
const [prepTimerActive, setPrepTimerActive] = useState(false)
const [timerVisible, setTimerVisible] = useState(true)
const [showTimerTooltip, setShowTimerTooltip] = useState(false)
const [showConfirmDialog, setShowConfirmDialog] = useState(false)
const [showTwoMinuteWarning, setShowTwoMinuteWarning] = useState(false)
const [twoMinuteWarningShown, setTwoMinuteWarningShown] = useState(false)
const [eventAttemptCount, setEventAttemptCount] = useState(0) // ADD THIS LINE

  // Chatbot states
  const [transcription, setTranscription] = useState("")
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  // Timer effect
// Timer effect
useEffect(() => {
  let interval: NodeJS.Timeout | null = null
  if (prepTimerActive && prepTimeLeft > 0) {
    interval = setInterval(() => {
      setPrepTimeLeft(prev => {
        // Show 2-minute warning when exactly 2 minutes (120 seconds) remain
        if (prev === 120 && !twoMinuteWarningShown) {
          setShowTwoMinuteWarning(true)
          setTwoMinuteWarningShown(true)
        }
        
        if (prev <= 1) {
          setPrepTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  return () => {
    if (interval) clearInterval(interval)
  }
}, [prepTimerActive, prepTimeLeft, twoMinuteWarningShown])

  const formatPrepTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimerVisibility = () => {
    setTimerVisible(!timerVisible)
    setShowTimerTooltip(false)
  }

  const handleStartRecordingClick = () => {
    if (prepTimerActive && prepTimeLeft > 0) {
      setShowConfirmDialog(true)
    } else {
      startRecording()
    }
  }

  const handleConfirmRecording = () => {
    setShowConfirmDialog(false)
    setPrepTimerActive(false)
    startRecording()
  }

  const closeTwoMinuteWarning = () => {
  setShowTwoMinuteWarning(false)
  }

  const sendChatMessageHandler = async (message: string) => {
    if (!message.trim() || isChatLoading) return

    const userMessage = { role: 'user' as const, content: message }
    const updatedMessages = [...chatMessages, userMessage]
    setChatMessages(updatedMessages)
    setChatInput("")
    setIsChatLoading(true)

    // Scroll to bottom after adding user message
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }, 100)

    // Create context for the AI
// Load judge context if not already available
    const judgeContext = await loadJudgeScenario(selectedEventId).catch(() => 
      'You are an experienced DECA judge providing feedback on roleplay performance.'
    )
    
    // Create context for the AI
    const context = `
    Roleplay Event: ${roleplay?.eventName}
    Performance Indicators: ${roleplay?.performanceIndicators?.join(', ')}
    21st Century Skills: ${roleplay?.twentyFirstCenturySkills?.join(', ')}
    Scenario: ${roleplay?.situation}
    Judge Role Context: ${judgeContext}
    Student's Presentation Transcript: ${transcription}
    Overall Score: ${feedback?.totalScore}/100
    `

    try {
      const response = await sendChatMessage(updatedMessages, context)
      const assistantMessage = { role: 'assistant' as const, content: response }
      setChatMessages([...updatedMessages, assistantMessage])
      
      // Scroll to bottom after adding assistant message
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages-container')
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight
        }
      }, 100)
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = { role: 'assistant' as const, content: "I'm sorry, I encountered an error. Please try again." }
      setChatMessages([...updatedMessages, errorMessage])
      
      // Scroll to bottom after adding error message
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages-container')
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight
        }
      }, 100)
    } finally {
      setIsChatLoading(false)
    }
  }



// Add debugging to your handleSubmitEvent function
const handleSubmitEvent = async () => {
  if (!selectedEventId) return
  
  // Increment attempt count for this event
  setEventAttemptCount(prev => prev + 1)
  
  console.log("🎯 handleSubmitEvent called with eventId:", selectedEventId)
  
  setShowPreparation(true)
  setPreparationStep(0)
  setIsGenerating(true)
  
  try {
    console.log("📖 Loading event scenario and PIs...")
    
    // Load event scenario and performance indicators
    const eventScenario = await loadEventScenario(selectedEventId)
    console.log("📋 Event scenario loaded:", eventScenario.substring(0, 100) + "...")
    
    const performanceIndicators = await loadPerformanceIndicators(selectedEventId)
    console.log("🎯 Performance indicators loaded:", performanceIndicators)
    
    const selectedEvent = decaEvents.find(e => e.id === selectedEventId)
    console.log("🎪 Selected event:", selectedEvent?.name)
    
    setTimeout(() => setPreparationStep(1), 500)
    
    console.log("🤖 About to call generateRoleplayScenario...")
    
    // Generate roleplay scenario using AI with attempt count for variety
    const generatedRoleplay = await generateRoleplayScenario(
      selectedEventId,
      selectedEvent?.name || "Selected Event",
      eventScenario,
      eventAttemptCount - 1 // Pass as retry count (0-indexed)
    )
    
    console.log("🎉 Generated roleplay received:", generatedRoleplay)
    console.log("📝 Generated roleplay keys:", Object.keys(generatedRoleplay))
    console.log("📖 Situation preview:", generatedRoleplay.situation?.substring(0, 150) + "...")
    
    // CRITICAL: Set the roleplay state
    console.log("💾 Setting roleplay state...")
    setRoleplay(generatedRoleplay)
    
    // Verify state was set
    setTimeout(() => {
      console.log("🔍 Checking if roleplay state was set...")
      console.log("Current roleplay state:", roleplay)
    }, 100)
    
    setIsGenerating(false)
    setTimeout(() => setPreparationStep(2), 1500)
    
  } catch (error) {
    console.error('💥 Error in handleSubmitEvent:', error)
    setIsGenerating(false)
    
    // Enhanced fallback scenario with random context
    const selectedEvent = decaEvents.find(e => e.id === selectedEventId)
    const businessContext = generateRandomBusinessContext(selectedEventId)
    
    const fallbackRoleplay = {
      eventName: selectedEvent?.name || "Selected Event",
      cluster: selectedEvent?.cluster || "Business",
      instructionalArea: "Business Operations",
      twentyFirstCenturySkills: ["Critical thinking", "Communication", "Problem solving", "Leadership"],
      performanceIndicators: [
        "Analyze business situations",
        "Develop strategic solutions",
        "Present recommendations effectively",
        "Consider ethical implications",
        "Evaluate implementation feasibility"
      ],
      situation: `You are to assume the role of ${businessContext.roleTitle} at ${businessContext.companyName}, ${businessContext.industry} located in ${businessContext.location}. You are meeting with the ${businessContext.judgeRole} (judge) to discuss ${businessContext.challengeTheme}. The company has ${businessContext.size} and faces unique challenges in today's competitive market. Present your analysis and recommendations for addressing this business opportunity.`
    }
    
    console.log("🆘 Setting enhanced fallback roleplay:", fallbackRoleplay)
    setRoleplay(fallbackRoleplay)
    setTimeout(() => setPreparationStep(2), 1500)
  }
}
const handleSubmitRecording = async () => {
  if (!audioBlob) return
  
  setIsSubmitting(true)
  setTranscriptionStatus("Transcribing your audio...")
  
  try {
    // Transcribe audio
    const transcript = await transcribeAudio(audioBlob)
    setTranscription(transcript)
    
    setTranscriptionStatus("Analyzing your presentation...")
    
    // Generate AI-powered feedback based on transcript with attempt tracking
// Load judge context for more accurate grading
    const judgeContext = await loadJudgeScenario(selectedEventId)
    
    // Generate AI-powered feedback based on transcript with attempt tracking
    const aiGeneratedFeedback = await generateAIFeedback(transcript, roleplay, selectedEventId, eventAttemptCount, judgeContext)
    
    setFeedback(aiGeneratedFeedback)
    setShowChatbot(true)
    setStep(3)
  } catch (error) {
    console.error('Error processing recording:', error)
    alert('Error processing your recording. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

const handleStartRoleplay = () => {
  setPreparationStep(3)
  
  const selectedEvent = decaEvents.find(e => e.id === selectedEventId)
  const prepTime = selectedEvent?.prepTime || 10
  setPrepTimeLeft(prepTime * 60)
  
  // Reset 2-minute warning state
  setTwoMinuteWarningShown(false)
  setShowTwoMinuteWarning(false)
  
  setTimeout(() => {
    setStep(2)
    setShowPreparation(false)
    setPreparationStep(0)
    setPrepTimerActive(true)
    setTimerVisible(true)
    
    setTimeout(() => {
      setShowTimerTooltip(true)
      setTimeout(() => {
        setTimerVisible(false)
        setTimeout(() => {
          setShowTimerTooltip(false)
        }, 300)
      }, 2000)
    }, 1000)
  }, 500)
}

  const groupedEvents = groupEventsByCluster(decaEvents)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Preparation Screen Overlay */}
      {showPreparation && (
        <div 
          className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-500 ${
            preparationStep === 0 ? 'opacity-0' : preparationStep >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#000111' }}
        >
          <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div 
              className={`text-white text-center space-y-8 transition-opacity duration-1000 w-full max-w-4xl ${
                preparationStep >= 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="mb-12">
                <img 
                  src="/logo.png" 
                  alt="DECA Logo" 
                  className="mx-auto h-72 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            
            <h2 className="text-5xl font-bold mb-16 underline">{selectedEventId} Roleplay Instructions</h2>
            
            {isGenerating ? (
              <div className="space-y-6 text-xl max-w-4xl text-center">
                <div className="flex items-center justify-center space-x-4">
                  <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                  <p>Generating your unique roleplay scenario...</p>
                </div>
              </div>
            ) : (
              <>
                {(() => {
                  const selectedEvent = decaEvents.find(e => e.id === selectedEventId);
                  const prepTime = selectedEvent?.prepTime || 10;
                  const presentationTime = selectedEvent?.presentationTime || 10;
                  
                  return (
                    <div className="space-y-6 text-xl max-w-4xl text-left">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p>Prepare scratch paper for notes and materials</p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p>You have <span className="font-bold text-blue-300">{prepTime} minutes</span> to prepare for your roleplay</p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p>You will have up to <span className="font-bold text-blue-300">{presentationTime} minutes</span> to role-play your situation with a judge</p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p>You will receive a 2-minute warning before your time runs out</p>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
            
            <div 
              className={`mt-12 transition-opacity duration-1000 ${
                preparationStep >= 2 && !isGenerating ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                onClick={handleStartRoleplay}
                disabled={isGenerating}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Roleplay
              </button>
            </div>
          </div>
                 </div>
        </div>
      )}

      <div className={`container mx-auto py-8 px-4 transition-opacity duration-500 ${
        showPreparation && preparationStep !== 3 ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">DECA Roleplay Practice</h1>
          <p className="text-gray-600">Perfect your roleplay skills with AI-powered feedback</p>
        </div>

        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Event</CardTitle>
                <CardDescription>Choose your DECA competitive event to get a roleplay scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event">Event</Label>
                    <Select value={selectedEventId} onValueChange={(value) => {
                        setSelectedEventId(value)
                        setEventAttemptCount(0) // Reset attempt count when changing events
                      }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 overflow-y-auto">
                        {Object.entries(groupedEvents).map(([cluster, events]) => (
                          <div key={cluster}>
                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground bg-muted">
                              {cluster.replace("_", " & ")}
                            </div>
                            {events.map((event) => (
                              <SelectItem key={event.id} value={event.id}>
                                {event.name} ({event.id})
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSubmitEvent} className="w-full" disabled={!selectedEventId}>
                    Get Roleplay Scenario <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && roleplay && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="relative">
                <CardTitle>{roleplay.eventName}</CardTitle>
                <CardDescription>{roleplay.cluster} | {roleplay.instructionalArea}</CardDescription>
                
                {prepTimerActive && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="relative">
                      <button
                        onClick={toggleTimerVisibility}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                          timerVisible 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        {timerVisible && (
                          <span className="font-mono font-medium text-sm">
                            {formatPrepTime(prepTimeLeft)}
                          </span>
                        )}
                      </button>
                      
                      {showTimerTooltip && (
                        <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10 animate-pulse">
                          Toggle Visibility On/Off
                          <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">21st Century Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {roleplay.twentyFirstCenturySkills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Performance Indicators</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {roleplay.performanceIndicators.map((indicator: string, i: number) => (
                        <li key={i}>{indicator}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border">
                    <h3 className="font-semibold mb-3 text-lg">Roleplay Scenario</h3>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-gray-700 whitespace-pre-line">
                        {roleplay.situation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold mb-4">Record Your Response</h3>
                    <div className="flex justify-center gap-4">
                      {!isRecording ? (
                        <Button 
                          onClick={handleStartRecordingClick} 
                          className={`px-8 py-3 transition-all ${
                            prepTimerActive && prepTimeLeft > 0
                              ? 'bg-gray-400 hover:bg-gray-500 text-white'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          <Mic className="mr-2 h-5 w-5" /> Start Recording
                        </Button>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-red-600">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="font-mono text-lg">{formatDuration(duration)}</span>
                          </div>
                          <Button onClick={stopRecording} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                            <Square className="mr-2 h-4 w-4" /> Stop Recording
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {showConfirmDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Start Recording Now?</h3>
                        <p className="text-gray-600 mb-4">
                          You still have <span className="font-semibold text-blue-600">{formatPrepTime(prepTimeLeft)}</span> of preparation time remaining. 
                          Are you sure you want to proceed with recording?
                        </p>
                        <div className="flex gap-3 justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowConfirmDialog(false)}
                            className="px-4 py-2"
                          >
                            Continue Preparing
                          </Button>
                          <Button 
                            onClick={handleConfirmRecording}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2"
                          >
                            Proceed Anyway
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time Up Modal */}
                  {showTimeUpModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl text-center">
                        <h3 className="text-xl font-bold mb-3 text-red-600">⏰ Your Time is Up!</h3>
                        <p className="text-gray-700 mb-4">
                          Your presentation time has ended. The recording has been automatically stopped.
                        </p>
                        <Button 
                          onClick={closeTimeUpModal}
                          className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {showTwoMinuteWarning && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl text-center">
                      <h3 className="text-xl font-bold mb-3 text-yellow-600">⚠️ 2 Minutes Remaining!</h3>
                      <p className="text-gray-700 mb-4">
                        You have 2 minutes left in your preparation time. Use this time to finalize your thoughts and prepare to record.
                      </p>
                      <Button 
                        onClick={closeTwoMinuteWarning}
                        className="w-full bg-yellow-500 hover:bg-yellow-600"
                      >
                        Continue Preparing
                      </Button>
                    </div>
                  </div>
                )}


                  {audioUrl && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-700">Recording Complete</span>
                          <span className="text-sm text-gray-500">
                            {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(audioDuration))}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button 
                            onClick={togglePlayback} 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {isPlaying ? "Pause" : "Play"}
                          </Button>
                          <div 
                            className="flex-1 h-4 bg-gray-200 rounded-full relative cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              const x = e.clientX - rect.left
                              const percentage = x / rect.width
                              const newTime = percentage * audioDuration
                              seekTo(newTime)
                            }}
                          >
                            <div 
                              className="h-4 bg-blue-500 rounded-full relative" 
                              style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }}
                            >
                              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          onClick={handleSubmitRecording} 
                          disabled={isSubmitting}
                          className="px-8 py-3"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            "Submit Response"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {isSubmitting && (
                    <div className="space-y-2 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 animate-pulse" 
                          style={{ width: "60%" }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{transcriptionStatus}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && feedback && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feedback Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Results</CardTitle>
                  <CardDescription>Detailed feedback on your roleplay performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <div className="text-6xl font-bold text-blue-600 mb-2">{feedback.totalScore}/100</div>
                    <div className="text-gray-600 text-lg">Total Score</div>
                    <div className="mt-2">
                      {feedback.totalScore >= 90 ? (
                        <span className="text-green-600 font-semibold">Excellent Performance</span>
                      ) : feedback.totalScore >= 80 ? (
                        <span className="text-blue-600 font-semibold">Strong Performance</span>
                      ) : feedback.totalScore >= 70 ? (
                        <span className="text-yellow-600 font-semibold">Good Performance</span>
                      ) : (
                        <span className="text-orange-600 font-semibold">Needs Improvement</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-lg">Performance Indicators</h3>
                    <div className="grid gap-4">
                      {feedback.performanceIndicators.map((pi: any, i: number) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-800">{pi.indicator}</span>
                            <span className="text-blue-600 font-bold text-lg">
                            {pi.score}/{decaEvents.find(e => e.id === selectedEventId)?.piPoints}
                            </span>

                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(pi.score / (decaEvents.find(e => e.id === selectedEventId)?.piPoints || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-gray-600 text-sm">{pi.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-lg">21st Century Skills</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {feedback.twentyFirstCenturySkills.map((skill: any, i: number) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-800">{skill.skill}</span>
                            <span className="text-green-600 font-bold">
                            {skill.score}/{decaEvents.find(e => e.id === selectedEventId)?.centurySkills.skillPoints}
                            </span>

                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(skill.score / (decaEvents.find(e => e.id === selectedEventId)?.centurySkills.skillPoints || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-gray-600 text-sm">{skill.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {feedback.overallImpression && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                      <h3 className="font-semibold mb-2 text-purple-800">Overall Impression</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Judge's Assessment</span>
                        <span className="text-purple-600 font-bold">{feedback.overallImpression.score}/{decaEvents.find(e => e.id === selectedEventId)?.centurySkills.skillPoints}</span>
                      </div>
                      <p className="text-gray-700">{feedback.generalFeedback}</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setStep(1)
                        setSelectedEventId("")
                        setRoleplay(null)
                        setFeedback(null)
                        setShowChatbot(false)
                        setChatMessages([])
                        setTranscription("")
                        setEventAttemptCount(0)
                      }}
                      className="flex-1"
                    >
                      Practice Another Roleplay
                    </Button>
                    <Button
                      onClick={() => {
                        setStep(2)
                        setFeedback(null)
                        setShowChatbot(false)
                        setChatMessages([])
                        }}
                          variant="outline"
                          className="flex-1"
                        >
                          Retry This Scenario
                        </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Chatbot Section */}
              {showChatbot && (
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      AI Coach Chat
                    </CardTitle>
                    <CardDescription>Get personalized feedback on your presentation</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    {/* Transcription Preview */}
                    {transcription && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2 text-sm">Your Presentation:</h4>
                        <p className="text-xs text-blue-700 line-clamp-4">{transcription}</p>
                      </div>
                    )}

                    {/* Chat Messages - Resizable */}
                    <div 
                      id="chat-messages-container"
                      className="overflow-y-auto space-y-3 mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50 resize-y min-h-64 max-h-96"
                      style={{ height: '300px' }}
                    >
                      {chatMessages.map((message, i) => (
                        <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-gray-800 border border-gray-300'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white text-gray-800 p-3 rounded-lg text-sm border border-gray-300">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                              Thinking...
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessageHandler(chatInput)}
                        placeholder="Ask about your performance..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isChatLoading}
                      />
                      <Button
                        onClick={() => sendChatMessageHandler(chatInput)}
                        disabled={isChatLoading || !chatInput.trim()}
                        size="sm"
                        className="px-4"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Audio Replay Section */}
              {audioUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audio Playback</CardTitle>
                    <CardDescription>Review your recorded presentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-700">Your Recording</span>
                        <span className="text-sm text-gray-500">
                          {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(audioDuration))}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={togglePlayback} 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <div 
                          className="flex-1 h-4 bg-gray-200 rounded-full relative cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const x = e.clientX - rect.left
                            const percentage = x / rect.width
                            const newTime = percentage * audioDuration
                            seekTo(newTime)
                          }}
                        >
                          <div 
                            className="h-4 bg-blue-500 rounded-full relative" 
                            style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }}
                          >
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}