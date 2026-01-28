import { useJobStore } from "../../hooks/useJobStore";

export default function ViewToggle() {
  const viewMode = useJobStore((s) => s.viewMode);
  const setViewMode = useJobStore((s) => s.setViewMode);

  return (
    <div className="flex gap-2 mb-4">
      <button
        data-testid="grid-view-btn"
        className={`px-3 py-1 border ${viewMode === "grid" ? "bg-gray-200" : ""}`}
        onClick={() => setViewMode("grid")}
      >
        Grid
      </button>
      <button
        data-testid="list-view-btn"
        className={`px-3 py-1 border ${viewMode === "list" ? "bg-gray-200" : ""}`}
        onClick={() => setViewMode("list")}
      >
        List
      </button>
    </div>
  );
}
