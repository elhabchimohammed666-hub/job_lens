import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/formatters";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-surface rounded-lg p-4 flex items-center justify-between shadow-card border border-outline-variant/30 hover:border-primary/50 transition-all group relative overflow-hidden"
    >
      {/* Left accent border on hover */}
      <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-12 h-12 ${job.iconBg || "bg-blue-50"} rounded flex items-center justify-center shrink-0`}
        >
          {job.icon ? (
            <span className={`material-symbols-outlined ${job.iconColor || "text-primary"} text-xl`}>
              {job.icon}
            </span>
          ) : (
            <span className={`${job.iconColor || "text-primary"} font-bold text-xl`}>
              {job.logoLetter || job.company?.[0]}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 md:flex-none md:w-48">
          <h4 className="text-title-md font-title-md text-on-surface truncate group-hover:text-primary transition-colors">
            {job.title}
          </h4>
          <p className="text-body-md text-on-surface-variant truncate">
            {job.company}
          </p>
        </div>
        <div className="hidden lg:flex gap-2 shrink-0">
          {job.employment_type && (
            <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded-full text-label-sm font-label-sm text-on-surface capitalize">
              {job.employment_type}
            </span>
          )}
          {job.level && (
            <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded-full text-label-sm font-label-sm text-on-surface capitalize">
              {job.level} level
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6 md:gap-12 shrink-0">
        <div className="hidden md:block w-32">
          <p className="text-body-md text-on-surface font-medium truncate">
            {job.location}
          </p>
        </div>
        <div className="w-24 text-right">
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            {timeAgo(job.created_at)}
          </p>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="text-outline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">bookmark_border</span>
        </button>
      </div>
    </Link>
  );
}
