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
Entrepreneurship: [ 
"Describe methods used to protect intellectual property (BL:051) (SP)",
"Describe legal issues affecting businesses (BL:001) (SP)",
"Identify the basic torts relating to business enterprises (BL:069) (SP)”,
"Describe the nature of legally binding contracts (BL:002) (SP)”,
"Explain the nature of human resources regulations (BL:007) (SU)", 
"Explain the nature of workplace regulations (including OSHA, ADA) (BL:008) (SU)",
"Explain types of business ownership (BL:003) (CS)",
"Select form of business ownership (BL:006) (ON)",
"Explain the nature of tax regulations on business (BL:009) (ON)", 
"Explain the nature of businesses' reporting requirements (BL:010) (ON)", 
"Develop strategies for legal/government compliance (BL:011) (ON)",
"Prepare complex written reports (CO:009) (MN)", 
"Write proposals (CO:062) (MN)",
"Explain management's role in customer relations (CR:008) (MN)",
"Identify company's brand promise (CR:001) (CS)",
"Identify the impact of small business/entrepreneurship on market economies (EC:065) (CS)", 
"Explain the concept of private enterprise (EC:009) (CS)", 
"Identify factors affecting a business's profit (EC:010) (CS)",
"Determine factors affecting business risk (EC:011) (CS)", 
"Explain the concept of competition (EC:012) (CS)",
"Determine the relationship between government and business (EC:008) (CS)", 
"Describe the nature of taxes (EC:072) (SP)",
"Describe the concept of economies of scale (EC:077) (MN)",
"Describe the nature of ethics (EI:123) (CS)",
"Explain reasons for ethical dilemmas (EI:124) (CS)",
"Recognize and respond to ethical dilemmas (EI:125) (CS)",
"Exhibit cultural sensitivity (EI:033) (CS)",
"Leverage personality types in business situations (EI:104) (SP)",
"Adapt management style to the personality type of others (EI:105) (SU)",
"“Sell” ideas to others (EI:108) (SP)",
"Persuade others (EI:012) (SP)",
"Demonstrate negotiation skills (EI:062) (SP)",
"Encourage team building (EI:044) (SU)",
"Explain the concept of leadership (EI:009) (CS)",
"Determine personal vision (EI:063) (CS)",
"Demonstrate adaptability (EI:006) (CS)",
"Develop an achievement orientation (EI:027) (CS)",
"Enlist others in working toward a shared vision (EI:060) (CS)",
"Act as a role model to fulfill the organization's standards/values (EI:111) (SU)", 
"Recognize/Reward others for their efforts and contributions (EI:014) (SU)",
"Determine stakeholder expectations (EI:113) (MN)",
"Establish strategic relationships with others (EI:114) (MN)",
"Share best practices with key individuals and groups (EI:115) (MN)",
"Leverage business relationships (EI:116) (MN)", 
"Describe the nature of entrepreneurship (EN:039) (SP)",
"Explain the role requirements of entrepreneurs and owners (EN:040) (SP)",
"Describe the use of business ethics in entrepreneurship (EN:044) (SP)",
"Describe small-business opportunities in international trade (EN:041) (SP)",
"Explain the need for entrepreneurial discovery (EN:001) (ON)",
"Discuss entrepreneurial discovery processes (EN:002) (ON)",
"Assess global trends and opportunities for business ventures (EN:003) (ON)",
"Determine opportunities for venture creation (EN:004) (ON)",
"Assess opportunities for venture creation (EN:005) (ON)",
"Generate venture ideas (EN:006) (ON)",
"Determine feasibility of venture ideas (EN:038) (ON)",
"Describe entrepreneurial planning considerations (EN:007) (ON)",
"Explain tools used by entrepreneurs for venture planning (EN:008) (ON)",
"Assess start-up requirements (EN:009) (ON)",
"Assess risks associated with venture (EN:010) (ON)",
"Describe external resources useful to entrepreneurs during concept development (EN:011) (ON)", 
"Assess the need to use external resources for concept development (EN:012) (ON)",
"Describe strategies to protect intellectual property (EN:013) (ON)",
"Use components of business plan to define venture idea (EN:014) (ON)",
"Describe processes used to acquire adequate financial resources for venture creation/start-up (EN:015) (ON)", 
"Select sources to finance venture creation/start-up (EN:016) (ON)", 
"Explain factors to consider in determining a venture's human-resources needs (EN:017) (ON)", 
"Explain considerations in making the decision to hire staff (EN:018) (ON)",
"Describe considerations in selecting capital resources (EN:019) (ON)",
"Identify capital resources needed for the venture (EN:020) (ON)",
"Assess the costs/benefits associated with resources (EN:021) (ON)",
"Establish banking procedures (EN:042) (ON)",
"Use external resources to supplement entrepreneur's expertise (EN:022) (ON)",
"Explain the complexity of business operations (EN:023) (ON)",
"Evaluate risk-taking opportunities (EN:024) (ON)",
"Explain the need for business systems and procedures (EN:025) (ON)",
"Describe the use of operating procedures (EN:026) (ON)",
"Explain methods/processes for organizing workflow (EN:027) (ON)",
"Develop and/or provide product/service (EN:028) (ON)",
"Use creative problem-solving in business activities/decisions (EN:029) (ON)",
"Explain the impact of resource productivity on venture success (EN:030) (ON)",
"Create processes for ongoing opportunity recognition (EN:031) (ON)",
"Develop plan to invest resources into improving current products or creating new ones (EN:032) (ON)",
"Adapt to changes in business environment (EN:033) (ON)",
"Explain the need for continuation planning (EN:034) (ON)",
"Describe methods of venture harvesting (EN:035) (ON)",
"Evaluate options for continued venture involvement (EN:036) (ON)",
"Develop exit strategies (EN:037) (ON)",
"Obtain insurance coverage (FI:082) (ON)",
"Explain the concept of accounting (FI:085) (CS)",
"Explain the nature of balance sheets (FI:093) (SP)",
"Describe the nature of income statements (FI:094) (SP)",
"Prepare cash flow statements (FI:092) (MN)",
"Explain the purposes and importance of obtaining business credit (FI:023) (ON)",
"Analyze critical banking relationships (FI:039) (ON)",
"Make critical decisions regarding acceptance of bank cards (FI:040) (ON)",
"Determine financing needed for business operations (FI:043) (ON)", 
"Identify risks associated with obtaining business credit (FI:041) (ON)", 
"Explain sources of financial assistance (FI:031) (ON)", 
"Explain loan evaluation criteria used by lending institutions (FI:034) (ON)", 
"Complete loan application package (FI:033) (ON)",
"Describe the nature of cost/benefit analysis (FI:357) (MN)",
"Determine relationships among total revenue, marginal revenue, output, and profit (FI:358) (MN)",
"Develop company's/department's budget (FI:099) (MN)",
"Forecast sales (FI:096) (MN)", 
"Calculate financial ratios (FI:097) (MN)",
"Interpret financial statements (FI:102) (MN)", 
"File business tax returns (FI:652) (ON)", 
"Verify the accuracy of business financial records (FI:653) (ON)",
"Discuss the nature of human resources management (HR:410) (CS)",
"Coordinate human, capital, and fiscal resources to meet business priorities (HR:508) (MN)",
"Determine hiring needs (HR:353) (SU)",
"Screen job applications/résumés (HR:354) (SU)",
"Interview job applicants (HR:355) (SU)",
"Select and hire new employees (HR:356) (SU)",
"Dismiss/Fire employees (HR:358) (SU)",
"Maintain human resources records (HR:359) (SU)",
"Train staff (HR:392) (SU)",
"Supervise staff (HR:393) (SU)",
"Foster “right” environment for employees (HR:403) (SU)",
"Assess employee performance (HR:368) (SU)",
"Handle employee complaints and grievances (HR:366) (SU)",
"Explain the nature of remedial action (HR:369) (SU)",
"Explain marketing and its importance in a global economy (MK:001) (CS)",
"Describe marketing functions and related activities (MK:002) (CS)",
"Explain factors that influence customer/client/business buying behavior (MK:014) (SP)",
"Demonstrate connections between company actions and results (e.g., influencing consumer buying behavior, gaining market share, etc.) (MK:019) (SP)", 
"Establish specifications for selecting hardware/software systems (NF:091) (MN)",
"Determine venture's information technology needs (NF:012) (MN)",
"Describe the nature of business records (NF:001) (SP)",
"Describe current business trends (NF:013) (SP)",
"Monitor internal records for business information (NF:014) (SP)",
"Conduct an environmental scan to obtain business information (NF:015) (SP)",
"Interpret statistical findings (NF:093) (SP)",
"Translate research findings into actionable business recommendations (NF:216) (SP)",
"Explain the principles of data analysis (NF:139) (SP)",
"Discuss the nature of data mining (NF:148) (CS)",
"Explain the nature of operations (OP:189) (CS)",
"Identify potential safety issues (OP:151) (MN)",
"Establish safety policies and procedures (OP:012) (MN)",
"Identify potential security issues (OP:154) (MN)",
"Establish policies to protect company information and intangibles (OP:155) (MN)",
"Establish policies and procedures to maintain physical security of the work environment (OP:157) (MN)",
"Explain the nature and scope of purchasing (OP:015) (CS)",
"Select vendors (OP:161) (SP)",
"Evaluate vendor performance (OP:162) (SP)",
"Explain the concept of production (OP:017) (CS)",
"Describe the role of management in the achievement of quality (OP:020) (MN)",
"Establish efficient operating systems (OP:022) (MN)",
"Explain the nature of overhead/operating costs (OP:024) (SP)",
"Conduct breakeven analysis (OP:192) (MN)",
"Negotiate service and maintenance contracts (OP:027) (MN)",
"Negotiate lease or purchase of facility (OP:028) (MN)",
"Develop expense control plans (OP:029) (MN)",
"Use budgets to control operations (OP:030) (MN)",
"Explain the concept of supply chain (OP:443) (CS)",
"Establish performance standards to meet organizational goals (PD:256) (MN)",
"Monitor progress in achieving organizational goals (PD:257) (MN)",
"Explain the need for innovation skills (PD:126) (CS)",
"Make decisions (PD:017) (CS)",
"Demonstrate problem-solving skills (PD:077) (CS)",
"Use time-management skills (PD:019) (SP)",
"Explain the concept of management (SM:001) (CS)",
"Explain the nature of managerial ethics (SM:002) (MN)",
"Explain the nature of business plans (SM:007) (MN)",
"Develop company goals/objectives (SM:008) (ON)",
"Define business mission (SM:009) (ON)",
"Conduct an organizational SWOT (SM:010) (ON)",
"Explain external planning considerations (SM:011) (MN)",
"Identify and benchmark key performance indicators (e.g., dashboards, scorecards, etc.) (SM:027) (MN)",
"Develop action plans (SM:012) (ON)",
"Develop business plan (SM:013) (ON)",
"Select and apply metrics for measuring organizational success (SM:074) (MN)",
"Analyze operating results in relation to budget/industry (SM:005) (MN)",
"Track performance of business plan (SM:006) (MN)",
"Interpret cash-flow statements (FI:541) (SP)",
"Monitor business's profitability (FI:542) (MN)",
"Evaluate strategies for protecting business' digital assets (e.g., website, social media, email, etc.), customer data, and other protected information (OP:473) (MN)",
"Discuss the nature of business analysis (OP:327) (SP)",
"Discuss business process thinking and its impact (OP:474) (SP)",
"Describe the factors that influence business process design (OP:475) (SP)",
"Explain the causes of business process changes (OP:476) (SP)",
"Explain the impact of supply chain on business performance (e.g., value, customer satisfaction, business design, sustainability) (OP:477) (SP)",
"Discuss the nature of supply chain management (OP:303) (SP)",
"Describe factors that influence management (SM:028) (MN)",
"Describe relationship among innovation, learning, and change (SM:094) (CS)",
"Explain the nature of change management (SM:095) (SP)",
"Explain the nature of quality management (QM:001) (SP)",
"Assess business risks (RM:094) (MN)",
"Describe types of financial statement analysis (e.g., ratio analysis, trend analysis, etc.) (FI:334) (MN)",
"Discuss limitations of using financial statements to assess business performance (FI:655) (MN)",
"Spot problems in/issues with financial statements (FI:335) (MN)",
"Describe the financial needs of a business at different stages of its development (FI:339) (MN)", 
"Discuss factors to consider in choosing between debt and equity capital (FI:340) (MN)",
"Discuss the importance of corporate governance in business (PD:213) (CS)",
"Identify the factors that impact governance structures (PD:302) (SP)",
"Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functionS)(PD:214) (SP)",
"Discuss the nature of enterprise risk management (ERM) (RM:062) (SP)",
"Discuss the relationship between risk and business objectives (RM:044) (MN)",
"Identify business risks (RM:056) (MN)",
"Explain ways to assess risk (RM:059) (MN)",
"Develop a risk management program (RM:045) (MN)",
"Explain the nature and scope of channel management (CM:001) (CS)",
"Explain the nature of channels of distribution (CM:003) (CS)",
"Explain the nature of channel strategies (CM:009) (MN)",
"Select channels of distribution (CM:010) (MN)",
"Evaluate channel members (CM:011) (MN)",
"Describe the need for marketing data (IM:012) (CS)",
"Explain the nature of marketing research (IM:010) (SP)",
"Explain the concept of marketing strategies (MP:001) (CS)",
"Explain the concept of market and market identification (MP:003) (CS)",
"Identify market segments (MP:004) (MN)",
"Develop customer profile (MP:031) (MN)",
"Select target market (MP:005) (MN)",
"Conduct market analysis (market size, area, potential, etc.) (MP:009) (MN)",
"Conduct SWOT analysis for use in the marketing planning process (MP:010) (MN)",
"Conduct competitive analysis (MP:012) (MN)",
"Forecast sales for marketing plan (MP:014) (MN)",
"Set marketing goals and objectives (MP:015) (MN)",
"Develop marketing plan (MP:018) (MN)",
"Explain strategies for linking performance measures to financial outcomes (MP:020) (MN)", 
"Translate performance measures into financial outcomes (MP:021) (MN)",
"Explain the nature and scope of the pricing function (PI:001) (SP)",
"Explain factors affecting pricing decisions (PI:002) (SP)",
"Determine initial feasibility of product idea (PM:129) (MN)",
"Adjust idea to create functional product (PM:204) (MN)",
"Create processes for ongoing opportunity recognition (PM:136) (MN)",
"Evaluate customer experience (PM:138) (MN)",
"Explain the concept of product mix (PM:003) (SP)",
"Plan product mix (PM:006) (MN)",
"Determine services to provide customers (PM:036) (MN
"Identify internal and external service standards (PM:273) (MN)", 
"Build corporate brands (PM:126) (ON)",
"Explain the role of customer service in positioning/image (PM:013) (MN)",
"Identify company's unique selling proposition (PM:272) (MN)",
"Build product/service brand (PM:209) (MN)",
"Explain the role of promotion as a marketing function (PR:001) (CS)",
"Explain the types of promotion (i.e., institutional, product) (PR:002) (CS)",
"Identify the elements of the promotional mix (PR:003) (SP)",
"Explain types of advertising media (PR:007) (SP)",
"Describe word-of-mouth channels used to communicate with targeted audiences (PR:247) (SP)", 
"Explain the nature of direct marketing channels (PR:089) (SP)",
"Identify communications channels used in sales promotion (PR:249) (SP)",
"Explain communications channels used in public-relations activities (PR:250) (SP)",
"Identify types of public-relations activities (PR:252) (SP)", 
"Explain the nature and scope of the selling function (SE:017) (CS)",
],

  
  Marketing: [
  "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
  ],
  
  Finance: [
  "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
  ],
  Personal_finance: [
  "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
  ],
  Business_management: [
  "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
    ]
  
  Principles: [
 "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
],

    Hospitality: [
  "Explain the need for professional and ethical standards in marketing (PD:137) (SP)", 
  "Explain employment opportunities in marketing (PD:024) (CS)",
  "Explain the nature and scope of the product/service management function (PM:001) (SP)",
  "Identify the impact of product life cycles on marketing decisions (PM:024) (SP)",
  "Describe the use of technology in the product/service management function (PM:039) (SP)",
  "Explain business ethics in product/service management (PM:040) (SP)",
  "Identify product opportunities (PM:134) (SP)",
  "Identify methods/techniques to generate a product idea (PM:127) (SP)",
  "Generate product ideas (PM:128) (SP)",
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

