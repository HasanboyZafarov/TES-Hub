import type Session from "@/types/session";
import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";

const useSessions = () => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<Session[]>("/sessions")
      .then((res) => setSessions(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const published = sessions?.filter((s) => s.status === "published");
  const archived = sessions?.filter((s) => s.status === "archived");
  const draft = sessions?.filter((s) => s.status === "draft");
  const pending_review = sessions?.filter((s) => s.status === "pending_review");
  const rejected = sessions?.filter((s) => s.status === "rejected");

  return {
    sessions,
    error,
    isLoading,
    published,
    archived,
    draft,
    pending_review,
    rejected,
  };
};

export default useSessions;
