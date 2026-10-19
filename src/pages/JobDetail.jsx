import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useJob } from "../hooks/useJobs";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatters";
import { useApplyToJob } from "../hooks/useApplications";

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, loading } = useJob(id);
  const job = data?.job;

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { mutate: apply, loading: applying } = useApplyToJob();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSuccess(false);
      setSubmitError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (["pdf", "doc", "docx"].includes(extension)) {
        setSelectedFile(file);
        setSuccess(false);
        setSubmitError(null);
      } else {
        setSubmitError("Unsupported file type. Allowed: PDF, DOC, DOCX");
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSubmitError("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      await apply(job.id, formData);
      setSuccess(true);
      setSelectedFile(null);
      setSubmitError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setSubmitError(err.message || "Failed to submit application");
    }
  };

  if (loading || !job) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-surface-container rounded" />
          <div className="h-64 bg-surface-container rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <Link
        to="/jobs"
        className="inline-flex items-center text-body-md text-on-surface-variant hover:text-primary transition-colors mb-6"
      >
        <span className="material-symbols-outlined text-sm mr-1">
          arrow_back
        </span>
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-stack-lg">
          <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-16 h-16 ${job.iconBg || "bg-blue-50"} rounded-lg flex items-center justify-center shrink-0`}
              >
                <span
                  className={`material-symbols-outlined ${job.iconColor || "text-primary"} text-3xl`}
                >
                  {job.icon || "work"}
                </span>
              </div>
              <div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface">
                  {job.title}
                </h1>
                <p className="text-body-lg text-on-surface-variant mt-1">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-1 text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
                {job.location}
              </span>
              <span className="flex items-center gap-1 text-body-md text-on-surface-variant capitalize">
                <span className="material-symbols-outlined text-[16px]">
                  work_outline
                </span>
                {job.employment_type}
              </span>
              <span className="flex items-center gap-1 text-body-md text-on-surface-variant capitalize">
                <span className="material-symbols-outlined text-[16px]">
                  trending_up
                </span>
                {job.level} level
              </span>
              <span className="flex items-center gap-1 text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  calendar_today
                </span>
                Posted {formatDate(job.created_at)}
              </span>
            </div>

            <div className="border-t border-outline-variant/50 pt-6">
              <h2 className="text-title-md font-title-md text-on-surface mb-3">
                Description
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30">
            <h2 className="text-title-md font-title-md text-on-surface mb-4">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.required_skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-surface-container-low text-on-surface text-label-md rounded-full border border-outline-variant/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-stack-lg">
          <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30">
            <h3 className="text-title-md font-title-md text-on-surface mb-4">
              Apply for this position
            </h3>
            {user ? (
              <div className="space-y-4">
                {success ? (
                  <div className="bg-primary/10 border border-primary/20 text-on-surface p-4 rounded-lg text-center">
                    <span className="material-symbols-outlined text-primary text-3xl mb-1">
                      check_circle
                    </span>
                    <p className="text-body-md font-medium text-primary">
                      Application Submitted!
                    </p>
                    <p className="text-label-sm text-on-surface-variant mt-1">
                      Thank you for applying. We will review your profile and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-2">
                        Upload Resume
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragActive ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary"
                          }`}
                      >
                        <span className="material-symbols-outlined text-outline text-3xl mb-2">
                          upload_file
                        </span>
                        {selectedFile ? (
                          <div className="space-y-1">
                            <p className="text-body-md font-medium text-on-surface truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-label-sm text-on-surface-variant">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="text-label-sm text-error hover:underline mt-2 inline-flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-body-md text-on-surface-variant">
                              Drop your resume here or click to browse
                            </p>
                            <p className="text-label-sm text-outline mt-1 font-medium">
                              PDF, DOC, DOCX up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {submitError && (
                      <p className="text-label-md font-medium text-error py-1 text-center bg-error/10 border border-error/20 rounded">
                        {submitError}
                      </p>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={applying}
                      className="w-full bg-primary text-on-primary py-3 rounded-full text-label-md font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {applying ? "Submitting..." : "Submit Application"}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-body-md text-on-surface-variant mb-4">
                  Sign in to apply for this position.
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-primary text-on-primary px-6 py-3 rounded-full text-label-md font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors"
                >
                  Sign In to Apply
                </Link>
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30">
            <h3 className="text-title-md font-title-md text-on-surface mb-2">
              About {job.company}
            </h3>
            <p className="text-body-md text-on-surface-variant">
              A leading company in the industry, committed to innovation and
              building products that make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
