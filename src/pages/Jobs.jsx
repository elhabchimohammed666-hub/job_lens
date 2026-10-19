import SearchBar from "../components/ui/SearchBar";
import JobTagBar from "../components/jobs/JobTagBar";
import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import { useJobs } from "../hooks/useJobs";
import { popularTags, filterEmployment } from "../utils/mockData";

export default function Jobs() {
  const { data, loading } = useJobs();
  const jobs = data?.jobs || [];

  return (
    <div className="flex flex-col">
      {/* Hero Search */}
      <section className="bg-surface-container-highest py-section-gap relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg
            className="absolute -top-10 -right-10 w-full fill-primary"
            viewBox="0 0 200 200"
          >
            <path
              d="M45.7,-76.1C58.9,-69.3,69.1,-55.3,77.3,-40.5C85.5,-25.7,91.7,-10.1,90.4,4.9C89,19.9,80.1,34.4,69.5,46.3C58.9,58.2,46.6,67.6,32.3,74.5C18,81.4,1.8,85.8,-13.7,83.9C-29.2,82,-44.1,73.8,-56.3,62.1C-68.5,50.4,-78,35.2,-83.4,18.4C-88.8,1.6,-90,-16.8,-83.8,-32.1C-77.6,-47.4,-64,-59.5,-49.6,-65.9C-35.2,-72.3,-20,-73,-3,-68.2C14,-63.4,28,-53.1,32.5,-64.5C37,-75.9,32.5,-82.9,45.7,-76.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <h1 className="text-display-xl font-display-xl text-on-surface mb-stack-lg">
            Find Your Dream Job Here
          </h1>
          <SearchBar className="max-w-4xl" />
        </div>
      </section>

      {/* Tag Bar */}
      <JobTagBar tags={popularTags} />

      {/* Main Content */}
      <main className="flex-1 max-w-container-max mx-auto w-full px-margin-desktop py-section-gap flex flex-col md:flex-row gap-8">
        <JobFilters filters={filterEmployment} />

        <div className="flex-1 space-y-4">
          {loading ? (
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-surface rounded-lg p-4 shadow-card border border-outline-variant/30 animate-pulse h-20" />
            ))
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
