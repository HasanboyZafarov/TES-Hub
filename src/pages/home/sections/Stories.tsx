import CardSkeleton from "@/components/ui/cardSkeleton";
import StoryCard from "@/components/ui/storyCard";
import useStories from "@/lib/hooks/useStories";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Stories = () => {
  const { published, error, isLoading } = useStories();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="bg-[#F2F4F2]">
      <div className="container mx-auto px-10 py-15">
        <header>
          <h3 className="text-[#191C1B]">{t("home.stories.title")}</h3>
          <div className="flex items-center gap-2 justify-between mt-3">
            <p className="text-[#414844]">{t("home.stories.subtitle")}</p>
            <p
              className="text-[#012D1D] flex gap-1 items-center cursor-pointer"
              onClick={() => navigate("/community/stories")}
            >
              {t("home.stories.joinDiscussion")} <ArrowRight size={18} />
            </p>
          </div>
        </header>

        {error ? (
          <p className="text-[#C1292E] mt-10">
            {t("home.stories.error", { error })}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-10 mt-10">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : published
                  ?.slice(0, 3)
                  .map((s) => <StoryCard key={s.id} story={s} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
