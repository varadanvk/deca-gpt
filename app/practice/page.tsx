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

    const prompt = `
    You are a DECA competition expert selecting the most relevant performance indicators for a roleplay scenario.

    EVENT: ${eventName}
    SCENARIO CONTEXT: ${eventScenario}

    Available Performance Indicators:
    ${piList}

    ${varietyInstruction}

    Select the ${numPIsNeeded} most relevant performance indicators that would be directly testable in this business scenario.

    Return ONLY a JSON array of the exact performance indicator names:
    ["PI Name 1", "PI Name 2", "PI Name 3"]
    `

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



// Fixed generateRoleplayScenario function
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
    const selectedEvent = decaEvents.find(e => e.id === eventId)
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

SYSTEM/OUTPUT CONTRACT (DO NOT VIOLATE):
- Return ONLY a single JSON object as final output. No prose, no backticks.
- Do not add keys not specified in the schema.
- Do not include trailing commas or invalid JSON.
- Use plain quotation marks " " only (no smart quotes).
- Escape any internal quotation marks inside JSON string values.

CRITICAL ANALYSIS REQUIREMENT:
You MUST CAREFULLY ANALYZE the example roleplay scenarios in the provided Event.txt file content below. Study the STRUCTURE, LENGTH, QUALITY, CONTENT, business context types, and specific wording patterns used in these examples. Then incorporate those exact stylistic elements, formatting patterns, and business context approaches into your generated scenario.
DO NOT USE ANY EM DASHES AT ALL IN GENERATING THIS SCENARIO(—)!!

EXTRACTION & STYLE TRANSFER STEPS (FOLLOW IN ORDER):
1) Skim all example scenarios to infer a reusable outline: 
   - Role assignment sentence (who the competitor is) 
   - Organization and setting details 
   - Specific operational or financial facts needed for decision making 
   - The explicit challenge or task 
   - Meeting/role-play flow (who starts, what they ask, Q&A, closing/thanks) 
2) Note surface markers to mimic: sentence length, paragraph spacing, bullet list formatting " - ", neutral professional tone, and judge/competitor references.
3) Identify event type from EVENT: ${eventName} (${eventId}) and adapt role, setting, and judge identity consistent with that event’s norms.
4) Constrain length to 300–500 words and preserve the example’s narrative rhythm and clarity.

EXAMPLE EVENT SCENARIOS TO ANALYZE AND EMULATE:
${eventScenario}

ANALYSIS INSTRUCTIONS:
- Examine how the example scenarios are structured and formatted
- Note the specific business terminology and context used
- Observe the sentence structure and professional tone
- Study how challenges are presented and framed
- Match the complexity level and detail depth
- Replicate the formatting style (bullet points, spacing, etc.)
- Use similar business context types and industry focuses

CROSS-EVENT GENERALIZATION GUIDELINES:
- If the examples include meeting flow cues like “You will meet…” or “The judge will begin…”, include the same flow for the generated event.
- If the event typically uses a client or judge persona (owner, manager, CEO, restaurant manager, hotel owner), mirror that persona and title relevant to the event cluster.
- When examples provide concrete numbers or constraints (budgets, rates, capacities), generate similarly specific and realistic figures aligned with the businessContext.

CRITICAL VARIETY REQUIREMENTS:
- Use these specific business details: ${JSON.stringify(businessContext)}
- Create a scenario that is FUNDAMENTALLY DIFFERENT from typical examples
- Use creative business challenges that go beyond basic HR/social media issues
- Incorporate modern business trends and realistic contemporary challenges
- Variety Seed: ${varietySeed} (use this to ensure uniqueness)

FORMATTING REQUIREMENTS:
- Mirror the formatting style found in the example scenarios
- If the example prompts have bullet points to convey a list, make sure this generated roleplay also has a list and points with new lines and bullets listed starting like this " - "
- Use proper paragraph spacing and line breaks for readability exactly as shown in examples
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
- Follow the EXACT style, tone, and structure patterns from the example scenarios above

COMPULSORY MEETING/FLOW CUES (MATCH EXAMPLES):
- Include where the meeting takes place (office, manager’s office, conference room, etc.).
- Specify who begins the role-play and the initial prompt they give.
- Indicate that after your presentation and Q&A, the judge concludes by thanking you.

DATA & SPECIFICITY REQUIREMENTS:
- Include at least 3 concrete, decision-relevant facts (e.g., rates, capacities, constraints, timelines, budget figures) aligned to ${businessContext.industry} and ${businessContext.challengeTheme}.
- Where appropriate, provide a short bulleted list using " - " to enumerate options, risks, or recommendations.

PI ALIGNMENT CHECK (INTERNAL TO YOU, DO NOT OUTPUT AS BULLETS):
- Design the scenario so each selected performance indicator can be directly demonstrated during the role-play.
- Ensure the main decision cannot be resolved without applying those PIs.

JSON FIELD POPULATION RULES:
- "eventName" must equal "${eventName}".
- "cluster" must be "${selectedEvent?.cluster || 'Business Event Category'}".
- "instructionalArea" must be the applicable business area for the event; infer from examples if not provided (e.g., Finance, Marketing, Hospitality/Tourism, Human Resources, Operations).
- "twentyFirstCenturySkills" should be an array of 4 skills relevant to the task (e.g., Critical Thinking, Collaboration, Creativity, Communication) OR use ${'${twentyFirstCenturySkills ?? ["Critical Thinking","Collaboration","Creativity","Communication"]}'}.
- "performanceIndicators" must exactly mirror the items listed above in SELECTED PERFORMANCE INDICATORS (copy text only, strip numbering).
- "situation" must contain the full roleplay scenario (300–500 words), with the style/flow/formatting matched to the examples and NO em dashes.

Return ONLY valid JSON with this exact structure:
{
  "eventName": "${eventName}",
  "cluster": "${selectedEvent?.cluster || 'Business Event Category'}",
  "instructionalArea": "Business Area",
  "twentyFirstCenturySkills": ["Skill1", "Skill2", "Skill3", "Skill4"],
  "performanceIndicators": ["PI1", "PI2", "PI3", "PI4", "PI5"],
  "situation": "A DECA-style roleplay scenario between 300-500 words that EXACTLY MATCHES the style, structure, and formatting of the example scenarios provided above. Use the same professional tone, business context approach, and formatting patterns observed in the examples."
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
- WORD COUNT: The scenario MUST be 300-500 words
- STYLE MATCHING: Must closely replicate the writing style, structure, and formatting from the example scenarios above

FINAL VALIDATION (BEFORE YOU OUTPUT):
- Confirm word count is 300–500 for "situation".
- Confirm no em dashes are present.
- Confirm "performanceIndicators" exactly equals the selected list (order preserved, numbering removed).
- Confirm JSON parses as a single object with the exact fields and no extras.
`

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
function useAudioRecorder(selectedEventId: string) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [duration, setDuration] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)
  
  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    // Fix: Use compatible audio format for mobile/Safari
    const options = {
      mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4') 
        ? 'audio/mp4'
        : 'audio/webm'
    }
    
    const recorder = new MediaRecorder(stream, options)
    const chunks: BlobPart[] = []
    
    const selectedEvent = decaEvents.find(e => e.id === selectedEventId)
    const maxRecordingTime = selectedEvent ? selectedEvent.presentationTime * 60 : 600
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }
    
    recorder.onstop = () => {
      if (chunks.length > 0) {
        // Fix: Create blob with proper MIME type
        const blob = new Blob(chunks, { type: options.mimeType })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setAudioBlob(blob)
      }
      stream.getTracks().forEach(track => track.stop())
    }
    
    // Fix: Record in smaller chunks for better mobile compatibility
    recorder.start(100) // 100ms chunks instead of 1000ms
    setMediaRecorder(recorder)
    setIsRecording(true)
    setDuration(0)
    
    const interval = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1
        
        if (newDuration >= maxRecordingTime) {
          if (recorder.state === 'recording') {
            recorder.stop()
          }
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

  const closeTimeUpModal = () => {
    setShowTimeUpModal(false)
  }

  const resetAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setAudioBlob(null)
    setDuration(0)
  }
  
  return {
    isRecording,
    audioUrl,
    audioBlob,
    duration,
    showTimeUpModal,
    startRecording,
    stopRecording,
    closeTimeUpModal,
    resetAudio,
    setAudioUrl,
    setAudioBlob
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
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('Invalid audio blob - no data recorded')
    }
    
    console.log('Audio blob size:', audioBlob.size, 'bytes')
    console.log('Audio blob type:', audioBlob.type)
    
    // Fix: Check file size limit (25MB for Whisper)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (audioBlob.size > maxSize) {
      throw new Error('Audio file too large - please record a shorter response')
    }
    
    const formData = new FormData()
    
    // Fix: Convert to compatible format and ensure proper filename
    const fileName = audioBlob.type.includes('mp4') ? 'recording.mp4' : 'recording.webm'
    formData.append('file', audioBlob, fileName)
    formData.append('model', 'whisper-1')
    formData.append('language', 'en')
    formData.append('response_format', 'text')
    
    console.log('Transcribing audio with OpenAI Whisper...')
    
    // Fix: Add timeout for long transcriptions
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout
    
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const transcription = await response.text()
        console.log('Transcription successful via API route:', transcription.substring(0, 100) + '...')
        return transcription.trim()
      } else {
        const errorText = await response.text()
        console.error('API route failed:', response.status, errorText)
        throw new Error(`Transcription failed: ${response.status}`)
      }
    } catch (apiError) {
      clearTimeout(timeoutId)
      if (apiError instanceof Error && apiError.name === 'AbortError') {
        throw new Error('Transcription timeout - please try a shorter recording')
      }
      throw apiError
    }
    
} catch (error) {
  console.error('Error transcribing audio:', error)
  
  const errorMessage = error instanceof Error ? error.message : String(error)
  
  if (errorMessage.includes('Invalid audio blob')) {
    return "Recording error - please try recording again with a longer response."
  } else if (errorMessage.includes('too large')) {
    return "Recording too long - please record a shorter response (under 9 minutes)."
  } else if (errorMessage.includes('timeout')) {
    return "Transcription timeout - please try a shorter recording or check your connection."
  }
  
  return "Transcription unavailable - please check your audio recording and try again."
}
}
    // Fallback to direct API call (requires NEXT_PUBLIC_OPENAI_API_KEY)
// ULTRA-STRICT VERSION - Starts with 0s and only awards points for explicit evidence
const generateAIFeedback = async (transcript: string, roleplay: any, eventId: string, attemptNumber: number = 0, judgeContext?: string, audioDurationSeconds?: number): Promise<any> => {
  try {
    const selectedEvent = decaEvents.find(e => e.id === eventId)
    if (!selectedEvent) throw new Error("Event not found")

    // Calculate word count for logging
    const wordCount = transcript.trim().split(/\s+/).filter(word => word.length > 0).length
    
    // Use audio duration if provided, otherwise estimate from word count (average 150 words per minute)
    const durationSeconds = audioDurationSeconds || Math.round((wordCount / 150) * 60)
    const durationMinutes = Math.floor(durationSeconds / 60)
    const durationSecondsRemainder = durationSeconds % 60
    
    console.log(`Duration-based grading: ${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')} (${durationSeconds} seconds), transcript: "${transcript}"`)


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

// ADDED: Expanded prompt instructions to detect and credit DECA (D/E/C + Above & Beyond) and handle rare visual-optional PIs
const prompt = `You are a constructive DECA judge providing balanced, educational feedback to help students improve.

CRITICAL SCORING REQUIREMENTS:
- Score 0-1 points if the performance indicator was not addressed AT ALL or only names/greetings given
- Score 2-3 points ONLY if there is minimal business knowledge demonstrated (not just attempting to speak)
- Score 4-6 points for weak attempts that show some understanding but major gaps
- Score 7-10 points for adequate responses with relevant examples and clear understanding  
- Score 11-15 points for solid responses that comprehensively address the PI with depth
- Score 16+ points only for exceptional mastery with comprehensive expertise
- Be ruthlessly honest about inadequate responses - a greeting or name introduction gets 0-1 points
- If the transcript shows no business knowledge whatsoever, reflect this with very low scores (0-2)
- Apply the same strict standards to 21st Century Skills - no participation points

${judgeContextSection}

EVENT: ${roleplay.eventName}
PERFORMANCE INDICATORS: ${roleplay.performanceIndicators.join(', ')}
21ST CENTURY SKILLS: ${roleplay.twentyFirstCenturySkills.join(', ')}

ROLEPLAY SCENARIO:
${roleplay.situation}


TRANSCRIPT ANALYSIS REQUIREMENTS:
- Quote EXACTLY what the student said from the transcript - do not paraphrase or invent content
- If the transcript contains only names/greetings with no business content, explicitly state this
- Do not award points for content that was not actually said
- Use phrases like "You said: '[exact quote]'"
- If no relevant business content was provided, state "You provided no business content related to this indicator"
- Be brutally honest about what was actually demonstrated vs. completely absent

TRANSCRIPT TO EVALUATE (${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')} duration):
"${transcript}"

CRITICAL: The above transcript is EXACTLY what the student said. Do not invent or assume any additional content. Base your evaluation solely on what is written above.




EVALUATION INSTRUCTIONS FOR MINIMAL RESPONSES:
If the transcript contains only names, greetings, or non-business content (like "Hi, my name is..."), you MUST:
- Score 0-1 points for ALL performance indicators
- Score 0-1 points for ALL 21st century skills  
- In feedback, explicitly quote what they said: "You said: '[exact quote]'"
- State clearly: "This response contains no business content related to [indicator name]"
- Do NOT invent or assume business knowledge that wasn't demonstrated
- Do NOT give credit for "attempting" when no attempt was made
CRITICAL: Base scores ONLY on business content actually present in the transcript. A name introduction earns 0-1 points, not 2-4 points.


DECA METHOD EXPECTATIONS (D-E-C + Above & Beyond):
- For EACH Performance Indicator (PI), detect and note evidence of:
  • Defining — Did the student clearly define the key term/concept/PI in their own words?
  • Explaining — Did they accurately explain how it works, why it matters, or its mechanics?
  • Connecting — Did they connect the concept to the given scenario/client/data and propose an actionable step?
  • Above & Beyond (Visual/Prop) — Did they present or reference a concrete visual/prop (physical or digital) that supports THIS PI (e.g., brochure, chart, slide, mock-up, sample, QR code, calculator, menu, pricing sheet, website/app screen, storyboard, mini demo)?
- Treat “visual/prop” broadly: tangible item, handout, live demo, or digital asset explicitly described or “shown” to the judge counts.
- Do not count vague mentions (“I could show…”) as a used visual unless the student actually introduces/describes a specific artifact tied to the PI.
- Visual-Optional Exception (rare): If a PI clearly does NOT require a visual (as implied by the event rubric or context in ${judgeContextSection}), the student can still receive full points for that PI WITHOUT a visual provided their Defining/Explaining/Connecting are strong and complete. Otherwise, assume a visual strengthens eligibility for the top score band.

CRITICAL SCORING REQUIREMENTS:
- Score 0-1 points if the performance indicator was not addressed AT ALL or only mentioned in passing
- Score 2-4 points for weak attempts with minimal business content
- Score 5-8 points for basic responses that show some understanding but lack depth
- Score 9-12 points for solid responses that address the PI with relevant examples
- Score 13+ points only for exceptional responses with comprehensive depth and expertise
- Be brutally honest about what was actually said vs. what should have been said
- If the transcript is just a name introduction or similarly minimal, score 0-1 across all indicators
- Map DECA to bands as guidance (not a hard cap):
  • 0-2: No clear D/E/C for the PI.
  • 3-6: At most one element (D or E or C) weakly present; little scenario relevance.
  • 7-12: Two or more elements (D/E/C) present with relevant examples; some application.
  • 13+: All three (D, E, C) are strong AND (unless visual-optional) an Above & Beyond visual/prop meaningfully supports the PI; shows depth, accuracy, and actionable application.

STRICT EVALUATION CRITERIA:
- Did they specifically address this performance indicator? If no, score very low (0-3)
- Did they provide relevant business examples or applications? If no, cap at 30%
- Did they demonstrate genuine understanding of business concepts? Be critical.
- Was their response substantive and relevant to the scenario? If no, reflect this in scoring.
- Did they explicitly demonstrate Defining, Explaining, and Connecting for THIS PI? Lack of any should lower the band.
- Above & Beyond visual/prop: 
   • If used and clearly tied to THIS PI, treat as a strength for top-band eligibility.
   • If absent and the PI is NOT visual-optional, do NOT automatically fail—but top-band eligibility may require exceptional depth to compensate.
   • If the PI is visual-optional (rare), do NOT penalize the absence of a visual if D/E/C are strong and complete.
- Recognize explicit cues like “I’ll define…”, “Let me explain…”, “Connecting this to your store…”. Credit only when the content actually performs that function (don’t award points for labels without substance).
- Use only the transcript; do not assume unstated visuals or content.

RECOGNIZING VISUAL/PROP MENTIONS (non-exhaustive):
- Keywords/phrases that typically indicate Above & Beyond: “brochure/one-pager/handout,” “slide/deck,” “chart/graph,” “mock-up/prototype/sample,” “QR code,” “pricing sheet,” “dashboard/report,” “menu,” “product sample,” “demo,” “website/app screen,” “business card,” “portfolio.”
- Count it when the student actually presents or clearly describes the artifact and ties it to the PI’s purpose (e.g., a cost-benefit chart to justify pricing strategies).

FEEDBACK FORMAT REQUIREMENTS (JSON SHAPE UNCHANGED):
- In EVERY "performanceIndicators[i].feedback" string, provide detailed analysis in this format:
  1. First paragraph: Honest assessment of what they actually said vs. what was required (be specific and critical)
  2. "DECA Evidence — D: 'You should have defined [specific concept/PI]. What you said: [exact quote or 'only provided names/greeting']'; E: 'You should have explained [specific mechanism/process]. What you said: [exact quote or 'no explanation given']'; C: 'You should have connected this to [specific scenario element]. What you said: [exact quote or 'no connection made']'; A&B: 'You should have presented [specific visual aid]. What you presented: [what they actually presented or 'no visual mentioned']'."
  3. Final sentence: Constructive but realistic next steps
- Always include actual quotes from transcript or explicitly state what was missing
- For 21st Century Skills, be equally critical - assess actual demonstration, not potential
- In "overallImpression.feedback", provide honest critique that acknowledges severe gaps while ending constructively

Return ONLY valid JSON:
{
  "performanceIndicators": [
    {
      "indicator": "exact PI name",
      "score": number_between_0_and_${selectedEvent.piPoints},
      "feedback": "[Encouraging feedback highlighting what they did well and specific suggestions for improvement. Include: DECA Evidence — D: <...>; E: <...>; C: <...>; A&B: <used/not used + artifact + (visual-optional? yes/no)>]"
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
    "feedback": "[Encouraging overall assessment with specific next steps, including a brief summary of D/E/C consistency and Above & Beyond usage across PIs]"
  },
  "generalFeedback": "[Balanced feedback highlighting strengths and growth opportunities. Include at least one concrete, high-yield suggestion for a visual/prop the student could bring next time if appropriate.]"
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
      // feedbackData.performanceIndicators.forEach((pi: { indicator: string; score: number; feedback: string }) => {
      //   // Ensure minimum score of 20% if any relevant content is present
      //   if (pi.score < Math.floor(selectedEvent.piPoints * 0.2) && durationSeconds > 10) {
      //     pi.score = Math.floor(selectedEvent.piPoints * 0.2)
      //   }
      // })

      // feedbackData.twentyFirstCenturySkills.forEach((skill: { skill: string; score: number; feedback: string }) => {
      //   // Ensure minimum score of 20% if any relevant content is present
      //   if (skill.score < Math.floor(selectedEvent.centurySkills.skillPoints * 0.2) && durationSeconds > 10) {
      //     skill.score = Math.floor(selectedEvent.centurySkills.skillPoints * 0.2)
      //   }
      // })

      // Apply duration-based penalty: Under 4 minutes = 60% cap
      // Apply word count penalties - more strict than duration-based
      let penaltyMultiplier = 1.0
      if (wordCount < 20) {
        penaltyMultiplier = 0.3 // 30% for very short responses
        console.log(`Severe word count penalty: ${wordCount} words < 20, capped at 30%`)
      } else if (wordCount < 50) {
        penaltyMultiplier = 0.6 // 60% for short responses  
        console.log(`Word count penalty: ${wordCount} words < 50, capped at 60%`)
      } else if (durationSeconds < 240) {
        penaltyMultiplier = 0.6 // 60% cap for under 4 minutes (only if word count is acceptable)
        console.log(`Duration penalty applied: ${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')} < 4:00, capped at 60%`)
      } else {
        console.log(`No penalties applied: ${wordCount} words, ${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')} duration`)
      }

      if (penaltyMultiplier < 1.0) {
        feedbackData.performanceIndicators.forEach((pi: { indicator: string; score: number; feedback: string }) => {
          pi.score = Math.floor(pi.score * penaltyMultiplier)
        })
        feedbackData.twentyFirstCenturySkills.forEach((skill: { skill: string; score: number; feedback: string }) => {
          skill.score = Math.floor(skill.score * penaltyMultiplier)
        })
        feedbackData.overallImpression.score = Math.floor(feedbackData.overallImpression.score * penaltyMultiplier)
      }

      // Calculate totals
      const piTotal = feedbackData.performanceIndicators.reduce((sum: number, pi: { indicator: string; score: number; feedback: string }) => sum + pi.score, 0)
      const skillTotal = feedbackData.twentyFirstCenturySkills.reduce((sum: number, skill: { skill: string; score: number; feedback: string }) => sum + skill.score, 0)
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
        audioDuration: {
          seconds: durationSeconds,
          formatted: `${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')}`
        },
        penaltiesApplied: {
          durationPenalty: penaltyMultiplier < 1.0,
          durationRequired: "4:00",
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
  
  // Fallback with duration consideration
  const selectedEvent = decaEvents.find(e => e.id === eventId)
  if (!selectedEvent) throw new Error("Event not found")
    
// Determine base score based on transcript quality and content depth
    const wordCount = transcript.trim().split(/\s+/).filter(word => word.length > 0).length
    let baseScore = 0 // Start at absolute zero

    const wordCountTime = transcript.trim().split(/\s+/).filter(word => word.length > 0).length
    const durationSeconds = audioDurationSeconds || Math.round((wordCountTime / 150) * 60)
    const durationMinutes = Math.floor(durationSeconds / 60)
    const durationSecondsRemainder = durationSeconds % 60

    // Only give points if there's substantial business content
    if (wordCount >= 200 && durationSeconds > 120 && transcript.toLowerCase().includes('business')) {
      baseScore = Math.floor(selectedEvent.piPoints * 0.15) // 15% for good attempt
    } else if (wordCount >= 100 && durationSeconds > 60) {
      baseScore = Math.floor(selectedEvent.piPoints * 0.05) // 5% for minimal attempt
    } else if (wordCount >= 20 && durationSeconds > 20) {
      baseScore = 1 // Almost nothing but not zero
    } else {
      baseScore = 0 // Truly inadequate gets zero
    }

const piScores = roleplay.performanceIndicators.map((indicator: string) => ({
      indicator,
      score: baseScore,
      feedback: baseScore === 0 
        ? `This performance indicator was not addressed at all. Your response "${transcript}" contains no business content related to "${indicator}". You need to demonstrate understanding of this concept with definitions, explanations, and scenario connections to earn points.`
        : `This performance indicator was not adequately addressed. Your brief response showed no understanding of "${indicator}". Provide comprehensive explanations with business examples and clear connections to the scenario.`
    }))

    const skillScores = roleplay.twentyFirstCenturySkills.map((skill: string) => ({
      skill,
      score: Math.max(0, baseScore),
      feedback: baseScore === 0
        ? `"${skill}" was not demonstrated in your response. Your brief greeting showed no evidence of this skill in a business context.`
        : `Your response showed minimal evidence of "${skill}". You need to demonstrate this skill through substantive business analysis and detailed reasoning.`
    }))

    const totalPossible = 
      selectedEvent.numPIs * selectedEvent.piPoints +
      selectedEvent.centurySkills.numSkills * selectedEvent.centurySkills.skillPoints +
      selectedEvent.centurySkills.skillPoints

    let estimatedTotal = (piScores.length * baseScore) + (skillScores.length * Math.floor(selectedEvent.centurySkills.skillPoints * 0.3)) + Math.floor(selectedEvent.centurySkills.skillPoints * 0.3)
    
    // Apply duration penalty to fallback too
    if (durationSeconds < 240) {
      estimatedTotal = Math.floor(estimatedTotal * 0.6)
    }
    
    const percentageScore = Math.round((estimatedTotal / totalPossible) * 100)

    return {
      totalScore: percentageScore,
      performanceIndicators: piScores,
      twentyFirstCenturySkills: skillScores,
      overallImpression: {
        score: Math.max(0, baseScore),
        feedback: baseScore === 0 
          ? `Your response was insufficient for a DECA roleplay. A simple name introduction does not demonstrate business knowledge or professional communication skills required for competition. You must provide substantive analysis of the business scenario to succeed in DECA.`
          : `Your response lacked the depth and business knowledge expected in DECA competition. Focus on thoroughly analyzing the scenario, demonstrating understanding of business concepts, and providing detailed recommendations with supporting evidence.`
      },
      generalFeedback: `Your ${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')} response needs significant improvement to meet DECA standards. ${durationSeconds < 240 ? 'Aim for at least 4 minutes of substantive business content. ' : ''}Study the performance indicators thoroughly, practice defining business concepts, and prepare comprehensive responses that demonstrate mastery of the subject matter. DECA judges expect professional-level business knowledge and presentation skills.`,
      rawTotal: estimatedTotal,
      totalPossible: totalPossible,
      audioDuration: {
        seconds: durationSeconds,
        formatted: `${durationMinutes}:${durationSecondsRemainder.toString().padStart(2, '0')}`
      },
      penaltiesApplied: {
        durationPenalty: durationSeconds < 240,
        durationRequired: "4:00",
        badWordPenalty: false,
        badWordCount: 0
      }
    }
  }
}

// Fixed chat message function - use your API endpoint
const sendChatMessage = async (messages: Array<{role: 'user' | 'assistant', content: string}>, context: string): Promise<string> => {
  try {
const systemPrompt = `You are a strict DECA judge and coach. You ONLY discuss business, finance, marketing, DECA competition topics, and the specific roleplay scenario AND IF SOMEONE ASKS ABOUT ANYTHING ELSE, SAYY A VARIATION OF "Sorry, I am unable to help blah blah blah". You REFUSE to answer questions about anything else.

Context: ${context}

STRICT GUIDELINES:
1. ONLY answer questions about: business concepts, finance, marketing, DECA competition advice, and THIS specific roleplay scenario
2. For score explanations, reference specific aspects from the judge scenario and event requirements
3. If asked about non-business topics, respond: "I only provide feedback on business, finance, marketing, and DECA-related topics. Please ask about your roleplay performance."
4. Use **text** for bold formatting and • for bullet points
5. Keep responses focused and professional

Format your responses with:
- **Bold text** using double asterisks for emphasis
- • Bullet points for lists
- Reference specific judge expectations when explaining scores

Your role is to:
1. Act as the judge character from the scenario when discussing the roleplay
2. Analyze the student's presentation based on DECA performance indicators
3. Provide specific, actionable feedback for improvement based on judge scenario requirements
4. Answer questions about their performance from the judge's perspective
5. Offer coaching advice for future DECA competitions
6. Be strict but constructive about areas needing improvement

When discussing scores, always reference what the judge was looking for based on the scenario context and performance indicators. Stay strictly within business and DECA topics.`

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


const extractSectionResponse = (transcript: string, keywords: string[]): string => {
  const lower = transcript.toLowerCase();
  for (const word of keywords) {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      // grab a ~30 word window around the keyword
      const words = transcript.split(/\s+/);
      const start = Math.max(0, idx - 15);
      const end = Math.min(words.length, start + 30);
      return words.slice(start, end).join(" ");
    }
  }
  return "No relevant response found.";
};


// Add state for expanded PI cards
const PICard = ({ pi, eventId, transcription }: { pi: any; eventId: string; transcription: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [decaEvidence, setDecaEvidence] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadDecaEvidence = async () => {
    if (!decaEvidence && !isLoading) {
      setIsLoading(true);
      const evidence = await extractDECAEvidence(pi.feedback, pi.indicator, transcription);
      setDecaEvidence(evidence);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isExpanded) {
      loadDecaEvidence();
    }
  }, [isExpanded]);

  // Extract DECA evidence from the feedback if it exists
  const extractDECAEvidence = async (feedback: string, indicator: string, transcript: string) => {
  const decaMatch = feedback.match(/DECA Evidence[—-]\s*(.*?)(?:\n|$)/);
  
  // Create detailed DECA breakdown with LLM-generated examples and official definitions
  const createDECABreakdown = async (indicator: string, transcript: string) => {
    try {
      // First, try to find official definition from PI data
      const allPIs = await loadAllPerformanceIndicators(eventId);
      const matchingPI = allPIs.find(pi => pi.name === indicator);
      const officialDefinition = matchingPI?.definition || "";
      
      // Generate LLM examples
      const prompt = `You are a DECA expert. For the performance indicator "${indicator}", provide specific business examples for each DECA method component.

OFFICIAL DEFINITION (if available): ${officialDefinition}

STUDENT'S ACTUAL RESPONSE: "${transcript.trim()}"

Provide exactly 4 components:

1. DEFINE: Start with the official definition if provided, then explain how a student should define this concept clearly. Include what the student actually said and whether it works.

2. EXPLAIN: Describe how a student should explain the mechanisms, importance, and business applications. Include what the student actually said and analysis.

3. CONNECT: Explain how a student should connect this to specific scenario details with actionable recommendations. Include what the student actually said and analysis.  

4. VISUAL: Describe a specific, relevant visual aid that would support this performance indicator and explain why it's effective.

Format as JSON:
{
  "define": "Complete explanation with official definition, expectations, and analysis of actual response",
  "explain": "Complete explanation of how to explain mechanisms and analysis of actual response", 
  "connect": "Complete explanation of how to connect to scenario and analysis of actual response",
  "visual": "Specific visual aid description with explanation of effectiveness"
}`;

      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [
            {
              role: 'system', 
              content: 'You are a DECA expert providing detailed, specific examples. Always include official definitions when available and analyze the student\'s actual response.'
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        
        if (content) {
          try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const breakdown = JSON.parse(jsonMatch[0]);
              return {
  define: breakdown.define || `Official definition needed for "${indicator}". You responded with: "${transcript.trim()}", which lacks a clear definition.`,
  explain: breakdown.explain || `You should explain the mechanisms of "${indicator}". You responded with: "${transcript.trim()}", which provides no explanation.`,
  connect: breakdown.connect || `You should connect "${indicator}" to the scenario. You responded with: "${transcript.trim()}", which makes no connection.`,
  aboveBeyond: breakdown.visual || `A relevant visual aid would strengthen your presentation of "${indicator}". You presented: no visual aid mentioned.`,
  visualOptional: false,

  // NEW: capture student responses per DECA section
  studentResponses: {
    define: extractSectionResponse(transcript, ["define", "definition"]),
    explain: extractSectionResponse(transcript, ["explain", "explanation"]),
    connect: extractSectionResponse(transcript, ["connect", "connection"]),
    aboveBeyond: extractSectionResponse(transcript, ["visual", "prop", "diagram", "chart", "slide"])
  }
};
            }
          } catch (parseError) {
            console.error('Error parsing LLM DECA breakdown:', parseError);
          }
        }
      }
    } catch (error) {
      console.error('Error generating LLM DECA breakdown:', error);
    }
    
    // Fallback if LLM fails
    const actualResponse = transcript.trim();
    const hasBusinessContent = actualResponse.length > 20 && 
      !actualResponse.toLowerCase().match(/^(hi|hello|my name is|i am|i'm)/);
    
    return {
      define: `You should clearly define "${indicator}" using official business terminology. You responded with: "${actualResponse}", which ${hasBusinessContent ? 'lacks a clear definition' : 'contains no business content and no definition'}.`,
      explain: `You should explain how "${indicator}" works, its mechanisms, and business importance. You responded with: "${actualResponse}", which ${hasBusinessContent ? 'provides no explanation of mechanisms or importance' : 'contains no business explanation whatsoever'}.`,
      connect: `You should connect "${indicator}" to the specific business scenario with actionable recommendations. You responded with: "${actualResponse}", which ${hasBusinessContent ? 'fails to connect to the scenario' : 'makes no connection to the business scenario'}.`,
      aboveBeyond: `A good example of a relevant visual aid that supports this performance indicator would strengthen your presentation because it provides concrete evidence. You presented: no visual aid mentioned, which misses an opportunity to enhance your presentation with supporting materials.`,
      visualOptional: false
    };
  };
  
  if (!decaMatch) {
    return await createDECABreakdown(indicator, transcript);
  }
  
  const evidence = decaMatch[1];
  const parts = {
    define: '',
    explain: '',
    connect: '', 
    aboveBeyond: '',
    visualOptional: false
  };
  
  const defineMatch = evidence.match(/D:\s*'([^']*)'[^;]*;\s*/);
  const explainMatch = evidence.match(/E:\s*'([^']*)'[^;]*;\s*/);
  const connectMatch = evidence.match(/C:\s*'([^']*)'[^;]*;\s*/);
  const aboveMatch = evidence.match(/A&B:\s*'([^']*)'[^;]*[.;]?\s*/);
  
  if (defineMatch) parts.define = defineMatch[1].trim();
  if (explainMatch) parts.explain = explainMatch[1].trim();  
  if (connectMatch) parts.connect = connectMatch[1].trim();
  if (aboveMatch) {
    parts.aboveBeyond = aboveMatch[1].trim();
    parts.visualOptional = parts.aboveBeyond.includes('visual-optional: yes');
  }
  
  if (!parts.define && !parts.explain && !parts.connect) {
    return await createDECABreakdown(indicator, transcript);
  }
  
  return parts;
};

  
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-gray-800">{pi.indicator}</span>
        <span className="text-blue-600 font-bold text-lg">
          {pi.score}/{decaEvents.find(e => e.id === eventId)?.piPoints}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${(pi.score / (decaEvents.find(e => e.id === eventId)?.piPoints || 1)) * 100}%` }}
        ></div>
      </div>
      <p className="text-gray-600 text-sm mb-3">{pi.feedback.split('DECA Evidence')[0].trim()}</p>
      
      {/* DECA Breakdown Dropdown */}
      <div className="border-t border-gray-200 pt-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          <span>"DECA" Method Breakdown</span>
          <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </button>
        
<div className={`mt-3 space-y-3 transition-all duration-300 overflow-hidden ${
  isExpanded ? 'max-h-[2000px]' : 'max-h-0'
}`}>

  {isLoading && (
    <div className="text-center text-gray-500 py-2">
      <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full inline-block mr-2"></div>
      Loading breakdown...
    </div>
  )}
  
  {decaEvidence && !isLoading && (
    <>
<div className="bg-white p-3 rounded border border-gray-200">
  <div className="flex items-start gap-2">
    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
      D
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-800 mb-1">Define</p>
      <p className="text-xs text-gray-600">
        {decaEvidence.define || "Not clearly demonstrated in your response"}
      </p>
      <p className="text-xs text-gray-500 italic mt-2">
        Student's actual response: "{decaEvidence.studentResponses.define}"
      </p>
    </div>
  </div>
</div>

<div className="bg-white p-3 rounded border border-gray-200">
  <div className="flex items-start gap-2">
    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">
      E
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-800 mb-1">Explain</p>
      <p className="text-xs text-gray-600">
        {decaEvidence.explain || "Not clearly demonstrated in your response"}
      </p>
      <p className="text-xs text-gray-500 italic mt-2">
        Student's actual response: "{decaEvidence.studentResponses.define}"
      </p>
    </div>
  </div>
</div>

<div className="bg-white p-3 rounded border border-gray-200">
  <div className="flex items-start gap-2">
    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">
      C
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-800 mb-1">Connect</p>
      <p className="text-xs text-gray-600">
        {decaEvidence.connect || "Not clearly demonstrated in your response"}
      </p>
      <p className="text-xs text-gray-500 italic mt-2">
        Student's actual response: "{decaEvidence.studentResponses.define}"
      </p>
    </div>
  </div>
</div>

      
<div className="bg-white p-3 rounded border border-gray-200">
  <div className="flex items-start gap-2">
    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs flex-shrink-0">
      A
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-800 mb-1">Above & Beyond (Visual/Prop)</p>
      <p className="text-xs text-gray-600">
        {decaEvidence.aboveBeyond?.includes('not used') ? (
          <>
            {decaEvidence.visualOptional ? (
              <span className="text-blue-600">Visual/prop not required for this performance indicator</span>
            ) : (
              <>
                <span className="text-red-600">No visual/prop presented. </span>
                {decaEvidence.aboveBeyond}
              </>
            )}
          </>
        ) : (
          decaEvidence.aboveBeyond || "Not demonstrated in your response"
        )}
      </p>

      {/* NEW: Check transcript for any mention of a visual aid */}
      <p className="text-xs text-gray-500 mt-2 italic">
        {transcription.toLowerCase().match(/visual|chart|graph|slide|prop|diagram|picture|image/) 
          ? "The student did verbally describe a visual aid." 
          : "The student did not verbally describe any relevant visual aid."}
      </p>
    </div>
  </div>
</div>
    </>
  )}
  
  {!decaEvidence && !isLoading && (
    <div className="bg-white p-3 rounded border border-gray-200">
      <p className="text-xs text-gray-500 italic">
        DECA method breakdown shows what you should have done for this performance indicator. Use this guidance for your next attempt.
      </p>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

// Fixed chat message function - use your API endpoint

export default function DECAPracticePage() {
  const [step, setStep] = useState(1)
  const [selectedEventId, setSelectedEventId] = useState("")
  const [roleplay, setRoleplay] = useState<any>(null)
  const [feedback, setFeedback] = useState<any>(null)
  const { isRecording, audioUrl, audioBlob, duration, showTimeUpModal, startRecording, stopRecording, closeTimeUpModal, resetAudio, setAudioUrl, setAudioBlob } = useAudioRecorder(selectedEventId)
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
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false)

  // Audio playback states
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)


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


  // Audio playback functions
  const togglePlayback = () => {
    if (!audioElement) {
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audio.addEventListener('loadedmetadata', () => {
          setAudioDuration(audio.duration)
        })
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime)
        })
        audio.addEventListener('ended', () => {
          setIsPlaying(false)
          setCurrentTime(0)
        })
        setAudioElement(audio)
        audio.play()
        setIsPlaying(true)
      }
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
    if (audioElement) {
      audioElement.currentTime = time
      setCurrentTime(time)
    }
  }

  // Clean up audio element when component unmounts
useEffect(() => {
  return () => {
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
    }
    // Clean up audio URL when component unmounts
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
  }
}, [audioElement, audioUrl])

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

    // Load judge context and event scenario for comprehensive context
    const judgeContext = await loadJudgeScenario(selectedEventId).catch(() => 
      'You are an experienced DECA judge providing feedback on roleplay performance.'
    )
    
    const eventScenario = await loadEventScenario(selectedEventId).catch(() => 
      'Standard DECA business roleplay scenario.'
    )
    
    // Create comprehensive context for the AI
    const context = `
    DECA Event: ${roleplay?.eventName} (${selectedEventId})
    Event Cluster: ${roleplay?.cluster}
    Performance Indicators: ${roleplay?.performanceIndicators?.join(', ')}
    21st Century Skills: ${roleplay?.twentyFirstCenturySkills?.join(', ')}
    
    ROLEPLAY SCENARIO: ${roleplay?.situation}
    
    JUDGE ROLE & EXPECTATIONS: ${judgeContext}
    
    EVENT REQUIREMENTS: ${eventScenario}
    
    STUDENT'S PRESENTATION TRANSCRIPT: ${transcription}
    
    SCORING RESULTS:
    Overall Score: ${feedback?.totalScore}/100
    Performance Indicators Scores: ${feedback?.performanceIndicators?.map((pi: any) => `${pi.indicator}: ${pi.score}/${decaEvents.find(e => e.id === selectedEventId)?.piPoints}`).join(', ')}
    21st Century Skills Scores: ${feedback?.twentyFirstCenturySkills?.map((skill: any) => `${skill.skill}: ${skill.score}/${decaEvents.find(e => e.id === selectedEventId)?.centurySkills.skillPoints}`).join(', ')}
    
    Judge's Overall Impression: ${feedback?.overallImpression?.feedback}
    General Feedback: ${feedback?.generalFeedback}
    `

    try {
      const response = await sendChatMessage(updatedMessages, context)
      
      // Format the response for better display
      const formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>
        .replace(/^• /gm, '<li>') // Convert bullet points
        .replace(/\n• /g, '</li>\n<li>') // Handle multiple bullets
        .replace(/<li>(.*?)(?=\n|$)/g, '<li>$1</li>') // Close li tags
      
      // Wrap multiple list items in ul tags
      const finalResponse = formattedResponse.includes('<li>') 
        ? formattedResponse.replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
        : formattedResponse
      
      const assistantMessage = { role: 'assistant' as const, content: finalResponse }
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
      const errorMessage = { role: 'assistant' as const, content: "I'm sorry, I encountered an error. Please ask me about your DECA roleplay performance or business-related topics." }
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
  if (!audioBlob) {
    alert('No audio recording found. Please record your response first.')
    return
  }
  
  // Additional validation
  if (audioBlob.size === 0) {
    alert('Audio recording is empty. Please try recording again.')
    return
  }
  
  setIsSubmitting(true)
  setTranscriptionStatus("Transcribing your audio...")
  
  try {
    // Transcribe audio
    const transcript = await transcribeAudio(audioBlob)
    
    // Check if transcription is meaningful
    if (!transcript || transcript.trim().length < 10) {
      throw new Error('Transcription too short or empty')
    }
    
    setTranscription(transcript)
    
    setTranscriptionStatus("Analyzing your presentation...")
    
    // Load judge context for more accurate grading
    const judgeContext = await loadJudgeScenario(selectedEventId)
    
    // Generate AI-powered feedback based on transcript with duration and attempt tracking
    const aiGeneratedFeedback = await generateAIFeedback(
      transcript, 
      roleplay, 
      selectedEventId, 
      eventAttemptCount, 
      judgeContext, 
      duration // Pass the actual audio duration in seconds
    )
    
    setFeedback(aiGeneratedFeedback)
    setShowChatbot(true)
    setStep(3)
} catch (error) {
  console.error('Error processing recording:', error)
  
  const errorMessage = error instanceof Error ? error.message : String(error)
  
  if (errorMessage.includes('Transcription too short')) {
    alert('Your recording appears to be too short or unclear. Please try recording a longer response.')
  } else if (errorMessage.includes('Invalid audio blob')) {
    alert('There was an issue with your audio recording. Please try recording again.')
  } else if (errorMessage.includes('too large')) {
    alert('Your recording is too long. Please keep responses under 9 minutes.')
  } else if (errorMessage.includes('timeout')) {
    alert('Transcription is taking too long. Please try a shorter recording.')
  } else {
    alert('Error processing your audio. Please try again or use a different device.')
  }
} finally {
  setIsSubmitting(false)
  setTranscriptionStatus("")
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
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p>When describing visuals, describe them just as you would in an in-person roleplay</p>
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
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Roleplay Practice</h1>
          <p className="text-gray-600">Perfect your roleplay skills with AI-powered feedback</p>
        </div>

        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Event</CardTitle>
                <CardDescription>Choose your competitive event to get a roleplay scenario</CardDescription>
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
    <div className="flex flex-col items-center gap-3">
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
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Duration: {formatDuration(duration)}
          </span>

          <a
            href={audioUrl}
            download={`deca-roleplay-recording.${audioBlob?.type.includes('mp4') ? 'mp4' : 'webm'}`}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Download
          </a>
        </div>
      </div>
      {/* Fix: Add both audio element and fallback for mobile */}
      <audio 
        controls 
        src={audioUrl}
        className="w-full"
        controlsList="nodownload noplaybackrate"
        preload="metadata"
        playsInline // Important for iOS
      >
        Your browser does not support the audio element.
      </audio>
      
      {/* Fix: Add mobile fallback message */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        If audio doesn't play, try downloading the file above
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
                    
                    {/* Duration Display */}
                    {feedback.audioDuration && (
                      <div className="mt-3 text-sm text-gray-600">
                        <div className="flex items-center justify-center gap-4">
                          {/* <span>Duration: <span className="font-mono font-medium">{feedback.audioDuration.formatted}</span></span> */}
                          {feedback.penaltiesApplied?.durationPenalty && (
                            <span className="text-orange-600 font-medium">
                              {/* ⚠️ Under {feedback.penaltiesApplied.durationRequired} (60% cap) */}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
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
                          <PICard key={i} pi={pi} eventId={selectedEventId} transcription={transcription} />
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
                        resetAudio() // Use the resetAudio function from the hook
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
                        resetAudio() // Use the resetAudio function from the hook
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
{/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Chatbot Section */}
              {showChatbot && (
                <Card className="flex flex-col h-[600px]">
                  <CardHeader className="flex-shrink-0 pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      AI Judge Coach
                    </CardTitle>
                    <CardDescription>Get strict business-focused feedback on your DECA performance</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 min-h-0">
                    {/* Expandable Transcription Preview */}
                    {transcription && (
                      <div className="mb-4 border border-blue-200 rounded-lg flex-shrink-0">
                        <button
                          onClick={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
                          className="w-full p-3 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 rounded-t-lg border-b border-blue-200 flex items-center justify-between"
                        >
                          <h4 className="font-medium text-blue-800 text-sm">Your Presentation Transcript</h4>
                          <div className={`transform transition-transform duration-200 ${isTranscriptExpanded ? 'rotate-180' : ''}`}>
                            ▼
                          </div>
                        </button>
                        
                        <div className={`transition-all duration-300 overflow-hidden ${
                          isTranscriptExpanded ? 'max-h-60' : 'max-h-16'
                        }`}>
                          <div className={`p-3 bg-white ${
                            isTranscriptExpanded ? 'overflow-y-auto max-h-56' : 'overflow-hidden'
                          }`}>
                            <p className={`text-xs text-blue-700 ${
                              isTranscriptExpanded ? '' : 'line-clamp-3'
                            }`}>
                              {transcription}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages - Fixed height container */}
                    <div 
                      id="chat-messages-container"
                      className="flex-1 overflow-y-auto space-y-3 mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-0"
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {chatMessages.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm font-medium">Ask me about your DECA performance!</p>
                          <div className="mt-4 space-y-2 text-xs text-left max-w-xs mx-auto">
                            <div className="p-2 bg-white rounded border border-gray-200">
                              "Why did I get this score on the first performance indicator?"
                            </div>
                            <div className="p-2 bg-white rounded border border-gray-200">
                              "What business concepts should I improve?"
                            </div>
                            <div className="p-2 bg-white rounded border border-gray-200">
                              "How can I better address the judge's expectations?"
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {chatMessages.map((message, i) => (
                        <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-gray-800 border border-gray-300 shadow-sm'
                          }`}>
                            <div 
                              className="whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ 
                                __html: message.role === 'assistant' ? message.content : message.content 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white text-gray-800 p-3 rounded-lg text-sm border border-gray-300 shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                              <span>Analyzing from judge's perspective...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input - Fixed at bottom */}
                    <div className="flex gap-2 flex-shrink-0">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendChatMessageHandler(chatInput)
                          }
                        }}
                        placeholder="Ask about business concepts, DECA tips, or your roleplay..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isChatLoading}
                      />
                      <Button
                        onClick={() => sendChatMessageHandler(chatInput)}
                        disabled={isChatLoading || !chatInput.trim()}
                        size="sm"
                        className="px-4 flex-shrink-0"
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
                          Duration: {formatDuration(duration)}
                        </span>
                      </div>
                      <audio 
                        controls 
                        src={audioUrl}
                        className="w-full"
                        controlsList="noplaybackrate"
                      >
                        Your browser does not support the audio element.
                      </audio>
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