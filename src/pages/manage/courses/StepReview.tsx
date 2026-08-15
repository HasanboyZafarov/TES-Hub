import Button from "@/components/ui/button";
import { CheckCircle2, Circle, ImageIcon, SendHorizonal } from "lucide-react";
import { Clock, FileCheck2 } from "lucide-react";
import {
  formatDuration,
  LEVEL_LABELS,
  totalMinutes,
  type CourseDraft,
} from "./courseDraft";

export interface ChecklistItem {
  label: string;
  detail: string;
  done: boolean;
}

interface Props {
  draft: CourseDraft;
  checklist: ChecklistItem[];
  saving: boolean;
  onSubmit: () => void;
  onSaveDraft: () => void;
  onEditCurriculum: () => void;
}

const StepReview = ({
  draft,
  checklist,
  saving,
  onSubmit,
  onSaveDraft,
  onEditCurriculum,
}: Props) => {
  const minutes = totalMinutes(draft.sections);
  const canSubmit = checklist
    .filter((c) => c.label !== "Expert Review")
    .every((c) => c.done);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Preview */}
      <div className="lg:col-span-2 border border-[#C1C8C2] rounded-xl bg-white overflow-hidden">
        <div className="relative h-52 bg-[#E6E9E7] flex items-center justify-center">
          {draft.coverImage ? (
            <img
              src={draft.coverImage}
              alt={draft.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon size={32} className="text-[#9CA3AF]" />
          )}
          <span className="absolute top-3 right-3 bg-[#FEF3C7] text-[#B45309] text-xs font-semibold px-2 py-1 rounded">
            Draft Preview
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            {draft.category && (
              <span className="bg-[#A4F792] text-[#267320] text-xs font-semibold px-2 py-1 rounded-xs">
                {draft.category}
              </span>
            )}
            {draft.level && (
              <span className="text-[#414844] text-xs">
                {LEVEL_LABELS[draft.level]}
              </span>
            )}
            <span className="flex items-center gap-1 text-[#414844] text-xs">
              <Clock size={14} />
              {formatDuration(minutes)}
            </span>
          </div>

          <h2 className="text-[#012D1D] text-2xl font-bold mt-3">
            {draft.title || "Untitled course"}
          </h2>
          <p className="text-[#414844] text-sm mt-2">
            {draft.shortDescription || "No short description yet."}
          </p>

          <h3 className="text-[#012D1D] font-semibold mt-6">
            Curriculum Overview
          </h3>
          <div className="flex flex-col gap-3 mt-3">
            {draft.sections.map((section, i) => {
              const sectionMinutes = section.lessons.reduce(
                (sum, l) => sum + (l.durationMinutes || 0),
                0,
              );
              return (
                <div
                  key={section.id}
                  className="flex items-center gap-3 border border-[#E5E7EB] rounded-lg px-4 py-3 bg-[#F9FAFB]"
                >
                  <span className="h-6 w-6 shrink-0 rounded-full bg-[#012D1D] text-white text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#191C1B] text-sm font-medium truncate">
                      {section.title || "Untitled module"}
                    </p>
                    <p className="text-[#6B7280] text-xs mt-0.5">
                      {section.lessons.length} Lesson
                      {section.lessons.length === 1 ? "" : "s"} •{" "}
                      {formatDuration(sectionMinutes)}
                    </p>
                  </div>
                </div>
              );
            })}
            {!draft.sections.length && (
              <p className="text-[#6B7280] text-sm">No modules added yet.</p>
            )}
          </div>

          <button
            type="button"
            onClick={onEditCurriculum}
            className="text-[#267320] text-sm font-semibold mt-4 hover:underline cursor-pointer"
          >
            Edit full curriculum →
          </button>
        </div>
      </div>

      {/* Checklist + actions */}
      <aside className="flex flex-col gap-6">
        <section className="border border-[#C1C8C2] rounded-xl bg-white p-6">
          <h3 className="text-[#012D1D] font-semibold flex items-center gap-2">
            <FileCheck2 size={18} />
            Validation Checklist
          </h3>
          <ul className="flex flex-col gap-4 mt-4">
            {checklist.map((item) => (
              <li key={item.label} className="flex gap-3">
                {item.done ? (
                  <CheckCircle2
                    size={18}
                    className="text-[#267320] shrink-0 mt-0.5"
                  />
                ) : (
                  <Circle size={18} className="text-[#9CA3AF] shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-sm font-medium ${
                      item.done ? "text-[#191C1B]" : "text-[#6B7280]"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-[#6B7280] text-xs mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-[#C1C8C2] rounded-xl bg-white p-6">
          <p className="text-[#414844] text-xs">
            By submitting, you agree to the TES Hub quality standards and
            content review process.
          </p>
          <Button
            className="rounded-md! w-full mt-4 gap-2"
            disabled={saving || !canSubmit}
            onClick={onSubmit}
          >
            <SendHorizonal size={18} />
            Submit for Review
          </Button>
          <Button
            variant="outline"
            className="rounded-md! w-full mt-3"
            disabled={saving}
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
        </section>
      </aside>
    </div>
  );
};

export default StepReview;
