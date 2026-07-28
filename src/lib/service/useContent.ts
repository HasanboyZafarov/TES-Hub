import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";

const useContent = <T>(endpoint: string, slug: string) => {
  const [content, setContent] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(Boolean(slug));

  useEffect(() => {
    if (!slug) return;

    axiosInstance
      .get<T>(`${endpoint}/${slug}`)
      .then((res) => setContent(res.data))
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => setLoading(false));
  }, [endpoint, slug]);

  return { content, error, isLoading };
};

export default useContent;
