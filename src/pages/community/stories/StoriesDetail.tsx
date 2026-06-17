import { useParams } from "react-router-dom";

const StoriesDetail = () => {
  const { slug } = useParams();
  return <div>StoriesDetail: {slug}</div>;
};
export default StoriesDetail;
