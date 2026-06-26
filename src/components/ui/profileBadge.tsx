import { UserRound, Leaf, BadgeCheck, BookA, Shield } from "lucide-react";

interface Props {
  role?: string;
}

const ProfileBadge = ({ role }: Props) => {
  console.log(role);

  const baseClasses =
    "flex gap-2 p-1 px-2 rounded-xl font-semibold text-sm justify-center items-center";
  return (
    <div>
      {role === "member" ? (
        <div className={`bg-[#E0F2F1] text-[#00695C] ${baseClasses}`}>
          <UserRound width={20} color="#00695C" /> Member
        </div>
      ) : role === "spac_consultant" ? (
        <div className={` bg-[#DBEAFE] text-[#1E3A8A] ${baseClasses}`}>
          <BadgeCheck width={20} color="#1E3A8A" /> Consultant
        </div>
      ) : role === "tes_admin" ? (
        <div className={`bg-[#1B4332] text-[#FFFFFF] ${baseClasses}`}>
          <Shield width={20} color="#FFFFFF" /> TES Admin
        </div>
      ) : role === "tes_author" ? (
        <div className={`bg-[#FFF9C4] text-[#F57F17] ${baseClasses}`}>
          <BookA width={20} color="#F57F17" /> TES Author
        </div>
      ) : role === "verified_farmer" ? (
        <div className={`bg-[#A4F792] text-[#267320] ${baseClasses}`}>
          <Leaf width={20} color="#267320" /> Verified Farmer
        </div>
      ) : (
        <div
          className={`outline-2 outline-[#D8DAD9] text-[#D8DAD9] ${baseClasses}`}
        >
          <UserRound width={20} color="#D8DAD9" /> Guest
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;
