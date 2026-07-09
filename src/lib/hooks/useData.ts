import { useState } from "react";
import axiosInstance from "../api/apiClient";

const useData = <T>(route: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  axiosInstance
    .get<T[]>(route)
    .then((res) => setData(Array.isArray(res.data) ? res.data : []))
    .catch((err) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    })
    .finally(() => setLoading(false));

  return { data, error, isLoading };
};

export default useData;
