import { useApi, useMutation } from "./useApi";
import * as appApi from "../api/applications";
import { mockApplications, mockApplicants } from "../utils/mockData";

export function useMyApplications() {
  return useApi(
    appApi.getMyApplications,
    { applications: mockApplications, total: mockApplications.length },
  );
}

export function useApplyToJob() {
  return useMutation(appApi.applyToJob);
}

export function useWithdrawApplication() {
  return useMutation(appApi.withdrawApplication);
}

// Manager hooks

export function useApplicants(jobId, params = {}) {
  return useApi(
    () => appApi.getApplicants(jobId, params),
    { applicants: mockApplicants, total: mockApplicants.length },
    { deps: [jobId, JSON.stringify(params)] }
  );
}

export function useUpdateApplicationStatus() {
  return useMutation((id, status) => appApi.updateApplicationStatus(id, status));
}
