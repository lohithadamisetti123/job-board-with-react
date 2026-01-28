import { useEffect, useMemo } from "react";
import { useJobsData } from "../hooks/useJobsData";
import { useJobStore } from "../hooks/useJobStore";

import Navbar from "../components/layout/Navbar";
import ViewToggle from "../components/filters/ViewToggle";
import SearchBar from "../components/filters/SearchBar";
import SortControls from "../components/filters/SortControls";
import JobTypeFilter from "../components/filters/JobTypeFilter";
import SkillsFilter from "../components/filters/SkillsFilter";
import SalarySlider from "../components/filters/SalarySlider";
import ClearFiltersButton from "../components/filters/ClearFiltersButton";
import JobList from "../components/job/JobList";
import Pagination from "../components/job/Pagination";

export default function JobBoardPage() {
  const { jobs, companies, isLoading, isError } = useJobsData();
  const setData = useJobStore((s) => s.setData);
  const filters = useJobStore((s) => s.filters);
  const loadBookmarksFromStorage = useJobStore(
    (s) => s.loadBookmarksFromStorage
  );
  const setInitialSalaryRange = useJobStore(
    (s) => s.setInitialSalaryRange
  );

  // set jobs/companies in store
  useEffect(() => {
    setData(jobs, companies);
  }, [jobs, companies, setData]);

  // load bookmarks once
  useEffect(() => {
    loadBookmarksFromStorage();
  }, [loadBookmarksFromStorage]);

  // compute all skills
  const allSkills = useMemo(() => {
    const skillSet = new Set();
    jobs.forEach((job) => {
      job.skills.forEach((s) => skillSet.add(s));
    });
    return Array.from(skillSet).sort();
  }, [jobs]);

  // compute salary bounds from data
  const salaryBounds = useMemo(() => {
    if (!jobs.length) return { min: 0, max: 200000 };
    const salaries = jobs.map((j) => j.salary);
    return { min: Math.min(...salaries), max: Math.max(...salaries) };
  }, [jobs]);

  // initialize slider range once when jobs are available
  useEffect(() => {
    if (jobs.length) {
      setInitialSalaryRange(salaryBounds.min, salaryBounds.max);
    }
  }, [jobs.length, salaryBounds.min, salaryBounds.max, setInitialSalaryRange]);

  // apply filters + sorting
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (filters.jobType !== "all") {
      result = result.filter((job) => job.jobType === filters.jobType);
    }

    if (filters.skills.length > 0) {
      result = result.filter((job) =>
        filters.skills.every((s) => job.skills.includes(s))
      );
    }

    if (filters.salaryRange) {
      result = result.filter(
        (job) =>
          job.salary >= filters.salaryRange[0] &&
          job.salary <= filters.salaryRange[1]
      );
    }

    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase();
      result = result.filter((job) => {
        const company = companies.find((c) => c.id === job.companyId);
        const titleMatch = job.title.toLowerCase().includes(term);
        const companyMatch = company?.name
          ?.toLowerCase()
          .includes(term);
        return titleMatch || companyMatch;
      });
    }

    if (filters.sortBy === "salary-desc") {
      result.sort((a, b) => b.salary - a.salary);
    } else if (filters.sortBy === "date-desc") {
      result.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() -
          new Date(a.postedDate).getTime()
      );
    }

    return result;
  }, [jobs, companies, filters]);

  if (isLoading) return <div className="p-4 text-gray-100">Loading...</div>;
  if (isError) return <div className="p-4 text-gray-100">Error loading jobs.</div>;
const activeFilterCount = (() => {
  let count = 0;

  // jobType active (not "all")
  if (filters.jobType !== "all") count += 1;

  // skills active
  if (filters.skills && filters.skills.length > 0) count += 1;

  // salary range active (different from data min/max)
  const salaryActive =
    filters.salaryRange &&
    (filters.salaryRange[0] !== salaryBounds.min ||
      filters.salaryRange[1] !== salaryBounds.max);
  if (salaryActive) count += 1;

  // search active
  if (filters.search && filters.search.trim() !== "") count += 1;

  // sort active (different from default)
  if (filters.sortBy !== "date-desc") count += 1;

  return count;
})();

  return (
    <div className="min-h-screen bg-surface text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 lg:flex-row flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <aside className="w-full lg:w-1/4 border rounded-lg shadow-md bg-panel p-4 fade-in">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
  Filters
  {activeFilterCount > 0 && (
    <span
      style={{
        minWidth: "1.5rem",
        padding: "0 0.5rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        background:
          "linear-gradient(135deg, rgba(79,70,229,0.9), rgba(236,72,153,0.9))",
        color: "#f9fafb",
        textAlign: "center"
      }}
    >
      {activeFilterCount}
    </span>
  )}
</h2>

          <JobTypeFilter />
          <SkillsFilter allSkills={allSkills} />
          <SalarySlider
            minSalary={salaryBounds.min}
            maxSalary={salaryBounds.max}
          />
          <ClearFiltersButton />
        </aside>
        <section className="flex-1 flex flex-col fade-in">
          <SearchBar />
          <div className="flex justify-between items-center mb-4">
            <ViewToggle />
            <SortControls />
          </div>
          <JobList jobs={filteredJobs} companies={companies} />
          <Pagination totalJobs={filteredJobs.length} />
        </section>
      </main>
    </div>
  );
}
