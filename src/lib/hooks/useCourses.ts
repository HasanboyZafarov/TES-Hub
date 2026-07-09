import type Course from "./../../types/course";
import useData from "./useData";

const useCourses = () => {
  const { data: courses, error, isLoading } = useData<Course>("/courses");

  const archived = courses?.filter((c) => c.status === "archived");
  const published = courses?.filter((c) => c.status === "published");
  const draft = courses?.filter((c) => c.status === "draft");
  const pending_review = courses?.filter((c) => c.status === "pending_review");
  const rejected = courses?.filter((c) => c.status === "rejected");

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
