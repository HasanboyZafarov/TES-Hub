import { useParams } from "react-router-dom";

const SessionRegister = () => {
  const { slug } = useParams();
  return <div>Session: {slug} - Register</div>;
};

export default SessionRegister;
