import { useJobStore } from "../../hooks/useJobStore";

export default function ClearFiltersButton() {
  const resetFilters = useJobStore((s) => s.resetFilters);

  return (
    <button
      data-testid="clear-filters-btn"
      className="px-3 py-1 border mt-2"
      onClick={() => resetFilters()}
    >
      Clear All Filters
    </button>
  );
}
