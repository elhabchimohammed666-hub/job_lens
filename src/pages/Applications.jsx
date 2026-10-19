import ApplicationCard from "../components/applications/ApplicationCard";
import Pagination from "../components/ui/Pagination";
import { useMyApplications } from "../hooks/useApplications";

export default function Applications() {
  const { data, loading } = useMyApplications();
  const applications = data?.applications || [];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <div className="mb-stack-lg">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">
          My Applications
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Track the status of your submitted job applications.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg p-6 shadow-card border border-outline-variant/30 animate-pulse h-24" />
          ))
        ) : (
          applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        )}
      </div>

      {!loading && (
        <Pagination
          current={1}
          total={1}
          showing={`Showing 1 to ${applications.length} of ${applications.length} entries`}
        />
      )}
    </div>
  );
}
