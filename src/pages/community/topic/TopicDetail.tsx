import useCommunityFeed, { type FeedSort } from "@/lib/hooks/useCommunityFeed";
import { formatTag, toHashtag } from "@/lib/utils/community";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FeedTabs from "../components/FeedTabs";
import PostList from "../components/PostList";
import { RegionsWidget, TopicsWidget } from "../components/SidebarWidgets";

const SORT_TABS: { value: FeedSort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "unanswered", label: "Needs replies" },
];

const TopicDetail = () => {
  const { topicSlug = "" } = useParams();
  const [sort, setSort] = useState<FeedSort>("latest");
  const [following, setFollowing] = useState(false);

  const { posts, topics, regions, isLoading, error } = useCommunityFeed({
    tag: topicSlug,
    sort,
  });

  const storyCount = posts.filter((p) => p.type === "story").length;
  const questionCount = posts.length - storyCount;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-20">
      <Link
        to="/community/topics"
        className="inline-flex items-center gap-1 text-[#414844] text-sm hover:text-[#012D1D]"
      >
        <ChevronLeft size={16} /> All topics
      </Link>

      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-4">
        <div>
          <h1 className="text-[#012D1D] text-3xl sm:text-4xl lg:text-5xl font-bold">
            {toHashtag(topicSlug)}
          </h1>
          <p className="text-[#414844] text-base mt-3">
            {formatTag(topicSlug)} — {storyCount}{" "}
            {storyCount === 1 ? "story" : "stories"} and {questionCount}{" "}
            {questionCount === 1 ? "question" : "questions"}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFollowing((f) => !f)}
          className={`w-max text-sm font-semibold py-2 px-5 rounded-lg cursor-pointer transition-colors ${
            following
              ? "bg-[#E7F6E4] text-[#267320]"
              : "bg-[#012D1D] text-white hover:bg-[#013d27]"
          }`}
        >
          {following ? "Following topic" : "Follow topic"}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="w-full lg:w-[70%]">
          <FeedTabs tabs={SORT_TABS} value={sort} onChange={setSort} />
          <PostList
            posts={posts}
            isLoading={isLoading}
            error={error}
            emptyMessage="Nothing has been posted under this topic yet."
          />
        </div>

        <aside className="w-full lg:w-[30%] flex flex-col gap-6">
          <TopicsWidget topics={topics} activeTag={topicSlug} />
          <RegionsWidget regions={regions} />
        </aside>
      </div>
    </div>
  );
};

export default TopicDetail;
