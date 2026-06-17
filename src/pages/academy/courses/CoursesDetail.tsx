import { useParams } from "react-router-dom";

const CoursesDetail = () => {
  const { slug } = useParams();
  return <div>CoursesDetail: {slug}</div>;
};

export default CoursesDetail;
