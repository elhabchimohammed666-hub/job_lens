import api from "./axios";

// Candidate endpoints

export async function getMyApplications() {
  const { data } = await api.get("/applications");
  return data;
}

export async function applyToJob(jobId, applicationData) {
  const { data } = await api.post(`/jobs/${jobId}/apply`, applicationData);
  return data;
}

export async function withdrawApplication(applicationId) {
  const { data } = await api.delete(`/applications/${applicationId}`);
  return data;
}

// Manager endpoints

export async function getApplicants(jobId, params = {}) {
  const { data } = await api.get(`/manager/jobs/${jobId}/applicants`, { params });
  return data;
}

export async function getApplication(applicationId) {
  const { data } = await api.get(`/manager/applications/${applicationId}`);
  return data;
}

export async function updateApplicationStatus(applicationId, status) {
  const { data } = await api.patch(`/manager/applications/${applicationId}/status`, { status });
  return data;
}
