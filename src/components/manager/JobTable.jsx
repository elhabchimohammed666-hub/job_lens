import { Link } from "react-router-dom";

export default function JobTable({ jobs }) {
  return (
    <div className="bg-surface rounded-lg shadow-card overflow-hidden">
      <div className="p-stack-md border-b border-outline-variant flex justify-between items-center">
        <h2 className="text-title-md font-title-md text-on-surface">
          Active Job Offers
        </h2>
        <Link
          to="/manager/jobs"
          className="text-primary text-label-md font-label-md hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-variant bg-surface-container-lowest text-on-surface-variant text-label-sm font-label-sm">
              <th className="p-4 font-medium">Job Title</th>
              <th className="p-4 font-medium">Department</th>
              <th className="p-4 font-medium">Applicants</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium">{job.title}</div>
                  <div className="text-on-surface-variant text-label-sm">
                    {job.location}
                  </div>
                </td>
                <td className="p-4">{job.department}</td>
                <td className="p-4">
                  <span className="font-medium">{job.applicants}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium ${
                      job.status === "published"
                        ? "bg-surface-container text-primary"
                        : "bg-surface-variant text-on-surface-variant"
                    }`}
                  >
                    {job.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
