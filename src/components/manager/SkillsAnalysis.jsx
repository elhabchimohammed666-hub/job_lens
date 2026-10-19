export default function SkillsAnalysis({ matched = [], missing = [] }) {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30">
      <h3 className="text-title-md font-title-md text-on-surface border-b border-outline-variant/50 pb-3 mb-4">
        Skills Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div>
          <h4 className="text-label-md font-label-md text-on-surface-variant mb-3 uppercase tracking-wide">
            Matched Requirements
          </h4>
          <ul className="space-y-3">
            {matched.map((skill) => (
              <li key={skill.name} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary-fixed rounded-full p-1 text-sm">
                  check
                </span>
                <span className="text-body-md text-on-surface">
                  {skill.name} ({skill.level})
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-label-md font-label-md text-on-surface-variant mb-3 uppercase tracking-wide">
            Missing / Weak
          </h4>
          <ul className="space-y-3">
            {missing.map((skill) => (
              <li key={skill.name} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant bg-surface-container rounded-full p-1 text-sm">
                  remove
                </span>
                <span className="text-body-md text-on-surface-variant">
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
