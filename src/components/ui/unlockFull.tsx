import { Lock } from "lucide-react";
import Button from "./button";

const UnlockFull = () => {
  return (
    <div className="border boder-[#C1C8C2] bg-white rounded-sm flex flex-col items-center py-8 px-30 shadow-lg mt-10">
      <div className="p-6 bg-[#FFDCC3] w-max rounded-xl">
        <Lock color="#3E1E00" />
      </div>
      <h2 className="text-[#191C1B] text-3xl font-semibold mt-6">
        Unlock the Full Guide
      </h2>
      <p className="text-center mt-4">
        This is a premuim post contains detailed schematics, material lists, and
        step-by-step installation instructions for pressure-compensating
        systems. Join the Academy to continue.
      </p>
      <div className="flex gap-4 mt-2">
        <Button>Join TES Academy</Button>
        <Button variant="outline">Log In</Button>
      </div>

      <p className="mt-6 text-[#414844] text-xs">
        Subsidized access is available for verified rural cooperatives.{" "}
        <span className="text-[#1F6D1A] cursor-pointer hover:border-b-2 border-[#1F6D1A]">
          Learn more.
        </span>
      </p>
    </div>
  );
};

export default UnlockFull;
