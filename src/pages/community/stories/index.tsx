import SearchInput from "@/components/ui/searchInput";
import useCommunityFeed, { type FeedSort } from "@/lib/hooks/useCommunityFeed";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FeedTabs from "../components/FeedTabs";
import PostList from "../components/PostList";
import {
  GuidelinesWidget,
  RegionsWidget,
  TopicsWidget,
} from "../components/SidebarWidgets";

const SORT_TABS: { value: FeedSort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
];

const Stories = () => {
  const [sort, setSort] = useState<FeedSort>("latest");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const { posts, topics, regions, isLoading, error } = useCommunityFeed({
    kind: "story",
    sort,
    search,
    tag,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-20">
      <Link
        to="/community"
        className="inline-flex items-center gap-1 text-[#414844] text-sm hover:text-[#012D1D]"
      >
        <ChevronLeft size={16} /> Community
      </Link>

      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mt-4">
        <div>
          <h1 className="text-[#012D1D] text-3xl sm:text-4xl lg:text-5xl font-bold">
            Field Stories
          </h1>
          <p className="text-[#414844] text-base sm:text-lg mt-3 max-w-2xl">
            What worked, what failed, and what it cost — written up by the people
            who farmed it.
          </p>
        </div>
        <div className="w-full lg:w-90">
          <SearchInput onChange={setSearch} placeholder="Search stories..." />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="w-full lg:w-[70%]">
          <FeedTabs tabs={SORT_TABS} value={sort} onChange={setSort} />

          {tag && (
            <button
              type="button"
              onClick={() => setTag(null)}
              className="mt-4 text-xs text-[#012D1D] bg-[#E7F6E4] py-1.5 px-3 rounded-full cursor-pointer"
            >
              {tag} ✕
            </button>
          )}

          <PostList
            posts={posts}
            isLoading={isLoading}
            error={error}
            emptyMessage="No stories match your search yet."
          />
        </div>

        <aside className="w-full lg:w-[30%] flex flex-col gap-6">
          <TopicsWidget
            topics={topics}
            activeTag={tag}
            onSelect={(t) => setTag(tag === t ? null : t)}
          />
          <RegionsWidget regions={regions} />
          <GuidelinesWidget />
        </aside>
      </div>
    </div>
  );
};

export default Stories;
