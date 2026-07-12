import CardSkeleton from "@/components/ui/cardSkeleton";
import SessionCard from "@/components/ui/sessionCard";
import useSessions from "@/lib/hooks/useSessions";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sessions = () => {
  const navigate = useNavigate();
  const { published, error, isLoading } = useSessions();
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
              See All Sessions <ArrowRight size={18} />
            </p>
          </div>
        </header>
        {error ? (
          <p className="text-[#C1292E] mt-10">Couldn't load courses: {error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-10 mt-10">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : published
                  ?.slice(0, 3)
                  .map((s) => <SessionCard sessions={s} key={s.id} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
