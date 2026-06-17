import { useParams } from "react-router-dom";

const CourseLessonDetail = () => {
  const { lessonId } = useParams();
  return <div>CourseLessonDetail: {lessonId}</div>;
};

export default CourseLessonDetail;
