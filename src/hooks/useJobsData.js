import useSWR from "swr";
import mockData from "../data/mock-data.json";

const fetcher = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 200);
  });
};

export const useJobsData = () => {
  const { data, error, isLoading } = useSWR("jobs-data", fetcher);

  return {
    jobs: data?.jobs || [],
    companies: data?.companies || [],
    isLoading,
    isError: !!error
  };
};
