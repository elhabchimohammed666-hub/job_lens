import { Link } from "react-router-dom";

export default function JobCardFeatured({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="bg-surface-container-lowest rounded-xl p-stack-md border border-surface-variant shadow-sm hover:shadow-md hover:border-primary-fixed-dim transition-all duration-300 flex flex-col gap-4 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 ${job.iconBg || "bg-surface-container"} rounded-lg flex items-center justify-center shrink-0`}
        >
          <span
            className={`material-symbols-outlined ${job.iconColor || "text-primary"} text-2xl icon-fill`}
          >
            {job.icon || "work"}
          </span>
        </div>
        <div>
          <h3 className="text-title-md font-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-body-md text-on-surface-variant mt-1">
            {job.company}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-surface-container-high">
        <span className="material-symbols-outlined text-outline text-sm">
          location_on
        </span>
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          {job.location}
        </span>
      </div>
    </Link>
  );
}
