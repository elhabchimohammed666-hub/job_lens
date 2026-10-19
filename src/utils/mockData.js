export const mockJobs = [
  {
    id: "1",
    title: "UX Researcher",
    company: "WebFlow",
    location: "California, CA",
    employment_type: "fulltime",
    level: "senior",
    description: "We are looking for a Senior UX Researcher to join our growing design team. You will conduct user research to inform product decisions and improve user experience across our platform.",
    required_skills: ["User Research", "Usability Testing", "Figma", "Data Analysis", "A/B Testing"],
    status: "published",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    applicant_count: 42,
    icon: "search",
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    logoLetter: "W",
  },
  {
    id: "2",
    title: "Quality Assurance",
    company: "Notion",
    location: "Idaho, ID",
    employment_type: "fulltime",
    level: "senior",
    description: "Join Notion's QA team to ensure product quality across all platforms. You'll design test strategies, automate testing pipelines, and collaborate with engineering teams.",
    required_skills: ["Selenium", "Jest", "CI/CD", "API Testing", "Python"],
    status: "published",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    applicant_count: 18,
    icon: "verified",
    iconBg: "bg-gray-900",
    iconColor: "text-white",
    logoLetter: "N",
  },
  {
    id: "3",
    title: "Senior Dev",
    company: "Zapier",
    location: "Oklahoma, OK",
    employment_type: "fulltime",
    level: "senior",
    description: "Zapier is seeking a Senior Developer to build and maintain integrations across our platform. Strong backend experience required.",
    required_skills: ["Node.js", "Python", "REST APIs", "PostgreSQL", "AWS"],
    status: "published",
    created_at: new Date(Date.now() - 25200000).toISOString(),
    applicant_count: 89,
    icon: "flare",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    logoLetter: "Z",
  },
  {
    id: "4",
    title: "Product Designer",
    company: "MailChimp",
    location: "Tennessee, TN",
    employment_type: "fulltime",
    level: "senior",
    description: "Design intuitive email marketing experiences for millions of users. You'll own the end-to-end design process from research to high-fidelity prototypes.",
    required_skills: ["Figma", "User Research", "Design Systems", "Prototyping", "HTML/CSS"],
    status: "published",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    applicant_count: 34,
    icon: "sentiment_satisfied",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    logoLetter: "M",
  },
  {
    id: "5",
    title: "Sales",
    company: "Outreach",
    location: "New York, NY",
    employment_type: "fulltime",
    level: "senior",
    description: "Drive revenue growth by managing enterprise accounts and building relationships with key stakeholders.",
    required_skills: ["CRM", "Salesforce", "Negotiation", "Pipeline Management", "SaaS"],
    status: "published",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    applicant_count: 56,
    icon: "location_on",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    logoLetter: "O",
  },
];

export const mockFeaturedJobs = [
  { id: "10", title: "Senior Frontend Engineer", company: "TechCorp Inc.", location: "San Francisco, CA", icon: "storefront", iconBg: "bg-surface-container", iconColor: "text-primary" },
  { id: "11", title: "Lead Product Designer", company: "Creative Solutions", location: "Remote", icon: "brush", iconBg: "bg-tertiary-fixed", iconColor: "text-tertiary" },
  { id: "12", title: "Data Scientist", company: "Analytics LLC", location: "New York, NY", icon: "data_usage", iconBg: "bg-secondary-fixed", iconColor: "text-secondary" },
  { id: "13", title: "Marketing Manager", company: "Global Brands", location: "Austin, TX", icon: "campaign", iconBg: "bg-error-container", iconColor: "text-error" },
];

export const mockApplications = [
  {
    id: "a1",
    job: { id: "1", title: "Senior Frontend Developer", company: "TechFlow", location: "Remote, Full-time" },
    status: "submitted",
    applied_at: "2023-10-12T00:00:00Z",
    logoColor: "bg-blue-50",
  },
  {
    id: "a2",
    job: { id: "2", title: "UX/UI Designer", company: "Creativ Agency", location: "New York, NY (Hybrid)" },
    status: "under_review",
    applied_at: "2023-10-08T00:00:00Z",
    logoColor: "bg-yellow-50",
  },
  {
    id: "a3",
    job: { id: "3", title: "Product Manager", company: "Nexus Financial", location: "San Francisco, CA" },
    status: "accepted",
    applied_at: "2023-09-28T00:00:00Z",
    logoColor: "bg-green-50",
  },
  {
    id: "a4",
    job: { id: "4", title: "Marketing Director", company: "GlobeTrot", location: "London, UK" },
    status: "rejected",
    applied_at: "2023-09-15T00:00:00Z",
    logoColor: "bg-red-50",
  },
];

export const mockManagerJobs = [
  {
    id: "m1",
    title: "Senior UX Designer",
    company: "SkillMatch",
    location: "Remote",
    employment_type: "fulltime",
    level: "senior",
    status: "published",
    created_at: "2023-10-24T00:00:00Z",
    applicant_count: 42,
    department: "Design",
  },
  {
    id: "m2",
    title: "Frontend Developer",
    company: "SkillMatch",
    location: "New York, NY",
    employment_type: "contract",
    level: "senior",
    status: "published",
    created_at: "2023-10-20T00:00:00Z",
    applicant_count: 18,
    department: "Engineering",
  },
  {
    id: "m3",
    title: "Product Marketing Manager",
    company: "SkillMatch",
    location: "Remote",
    employment_type: "fulltime",
    level: "mid",
    status: "draft",
    created_at: "2023-10-26T00:00:00Z",
    applicant_count: 0,
    department: "Marketing",
  },
];

export const mockApplicants = [
  {
    id: "ap1",
    candidate: { full_name: "Sarah Jenkins", previous_company: "Stripe", avatar_url: null },
    applied_at: "2024-10-24T00:00:00Z",
    score: 94,
  },
  {
    id: "ap2",
    candidate: { full_name: "David Chen", previous_company: "Coinbase", avatar_url: null },
    applied_at: "2024-10-23T00:00:00Z",
    score: 88,
  },
  {
    id: "ap3",
    candidate: { full_name: "Maria Lopez", previous_company: "Uber", avatar_url: null },
    applied_at: "2024-10-22T00:00:00Z",
    score: 82,
  },
  {
    id: "ap4",
    candidate: { full_name: "James Wilson", previous_company: "Startup", avatar_url: null },
    applied_at: "2024-10-21T00:00:00Z",
    score: 65,
  },
];

export const mockAnalysis = {
  id: "an1",
  score: 92,
  match_status: "strong_match",
  matched_skills: [
    { name: "Usability Testing", level: "Expert" },
    { name: "User Interviews", level: "Expert" },
    { name: "Figma / Prototyping", level: "Advanced" },
    { name: "Data Synthesis", level: "Advanced" },
  ],
  missing_skills: [
    { name: "SQL / Quantitative Analysis" },
    { name: "Accessibility Auditing (WCAG)" },
  ],
  recommendation: "Candidate shows exceptional overlap with core research methodologies. Recommend advancing to technical interview stage despite minor gaps in quantitative tools.",
  candidate: {
    full_name: "Alex Mercer",
    title: "Senior UX Researcher",
    location: "San Francisco, CA",
    experience: "6 Yrs Experience",
    education: "B.S. Cognitive Science",
    availability: "Available in 2 Weeks",
    bio: "Passionate UX Researcher with a strong background in generative methodologies and usability testing for enterprise SaaS platforms. Proven track record of translating complex user data into actionable product strategies.",
  },
};

export const mockDashboardMetrics = {
  totalActiveJobs: 24,
  jobsTrend: "+3 this week",
  newApplications: 156,
  applicationsTrend: "+12% vs last month",
  matchedCandidates: 42,
  matchedTrend: "Steady rate",
};

export const mockRecentActivity = [
  { id: "r1", text: "<strong>Sarah Jenkins</strong> applied for Product Manager", time: "10 mins ago", isNew: true },
  { id: "r2", text: "Interview scheduled with <strong>David Lee</strong>", time: "2 hours ago", isNew: false },
  { id: "r3", text: "Job <strong>Senior UX Researcher</strong> published", time: "Yesterday", isNew: false },
];

export const mockDashboardJobs = [
  { id: "d1", title: "Senior UX Researcher", location: "San Francisco, CA", department: "Design", applicants: 42, status: "published" },
  { id: "d2", title: "Product Manager", location: "Remote", department: "Product", applicants: 18, status: "draft" },
  { id: "d3", title: "Frontend Developer", location: "New York, NY", department: "Engineering", applicants: 89, status: "published" },
];

export const popularTags = [
  "Sales", "Fulltime", "Remote", "Product designer", "Senior level",
  "Illustrator", "Co-Founder", "Senior Dev", "Researcher",
];

export const filterEmployment = [
  { value: "fulltime", label: "Fulltime", checked: true },
  { value: "senior", label: "Senior level", checked: true },
  { value: "remote", label: "Remote", checked: true },
  { value: "contract", label: "Contract", checked: false },
];
