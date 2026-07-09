import type Session from "@/types/session";
import useData from "./useData";

const useSessions = () => {
  const { data: sessions, error, isLoading } = useData<Session>("/sessions");

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
