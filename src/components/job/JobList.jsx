import JobCard from "./JobCard";
import { useJobStore } from "../../hooks/useJobStore";

export default function JobList({ jobs, companies }) {
  const viewMode = useJobStore((s) => s.viewMode);
  const currentPage = useJobStore((s) => s.currentPage);
  const PAGE_SIZE = useJobStore((s) => s.PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageJobs = jobs.slice(startIndex, startIndex + PAGE_SIZE);

  const containerClass =
    viewMode === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : "flex flex-col gap-4";

  return (
    <div
      data-testid="job-list-container"
      data-view-mode={viewMode}
      className={containerClass}
    >
      {pageJobs.map((job) => {
        const company = companies.find((c) => c.id === job.companyId);
        return <JobCard key={job.id} job={job} company={company} />;
      })}
    </div>
  );
}
