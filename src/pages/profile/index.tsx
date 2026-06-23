import { useParams } from "react-router-dom";
import Alert from "../../components/ui/alert";
import { useUser } from "../../lib/hooks/useUser";

const Profile = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id || "me");

  if (!user) return <div>User not found</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div>{user.isBanned && <Alert />}</div>

      <div className="flex">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
