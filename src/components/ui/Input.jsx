import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, id, error, className = "", ...props },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-label-md font-label-md text-on-surface"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`
          w-full bg-surface border border-outline-variant text-on-surface
          text-body-md rounded-lg px-4 py-3
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
          transition-colors placeholder:text-on-surface-variant
          ${error ? "border-error focus:border-error focus:ring-error" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-label-sm text-error">{error}</p>
      )}
    </div>
  );
});

export default Input;
