import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";
import type Comment from "@/types/comment";

const useComments = (contentId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(Boolean(contentId));

  useEffect(() => {
    if (!contentId) return;

    axiosInstance
      .get<Comment[]>("/comments", { params: { contentId } })
      .then((res) => setComments(Array.isArray(res.data) ? res.data : []))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load comments."),
      )
      .finally(() => setLoading(false));
  }, [contentId]);

  const visible = comments.filter((c) => !c.isHidden);

  return { comments: visible, error, isLoading };
};

export default useComments;
