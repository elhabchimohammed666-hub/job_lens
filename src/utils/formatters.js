export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

export function getMatchColor(score) {
  if (score >= 90) return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", ring: "border-green-500" };
  if (score >= 75) return { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", ring: "border-blue-500" };
  return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", ring: "border-yellow-500" };
}

export function getMatchLabel(score) {
  if (score >= 90) return "Strong Match";
  if (score >= 75) return "Good Match";
  return "Requires Review";
}

export function getStatusStyle(status) {
  const styles = {
    submitted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    under_review: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
    accepted: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
    rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  };
  return styles[status] || styles.submitted;
}

export function getStatusLabel(status) {
  const labels = {
    submitted: "Submitted",
    under_review: "Under Review",
    accepted: "Accepted",
    rejected: "Rejected",
  };
  return labels[status] || status;
}
