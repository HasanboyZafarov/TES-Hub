import { useParams } from "react-router-dom";
import { useUser } from "../../lib/hooks/useUser";

const Profile = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id || "me");

  if (!user) return <div>User not found</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div></div>
      <div className="flex">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
