"use client"

import { useState, useEffect } from "react"
import { Search, RotateCcw, ChevronLeft, ChevronRight, Shuffle, List } from "lucide-react"

// Types
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

interface DecaEvent {
  id: string;
  name: string;
  cluster: string;
  piCategory: string;
  pdfLink: string;
}

// Event mappings (restructured according to your categories)
const decaEvents: DecaEvent[] = [
  // Business Administration Core (Principles)
  { id: "PBM", name: "Principles of Business Management and Administration", cluster: "Business Administration Core (Principles)", piCategory: "Business Management & Administration", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-business-management-and-administration" },
  { id: "PFN", name: "Principles of Finance", cluster: "Business Administration Core (Principles)", piCategory: "Finance", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-finance" },
  { id: "PHT", name: "Principles of Hospitality and Tourism", cluster: "Business Administration Core (Principles)", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "PMK", name: "Principles of Marketing", cluster: "Business Administration Core (Principles)", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "PEN", name: "Principles of Entrepreneurship", cluster: "Business Administration Core (Principles)", piCategory: "Entrepreneurship", pdfLink: "..." },
  
  // Business Management & Administration
  { id: "BLTDM", name: "Business Law and Ethics Team Decision Making", cluster: "Business Management & Administration", piCategory: "Business Management & Administration", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-business-management-and-administration" },
  { id: "HRM", name: "Human Resources Management Series", cluster: "Business Management & Administration", piCategory: "Business Management & Administration", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-business-management-and-administration" },

  // Entrepreneurship
  { id: "ENT", name: "Entrepreneurship Series", cluster: "Entrepreneurship", piCategory: "Entrepreneurship", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-entrepreneurship" },
  { id: "ETDM", name: "Entrepreneurship Team Decision Making", cluster: "Entrepreneurship", piCategory: "Entrepreneurship", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-entrepreneurship" },

  // Finance
  { id: "ACT", name: "Accounting Applications Series", cluster: "Finance", piCategory: "Finance", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-finance" },
  { id: "BFS", name: "Business Finance Series", cluster: "Finance", piCategory: "Finance", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-finance" },
  { id: "FCE", name: "Financial Consulting", cluster: "Finance", piCategory: "Finance", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-finance" },
  { id: "FTDM", name: "Financial Services Team Decision Making", cluster: "Finance", piCategory: "Finance", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-finance" },

  // Hospitality & Tourism
  { id: "HTDM", name: "Hospitality Services Team Decision Making", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "HLM", name: "Hotel and Lodging Management Series", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "QSRM", name: "Quick Serve Restaurant Management Series", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "RFSM", name: "Restaurant and Food Service Management Series", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "TTDM", name: "Travel and Tourism Team Decision Making", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },
  { id: "HTPS", name: "Hospitality & Tourism Professional Selling", cluster: "Hospitality & Tourism", piCategory: "Hospitality & Tourism", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-hospitality-and-tourism" },

  // Marketing
  { id: "AAM", name: "Apparel and Accessories Marketing Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "ASM", name: "Automotive Services Marketing Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "BSM", name: "Business Services Marketing Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "FMS", name: "Food Marketing Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "MCS", name: "Marketing Communications Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "MTDM", name: "Marketing Management Team Decision Making", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "PSE", name: "Professional Selling", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "RMS", name: "Retail Merchandising Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "SEM", name: "Sports and Entertainment Marketing Series", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "STDM", name: "Sports and Entertainment Marketing Team Decision Making", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "BTDM", name: "Buying and Merchandising Team Decision Making", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "IMCE", name: "Integrated Marketing Campaign – Event", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "IMCP", name: "Integrated Marketing Campaign – Product", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },
  { id: "IMCS", name: "Integrated Marketing Campaign – Service", cluster: "Marketing", piCategory: "Marketing", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-marketing" },

  // Personal Financial Literacy
  { id: "PFL", name: "Personal Financial Literacy", cluster: "Personal Financial Literacy", piCategory: "Personal Financial Literacy", pdfLink: "https://www.deca.org/advisor-resources/performance-indicators-personal-finance" }
];

export default function PIFlashcards() {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [filteredPIs, setFilteredPIs] = useState<PI[]>([])
  const [allPIs, setAllPIs] = useState<PI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPIList, setShowPIList] = useState(false)

    // Load JSON data from files
useEffect(() => {
  const loadPIData = async () => {
    setLoading(true)
    setError(null)

    try {
      const jsonFiles = [
        '/data/output-ba-core-definitions.json',
        '/data/output-ba-mgmt-definitions.json',
        '/data/output-ent-definitions.json',
        '/data/output-fin-definitions.json',
        '/data/output-ht-definitions.json',
        '/data/output-mark-definitions.json',
        '/data/output-pfl-definitions.json'
      ]

      const allData: PI[] = []

      for (const file of jsonFiles) {
        try {
          const response = await fetch(file)
          if (response.ok) {
            const data: PI[] = await response.json()
            console.log(`Loaded ${data.length} PIs from ${file}`)
            allData.push(...data)
          } else {
            console.error(`Failed to fetch ${file}: ${response.status}`)
          }
        } catch (fileError) {
          console.error(`Could not load ${file}:`, fileError)
        }
      }

      if (allData.length === 0) {
        console.warn("No PI data loaded, falling back to sample data")
        const sampleData: PI[] = [
          {
            id: 1,
            code: "BL:163",
            name: "Comply with the spirit and intent of laws and regulations",
            definition:
              "Following laws and rules in a way that respects their purpose and intended outcomes, not just the exact words.\n- Understand what laws are meant to achieve\n- Make decisions that align with the goals of regulations\n- Avoid actions that technically follow the law but go against its purpose",
            cluster: "",
            category: "Marketing",
            level: "CS",
            event: [
              "AAM",
              "ASM",
              "BSM",
              "BTDM",
              "FMS",
              "IMCE",
              "IMCP",
              "IMCS",
              "MCS",
              "MTDM",
              "PSE",
              "RMS",
              "SEM",
              "STDM"
            ]
          },
          {
            id: 2,
            code: "BL:067",
            name: "Discuss the nature of law and sources of law in the United States",
            definition:
              "Explain what law is and identify where laws come from in the U.S.\n- Law is a set of rules that govern behavior.\n- Sources of law include the Constitution, statutes (laws made by legislatures), case law (court decisions), and administrative regulations.",
            cluster: "",
            category: "Marketing",
            level: "SP",
            event: [
              "AAM",
              "ASM",
              "BSM",
              "BTDM",
              "FMS",
              "IMCE",
              "IMCP",
              "IMCS",
              "MCS",
              "MTDM",
              "PSE",
              "RMS",
              "SEM",
              "STDM"
            ]
          }
        ]
        allData.push(...sampleData)
      }

      setAllPIs(allData)
      setFilteredPIs(allData)
    } catch (err) {
      console.error("Error loading PI data:", err)
      setError("Failed to load Performance Indicator data")
    } finally {
      setLoading(false)
    }
  }

  loadPIData()
}, [])


  // Filter PIs based on selected event and search term
  useEffect(() => {
    let filtered = allPIs

    if (selectedEvent) {
      filtered = allPIs.filter(pi => pi.event.includes(selectedEvent))
    }

    if (searchTerm) {
      filtered = filtered.filter(pi => 
        pi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pi.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pi.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPIs(filtered)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }, [selectedEvent, searchTerm, allPIs])

  const shuffleCards = () => {
    const shuffled = [...filteredPIs].sort(() => Math.random() - 0.5)
    setFilteredPIs(shuffled)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredPIs.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredPIs.length) % filteredPIs.length)
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  // Handle both click and touch events for mobile
  const handleCardClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    flipCard()
  }

  const currentPI = filteredPIs[currentCardIndex]

  // Group events by cluster for better organization
  const groupedEvents = decaEvents.reduce((acc, event) => {
    if (!acc[event.cluster]) {
      acc[event.cluster] = []
    }
    acc[event.cluster].push(event)
    return acc
  }, {} as Record<string, typeof decaEvents>)

  // Get PIs for the selected event
  const getEventPIs = (): PI[] => {
    if (!selectedEvent) return []
    return allPIs.filter(pi => pi.event.includes(selectedEvent))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Performance Indicators...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            PI Flashcards
          </h1>
          <p className="text-gray-600 text-lg">
            Master your Performance Indicators with interactive flashcards
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredPIs.length} of {allPIs.length} Performance Indicators
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Event
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Events (Show All PIs)</option>
                {Object.entries(groupedEvents).map(([cluster, events]) => (
                  <optgroup key={cluster} label={cluster}>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name} ({event.id})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Performance Indicators
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, code, or definition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
{/* Action Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={shuffleCards}
              disabled={filteredPIs.length <= 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Shuffle className="h-4 w-4" />
              Shuffle
            </button>
            <button
              onClick={() => {
                setCurrentCardIndex(0)
                setIsFlipped(false)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            {selectedEvent && (
              <>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded">
                  Event: <span className="font-medium">{selectedEvent}</span>
                </div>
                <button
                  onClick={() => setShowPIList(!showPIList)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <List className="h-4 w-4" />
                  {showPIList ? 'Hide' : 'Show'} PI List
                </button>
              </>
            )}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium">
              Learn Mode with relevant PIs coming soon! (similar to Knowt)
            </div>
          </div>        </div>

        {/* Flashcard */}
        {filteredPIs.length > 0 && currentPI ? (
          <div className="max-w-2xl mx-auto mb-8">
            {/* Card Counter */}
            <div className="text-center mb-4">
              <span className="text-lg font-medium text-gray-700">
                {currentCardIndex + 1} / {filteredPIs.length}
              </span>
            </div>

            {/* Card - Mobile-Friendly Version */}
            <div className="relative">
              {!isFlipped ? (
                // Front of Card
                <div 
                  className="bg-white rounded-xl shadow-xl border-2 border-blue-200 p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[320px] flex flex-col justify-center"
                  onClick={handleCardClick}
                  onTouchEnd={handleCardClick}
                  style={{ touchAction: 'manipulation' }}
                >
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block mx-auto">
                    {currentPI.code}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {currentPI.name}
                  </h2>
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm mb-4 inline-block mx-auto">
                    {currentPI.category} • Level {currentPI.level}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {currentPI.event.slice(0, 6).map(eventId => (
                      <span key={eventId} className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs">
                        {eventId}
                      </span>
                    ))}
                    {currentPI.event.length > 6 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{currentPI.event.length - 6} more
                      </span>
                    )}
                  </div>
                  <div className="mt-auto text-sm text-gray-500">
                    Tap to reveal definition
                  </div>
                </div>
              ) : (
                // Back of Card
                <div 
                  className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-xl border-2 border-teal-200 p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[320px] flex flex-col justify-center"
                  onClick={handleCardClick}
                  onTouchEnd={handleCardClick}
                  style={{ touchAction: 'manipulation' }}
                >
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block mx-auto">
                    Definition
                  </div>
                  <div className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 max-h-48 overflow-y-auto">
                    {currentPI.definition.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))}
                  </div>
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm mb-2 inline-block mx-auto">
                    Level: {currentPI.level}
                  </div>
                  <div className="mt-auto text-sm text-gray-500">
                    Tap to show question
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevCard}
                disabled={filteredPIs.length <= 1}
                className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              
              <button
                onClick={flipCard}
                className="px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                {isFlipped ? 'Show Question' : 'Show Answer'}
              </button>

              <button
                onClick={nextCard}
                disabled={filteredPIs.length <= 1}
                className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 mb-8">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Performance Indicators Found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or selecting a different event.
            </p>
          </div>
        )}

        {/* PI List for Selected Event */}
        {selectedEvent && showPIList && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Performance Indicators for {selectedEvent}
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {getEventPIs().length} PIs
              </span>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getEventPIs().map((pi) => (
                <div key={pi.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {pi.code}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {pi.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{pi.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pi.definition.split('\n')[0]}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}