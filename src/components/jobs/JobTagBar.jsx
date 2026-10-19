import { useState } from "react";

export default function JobTagBar({ tags, onTagClick }) {
  const [activeTags, setActiveTags] = useState(new Set(["Fulltime", "Senior level"]));

  function toggle(tag) {
    const next = new Set(activeTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setActiveTags(next);
    onTagClick?.(tag);
  }

  return (
    <div className="bg-surface border-b border-outline-variant overflow-x-auto">
      <div className="max-w-container-max mx-auto px-margin-desktop py-4 flex gap-3 whitespace-nowrap">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`px-4 py-1.5 rounded-full border border-outline-variant text-label-md font-label-md text-on-surface transition-colors ${
              activeTags.has(tag)
                ? "bg-surface-container-low font-medium"
                : "hover:bg-surface-container-low"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
