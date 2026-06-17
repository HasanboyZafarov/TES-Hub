import { useParams } from "react-router-dom";

const AuthorProfile = () => {
  const { username } = useParams();
  return <div>AuthorProfile: {username}</div>;
};

export default AuthorProfile;
