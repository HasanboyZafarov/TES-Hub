import { useParams } from "react-router-dom";

const CourseQuiz = () => {
  const { slug } = useParams();
  return <div>CourseQuiz: {slug}</div>;
};

export default CourseQuiz;
