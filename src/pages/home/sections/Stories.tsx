import useStories from "@/lib/hooks/useStories";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stories = () => {
  useStories();
  const navigate = useNavigate();
  return (
    <div className="bg-[#F2F4F2]">
      <div className="container mx-auto px-10 py-15">
        <header>
          <h3 className="text-[#191C1B]">Community Stories</h3>
          <div className="flex items-center gap-2 justify-between mt-3">
            <p className="text-[#414844]">
              Real experiences from farmers across the country.
            </p>
            <p
              className="text-[#012D1D] flex gap-1 items-center cursor-pointer"
              onClick={() => navigate("/academy/courses")}
            >
              Join Discussion <ArrowRight size={18} />
            </p>
          </div>
        </header>
        
      </div>
    </div>
  );
};

export default Stories;
