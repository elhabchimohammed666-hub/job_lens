export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-surface rounded-lg shadow-card p-stack-md flex-1">
      <h3 className="text-title-md font-title-md text-on-surface mb-4">
        Recent Activity
      </h3>
      <ul className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-surface-variant">
        {activities.map((activity) => (
          <li key={activity.id} className="flex gap-3 relative">
            <div
              className={`w-6 h-6 rounded-full bg-surface border-2 ${
                activity.isNew
                  ? "border-primary-container"
                  : "border-surface-variant"
              } flex items-center justify-center z-10 shrink-0 mt-1`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.isNew
                    ? "bg-primary-container"
                    : "bg-surface-variant"
                }`}
              />
            </div>
            <div>
              <p
                className="text-body-md text-on-surface"
                dangerouslySetInnerHTML={{ __html: activity.text }}
              />
              <p className="text-label-sm text-on-surface-variant mt-1">
                {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
