"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, Square, ArrowRight } from "lucide-react"
import { useAudioRecorder } from "../hooks/useAudioRecorder"
import { generateRoleplay, evaluateResponse, transcribeAudio, processAudioResponse } from "./actions"
import { decaEvents } from "../data/deca-data"
import type { RoleplayScenario } from "../types/deca"

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

export default function DECARoleplay() {
  const [step, setStep] = useState(1)
  const [selectedEventId, setSelectedEventId] = useState("")
  const [roleplay, setRoleplay] = useState<RoleplayScenario | null>(null)
  const [feedback, setFeedback] = useState<any>(null)
  const { isRecording, audioUrl, audioBlob, startRecording, stopRecording } = useAudioRecorder()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [transcriptionStatus, setTranscriptionStatus] = useState('')

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEventId) return

    const roleplayData = await generateRoleplay(selectedEventId)
    setRoleplay(roleplayData)
    setStep(2)
  }

  const handleSubmitRecording = async () => {
    if (!audioBlob || !roleplay || !selectedEventId) return

    try {
      setIsSubmitting(true)
      setTranscriptionStatus('Processing audio...')

      // Create FormData with raw audio
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('eventId', selectedEventId)
      formData.append('performanceIndicators', JSON.stringify(roleplay.performanceIndicators))
      formData.append('twentyFirstCenturySkills', JSON.stringify(roleplay.twentyFirstCenturySkills))
      formData.append('situation', JSON.stringify(roleplay.situation))

      setTranscriptionStatus('Transcribing audio...')
      const result = await processAudioResponse(formData)
      
      setFeedback(result)
      setStep(3)
    } catch (error) {
      console.error("Error processing recording:", error)
      alert("Failed to process recording. Please try again.")
    } finally {
      setIsSubmitting(false)
      setTranscriptionStatus('')
    }
  }

  const groupedEvents = groupEventsByCluster(decaEvents)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-4xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">DECA Roleplay Practice</h1>
          <p className="text-gray-600">Perfect your roleplay skills with AI-powered feedback</p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Event</CardTitle>
              <CardDescription>Choose your DECA competitive event to get a roleplay scenario</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEvent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(groupedEvents).map(([cluster, events]) => (
                        <div key={cluster}>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground bg-muted">
                            {cluster.replace("_", " ")}
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
                <Button type="submit" className="w-full" disabled={!selectedEventId}>
                  Get Roleplay Scenario <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && roleplay && (
          <Card>
            <CardHeader>
              <CardTitle>{roleplay.eventName}</CardTitle>
              <CardDescription>
                {roleplay.cluster} | {roleplay.instructionalArea}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">21st Century Skills</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {roleplay.twentyFirstCenturySkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Performance Indicators</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {roleplay.performanceIndicators.map((indicator, i) => (
                      <li key={i}>{indicator}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Scenario</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Your Role:</strong> {roleplay.situation.role}
                    </p>
                    <p className="text-gray-600">{roleplay.situation.context}</p>
                    <p className="text-gray-600">
                      <strong>Task:</strong> {roleplay.situation.task}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600">
                      <Mic className="mr-2 h-4 w-4" /> Start Recording
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} variant="outline">
                      <Square className="mr-2 h-4 w-4" /> Stop Recording
                    </Button>
                  )}
                </div>

                {audioUrl && (
                  <div className="flex justify-center gap-4">
                    <audio controls src={audioUrl} className="w-full" />
                    <Button 
                      onClick={handleSubmitRecording}
                      disabled={isSubmitting || !audioUrl}
                      className="flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing Response...
                        </>
                      ) : (
                        "Submit Response"
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {isSubmitting && (
                <div className="space-y-2 text-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{transcriptionStatus}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 3 && feedback && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Results</CardTitle>
              <CardDescription>Detailed feedback on your roleplay performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{feedback.totalScore}/100</div>
                <div className="text-gray-600">Total Score</div>
              </div>

              {feedback.performanceIndicators && (
                <div>
                  <h3 className="font-semibold mb-2">Performance Indicators</h3>
                  {feedback.performanceIndicators.map((pi: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{pi.indicator}</span>
                        <span className="text-primary font-bold">{pi.score}/14</span>
                      </div>
                      <p className="text-gray-600">{pi.feedback}</p>
                    </div>
                  ))}
                </div>
              )}

              {feedback.twentyFirstCenturySkills && (
                <div>
                  <h3 className="font-semibold mb-2">21st Century Skills</h3>
                  {feedback.twentyFirstCenturySkills.map((skill: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-primary font-bold">{skill.score}/6</span>
                      </div>
                      <p className="text-gray-600">{skill.feedback}</p>
                    </div>
                  ))}
                </div>
              )}

              {feedback.overallImpression && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Overall Impression</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Score</span>
                    <span className="text-primary font-bold">{feedback.overallImpression.score}/6</span>
                  </div>
                  <p className="text-gray-600">{feedback.overallImpression.feedback}</p>
                </div>
              )}

              {feedback.generalFeedback && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">General Feedback</h3>
                  <p className="text-gray-600">{feedback.generalFeedback}</p>
                </div>
              )}

              <Button
                onClick={() => {
                  setStep(1)
                  setRoleplay(null)
                  setFeedback(null)
                }}
                className="w-full"
              >
                Practice Another Roleplay
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

