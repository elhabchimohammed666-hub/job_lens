import { useState } from "react";
import Chip from "../../components/ui/Chip";
import JobManagementCard from "../../components/manager/JobManagementCard";
import { useManagerJobs } from "../../hooks/useJobs";

export default function JobManagement() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data, loading } = useManagerJobs();
  const allJobs = data?.jobs || [];

  const filtered = allJobs.filter((job) => {
    if (activeFilter === "published" && job.status !== "published") return false;
    if (activeFilter === "draft" && job.status !== "draft") return false;
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-section-gap">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-md">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-background">
            Job Management
          </h1>
          <p className="text-body-lg text-on-surface-variant mt-1">
            Review and manage your active job postings.
          </p>
        </div>
        <button className="md:hidden bg-primary text-on-primary py-3 px-6 rounded-full text-label-md font-bold shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Post New Job
        </button>
      </header>

      {/* Filters & Search */}
      <section className="flex flex-col md:flex-row gap-stack-md items-center justify-between bg-surface-container-lowest p-stack-sm rounded-lg shadow-card border border-outline-variant/30">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface rounded-md border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-body-md"
            placeholder="Search job titles..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-stack-sm w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Chip
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            All Statuses
          </Chip>
          <Chip
            active={activeFilter === "published"}
            onClick={() => setActiveFilter("published")}
          >
            Published
          </Chip>
          <Chip
            active={activeFilter === "draft"}
            onClick={() => setActiveFilter("draft")}
          >
            Drafts
          </Chip>
        </div>
      </section>

      {/* Job Cards */}
      <section className="grid grid-cols-1 gap-stack-md">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg p-6 shadow-card border border-outline-variant/30 animate-pulse h-32" />
          ))
        ) : (
          <>
            {filtered.map((job) => (
              <JobManagementCard key={job.id} job={job} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                No jobs found matching your criteria.
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
