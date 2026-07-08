import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";
import type Course from "./../../types/course";

const useCourses = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  const archived = courses?.filter((c) => c.status === "archived");
  const published = courses?.filter((c) => c.status === "published");
  const draft = courses?.filter((c) => c.status === "draft");
  const pending_review = courses?.filter((c) => c.status === "pending_review");
  const rejected = courses?.filter((c) => c.status === "rejected");

  useEffect(() => {
    axiosInstance
      .get<Course[]>("/courses")
      .then((res) => {
        setCourses(res.data);
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
    courses,
    error,
    isLoading,
    published,
    archived,
    draft,
    pending_review,
    rejected,
  };
};

export default useCourses;
