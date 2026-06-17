import { useParams } from "react-router-dom";

const SessionCheckout = () => {
  const { slug } = useParams();
  return <div>SessionCheckout: {slug}</div>;
};

export default SessionCheckout;
