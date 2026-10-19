import { useApi, useMutation } from "./useApi";
import * as jobsApi from "../api/jobs";
import { mockJobs, mockFeaturedJobs, mockManagerJobs } from "../utils/mockData";

export function useJobs(params = {}) {
  return useApi(
    () => jobsApi.getJobs(params),
    { jobs: mockJobs, total: mockJobs.length },
    { deps: [JSON.stringify(params)] }
  );
}

export function useJob(id) {
  return useApi(
    () => jobsApi.getJob(id),
    () => ({ job: mockJobs.find((j) => j.id === id) || mockJobs[0] }),
    { deps: [id] }
  );
}

export function useFeaturedJobs() {
  return useApi(
    () => jobsApi.getJobs({ featured: true, limit: 4 }),
    { jobs: mockFeaturedJobs },
  );
}

export function useSearchJobs() {
  const { data, loading, error, execute } = useApi(
    (query, filters) => jobsApi.searchJobs(query, filters),
    { jobs: mockJobs, total: mockJobs.length },
    { immediate: false }
  );
  return { results: data, loading, error, search: execute };
}

// Manager hooks

export function useManagerJobs(params = {}) {
  return useApi(
    () => jobsApi.getManagerJobs(params),
    { jobs: mockManagerJobs, total: mockManagerJobs.length },
    { deps: [JSON.stringify(params)] }
  );
}

export function useCreateJob() {
  return useMutation(jobsApi.createJob);
}

export function useUpdateJob() {
  return useMutation((id, data) => jobsApi.updateJob(id, data));
}

export function useDeleteJob() {
  return useMutation(jobsApi.deleteJob);
}
