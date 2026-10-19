import { getStatusStyle, getStatusLabel } from "../../utils/formatters";

export default function StatusBadge({ status }) {
  const style = getStatusStyle(status);

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-label-sm font-label-sm ${style.bg} ${style.text} border ${style.border}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
