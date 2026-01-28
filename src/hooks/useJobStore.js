import { create } from "zustand";

const PAGE_SIZE = 10;

const defaultFilterState = {
  jobType: "all",
  skills: [],
  // salaryRange will be initialized from data once jobs are loaded
  salaryRange: null,
  search: "",
  sortBy: "date-desc"
};

export const useJobStore = create((set) => ({
  jobs: [],
  companies: [],
  viewMode: "grid",
  filters: { ...defaultFilterState },
  currentPage: 1,
  bookmarked: [],
  PAGE_SIZE,

  setData: (jobs, companies) =>
    set(() => ({
      jobs,
      companies
    })),

  setViewMode: (mode) =>
    set(() => ({
      viewMode: mode
    })),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1
    })),

  resetFilters: () =>
    set((state) => {
      const salaries = state.jobs.map((j) => j.salary);
      const min = salaries.length ? Math.min(...salaries) : 0;
      const max = salaries.length ? Math.max(...salaries) : 200000;

      return {
        filters: {
          ...defaultFilterState,
          salaryRange: [min, max]
        },
        currentPage: 1
      };
    }),

  setSearch: (value) =>
    set((state) => ({
      filters: { ...state.filters, search: value },
      currentPage: 1
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
      currentPage: 1
    })),

  setSalaryRange: (range) =>
    set((state) => ({
      filters: { ...state.filters, salaryRange: range },
      currentPage: 1
    })),

  setCurrentPage: (page) =>
    set(() => ({
      currentPage: page
    })),

  toggleBookmark: (jobId) =>
    set((state) => {
      const exists = state.bookmarked.includes(jobId);
      const updated = exists
        ? state.bookmarked.filter((id) => id !== jobId)
        : [...state.bookmarked, jobId];

      if (typeof window !== "undefined") {
        window.localStorage.setItem("bookmarkedJobs", JSON.stringify(updated));
      }

      return { bookmarked: updated };
    }),

  loadBookmarksFromStorage: () =>
    set(() => {
      if (typeof window === "undefined") return {};
      const raw = window.localStorage.getItem("bookmarkedJobs");
      if (!raw) return { bookmarked: [] };
      try {
        const arr = JSON.parse(raw);
        return { bookmarked: arr };
      } catch {
        return { bookmarked: [] };
      }
    }),

  setInitialSalaryRange: (min, max) =>
    set((state) => {
      if (state.filters.salaryRange) {
        return state;
      }
      return {
        filters: { ...state.filters, salaryRange: [min, max] }
      };
    })
}));
