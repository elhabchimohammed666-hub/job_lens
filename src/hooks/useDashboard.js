import { useApi } from "./useApi";
import * as aiApi from "../api/ai";
import {
  mockDashboardMetrics,
  mockRecentActivity,
  mockDashboardJobs,
  mockAnalysis,
} from "../utils/mockData";

export function useDashboardMetrics() {
  return useApi(aiApi.getDashboardMetrics, {
    metrics: mockDashboardMetrics,
    jobs: mockDashboardJobs,
  });
}

export function useRecentActivity() {
  return useApi(aiApi.getRecentActivity, {
    activity: mockRecentActivity,
  });
}

export function useAiAnalysis(applicationId) {
  return useApi(
    () => aiApi.getAiAnalysis(applicationId),
    { analysis: mockAnalysis },
    { deps: [applicationId] }
  );
}
