import { useParams } from "react-router-dom";

const ArticlesDetail = () => {
  const { slug } = useParams();
  return <div>ArticlesDetail: {slug}</div>;
};

export default ArticlesDetail;
