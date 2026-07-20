import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";

const useContent = <T>(endpoint: string, slug: string) => {
  const [content, setContent] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<T>(`${endpoint}/${slug}`)
      .then((res) => setContent(res.data))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else if (axios.isAxiosError(err)) {
          setError(err.response?.data);
        } else {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  }, [endpoint, slug]);

  return { content, error, isLoading };
};

export default useContent;
