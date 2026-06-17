import { useParams } from "react-router-dom";

const SessionRegisterConfirmation = () => {
  const { slug } = useParams();
  return <div>SessionRegisterConfirmation: {slug}</div>;
};

export default SessionRegisterConfirmation;
