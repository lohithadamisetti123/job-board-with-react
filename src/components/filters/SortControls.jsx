import { useJobStore } from "../../hooks/useJobStore";

export default function SortControls() {
  const sortBy = useJobStore((s) => s.filters.sortBy);
  const setSortBy = useJobStore((s) => s.setSortBy);

  const handleSalaryDesc = () => {
    setSortBy("salary-desc");
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <label className="font-semibold">Sort:</label>
      <button
        data-testid="sort-salary-desc"
        className={`px-3 py-1 border ${
          sortBy === "salary-desc" ? "bg-gray-200" : ""
        }`}
        onClick={handleSalaryDesc}
      >
        Salary (High to Low)
      </button>
    </div>
  );
}
