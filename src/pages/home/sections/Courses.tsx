import CardSkeleton from "@/components/ui/cardSkeleton";
import CourseCard from "@/components/ui/courseCard";
import useCourses from "@/lib/hooks/useCourses";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, isLoading, published } = useCourses();

  return (
    <div className="bg-white">
      <div className="container mx-auto py-15 px-10 w-full">
        <header>
          <h3 className="text-[#191C1B]">{t("home.courses.title")}</h3>
          <div className="flex items-center gap-2 justify-between mt-3">
            <p className="text-[#414844]">{t("home.courses.subtitle")}</p>
            <p
              className="text-[#012D1D] flex gap-1 items-center cursor-pointer"
              onClick={() => navigate("/academy/courses")}
            >
              {t("home.courses.viewAll")} <ArrowRight size={18} />
            </p>
          </div>
        </header>
        {error ? (
          <p className="text-[#C1292E] mt-10">
            {t("home.courses.error", { error })}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-10 mt-10">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : published
                  ?.slice(0, 3)
                  .map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
