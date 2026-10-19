import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ManagerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/manager", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative">
      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <svg
          className="absolute -top-10 -left-10 w-full h-full fill-primary-container opacity-30"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M45.7,-76.1C58.9,-69.3,69.1,-55.3,77.3,-40.5C85.5,-25.7,91.7,-10.1,90.4,4.9C89,19.9,80.1,34.4,69.5,46.3C58.9,58.2,46.6,67.6,32.3,74.5C18,81.4,1.8,85.8,-13.7,83.9C-29.2,82,-44.1,73.8,-56.3,62.1C-68.5,50.4,-78,35.2,-83.4,18.4C-88.8,1.6,-90,-16.8,-83.8,-32.1C-77.6,-47.4,-64,-59.5,-49.6,-65.9C-35.2,-72.3,-20,-73,-3,-68.2C14,-63.4,28,-53.1,32.5,-64.5C37,-75.9,32.5,-82.9,45.7,-76.1Z"
            transform="translate(100 100) scale(1.5)"
          />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-1/2 h-1/2 fill-primary opacity-[0.04]"
          viewBox="0 0 200 200"
        >
          <path
            d="M39.9,-65.7C53.4,-58.3,67.1,-50.7,74.1,-38.7C81.1,-26.7,81.5,-10.4,78.5,4.7C75.5,19.8,69.2,33.7,59.6,44.1C50,54.5,37.2,61.4,23.5,66.4C9.8,71.3,-4.7,74.3,-18.7,72.3C-32.7,70.3,-46.2,63.2,-55.4,52.4C-64.6,41.6,-69.6,27,-72.2,12C-74.8,-3,-75,-18.4,-69.7,-31.1C-64.4,-43.8,-53.6,-53.9,-41.3,-61.8C-29,-69.7,-15.2,-75.5,-0.7,-74.3C13.7,-73.2,26.4,-73.1,39.9,-65.7Z"
            transform="translate(100 100) scale(1.3)"
          />
        </svg>
      </div>

      <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-lg p-8 md:p-10 shadow-card border border-outline-variant/30">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="text-3xl font-black text-primary mb-2 block"
          >
            JobLens
          </Link>
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-label-sm font-label-sm px-3 py-1 rounded-full mb-4">
            <span className="material-symbols-outlined text-[16px]">
              admin_panel_settings
            </span>
            Recruiter Portal
          </div>
          <p className="text-sm text-on-surface-variant mt-2">
            Sign in to manage job postings and review applicants.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-error-container text-on-error-container rounded-lg text-body-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-on-surface"
              htmlFor="manager-email"
            >
              Work Email
            </label>
            <div className="relative flex items-center border border-outline-variant rounded bg-surface px-4 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-3">
                mail
              </span>
              <input
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-on-surface placeholder-on-surface-variant/50"
                id="manager-email"
                placeholder="Enter your work email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-on-surface"
              htmlFor="manager-password"
            >
              Password
            </label>
            <div className="relative flex items-center border border-outline-variant rounded bg-surface px-4 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-3">
                lock
              </span>
              <input
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-on-surface placeholder-on-surface-variant/50"
                id="manager-password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                type="checkbox"
              />
              <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary-container transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm py-3.5 px-6 rounded-full transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">
              shield_person
            </span>
            {loading ? "Signing in..." : "Sign In as Manager"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-container-lowest text-outline">
              Or
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <Link
            to="/login"
            className="inline-flex justify-center items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors bg-surface hover:bg-surface-container px-4 py-2 rounded-lg border border-outline-variant/30 mx-auto"
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
            Sign in as Candidate
          </Link>
          <p className="text-sm text-on-surface-variant mt-2">
            Need a recruiter account?{" "}
            <a
              href="#"
              className="text-primary font-semibold hover:text-primary-container transition-colors"
            >
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
