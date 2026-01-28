import { useJobStore } from "../../hooks/useJobStore";

export default function JobCard({ job, company }) {
  const bookmarked = useJobStore((s) => s.bookmarked);
  const toggleBookmark = useJobStore((s) => s.toggleBookmark);
  const isBookmarked = bookmarked.includes(job.id);

  return (
    <div
      data-testid={`job-card-${job.id}`}
      className="border rounded-lg p-4 flex flex-col gap-2 bg-card shadow-md fade-in"
      style={{
        transition: "transform 140ms ease, box-shadow 140ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 16px 35px rgba(15,23,42,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(15,23,42,0.18)";
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg text-gray-100">
            {job.title}
          </h2>
          <div className="text-sm text-gray-300">
            {company?.name} • {job.location}
          </div>
        </div>
        <button
          data-testid={`bookmark-btn-${job.id}`}
          data-bookmarked={isBookmarked ? "true" : "false"}
          className={`px-2 py-1 text-xs ${
            isBookmarked ? "bg-yellow-400 text-gray-900" : ""
          }`}
          onClick={() => toggleBookmark(job.id)}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
      <div className="text-sm text-gray-300">
        <span>Type: {job.jobType}</span>
      </div>
      <div className="text-sm text-gray-300">
        Salary:{" "}
        <span data-testid="job-salary">
          ${job.salary.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs mt-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(236,72,153,0.25))",
              color: "#e5e7eb",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
