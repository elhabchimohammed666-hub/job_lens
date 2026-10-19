export default function AiInsightCard() {
  return (
    <div className="bg-primary-container text-on-primary-container rounded-lg p-stack-md shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-fixed-dim rounded-full opacity-20 blur-xl" />
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined icon-fill text-on-primary-container">
          psychology
        </span>
        <h3 className="text-title-md font-title-md font-bold">AI Insight</h3>
      </div>
      <p className="text-body-md mb-4">
        Based on recent applicant flow, consider increasing the salary range for
        the <strong>Frontend Developer</strong> role by 5% to attract more
        senior candidates in the NY area.
      </p>
      <button className="bg-on-primary-container text-primary-container px-4 py-2 rounded-full text-label-md font-medium hover:opacity-90 transition-opacity w-full">
        Review Market Data
      </button>
    </div>
  );
}
