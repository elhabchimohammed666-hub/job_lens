import { useState } from "react";

export default function JobFilters({ filters: initialFilters, onFilterChange }) {
  const [employmentOpen, setEmploymentOpen] = useState(true);
  const [filters, setFilters] = useState(initialFilters || []);

  function toggleFilter(value) {
    const updated = filters.map((f) =>
      f.value === value ? { ...f, checked: !f.checked } : f
    );
    setFilters(updated);
    onFilterChange?.(updated);
  }

  return (
    <aside className="w-full md:w-[280px] shrink-0 space-y-8">
      <div>
        <h3 className="text-title-md font-title-md text-on-surface mb-3">
          Filter
        </h3>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-body-md focus:ring-primary focus:border-primary"
          placeholder="Company, skill, tag..."
          type="text"
        />
      </div>

      <div>
        <button className="flex justify-between items-center w-full text-left text-title-md font-title-md text-on-surface mb-3">
          Speciality
          <span className="material-symbols-outlined text-outline">
            expand_more
          </span>
        </button>
      </div>

      <div>
        <button
          onClick={() => setEmploymentOpen(!employmentOpen)}
          className="flex justify-between items-center w-full text-left text-title-md font-title-md text-on-surface mb-3"
        >
          Employment
          <span className="material-symbols-outlined text-outline">
            {employmentOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
        {employmentOpen && (
          <div className="space-y-3">
            {filters.map((f) => (
              <label key={f.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={f.checked}
                  onChange={() => toggleFilter(f.value)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span className="text-body-md text-on-surface">{f.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <button className="flex justify-between items-center w-full text-left text-title-md font-title-md text-on-surface mb-3">
          Salary Type
          <span className="material-symbols-outlined text-outline">
            expand_more
          </span>
        </button>
      </div>
    </aside>
  );
}
