import { useParams } from "react-router-dom";
import Alert from "../../components/ui/alert";
import { useUser } from "../../lib/hooks/useUser";
import ProfileBadge from "../../components/ui/profileBadge";
import { MapPin, Pencil, Share2 } from "lucide-react";
import Button from "../../components/ui/button";
import PostsPublished from "../../components/ui/postsPublished";

const Profile = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id || "me");

  if (!user) return <div>User not found</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-5">{user.isBanned && <Alert />}</div>

      <div className="items-center justify-between grid grid-cols-[0.5fr_2.5fr_0.5fr] gap-5">
        <img
          src={user.avatar}
          className="w-40 h-40 rounded-lg border-5 shadow-lg -shadow-lg border-white"
          alt=""
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 items-center">
            <h1 className="text-3xl text-[#012D1D] font-semibold">
              {user.displayName}
            </h1>
            <ProfileBadge role={user.role} />
          </div>
          <div className="text-[#414844] flex gap-2">
            <MapPin />
            {user.region?.oblast}
          </div>
          <p className="break-all">{user.bio}</p>
        </div>
        <div className="flex flex-col gap-2">
          {id == "me" && (
            <Button className="gap-3" Icon={Pencil}>
              Edit Profile
            </Button>
          )}
          <Button variant="outline" className="gap-3" Icon={Share2}>
            Share Profile
          </Button>
        </div>
      </div>

      <div className="flex mt-10">
        <div className="outline-1 p-10 py-7 rounded-lg w-[75%] outline-[#E2E8F0] bg-[#FFFFFF]">
          <h1 className="text-2xl mb-5 font-semibold text-[#012D1D]">
            {id == "me" ? "My Activities" : `${user.displayName} Activities`}
          </h1>
          {user.stats.postsPublished.map((post) => (
            <PostsPublished key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
