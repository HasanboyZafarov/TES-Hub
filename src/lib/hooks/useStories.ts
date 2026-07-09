import type Story from "./../../types/story";
import useData from "./useData";

const useStories = () => {
  const { data: stories, error, isLoading } = useData<Story>("/stories");

  const archived = stories?.filter((s) => s.status === "archived");
  const draft = stories?.filter((s) => s.status === "draft");
  const pending_review = stories?.filter((s) => s.status === "pending_review");
  const published = stories?.filter((s) => s.status === "published");
  const rejected = stories?.filter((s) => s.status === "rejected");

  return {
    stories,
    error,
    isLoading,
    published,
    archived,
    draft,
    pending_review,
    rejected,
  };
};

export default useStories;
