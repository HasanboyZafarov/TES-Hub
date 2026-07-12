import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";
import type { Status } from "@/types/status";

const useData = <T extends Status>(route: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [route]);

  const published = data?.filter((d) => d.status === "published");
  const archived = data?.filter((d) => d.status === "archived");
  const draft = data?.filter((d) => d.status === "draft");
  const pending_review = data?.filter((d) => d.status === "pending_review");
  const rejected = data?.filter((d) => d.status === "rejected");

  return {
    data,
    error,
    isLoading,
    published,
    archived,
    draft,
    pending_review,
    rejected,
  };
};

export default useData;
