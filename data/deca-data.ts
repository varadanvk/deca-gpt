export const decaEvents = [
  { id: "ACT", name: "Accounting Applications Series", cluster: "Finance", numPIs: 5 },
  { id: "AAM", name: "Apparel And Accessories Marketing Series", cluster: "Marketing", numPIs: 5 },
  { id: "ASM", name: "Automotive Service Marketing Series", cluster: "Marketing", numPIs: 5 },
  { id: "BFS", name: "Business Finance Series", cluster: "Finance", numPIs: 5 },
  { id: "BSM", name: "Business Services Marketing Series", cluster: "Marketing", numPIs: 5 },
  { id: "ENT", name: "Entrepreneurship Series", cluster: "Entrepreneurship", numPIs: 5 },
  { id: "FMS", name: "Food Marketing Series", cluster: "Marketing", numPIs: 5 },
  { id: "HLM", name: "Hotel Lodging Management Series", cluster: "Hospitality", numPIs: 5 },
  { id: "HRM", name: "Human Resource Management Series", cluster: "Business_management", numPIs: 5 },
  { id: "MCS", name: "Marketing Communications Series", cluster: "Marketing", numPIs: 5 },
  { id: "QSRM", name: "Quick Serve Restaurant Management Series", cluster: "Hospitality", numPIs: 5 },
  { id: "RFSM", name: "Restaurant And Food Service Management Series", cluster: "Hospitality", numPIs: 5 },
  { id: "RMS", name: "Retail Merchandising Series", cluster: "Marketing", numPIs: 5 },
  { id: "SEM", name: "Sports and Entertainment Marketing Series", cluster: "Marketing", numPIs: 5 },
  { id: "PFL", name: "Personal Financial Literacy", cluster: "Personal_finance", numPIs: 3 },
  { id: "BLTDM", name: "Business Law and Ethics Team Decision Making", cluster: "Business_management", numPIs: 7 },
  { id: "BTDM", name: "Buying and Merchandising Team Decision Making", cluster: "Marketing", numPIs: 7 },
  { id: "ETDM", name: "Entrepreneurship Team Decision Making", cluster: "Entrepreneurship", numPIs: 7 },
  { id: "FTDM", name: "Financial Services Team Decision Making", cluster: "Finance", numPIs: 7 },
  { id: "HTDM", name: "Hospitality Services Team Decision Making", cluster: "Hospitality", numPIs: 7 },
  { id: "MTDM", name: "Marketing Management Team Decision Making", cluster: "Marketing", numPIs: 7 },
  { id: "STDM", name: "Sports And Entertainment Marketing Team Decision Making", cluster: "Marketing", numPIs: 7 },
  { id: "TTDM", name: "Travel And Tourism Team Decision Making", cluster: "Hospitality", numPIs: 7 },
  { id: "PBM", name: "Principles of Business Management and Administration", cluster: "Principles", numPIs: 4 },
  { id: "PEN", name: "Principles of Entrepreneurship", cluster: "Principles", numPIs: 4 },
  { id: "PFN", name: "Principles of Finance", cluster: "Principles", numPIs: 4 },
  { id: "PHT", name: "Principles of Hospitality", cluster: "Principles", numPIs: 4 },
  { id: "PMK", name: "Principles of Marketing", cluster: "Principles", numPIs: 4 },
] as const;


export const performanceIndicators = {
  Entrepreneurship: ["PI 1 for Entrepreneurship", "PI 2 for Entrepreneurship", "PI 3 for Entrepreneurship", "PI 3 for Entrepreneurship", "PI 3 for Entrepreneurship", "PI 3 for Entrepreneurship", "PI 3 for Entrepreneurship"],
  Marketing: [
    "Develop a marketing strategy based on consumer trends.",
    "Use digital advertising to target specific audiences.",
    "Analyze competitor marketing strategies to improve branding.",
    "Analyze competitor marketing strategies to improve branding.",
    "Analyze competitor marketing strategies to improve branding.",
    "Analyze competitor marketing strategies to improve branding.",
    "Analyze competitor marketing strategies to improve branding.",
  ],
  Finance: [
    "Evaluate financial statements to assess business health.",
    "Create a budget plan for a startup business.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
  ],
  Personal_finance: [
    "Evaluate financial statements to assess business health.",
    "Create a budget plan for a startup business.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
    "Analyze investment risks and returns.",
  ],
  Business_management: ["PI 1 for Business Management", "PI 2 for Business Management", "PI 3 for Business Management", "PI 3 for Business Management", "PI 3 for Business Management", "PI 3 for Business Management", "PI 3 for Business Management"],
  Principles: ["PI 1 for Principles", "PI 2 for Principles", "PI 3 for Principles", "PI 3 for Principles", "PI 3 for Principles", "PI 3 for Principles", "PI 3 for Principles"],
  Hospitality: [
    "Enhance customer service to improve guest satisfaction.",
    "Develop a pricing strategy for seasonal tourism.",
    "Implement sustainability practices in hotel operations.",
    "Implement sustainability practices in hotel operations.",
    "Implement sustainability practices in hotel operations.",
    "Implement sustainability practices in hotel operations.",
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

