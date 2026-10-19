export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const APPLICATION_STATUS = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const JOB_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const MATCH_STATUS = {
  STRONG: "strong_match",
  GOOD: "good_match",
  REVIEW: "requires_review",
};

export const ROLES = {
  CANDIDATE: "candidate",
  MANAGER: "manager",
};

export const EMPLOYMENT_TYPES = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
];
