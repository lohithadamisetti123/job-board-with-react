import { useJobStore } from "../../hooks/useJobStore";

export default function Pagination({ totalJobs }) {
  const currentPage = useJobStore((s) => s.currentPage);
  const setCurrentPage = useJobStore((s) => s.setCurrentPage);
  const PAGE_SIZE = useJobStore((s) => s.PAGE_SIZE);

  const totalPages = Math.ceil(totalJobs / PAGE_SIZE) || 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      data-testid="pagination-controls"
      className="flex items-center gap-2 mt-4"
    >
      <button
        className="px-3 py-1 border"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        data-testid="pagination-next"
        className="px-3 py-1 border"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
