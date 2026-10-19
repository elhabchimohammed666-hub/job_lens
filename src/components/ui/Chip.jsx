export default function Chip({ children, active = false, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-label-md font-label-md whitespace-nowrap transition-colors
        ${
          active
            ? "bg-primary text-on-primary border border-primary"
            : "bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
