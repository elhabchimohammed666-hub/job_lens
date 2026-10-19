const variants = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
  secondary:
    "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low",
  danger: "text-error hover:bg-error-container",
  ghost: "text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
};

const sizes = {
  sm: "px-4 py-1.5 text-label-sm",
  md: "px-6 py-2.5 text-label-md",
  lg: "px-8 py-3 text-title-md",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  pill = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${pill ? "rounded-full" : "rounded-lg"}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
