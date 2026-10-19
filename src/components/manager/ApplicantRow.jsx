import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import ScoreCircle from "../ui/ScoreCircle";
import { formatDate, getMatchColor, getMatchLabel } from "../../utils/formatters";

export default function ApplicantRow({ applicant }) {
  const { candidate, applied_at, score } = applicant;
  const matchColors = getMatchColor(score);

  return (
    <tr className="hover:bg-surface transition-colors group cursor-pointer">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar name={candidate.full_name} src={candidate.avatar_url} size="md" />
          <div>
            <div className="text-label-md font-label-md text-on-background font-semibold group-hover:text-primary transition-colors">
              {candidate.full_name}
            </div>
            <div className="text-label-sm font-label-sm text-on-surface-variant">
              Prev: {candidate.previous_company}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-body-md text-on-surface-variant">
        {formatDate(applied_at)}
      </td>
      <td className="px-6 py-4">
        <ScoreCircle score={score} size="sm" />
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-label-sm font-label-sm ${matchColors.bg} ${matchColors.text} border ${matchColors.border}`}
        >
          {getMatchLabel(score)}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <Link
          to={`/manager/applicants/${applicant.id}`}
          className="px-4 py-2 border border-outline-variant rounded-full text-label-md font-label-md text-on-surface hover:bg-surface-container-low hover:border-primary hover:text-primary transition-all"
        >
          View Analysis
        </Link>
      </td>
    </tr>
  );
}
