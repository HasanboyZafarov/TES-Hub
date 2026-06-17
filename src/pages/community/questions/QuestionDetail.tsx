import { useParams } from "react-router-dom";

const QuestionDetail = () => {
  const { slug } = useParams();
  return <div>QuestionDetail: {slug}</div>;
};

export default QuestionDetail;
