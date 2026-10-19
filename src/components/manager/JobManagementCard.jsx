import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

export default function JobManagementCard({ job }) {
  const isPublished = job.status === "published";

  return (
    <div
      className={`bg-surface-container-lowest rounded-lg p-stack-md shadow-card flex flex-col lg:flex-row gap-stack-md justify-between lg:items-center transition-colors ${
        isPublished
          ? "border-l-2 border-primary hover:bg-surface-container-low"
          : "border border-transparent opacity-80 hover:opacity-100"
      }`}
    >
      <div className="flex-1 space-y-stack-sm">
        <div className="flex items-center gap-3">
          <h3
            className={`text-title-md font-title-md ${
              isPublished ? "text-on-background" : "text-on-surface-variant"
            }`}
          >
            {job.title}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-label-sm font-label-sm ${
              isPublished
                ? "bg-surface-container-highest text-on-surface"
                : "border border-outline-variant text-on-surface-variant"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-body-md text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">work_outline</span>
            <span className="capitalize">{job.employment_type === "fulltime" ? "Full-Time" : job.employment_type}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Created {formatDate(job.created_at)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-stack-lg border-t border-outline-variant/30 lg:border-t-0 pt-stack-sm lg:pt-0">
        <div className="text-center">
          <p
            className={`text-headline-lg font-headline-lg ${
              isPublished ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            {isPublished ? job.applicant_count : "-"}
          </p>
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            Applicants
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={isPublished ? `/manager/jobs/${job.id}/applicants` : "#"}
            className={`p-2 rounded-full transition-colors ${
              isPublished
                ? "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                : "text-on-surface-variant opacity-50 cursor-not-allowed"
            }`}
            title="View Applicants"
          >
            <span className="material-symbols-outlined">group</span>
          </Link>
          <button
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors"
            title="Edit Job"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
            title="Delete Job"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
