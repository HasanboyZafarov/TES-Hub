import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type Course from "@/types/course";

interface Props {
  course: Course;
}

const CourseCard = ({ course: c }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-lg border border-[#C1C8C2] cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/academy/courses/${c.id}`)}
    >
      <header
        className="bg-no-repeat bg-center bg-cover p-6 pt-5 rounded-t-lg h-50"
        style={{ backgroundImage: `url("${c.coverImage}")` }}
      >
        <div className="capitalize text-[#191C1B] bg-white w-max p-1 px-4 rounded-full">
          {c.surface}
        </div>
      </header>
      <div className="p-6 flex flex-col justify-between gap-3 h-55">
        <div className="flex justify-between items-center">
          <div className="bg-[#1b43321a] capitalize w-max text-xs text-[#012D1D] py-1 px-2 rounded-xs">
            {c.level}
          </div>
          <div className="text-[#F48C24] font-bold text-sm flex items-center gap-1">
            <Star size={18} fill="#F48C24" />
            {c.rating}
          </div>
        </div>
        <div>
          <h3 className="text-[#191C1B] text-base">{c.title}</h3>
          <p className="text-[#414844] text-sm">{c.shortDescription}</p>
        </div>
        <div>
          <div className="bg-[#c1c8c280] h-px w-full my-5"></div>
          <p
            className={`capitalize ${c.pricing.amount ? "text-[#191C1B]" : "text-[#1F6D1A]"}`}
          >
            {c.pricing.amount || c.pricing.model}{" "}
            {c.pricing.amount ? c.pricing.currency : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
