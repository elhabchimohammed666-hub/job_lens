import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chip from "../../components/ui/Chip";
import ApplicantRow from "../../components/manager/ApplicantRow";
import Pagination from "../../components/ui/Pagination";
import { useApplicants } from "../../hooks/useApplications";

export default function JobApplicants() {
  const { jobId } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data, loading } = useApplicants(jobId);
  const allApplicants = data?.applicants || [];

  const filtered = allApplicants.filter((a) => {
    if (activeFilter === "strong" && a.score < 90) return false;
    if (activeFilter === "good" && (a.score < 75 || a.score >= 90)) return false;
    if (activeFilter === "review" && a.score >= 75) return false;
    if (
      search &&
      !a.candidate.full_name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const totalApplicants = data?.total || allApplicants.length;
  const shortlisted = allApplicants.filter((a) => a.score >= 90).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-section-gap flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md">
        <div>
          <Link
            to="/manager/jobs"
            className="text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 mb-2"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            Back to Jobs
          </Link>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-background">
            Senior Backend Engineer
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            San Francisco, CA - Full-time - Posted 3 days ago
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-surface-container-lowest rounded-lg p-stack-md shadow-card border border-outline-variant flex-1 md:w-[160px] flex flex-col items-center justify-center">
            <span className="text-display-xl font-display-xl text-primary">
              {totalApplicants}
            </span>
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Total Applicants
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-stack-md shadow-card border border-outline-variant flex-1 md:w-[160px] flex flex-col items-center justify-center">
            <span className="text-display-xl font-display-xl text-secondary">
              {shortlisted}
            </span>
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Shortlisted
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-lg p-4 shadow-card border border-outline-variant mb-stack-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface rounded-full border border-outline-variant text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Search applicants..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <Chip
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Chip>
          <Chip
            active={activeFilter === "strong"}
            onClick={() => setActiveFilter("strong")}
          >
            Strong Match
          </Chip>
          <Chip
            active={activeFilter === "good"}
            onClick={() => setActiveFilter("good")}
          >
            Good Match
          </Chip>
          <Chip
            active={activeFilter === "review"}
            onClick={() => setActiveFilter("review")}
          >
            Requires Review
          </Chip>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant overflow-hidden mb-section-gap">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Date Applied
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  AI Compatibility
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Match Status
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="h-10 bg-surface-container rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : (
                filtered.map((applicant) => (
                  <ApplicantRow key={applicant.id} applicant={applicant} />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest">
          <Pagination
            current={1}
            total={Math.ceil(totalApplicants / 10)}
            showing={`Showing 1 to ${filtered.length} of ${totalApplicants} entries`}
          />
        </div>
      </div>
    </div>
  );
}
