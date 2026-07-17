import useCourse from "@/lib/service/useCourse";
import { useParams } from "react-router-dom";

const CoursesDetail = () => {
  const { slug } = useParams();
  const { course, error, isLoading } = useCourse(slug || "");

  console.log(course);

  return <div>CoursesDetail: {slug}</div>;
};

export default CoursesDetail;
