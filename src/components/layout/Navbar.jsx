import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-surface shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-headline-lg font-headline-lg font-black text-primary"
          >
            JobLens
          </Link>
          <ul className="hidden md:flex gap-6">
            <li>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `text-label-md font-label-md py-2 transition-colors ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-on-surface-variant font-medium hover:text-primary"
                  }`
                }
              >
                Jobs
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/applications"
                  className={({ isActive }) =>
                    `text-label-md font-label-md py-2 transition-colors ${
                      isActive
                        ? "text-primary font-bold border-b-2 border-primary"
                        : "text-on-surface-variant font-medium hover:text-primary"
                    }`
                  }
                >
                  My Applications
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-label-md font-label-md text-on-surface">
                  {user.full_name}
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  {user.title || user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-label-md border border-outline-variant">
                {user.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <button
                onClick={logout}
                className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 rounded-full border border-outline-variant text-on-surface text-label-md font-label-md hover:bg-surface-container-low transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-primary text-on-primary text-label-md font-label-md hover:bg-primary-container transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
