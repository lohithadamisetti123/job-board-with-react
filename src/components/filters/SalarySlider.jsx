import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useJobStore } from "../../hooks/useJobStore";

export default function SalarySlider({ minSalary, maxSalary }) {
  const salaryRange = useJobStore((s) => s.filters.salaryRange);
  const setSalaryRange = useJobStore((s) => s.setSalaryRange);

  // Fallback while salaryRange is still null (before initialization)
  const effectiveRange =
    salaryRange && Array.isArray(salaryRange) && salaryRange.length === 2
      ? salaryRange
      : [minSalary, maxSalary];

  const handleChange = (value) => {
    setSalaryRange(value);
  };

  return (
    <div className="mb-4" data-testid="filter-salary-slider">
      <h3 className="font-semibold mb-2">Salary Range</h3>
      <div className="mb-1 text-sm">
        ${effectiveRange[0].toLocaleString()} - $
        {effectiveRange[1].toLocaleString()}
      </div>
      <Slider
        range
        min={minSalary}
        max={maxSalary}
        value={effectiveRange}
        onChange={handleChange}
      />
    </div>
  );
}
