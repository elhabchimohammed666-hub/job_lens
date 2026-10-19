export default function Pagination({ current = 1, total = 1, onPageChange, showing = "" }) {
  const pages = [];
  for (let i = 1; i <= Math.min(total, 3); i++) pages.push(i);
  if (total > 4) pages.push("...");
  if (total > 3) pages.push(total);

  return (
    <div className="flex items-center justify-between mt-8">
      {showing && (
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          {showing}
        </span>
      )}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => onPageChange?.(current - 1)}
          disabled={current <= 1}
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="text-on-surface-variant px-1 flex items-center">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange?.(p)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-label-md font-label-md transition-colors ${
                p === current
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange?.(current + 1)}
          disabled={current >= total}
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
