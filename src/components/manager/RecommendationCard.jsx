export default function RecommendationCard({ recommendation, onAccept, onReview, onReject }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-stack-lg shadow-card border border-outline-variant/30 flex flex-col justify-between">
      <div>
        <h3 className="text-title-md font-title-md text-on-surface mb-2">
          AI Recommendation
        </h3>
        <p className="text-body-md text-on-surface-variant mb-6">
          {recommendation}
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={onAccept}
          className="w-full bg-primary text-on-primary font-medium text-label-md py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">thumb_up</span>
          Accept &amp; Advance
        </button>
        <button
          onClick={onReview}
          className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-medium text-label-md py-3 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">bookmark</span>
          Keep Under Review
        </button>
        <button
          onClick={onReject}
          className="w-full text-error font-medium text-label-md py-3 rounded-full hover:bg-error-container transition-colors mt-2"
        >
          Reject Candidate
        </button>
      </div>
    </div>
  );
}
