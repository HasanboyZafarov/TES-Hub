import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";
import type Story from "./../../types/story";

const useStories = () => {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<Story[]>("/stories")
      .then((res) => {
        setStories(res.data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.log("Network error");
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    stories,
    error,
    isLoading,
  };
};

export default useStories;
