import SearchInput from "@/components/ui/searchInput";
import useArticles from "@/lib/hooks/useArticles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThumbsUp, MessageSquare, Bookmark } from "lucide-react";

const AcademyArticles = () => {
  const { published } = useArticles();

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const [tab, setTab] = useState<"latest" | "popular">("latest");

  const filtered = published?.filter((c) =>
    c.title
      .toLocaleLowerCase()
      .includes(search?.toLocaleLowerCase().trim().replace(/\s/g, " ")),
  );

  const PAGE_SIZE = 6;
  const pageCount = Math.max(
    1,
    Math.ceil((published ?? []).length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, pageCount);
  const pageItems = (filtered ?? []).slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const navigate = useNavigate();

  function formatStatus(status: string): string {
    return status
      .replace(/-/g, " ")
      .replace(/^./, (char) => char.toUpperCase());
  }

  function formatNumbers(n: number) {
    if (n >= 1000) {
      return n / 1000 + "k";
    }
    return n;
  }

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-20">
        <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div>
            <h1 className="text-[#012D1D] text-3xl sm:text-4xl lg:text-5xl font-bold">
              Academy Articles
            </h1>
            <h3 className="mt-3">
              Explore articles bridging traditional wisdom with modern
              agricultural science.
            </h3>
          </div>
          <div className="w-full md:w-auto md:min-w-70">
            <SearchInput
              onChange={(e) => {
                setSearch(e);
                setPage(1);
              }}
              placeholder="Search articles..."
            />
          </div>
        </header>

        <div className="flex gap-6">
          <div className="w-[75%]">
            <div className="flex gap-6 items-start border-b w-full border-[#C1C8C2]">
              <button
                onClick={() => setTab("latest")}
                className={`${tab === "latest" ? "text-[#012D1D] border-b-3 border-[#012D1D] " : "text-[#414844] border-none"} text-sm font-semibold pb-1 cursor-pointer`}
              >
                Latest
              </button>
              <button
                onClick={() => setTab("popular")}
                className={`${tab === "popular" ? "text-[#012D1D] border-b-3 border-[#012D1D] " : "text-[#414844] border-none"} text-sm font-semibold pb-1 cursor-pointer`}
              >
                Popular
              </button>
            </div>

            {filtered?.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/academy/articles/${article.slug}`)}
                className="p-6 rounded-xl border border-[#C1C8C2] mt-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <p></p>
                <h2 className="text-[#012D1D] text-2xl font-semibold">
                  {article.title}
                </h2>
                <p className="text-[#414844] mt-2">{article.excerpt}</p>
                <div className="bg-[#ECEEEC] py-4 rounded-sm mt-2">
                  <img
                    src={article.coverImage}
                    alt="Article Cover Image"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 flex-wrap mt-2">
                  {article.topicTags.map((t) => (
                    <span className="text-[#191C1B] bg-[#F2F4F2] py-1 px-3 rounded-full">
                      {formatStatus(t)}
                    </span>
                  ))}
                </div>

                <div className="h-px w-full bg-[#C1C8C2] my-2"></div>

                <div className="w-full mt-4 flex items-center justify-between">
                  <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-1 text-[#414844] text-sm">
                      <ThumbsUp size={18} />
                      {formatNumbers(article.stats.likes)}
                    </div>
                    <div className="flex items-center gap-1 text-[#414844] text-sm">
                      <MessageSquare size={18} />
                      <p>{formatNumbers(article.stats.comments)} answers</p>
                    </div>
                  </div>
                  <Bookmark size={20} color="#414844" />
                </div>
              </div>
            ))}
          </div>
          <aside className="w-[25%]">
            <div className="p-6 rounded-xl border border-[#C1C8C2] mt-6">
              <h3 className="text-2xl text-[#012D1D] font-semibold">
                Trending Topics
              </h3>

              <div className="mt-4">
                <p className="text-[#191C1B] text-sm font-semibold hover:underline cursor-pointer">
                  #WinterPreparation
                </p>
                <p className="text-[#414844] text-xs">142 posts this week</p>
              </div>
              <div className="mt-4">
                <p className="text-[#191C1B] text-sm font-semibold hover:underline cursor-pointer">
                  #WinterPreparation
                </p>
                <p className="text-[#414844] text-xs">142 posts this week</p>
              </div>
              <div className="mt-4">
                <p className="text-[#191C1B] text-sm font-semibold hover:underline cursor-pointer">
                  #WinterPreparation
                </p>
                <p className="text-[#414844] text-xs">142 posts this week</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AcademyArticles;
