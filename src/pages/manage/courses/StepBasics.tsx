import CoverImage from "@/components/ui/coverImage";
import Editor from "@/components/ui/editor";
import CATEGORIES, { type Category } from "@/types/category";
import { COURSE_LEVELS, type CourseLevel } from "@/types/course";
import { Field, inputClass } from "./composerUI";
import { LEVEL_LABELS, type CourseDraft } from "./courseDraft";

interface Props {
  draft: CourseDraft;
  set: <K extends keyof CourseDraft>(key: K, value: CourseDraft[K]) => void;
  errors: Record<string, string>;
  coverFile: File | null;
  setCoverFile: (file: File | null) => void;
}

const StepBasics = ({ draft, set, errors, coverFile, setCoverFile }: Props) => (
  <div className="flex flex-col gap-6">
    <Field
      label="Course Title"
      required
      hint="A concise, clear title for your course."
      error={errors.title}
    >
      <input
        className={inputClass}
        value={draft.title}
        onChange={(e) => set("title", e.target.value)}
        placeholder="e.g., Advanced Drip Irrigation Techniques"
      />
    </Field>

    <Field
      label="Short Description"
      required
      error={errors.shortDescription}
      hint="Shown on course cards and search results."
    >
      <textarea
        className={`${inputClass} h-24 py-3 resize-y`}
        value={draft.shortDescription}
        onChange={(e) => set("shortDescription", e.target.value)}
        placeholder="Briefly explain what students will learn…"
      />
    </Field>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Field label="Category" required error={errors.category}>
        <select
          className={inputClass}
          value={draft.category}
          onChange={(e) => set("category", e.target.value as Category)}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Difficulty Level" required error={errors.level}>
        <select
          className={inputClass}
          value={draft.level}
          onChange={(e) => set("level", e.target.value as CourseLevel)}
        >
          <option value="">Select Level</option>
          {COURSE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {LEVEL_LABELS[l]}
            </option>
          ))}
        </select>
      </Field>
    </div>

    <div>
      <span className="text-[#191C1B] text-sm font-semibold">
        Long Description
      </span>
      <Editor
        className="mt-2 rounded-lg overflow-hidden"
        value={draft.longDescription}
        onChange={(html) => set("longDescription", html)}
        placeholder="Provide detailed information about course objectives, target audience, and prerequisites…"
        error={errors.longDescription}
      />
    </div>

    <CoverImage
      coverImage={coverFile}
      setCoverImage={setCoverFile}
      existingUrl={draft.coverImage}
      error={errors.coverImage}
    />
  </div>
);

export default StepBasics;
