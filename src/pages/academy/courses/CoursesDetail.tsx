import useCourse from "@/lib/service/useCourse";
import { useParams } from "react-router-dom";
import { Clock4 } from "lucide-react";

const CoursesDetail = () => {
  const { slug } = useParams();
  const { course, error, isLoading } = useCourse(slug || "");

  console.log(course);
  console.log(error);
  console.log(isLoading);

  return (
    <div className="container mx-auto flex gap-6 justify-between py-5 px-4 sm:px-6 lg:px-10 my-10">
      <div className="flex flex-col gap-8 w-[70%]">
        <div className="p-8 border border-[#C1C8C2] bg-[#FFFFFF] rounded-lg">
          <header className="flex gap-2">
            {course?.level === "beginner" && (
              <div className="bg-[#A4F792] rounded-xl px-3 py-1 text-xs w-max capitalize">
                {course.level}
              </div>
            )}
            {course?.level === "intermediate" && (
              <div className="bg-[#FFDCC3] rounded-xl px-3 py-1 text-xs w-max capitalize">
                {course.level}
              </div>
            )}
            {course?.level === "advanced" && (
              <div className="bg-[#5E3000] rounded-xl px-3 py-1 text-xs w-max capitalize">
                {course.level}
              </div>
            )}
            <div className="text-[#414844] flex gap-1 items-center text-sm">
              <Clock4 size={17} />
              <p>
                {course?.estimatedDurationHours}{" "}
                {course?.estimatedDurationHours === 1 ? "Hour" : "Hours"}
              </p>
            </div>
          </header>
          <h1 className="mt-4 text-5xl font-bold text-[#191C1B]">
            {course?.title}
          </h1>
          <p className="text-[#414844] text-lg mt-4">
            {course?.longDescription}
          </p>

          <div></div>
        </div>
        <div>Hello 2</div>
      </div>
      <div className="flex flex-col gap-6 h-max sticky top-28 w-[30%]">
        <div>Hello 3</div>
        <div>Hello 4</div>
      </div>
    </div>
  );
};

export default CoursesDetail;
