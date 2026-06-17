import { useParams } from "react-router-dom";

const CourseLearn = () => {
  const { slug } = useParams();
  return <div>CourseLearn: {slug}</div>;
};

export default CourseLearn;
