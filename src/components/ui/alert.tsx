import { TriangleAlert } from "lucide-react";

const Alert = () => {
  return (
    <div className="flex gap-3 border-l-5 p-5 border-[#BA1A1A] bg-[#FFDAD6] rounded-lg w-full">
      <div>
        <TriangleAlert color="#93000A" />
      </div>
      <div>
        <h3 className="text-base text-[#93000A]">ACCOUNT SUSPENDED</h3>
        <p className="text-base mt-2 text-[#93000A]">
          This account has been suspended for violating TES Knowledge Hub
          community guidelines. Access to publishing and community features is
          currently restricted.
        </p>
      </div>
    </div>
  );
};

export default Alert;
