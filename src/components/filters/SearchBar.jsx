import { useEffect, useState } from "react";
import { useJobStore } from "../../hooks/useJobStore";

export default function SearchBar() {
  const setSearch = useJobStore((s) => s.setSearch);
  const searchValue = useJobStore((s) => s.filters.search);
  const [localValue, setLocalValue] = useState(searchValue);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(localValue);
    }, 300);
    return () => clearTimeout(id);
  }, [localValue, setSearch]);

  return (
    <div className="mb-4">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search by title or company"
        className="w-full border px-3 py-2"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
