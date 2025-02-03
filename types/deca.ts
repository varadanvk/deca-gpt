export interface DecaEvent {
  id: string
  name: string
  cluster: string
}

export interface PerformanceIndicators {
  [key: string]: string[]
}

export interface RoleplayScenario {
  eventId: string
  eventName: string
  cluster: string
  instructionalArea: string
  performanceIndicators: string[]
  twentyFirstCenturySkills: string[]
  situation: {
    role: string
    context: string
    task: string
  }
}

