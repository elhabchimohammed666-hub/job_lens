import api from "./axios";

export async function getAiAnalysis(applicationId) {
  const { data } = await api.get(`/manager/applications/${applicationId}/analysis`);
  return data;
}

export async function triggerAiAnalysis(applicationId) {
  const { data } = await api.post(`/manager/applications/${applicationId}/analyze`);
  return data;
}

export async function getDashboardMetrics() {
  const { data } = await api.get("/manager/dashboard");
  return data;
}

export async function getRecentActivity() {
  const { data } = await api.get("/manager/activity");
  return data;
}
