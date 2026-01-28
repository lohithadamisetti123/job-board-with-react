import { useEffect, useMemo } from "react";
import { useJobsData } from "../hooks/useJobsData";
import { useJobStore } from "../hooks/useJobStore";

import Navbar from "../components/layout/Navbar";
import JobCard from "../components/job/JobCard";

export default function TrackerPage() {
  const { jobs, companies, isLoading, isError } = useJobsData();
  const setData = useJobStore((s) => s.setData);
  const bookmarked = useJobStore((s) => s.bookmarked);
  const loadBookmarksFromStorage = useJobStore(
    (s) => s.loadBookmarksFromStorage
  );

  useEffect(() => {
    setData(jobs, companies);
  }, [jobs, companies, setData]);

  useEffect(() => {
    loadBookmarksFromStorage();
  }, [loadBookmarksFromStorage]);

  const bookmarkedJobs = useMemo(
    () => jobs.filter((job) => bookmarked.includes(job.id)),
    [jobs, bookmarked]
  );

  if (isLoading) return <div className="p-4 text-gray-100">Loading...</div>;
  if (isError) return <div className="p-4 text-gray-100">Error loading jobs.</div>;

  return (
    <div className="min-h-screen bg-surface text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Application Tracker</h1>
        {bookmarkedJobs.length === 0 ? (
          <p className="text-gray-300">No bookmarked jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedJobs.map((job) => {
              const company = companies.find(
                (c) => c.id === job.companyId
              );
              return (
                <JobCard key={job.id} job={job} company={company} />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
