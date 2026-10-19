import { useParams, Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import ScoreCircle from "../../components/ui/ScoreCircle";
import SkillsAnalysis from "../../components/manager/SkillsAnalysis";
import RecommendationCard from "../../components/manager/RecommendationCard";
import { useAiAnalysis } from "../../hooks/useDashboard";

export default function AiAnalysis() {
  const { applicationId } = useParams();
  const { data, loading } = useAiAnalysis(applicationId);
  const analysis = data?.analysis;

  if (loading || !analysis) {
    return (
      <div className="flex flex-col gap-stack-lg">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 bg-surface-container rounded" />
          <div className="h-10 w-64 bg-surface-container rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <div className="lg:col-span-2 h-48 bg-surface-container rounded-lg" />
            <div className="h-48 bg-surface-container rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const { candidate } = analysis;

  return (
    <div className="flex flex-col gap-stack-lg">
      {/* Context Header */}
      <div className="mb-4">
        <Link
          to="/manager/jobs/m1/applicants"
          className="inline-flex items-center text-body-md text-on-surface-variant hover:text-primary transition-colors mb-2"
        >
          <span className="material-symbols-outlined text-sm mr-1">
            arrow_back
          </span>
          Back to Senior UX Researcher Applicants
        </Link>
        <h1 className="text-headline-lg md:text-display-xl text-on-surface tracking-tight">
          Application Analysis
        </h1>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Candidate Info Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-lg p-stack-lg shadow-card flex flex-col md:flex-row gap-stack-lg items-start relative overflow-hidden border border-outline-variant/30">
          <Avatar
            name={candidate.full_name}
            size="xl"
            className="border-4 border-surface z-10"
          />
          <div className="flex-1 z-10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">
                  {candidate.full_name}
                </h2>
                <p className="text-title-md font-title-md text-on-surface-variant">
                  {candidate.title}
                </p>
              </div>
              <span className="bg-surface-container text-on-surface-variant text-label-sm font-label-sm px-3 py-1 rounded-full border border-outline-variant/50 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                {candidate.location}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                candidate.experience,
                candidate.education,
                candidate.availability,
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-container-low text-on-surface text-label-md px-3 py-1.5 rounded-full border border-outline-variant/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-body-lg text-on-surface-variant mt-4 line-clamp-3">
              {candidate.bio}
            </p>
          </div>
        </div>

        {/* AI Score Card */}
        <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card flex flex-col items-center justify-center text-center border border-outline-variant/30">
          <h3 className="text-title-md font-title-md text-on-surface mb-2">
            Role Compatibility
          </h3>
          <div className="mb-4">
            <ScoreCircle score={analysis.score} size="lg" />
          </div>
          <p className="text-body-md text-on-surface-variant">
            Exceptional Match based on required skills and experience.
          </p>
        </div>

        {/* Skills Analysis */}
        <SkillsAnalysis
          matched={analysis.matched_skills}
          missing={analysis.missing_skills}
        />

        {/* Recommendation */}
        <RecommendationCard
          recommendation={analysis.recommendation}
          onAccept={() => {}}
          onReview={() => {}}
          onReject={() => {}}
        />
      </div>
    </div>
  );
}
