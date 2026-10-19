export default function MetricCard({ label, value, trend, trendUp = true, icon }) {
  return (
    <div className="bg-surface p-stack-md rounded-lg shadow-card flex items-center justify-between">
      <div>
        <p className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-headline-lg font-headline-lg text-on-surface">
          {value}
        </h3>
        <p
          className={`text-label-sm font-label-sm mt-2 flex items-center gap-1 ${
            trendUp ? "text-surface-tint" : "text-secondary"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {trendUp ? "trending_up" : "horizontal_rule"}
          </span>
          {trend}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
        <span className="material-symbols-outlined icon-fill text-[24px]">
          {icon}
        </span>
      </div>
    </div>
  );
}
