export default function Avatar({ name, src, size = "md", className = "" }) {
  const sizes = {
    sm: "w-8 h-8 text-label-sm",
    md: "w-10 h-10 text-label-md",
    lg: "w-12 h-12 text-body-lg",
    xl: "w-24 h-24 text-headline-lg",
  };

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover border border-outline-variant ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center text-on-surface-variant font-bold ${className}`}
    >
      {initials}
    </div>
  );
}
