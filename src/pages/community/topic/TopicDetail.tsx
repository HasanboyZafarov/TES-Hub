import { useParams } from "react-router-dom";

const TopicDetail = () => {
  const { topicSlug } = useParams();

  return <div>TopicDetail: {topicSlug}</div>;
};

export default TopicDetail;
