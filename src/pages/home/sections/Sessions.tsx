import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sessions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FFFFFF]">
      <div className="container mx-auto px-10 py-15">
        <header>
          <h3 className="text-[#191C1B]">Upcoming Sessions</h3>
          <div className="flex items-center gap-2 justify-between mt-3">
            <p className="text-[#414844]">
              Live training and interactive workshops.
            </p>
            <p
              className="text-[#012D1D] flex gap-1 items-center cursor-pointer"
              onClick={() => navigate("/academy/courses")}
            >
              See all sessions <ArrowRight size={18} />
            </p>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Sessions;
