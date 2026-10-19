import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 sm:p-12">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-lg p-8 sm:p-10 shadow-card border border-outline-variant/30">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="text-headline-lg font-headline-lg font-black text-primary block mb-6"
          >
            JobLens
          </Link>
          <h2 className="text-headline-lg-mobile text-on-surface mb-2">
            Create Account
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Step into the future of hiring.
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
              className="block text-label-md font-label-md text-on-surface"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="w-full bg-surface border border-outline-variant text-on-surface text-body-md rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
              id="fullName"
              name="full_name"
              placeholder="Jane Doe"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-label-md font-label-md text-on-surface"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full bg-surface border border-outline-variant text-on-surface text-body-md rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
              id="email"
              name="email"
              placeholder="jane@example.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-label-md font-label-md text-on-surface"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full bg-surface border border-outline-variant text-on-surface text-body-md rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-label-md font-label-md text-on-surface"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full bg-surface border border-outline-variant text-on-surface text-body-md rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary-container text-on-primary font-title-md text-title-md rounded-full py-3 px-6 hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-label-md text-primary hover:text-primary-container transition-colors ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
