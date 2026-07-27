import { useUser } from "@/lib/hooks/useUser";
import useArticle from "@/lib/service/useArticle";
import { Bookmark, Share2, SpaceIcon } from "lucide-react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import ProfileBadge from "@/components/ui/profileBadge";
import styles from "./styles.module.css";

const ArticlesDetail = () => {
  const { slug } = useParams();
  const { article, error, isLoading } = useArticle(slug || "");
  const { user } = useUser(article?.authorId || "");

  const navigate = useNavigate();

  function formatStatus(status: string): string {
    return status
      .replace(/-/g, " ")
      .replace(/^./, (char) => char.toUpperCase());
  }

  return (
    <div>
      <div className="container mx-auto px-10 py-5 flex pt-12 gap-12">
        <div className="w-[75%]">
          <header>
            <p className="text-[#414844] text-xs">
              {article?.readTimeMinutes} min read • Updated at{" "}
              {moment(article?.updatedAt).format("LL")}
            </p>
          </header>
          <h1 className="text-[#191C1B] font-bold text-5xl my-6">
            {article?.title}
          </h1>
          <p className="text-[#414844] text-lg">{article?.excerpt}</p>

          <div className="border-y border-[#C1C8C2] py-4 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                src={user?.avatar}
                alt="User avatar"
                className="w-15 h-15 object-cover rounded-xl"
              />
              <h3 className="text-[#191C1B]">Dr. {user?.displayName}</h3>
            </div>
            <div className="flex gap-2">
              <div className="border-2 rounded-xl border-[#C1C8C2] p-3 flex items-center justify-center hover:shadow-xl cursor-pointer">
                <Bookmark size={24} color="#414844" />
              </div>
              <div className="border-2 rounded-xl border-[#C1C8C2] p-3 flex items-center justify-center hover:shadow-xl cursor-pointer">
                <Share2 size={24} color="#414844" />
              </div>
            </div>
          </div>

          <div
            className={styles.content_editor}
            dangerouslySetInnerHTML={{ __html: article?.body || "" }}
          />
        </div>

        <div className="w-[25%] flex flex-col gap-8">
          <div className="h-max p-6 border border-[#C1C8C2] rounded-lg flex flex-col items-center">
            <h3 className="border-b border-[#C1C8C2] pb-2 text-xs w-full">
              ABOUT THE AUTHOR
            </h3>
            <img
              src={user?.avatar}
              alt=""
              className="w-25 rounded-xl border-2 border-[#E1E3E1] mt-6"
            />

            <h2 className="text-[#191C1B] text-2xl mt-4 font-semibold">
              {user?.displayName}
            </h2>

            <ProfileBadge role={user?.role} className="mt-2" />

            <p className="text-[#414844] text-sm text-center mt-4">
              {user?.bio}
            </p>

            <button
              onClick={() => navigate(`/profile/${user?.id}`)}
              className="border border-[#717973] w-full mt-4 text-[#191C1B] py-2 text-sm rounded-xs cursor-pointer hover:shadow"
            >
              View Full Profile
            </button>
          </div>

          <div className="h-max p-6 border border-[#C1C8C2] rounded-lg">
            <h3 className="text-[#414844] font-semibold">TOPICS</h3>
            <div className="flex gap-2 mt-4">
              {article?.topicTags.map((t) => (
                <span className="py-1 px-3 bg-[#ECEEEC] rounded-full">
                  {formatStatus(t)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetail;
