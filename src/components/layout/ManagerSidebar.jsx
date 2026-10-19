import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/manager", icon: "dashboard", label: "Dashboard", end: true },
  { to: "/manager/jobs", icon: "work", label: "Job Management" },
  { to: "/manager/applicants", icon: "groups", label: "Applicants" },
];

export default function ManagerSidebar() {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant fixed left-0 top-0 h-full w-[280px] p-gutter gap-stack-lg z-40">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-label-md overflow-hidden">
          {user?.full_name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2) || "RP"}
        </div>
        <div>
          <div className="text-title-md font-title-md font-bold text-primary">
            Recruiter Portal
          </div>
          <div className="text-label-sm font-label-sm text-on-surface-variant">
            Manage Talent
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`
            }
          >
            <span
              className="material-symbols-outlined"
              style={
                undefined /* filled style applied via NavLink isActive if needed */
              }
            >
              {item.icon}
            </span>
            <span className="text-label-md font-label-md">{item.label}</span>
          </NavLink>
        ))}

        <NavLink
          to="/manager/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all mt-auto"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-label-md font-label-md">Settings</span>
        </NavLink>
      </div>

      <div className="mt-auto">
        <Link
          to="/manager/jobs?action=create"
          className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Post New Job
        </Link>
      </div>
    </nav>
  );
}
