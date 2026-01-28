import { useJobStore } from "../../hooks/useJobStore";

export default function JobTypeFilter() {
  const jobType = useJobStore((s) => s.filters.jobType);
  const setFilter = useJobStore((s) => s.setFilter);

  const handleChange = (value) => {
    setFilter("jobType", value);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Job Type</h3>
      <div className="flex flex-col gap-1">
        <label>
          <input
            type="radio"
            name="jobType"
            value="all"
            checked={jobType === "all"}
            onChange={() => handleChange("all")}
          />{" "}
          All
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="Remote"
            data-testid="filter-job-type-remote"
            checked={jobType === "Remote"}
            onChange={() => handleChange("Remote")}
          />{" "}
          Remote
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="Hybrid"
            data-testid="filter-job-type-hybrid"
            checked={jobType === "Hybrid"}
            onChange={() => handleChange("Hybrid")}
          />{" "}
          Hybrid
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="Onsite"
            checked={jobType === "Onsite"}
            onChange={() => handleChange("Onsite")}
          />{" "}
          Onsite
        </label>
      </div>
    </div>
  );
}
