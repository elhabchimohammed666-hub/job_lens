import MetricCard from "../../components/manager/MetricCard";
import JobTable from "../../components/manager/JobTable";
import AiInsightCard from "../../components/manager/AiInsightCard";
import ActivityFeed from "../../components/manager/ActivityFeed";
import { useDashboardMetrics, useRecentActivity } from "../../hooks/useDashboard";

export default function Dashboard() {
  const { data: dashData, loading: dashLoading } = useDashboardMetrics();
  const { data: actData, loading: actLoading } = useRecentActivity();

  const m = dashData?.metrics || {};
  const jobs = dashData?.jobs || [];
  const activity = actData?.activity || [];

  if (dashLoading) {
    return (
      <div className="space-y-section-gap">
        <div className="animate-pulse h-10 w-64 bg-surface-container rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-surface-container rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
        <div>
          <h1 className="text-headline-lg md:text-display-xl text-on-surface">
            Dashboard Overview
          </h1>
          <p className="text-on-surface-variant text-body-lg mt-2">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="w-full md:w-auto bg-surface rounded-full shadow-card p-2 flex items-center gap-2 border border-outline-variant">
          <span className="material-symbols-outlined text-outline ml-3">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-md w-full md:w-64"
            placeholder="Search anything..."
            type="text"
          />
        </div>
      </div>

      {/* Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
        <MetricCard
          label="Total Jobs Active"
          value={m.totalActiveJobs}
          trend={m.jobsTrend}
          trendUp={true}
          icon="work"
        />
        <MetricCard
          label="New Applications"
          value={m.newApplications}
          trend={m.applicationsTrend}
          trendUp={true}
          icon="description"
        />
        <MetricCard
          label="Matched Candidates"
          value={m.matchedCandidates}
          trend={m.matchedTrend}
          trendUp={false}
          icon="how_to_reg"
        />
      </section>

      {/* Table + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-gutter">
        <div className="flex-1">
          <JobTable jobs={jobs} />
        </div>
        <div className="w-full lg:w-[320px] flex flex-col gap-gutter">
          <AiInsightCard />
          <ActivityFeed activities={activity} />
        </div>
      </div>
    </div>
  );
}
