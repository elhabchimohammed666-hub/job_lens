import { getMatchColor } from "../../utils/formatters";

export default function ScoreCircle({ score, size = "md" }) {
  const colors = getMatchColor(score);
  const dashArray = `${score}, 100`;

  const sizes = {
    sm: { container: "w-12 h-12", text: "text-label-sm", stroke: 4 },
    md: { container: "w-20 h-20", text: "text-title-md", stroke: 3.5 },
    lg: { container: "w-32 h-32", text: "text-headline-lg", stroke: 3 },
  };

  const s = sizes[size];

  return (
    <div className={`relative ${s.container} flex items-center justify-center`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-surface-container-high stroke-current"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeWidth={s.stroke}
        />
        <path
          className={`${colors.ring.replace("border-", "text-")} stroke-current`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeDasharray={dashArray}
          strokeWidth={s.stroke}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${s.text} font-bold ${colors.ring.replace("border-", "text-")}`}>
          {score}%
        </span>
      </div>
    </div>
  );
}
