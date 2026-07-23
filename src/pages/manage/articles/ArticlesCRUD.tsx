import { useState } from "react";
import { useParams } from "react-router-dom";
import z from "zod";
import Editor from "../../../components/ui/editor";
import ArticleSettings from "@/components/ui/articleSettings";
import Button from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import usePermissions from "@/lib/hooks/usePermissions";
import type { Tag } from "@/components/ui/tags";
import CATEGORIES, { type Category } from "@/types/category";

const ArticleSchema = z.object({
  body: z.string().min(1, "Article content is required."),
  title: z.string().min(1, "Title is required."),
  category: z.enum(CATEGORIES, { error: "Please select a category." }),
  coverImage: z.instanceof(File, { error: "Cover image is required." }),
});

const ArticlesCRUD = () => {
  const { slug } = useParams();
  const { role } = usePermissions();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState<string | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePublish = () => {
    const result = ArticleSchema.safeParse({
      title,
      body,
      category,
      coverImage,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log({ ...result.data, tags });
  };

  const handleSaveDraft = () => {
    console.log({ title, body, category, coverImage, tags });
  };

  return (
    <div className="container mx-auto px-10 pt-5 pb-10">
      <div className="flex items-center justify-between">
        {slug === "new" ? (
          <h2 className="text-5xl text-[#012D1D] font-bold">
            Adding new article
          </h2>
        ) : (
          <h2 className="text-5xl text-[#012D1D] font-bold">
            Editing article: {slug}
          </h2>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-none! px-5! py-2!"
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>
          {role === "tes_admin" && (
            <Button
              className="rounded-none! px-5! py-2!"
              onClick={handlePublish}
            >
              Publish
            </Button>
          )}

          {role === "tes_author" ||
            (role === "spac_consultant" && (
              <Button
                className="rounded-none! px-5! py-2! gap-2"
                Icon={SendHorizonal}
                onClick={handlePublish}
              >
                Submit For Review
              </Button>
            ))}
        </div>
      </div>

      <div className="flex mt-5 items-stretch">
        <Editor
          value={body}
          onChange={setBody}
          error={errors.body}
          className="rounded-xl w-[70%]"
        />
        <ArticleSettings
          className="w-[30%] bg-[#f8faf8]"
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          categoryError={errors.category}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          coverImageError={errors.coverImage}
          tags={tags}
          setTags={setTags}
        />
      </div>
    </div>
  );
};

export default ArticlesCRUD;
