import type Session from "@/types/session";
import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";

const useSessions = () => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/sessions")
      .then((res) => setSessions(res.data))
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

  return { sessions, error, isLoading };
};

export default useSessions;
