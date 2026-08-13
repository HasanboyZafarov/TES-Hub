import useCourse from "@/lib/service/useCourse";
import { useParams } from "react-router-dom";
import {
  Award,
  ChevronDown,
  Clock4,
  Download,
  ExternalLink,
  FileDown,
  FileQuestion,
  FileText,
  Infinity as InfinityIcon,
  MonitorSmartphone,
  Play,
  PlayCircle,
  Star,
  Video,
} from "lucide-react";
import { useState } from "react";
import type Lesson from "@/types/lesson";
import type Pricing from "@/types/pricing";
import Button from "@/components/ui/button";

const lessonIcons = {
  video: PlayCircle,
  article: FileText,
  pdf: FileDown,
  quiz: FileQuestion,
  external_link: ExternalLink,
};

const lessonLabels = {
  video: "Video",
  article: "Reading",
  pdf: "PDF",
  quiz: "Quiz",
  external_link: "Link",
};

const formatDuration = (lesson: Lesson) => {
  if (lesson.type !== "video") return `${lesson.durationMinutes} min`;

  const minutes = Math.floor(lesson.durationMinutes);
  const seconds = Math.round((lesson.durationMinutes - minutes) * 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const currencySymbols = {
  KGS: "с",
  USD: "$",
  RUB: "₽",
};

const formatPrice = (amount: number, currency: Pricing["currency"]) =>
  `${currencySymbols[currency]}${Math.round(amount).toLocaleString()}`;

const CoursesDetail = () => {
  const { slug } = useParams();
  const { course, error, isLoading } = useCourse(slug || "");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [...(course?.sections || [])].sort(
    (a, b) => a.order - b.order,
  );
  const activeSection = openSection ?? sections[0]?.id ?? null;

  const lessons = sections.flatMap((section) => section.lessons);
  const videoHours = Math.round(
    lessons
      .filter((lesson) => lesson.type === "video")
      .reduce((total, lesson) => total + lesson.durationMinutes, 0) / 60,
  );
  const downloadableCount = lessons.filter(
    (lesson) => lesson.type === "pdf",
  ).length;

  const pricing = course?.pricing;
  const listPrice = pricing?.amount ?? 0;
  const discountPercent = pricing?.hasDiscount
    ? (pricing.discountPercent ?? 0)
    : 0;
  const finalPrice = listPrice * (1 - discountPercent / 100);

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
          <p className="text-[#414844] text-lg my-4">
            {course?.longDescription}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex text-[#1F6D1A]">
                <Star size={18} />
                <Star size={18} />
                <Star size={18} />
                <Star size={18} />
                <Star size={18} />
              </div>
              <p className="text-[#191C1B] font-semibold text-sm">
                {course?.rating} ({course?.reviewCount} reviews)
              </p>
            </div>
            <div className="text-[#C1C8C2] text-base">|</div>
            <p className="text-[#414844] text-sm">
              {course?.enrollmentCount} students enrolled
            </p>
          </div>
        </div>
        <div className="p-8 border border-[#C1C8C2] bg-[#FFFFFF] rounded-lg">
          <h1 className="text-3xl font-semibold text-[#191C1B]">
            Course Curriculum
          </h1>

          <div className="mt-6 flex flex-col gap-4">
            {sections.map((section, index) => {
              const isOpen = section.id === activeSection;
              const lessons = [...section.lessons].sort(
                (a, b) => a.order - b.order,
              );

              return (
                <div
                  key={section.id}
                  className="border border-[#C1C8C2] rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenSection(isOpen ? null : section.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left ${
                      isOpen ? "bg-[#F4F7F4]" : "bg-[#FFFFFF]"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full text-sm font-semibold ${
                        isOpen
                          ? "bg-[#1F3D2B] text-[#FFFFFF]"
                          : "bg-[#E1E6E1] text-[#414844]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 font-semibold text-[#191C1B]">
                      {section.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#414844] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="border-t border-[#C1C8C2] bg-[#FFFFFF]">
                      {lessons.map((lesson) => {
                        const Icon = lessonIcons[lesson.type];

                        return (
                          <li
                            key={lesson.id}
                            className="flex items-center gap-3 px-5 py-3 border-b border-[#E1E6E1] last:border-b-0"
                          >
                            <Icon
                              size={18}
                              className="shrink-0 text-[#414844]"
                            />
                            <span className="flex-1 text-[#191C1B]">
                              {lessonLabels[lesson.type]}: {lesson.title}
                            </span>
                            <span className="shrink-0 text-sm text-[#414844]">
                              {formatDuration(lesson)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 h-max sticky top-28 w-[30%]">
        <div className="pb-6 border border-[#C1C8C2] bg-[#FFFFFF] rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={course?.coverImage}
              alt=""
              className="w-full h-60 object-cover"
            />
            <button
              type="button"
              aria-label="Play course preview"
              className="absolute inset-0 m-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFFFFF] shadow-lg cursor-pointer transition duration-100 active:scale-90"
            >
              <Play size={26} className="text-[#1F6D1A] ml-1" />
            </button>
          </div>
          <div className="p-6">
            {course?.pricing.model === "free" ? (
              <div className="flex items-center justify-between">
                <p className="text-[#267320] text-3xl font-bold">Free</p>
                <div className="text-[#267320] bg-[#A4F792] py-1 px-2 w-max font-semibold rounded-xs">
                  100% OFF
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-[#191C1B] text-3xl font-bold">
                    {formatPrice(finalPrice, pricing?.currency ?? "USD")}
                  </p>
                  {discountPercent > 0 && (
                    <p className="text-[#414844] text-lg line-through">
                      {formatPrice(listPrice, pricing?.currency ?? "USD")}
                    </p>
                  )}
                </div>
                {discountPercent > 0 && (
                  <div className="text-[#267320] bg-[#A4F792] py-1 px-2 w-max font-semibold rounded-xs">
                    {discountPercent}% OFF
                  </div>
                )}
              </div>
            )}
            <Button className="w-full rounded-sm! mt-6">Enroll now</Button>
            {course?.pricing.isRefundable && course.pricing.refundDays && (
              <p className="mt-4 text-center text-sm text-[#414844]">
                {course.pricing.refundDays}-day money-back guarantee
              </p>
            )}
          </div>
        </div>
        <div className="p-6 border border-[#C1C8C2] bg-[#FFFFFF] rounded-lg">
          <h2 className="text-2xl font-bold text-[#191C1B]">Course Includes</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {videoHours > 0 && (
              <li className="flex items-center gap-3 text-[#191C1B]">
                <Video size={20} className="shrink-0 text-[#414844]" />
                <span>
                  {videoHours} {videoHours === 1 ? "hour" : "hours"} on-demand
                  video
                </span>
              </li>
            )}
            {downloadableCount > 0 && (
              <li className="flex items-center gap-3 text-[#191C1B]">
                <Download size={20} className="shrink-0 text-[#414844]" />
                <span>
                  {downloadableCount} downloadable{" "}
                  {downloadableCount === 1 ? "resource" : "resources"}
                </span>
              </li>
            )}
            <li className="flex items-center gap-3 text-[#191C1B]">
              <InfinityIcon size={20} className="shrink-0 text-[#414844]" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-center gap-3 text-[#191C1B]">
              <MonitorSmartphone size={20} className="shrink-0 text-[#414844]" />
              <span>Access on mobile and TV</span>
            </li>
            {course?.certificateTemplate && (
              <li className="flex items-center gap-3 text-[#191C1B]">
                <Award size={20} className="shrink-0 text-[#414844]" />
                <span>Official TES Certificate of Completion</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
