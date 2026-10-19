import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/formatters";

export default function ApplicationCard({ application }) {
  const { job, status, applied_at, logoColor } = application;

  return (
    <div className="bg-surface rounded-lg p-6 flex items-center justify-between shadow-card border border-outline-variant/30 hover:border-primary/50 transition-colors group">
      <div className="flex items-center gap-6 flex-1">
        <div
          className={`w-12 h-12 ${logoColor || "bg-blue-50"} rounded flex items-center justify-center shrink-0`}
        >
          <span className="font-bold text-lg text-on-surface-variant">
            {job.company?.[0]}
          </span>
        </div>
        <div className="min-w-0 flex-1 md:flex-none md:w-64">
          <h4 className="text-title-md font-title-md text-on-surface truncate">
            {job.title}
          </h4>
          <p className="text-body-md text-on-surface-variant truncate">
            {job.location}
          </p>
        </div>
        <div className="hidden md:block w-48">
          <p className="text-body-md text-on-surface font-medium truncate">
            {job.company}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 md:gap-12 shrink-0">
        <div className="hidden md:block w-32">
          <p className="text-body-md text-on-surface-variant truncate">
            {formatDate(applied_at)}
          </p>
        </div>
        <div className="w-32 text-right">
          <StatusBadge status={status} />
        </div>
        <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
  );
}
