import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import JobCardFeatured from "../components/jobs/JobCardFeatured";
import { useFeaturedJobs } from "../hooks/useJobs";

export default function Landing() {
  const { data, loading } = useFeaturedJobs();
  const featuredJobs = data?.jobs || [];

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col gap-section-gap">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 md:py-32 relative rounded-3xl overflow-hidden glass-panel">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low to-transparent opacity-50 z-0" />
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-stack-lg">
          <h1 className="text-headline-lg-mobile md:text-display-xl text-on-surface">
            Find Your Next Career Move
          </h1>

          <SearchBar className="w-full max-w-2xl mt-4" />

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-label-sm text-on-surface-variant">
              Popular:
            </span>
            {["Product Manager", "Frontend Developer", "UX Designer"].map(
              (tag) => (
                <Link
                  key={tag}
                  to={`/jobs?search=${encodeURIComponent(tag)}`}
                  className="text-label-sm px-3 py-1 bg-surface-container rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="flex flex-col gap-stack-lg">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Featured Jobs
          </h2>
          <Link
            to="/jobs"
            className="text-label-md text-primary hover:underline flex items-center"
          >
            View all
            <span className="material-symbols-outlined text-sm ml-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface-container-lowest rounded-lg p-6 shadow-card border border-outline-variant/30 animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featuredJobs.map((job) => (
              <JobCardFeatured key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
