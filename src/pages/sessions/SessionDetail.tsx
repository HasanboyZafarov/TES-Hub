import { useParams } from "react-router-dom";

const SessionDetail = () => {
  const { slug } = useParams();
  return <div>SessionDetail: {slug}</div>;
};

export default SessionDetail;
