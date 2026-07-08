import React from "react";
import { GraduationCap, MessageCircle, Tv } from "lucide-react";

// interface CardProps {
//   Icon: LucideIcon;
//   title: string;
//   text: string;
// }

// const Card = ({ Icon, text, title }: CardProps) => {
//   return (
//     <div className="">
//       <Icon />
//       {text}
//       {title}
//     </div>
//   );
// };

const Services = () => {
  //   const cardContent = [
  //     {
  //       id: 1,
  //       Icon: GraduationCap,
  //       title: "TES Academy",
  //       text: "Access hundreds of expert-led courses on sustainable farming, crop management, and agribusiness.",
  //       iconBg: "#1B4332",
  //     },
  // {
  //   id: 2,
  //   Icon: MessageCircle,
  //   title: "Community Hub",
  //   text: "Connect with fellow farmers, share experiences, ask questions, and solve local challenges together.",
  // },
  // {
  //   id: 3,
  //   Icon: Tv,
  //   title: "Training Sessions",
  //   text: "Register for online webinars and in-person field workshops led by TES certified agronomists.",
  // },
  //   ];

  return (
    <div className="container mx-auto px-10 grid grid-cols-3 gap-10 py-15">
      <div className="flex flex-col gap-5 border border-[#C1C8C2] rounded-lg p-8">
        <div className="p-4 w-min bg-[#1b43321a] rounded-xl">
          <GraduationCap color="#012D1D" size={30} />
        </div>
        <h3 className="text-[#191C1B]">TES Academy</h3>
        <p className="text-[#414844]">
          Access hundreds of expert-led courses on sustainable farming, crop
          management, and agribusiness.
        </p>
      </div>
      <div className="flex flex-col gap-5 border border-[#C1C8C2] rounded-lg p-8">
        <div className="p-4 w-min bg-[#a5f7924d] rounded-xl">
          <MessageCircle color="#1F6D1A" size={30} />
        </div>
        <h3 className="text-[#191C1B]">Community Hub</h3>
        <p className="text-[#414844]">
          Connect with fellow farmers, share experiences, ask questions, and
          solve local challenges together.
        </p>
      </div>
      <div className="flex flex-col gap-5 border border-[#C1C8C2] rounded-lg p-8">
        <div className="p-4 w-min bg-[#5e31001a] rounded-xl">
          <Tv color="#5E3000" size={30} />
        </div>
        <h3 className="text-[#191C1B]">Training Sessions</h3>
        <p className="text-[#414844]">
          Register for online webinars and in- person field workshops led by TES
          certified agronomists.
        </p>
      </div>
    </div>
  );
};

export default Services;
