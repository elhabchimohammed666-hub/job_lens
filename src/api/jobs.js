import api from "./axios";

export async function getJobs(params = {}) {
  const { data } = await api.get("/jobs", { params });
  return data;
}

export async function getJob(id) {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
}

export async function searchJobs(query, filters = {}) {
  const { data } = await api.get("/jobs", {
    params: { q: query, ...filters },
  });
  return data;
}

// Manager endpoints

export async function getManagerJobs(params = {}) {
  const { data } = await api.get("/manager/jobs", { params });
  return data;
}

export async function createJob(jobData) {
  const { data } = await api.post("/manager/jobs", jobData);
  return data;
}

export async function updateJob(id, jobData) {
  const { data } = await api.put(`/manager/jobs/${id}`, jobData);
  return data;
}

export async function deleteJob(id) {
  const { data } = await api.delete(`/manager/jobs/${id}`);
  return data;
}

export async function publishJob(id) {
  const { data } = await api.patch(`/manager/jobs/${id}/publish`);
  return data;
}
