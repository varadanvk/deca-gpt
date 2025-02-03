export const decaEvents = [
  { id: "ACT", name: "Accounting Applications Series", cluster: "Finance" },
  { id: "AAM", name: "Apparel And Accessories Marketing Series", cluster: "Marketing" },
  { id: "ASM", name: "Automotive Service Marketing Series", cluster: "Marketing" },
  { id: "BFS", name: "Business Finance Series", cluster: "Finance" },
  { id: "BSM", name: "Business Services Marketing Series", cluster: "Marketing" },
  { id: "ENT", name: "Entrepreneurship Series", cluster: "Entrepreneurship" },
  { id: "FMS", name: "Food Marketing Series", cluster: "Marketing" },
  { id: "HLM", name: "Hotel Lodging Management Series", cluster: "Hospitality" },
  { id: "HRM", name: "Human Resource Management Series", cluster: "Business_management" },
  { id: "MCS", name: "Marketing Communications Series", cluster: "Marketing" },
  { id: "QSRM", name: "Quick Serve Restaurant Management Series", cluster: "Hospitality" },
  { id: "RFSM", name: "Restaurant And Food Service Management Series", cluster: "Hospitality" },
  { id: "RMS", name: "Retail Merchandising Series", cluster: "Marketing" },
  { id: "SEM", name: "Sports and Entertainment Marketing Series", cluster: "Marketing" },
  { id: "PFL", name: "Personal Financial Literacy", cluster: "Personal_finance" },
  { id: "BLTDM", name: "Business Law and Ethics Team Decision Making", cluster: "Business_management" },
  { id: "BTDM", name: "Buying and Merchandising Team Decision Making", cluster: "Marketing" },
  { id: "ETDM", name: "Entrepreneurship Team Decision Making", cluster: "Entrepreneurship" },
  { id: "FTDM", name: "Financial Services Team Decision Making", cluster: "Finance" },
  { id: "HTDM", name: "Hospitality Services Team Decision Making", cluster: "Hospitality" },
  { id: "MTDM", name: "Marketing Management Team Decision Making", cluster: "Marketing" },
  { id: "STDM", name: "Sports And Entertainment Marketing Team Decision Making", cluster: "Marketing" },
  { id: "TTDM", name: "Travel And Tourism Team Decision Making", cluster: "Hospitality" },
  { id: "PBM", name: "Principles of Business Management and Administration", cluster: "Principles" },
  { id: "PEN", name: "Principles of Entrepreneurship", cluster: "Principles" },
  { id: "PFN", name: "Principles of Finance", cluster: "Principles" },
  { id: "PHT", name: "Principles of Hospitality", cluster: "Principles" },
  { id: "PMK", name: "Principles of Marketing", cluster: "Principles" },
] as const

export const performanceIndicators = {
  Entrepreneurship: ["PI 1 for Entrepreneurship", "PI 2 for Entrepreneurship", "PI 3 for Entrepreneurship"],
  Marketing: [
    "Develop a marketing strategy based on consumer trends.",
    "Use digital advertising to target specific audiences.",
    "Analyze competitor marketing strategies to improve branding.",
  ],
  Finance: [
    "Evaluate financial statements to assess business health.",
    "Create a budget plan for a startup business.",
    "Analyze investment risks and returns.",
  ],
  Personal_finance: [
    "Evaluate financial statements to assess business health.",
    "Create a budget plan for a startup business.",
    "Analyze investment risks and returns.",
  ],
  Business_management: ["PI 1 for Business Management", "PI 2 for Business Management", "PI 3 for Business Management"],
  Principles: ["PI 1 for Principles", "PI 2 for Principles", "PI 3 for Principles"],
  Hospitality: [
    "Enhance customer service to improve guest satisfaction.",
    "Develop a pricing strategy for seasonal tourism.",
    "Implement sustainability practices in hotel operations.",
  ],
} as const

export const twentyFirstCenturySkills = [
  "Critical Thinking – Reason effectively and use systems thinking.",
  "Problem Solving – Make judgments and decisions and solve problems.",
  "Communication – Communicate clearly.",
  "Creativity and Innovation – Show evidence of creativity.",
] as const

export const instructionalAreas = [
  "Marketing",
  "Finance",
  "Business Management",
  "Hospitality and Tourism",
  "Entrepreneurship",
  "Business Administration",
  "Professional Development",
  "Economics",
  "Communication",
  "Customer Relations",
] as const

